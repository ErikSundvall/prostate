/// <reference lib="dom" />
import * as d3 from "d3";
import type { ProstateMriData, Lesion } from "../types.ts";
import { CANONICAL_ZONES } from "../types.ts";
// Import Shoelace via the npm specifier so it is bundled with the component.
// This is a side-effect import which registers Shoelace custom elements such
// as <sl-popup> so the component can use them at runtime.
// Import the Shoelace package entry so its custom elements are registered
// when the bundle is executed. Use the package entry instead of an internal
// subpath to respect the package's "exports" map.
import "@shoelace-style/shoelace";
import { validateLesionData } from "../utils/data-schema.ts";
import {
  applyZoneStyles,
  computeZoneState,
  getPiradsColor,
} from "../utils/palette-and-patterns.ts";
import { translations } from "../utils/translations.ts";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host { display:block; }
    .map { width:100%; height:auto; }
    #warnings { color: var(--pirads-5, #A50F15); margin-top:0.5rem; font-size:0.9rem; }
    #legend { margin-top: 1rem; font-size: 0.9rem; }
    #legend h3 { margin: 0 0 0.5rem 0; font-size: 1rem; }
    #legend h4 { margin: 0.5rem 0 0.25rem 0; font-size: 0.9rem; }
    #legend div { margin-bottom: 0.25rem; }
    #legend span { margin-right: 0.5rem; border: 1px solid #000; }
  /* detail panel removed in favor of anchored popups */
    /* Palette overrides via CSS variables */
    [data-pirads="1"] { fill: var(--pirads-1, #FFFFB2); }
    [data-pirads="2"] { fill: var(--pirads-2, #FD8D3C); }
    [data-pirads="3"] { fill: var(--pirads-3, #FB6A4A); }
    [data-pirads="4"] { fill: var(--pirads-4, #DE2D26); }
    [data-pirads="5"] { fill: var(--pirads-5, #A50F15); }
    .zone:not([data-pirads]) { fill: none; }
    /* Hover and focus states */
    .zone:hover { stroke: #000; stroke-width: 2; }
    .zone:focus { stroke: #007acc; stroke-width: 3; }
  </style>
  <div class="map" part="map">
    <slot name="map-svg"></slot>
    <div id="warnings" aria-live="polite"></div>
    <div id="legend"></div>
  </div>
`;

export class ProstateMriMap extends HTMLElement {
  static get observedAttributes() {
    return ["language", "data", "theme"];
  }

  private shadow: ShadowRoot;
  private _data: ProstateMriData | null = null;
  private _language: string = "en";
  private _currentZone: string | null = null;
  private _zonePopup: HTMLElement | null = null;
  // We only use Shoelace `sl-popup` now. Assume it is available at runtime.
  private _zonePopupIsShoelace = true;
  // Timer used to delay hiding the popup so users can move pointer into it
  private _popupHideTimer: number | null = null;
  private _isTouchDevice = typeof globalThis !== "undefined" && (
    ('ontouchstart' in (globalThis as unknown as Record<string, unknown>)) || ((navigator && (navigator.maxTouchPoints ?? 0) > 0))
  );

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    // bind handlers
    this._onSlotChange = this._onSlotChange.bind(this);
    this._onZoneClick = this._onZoneClick.bind(this);
    this._onZoneKeydown = this._onZoneKeydown.bind(this);
  // panel methods removed; popups are anchored to zones
  }

  connectedCallback() {
    this._render();
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.addEventListener("slotchange", this._onSlotChange);
  // no global detail panel — popups are anchored to zones
    // initial attempt to wire slotted content if already present
    this._wireSlottedZones();
    this._applyStylesToSlottedSvg();
  }
  disconnectedCallback() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.removeEventListener("slotchange", this._onSlotChange);
  // no detail panel cleanup needed
    this._unwireSlottedZones();
  }

  // --- zone interaction plumbing ---
  private _onSlotChange() {
    this._wireSlottedZones();
    this._applyStylesToSlottedSvg();
  }

  private _wireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (!slot) return;

    const assigned = slot.assignedElements({ flatten: true });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg"
        ? (node as Element)
        : node.querySelector("svg");
      if (!svgRoot) continue;

      const zones = d3.select(svgRoot).selectAll<SVGElement, unknown>(".zone");
      zones
        .on(".zone-interaction", null)
        .attr("tabindex", "0")
        .attr("role", "button")
        .attr("focusable", "true")
          .on("click.zone-interaction", (event: Event) => {
            this._onZoneClick(event);
          })
          .on("keydown.zone-interaction", (event: Event) => {
            const keyboardEvent = event as KeyboardEvent;
            if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
              keyboardEvent.preventDefault();
              this._onZoneKeydown(keyboardEvent);
            }
          });

      // For non-touch devices we also show the popup on hover to improve discoverability
      if (!this._isTouchDevice) {
        zones.on("mouseenter.zone-interaction", (event: Event) => {
          const target = event.currentTarget as Element | null;
          if (!target) return;
          const zoneId = target.id || '';
          const lesions = zoneId ? (this._data?.lesions.filter(l => l.zones.includes(zoneId)) || []) : [];
          // Cancel any pending hide and show the popup
          this._cancelHidePopup();
          this._showZonePopup(target, lesions);
        }).on("mouseleave.zone-interaction", () => {
          // Delay hiding to allow pointer to move into the popup
          this._scheduleHidePopup(150);
        });
      }

      // Also wire elements with canonical zone IDs, even if they don't have class="zone"
      // this ensures basic interactivity even for SVGs that lack proper zone markup
      for (const zoneId of CANONICAL_ZONES) {
        const zoneElement = svgRoot.querySelector(`[id="${zoneId}"]`) as SVGElement;
          if (zoneElement && !zoneElement.classList.contains("zone")) {
          const sel = d3.select(zoneElement)
            .classed("zone", true)
            .on(".zone-interaction", null)
            .attr("tabindex", "0")
            .attr("role", "button")
            .attr("focusable", "true")
            .on("click.zone-interaction", (event: Event) => {
              this._onZoneClick(event);
            })
            .on("keydown.zone-interaction", (event: Event) => {
              const keyboardEvent = event as KeyboardEvent;
              if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
                keyboardEvent.preventDefault();
                this._onZoneKeydown(keyboardEvent);
              }
            });

          if (!this._isTouchDevice) {
            sel.on("mouseenter.zone-interaction", (event: Event) => {
              const target = event.currentTarget as Element | null;
              if (!target) return;
              const zoneId = target.id || '';
              const lesions = zoneId ? (this._data?.lesions.filter(l => l.zones.includes(zoneId)) || []) : [];
              this._showZonePopup(target, lesions);
            }).on("mouseleave.zone-interaction", () => {
              this._hideZonePopup();
            });
          }
        }
      }

      // After wiring zones for this SVG root, validate canonical zones
      // Presence and uniqueness. Only run when the SVG appears to have
      // content (simple heuristic: contains at least one child element).
      if (svgRoot && svgRoot.querySelectorAll && svgRoot.querySelectorAll("*").length > 0) {
        this._validateCanonicalZones(svgRoot);
      }
    }
  }

  /**
   * Validate that each canonical zone appears exactly once in the provided
   * svgRoot. If duplicates or missing zones are detected, show a popup
   * and surface the same message in the component warnings area via
   * `_dispatchWarning`.
   */
  private _validateCanonicalZones(svgRoot: Element) {
    const duplicates: string[] = [];
    const missing: string[] = [];
    for (const zoneId of CANONICAL_ZONES) {
      // Query for any element with the exact id. We treat multiple matches as duplicates.
      const matches = svgRoot.querySelectorAll(`[id="${zoneId}"]`);
      if (!matches || matches.length === 0) missing.push(zoneId);
      else if (matches.length > 1) duplicates.push(zoneId);
    }

    if (duplicates.length || missing.length) {
      const parts: string[] = [];
      if (duplicates.length) parts.push(`Duplicate zones: ${duplicates.join(", ")}`);
      if (missing.length) parts.push(`Missing zones: ${missing.join(", ")}`);
      const message = parts.join("; ");

      // Surface as non-blocking UI warning and dispatch event.
      try {
        // show a popup so the user notices immediately
        // eslint-disable-next-line no-alert
        alert(`Map validation: ${message}`);
      } catch {
        // ignore if alert isn't available in the environment
      }

      // Also emit through the component's warning mechanism so it appears
      // in the #warnings element and consumers can listen for the event.
      this._dispatchWarning([`Map validation: ${message}`]);
    }
  }

  /**
   * Find any slotted SVG root(s) and apply computed zone styles to them.
   * This calls into the utilities `computeZoneState` and `applyZoneStyles`.
   */
  private _applyStylesToSlottedSvg(): void {
    try {
      const slot = this.shadow.querySelector('slot[name="map-svg"]') as
        | HTMLSlotElement
        | null;
      if (!slot) return;
      const nodes = slot.assignedElements({ flatten: true });
      const lesions = Array.isArray(this._data?.lesions)
        ? this._data.lesions
        : [];
      const zoneState = computeZoneState(lesions);
      for (const el of nodes) {
        // If the slotted node is the svg root itself, use it, otherwise look
        // for an <svg> descendant.
        let svgRoot: Element | null = null;
        if (el.tagName && el.tagName.toLowerCase() === "svg") {
          svgRoot = el;
        } else {
          svgRoot = el.querySelector("svg");
        }
        if (svgRoot) {
          applyZoneStyles(svgRoot, zoneState);
        }
      }
    } catch (err) {
      // non-fatal: styling failures shouldn't break the component
      this._dispatchWarning([`applyStyles failed: ${String(err)}`]);
    }
  }

  private _unwireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (!slot) return;
    const assigned = slot.assignedElements({ flatten: true });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg"
        ? (node as Element)
        : node.querySelector("svg");
      if (!svgRoot) continue;
      d3.select(svgRoot).selectAll(".zone").on(".zone-interaction", null);
      // hide any visible popup when unwiring
      this._hideZonePopup();
    }
  }

  private _onZoneClick(e: Event) {
    const target = e.currentTarget as Element | null;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId) return;
    const lesions = this._data?.lesions.filter(l => l.zones.includes(zoneId)) || [];
    // Show popup anchored to the zone. For touch devices this is the primary
    // interaction; for mouse users click also shows the popup (hover also does).
    this._showZonePopup(target, lesions);
    this._dispatchZoneClick(zoneId, lesions);
  }

  private _onZoneKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const target = e.currentTarget as Element | null;
      if (!target) return;
      const zoneId = target.id || null;
      if (!zoneId) return;
      const lesions = this._data?.lesions.filter(l => l.zones.includes(zoneId)) || [];
      this._showZonePopup(target, lesions);
      this._dispatchZoneClick(zoneId, lesions);
    }
  }

  // Create or return the popup element. We trust Shoelace is loaded and
  // create a dedicated `sl-popup` instance appended to document.body.
  private _ensureZonePopup(): HTMLElement {
    if (this._zonePopup) return this._zonePopup;

    const popup = document.createElement("sl-popup") as HTMLElement & { show?: (ref: Element) => void; hide?: () => void; };
    // prefer arrow and sensible default placement; enable flip so popup can
    // automatically move underneath the anchor if there's no room above.
    try {
      popup.setAttribute("arrow", "true");
      popup.setAttribute("placement", "top");
      // allow automatic flipping when preferred placement doesn't fit
      popup.setAttribute("flip", "");
      // small offset so arrow has room
      popup.setAttribute("distance", "8");
    } catch (_e) {
      // ignore if attributes are not supported
    }
    const content = document.createElement("div");
    // Do not use a named slot; sl-popup projects its default (unnamed) slot
    // for popup content. Give the element a class so we can find it later.
    content.className = 'zone-popup-content';
    // Add minimal inline styling so the popup content is visible even if a
    // Shoelace theme isn't loaded. Shoelace provides positioning only; the
    // theme controls visuals — these inline styles are a safe fallback.
    try {
      content.style.background = 'white';
      content.style.padding = '8px';
      content.style.borderRadius = '6px';
      content.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
      content.style.minWidth = '120px';
      content.style.color = 'black';
    } catch (_e) {
      /* ignore */
    }
    popup.appendChild(content);
    // append the popup to document.body so Shoelace can position it
    // relative to the viewport and the reference element.
    (document.body || document.documentElement).appendChild(popup);
    try {
      (popup as HTMLElement).style.zIndex = '99999';
    } catch (_e) {
      /* ignore */
    }
    // if no Shoelace theme stylesheet is present, inject a local fallback
    try {
      const hasLink = !!document.querySelector('link[href*="shoelace"]') || Array.from(document.styleSheets || []).some(s => typeof s.href === 'string' && s.href.includes('shoelace'));
      if (!hasLink) {
        console.warn('[ProstateMriMap] Shoelace theme stylesheet not found; injecting local fallback stylesheet demo/shoelace-theme-fallback.css');
        try {
          this._dispatchWarning(['Shoelace theme not found; using local fallback stylesheet.']);
        } catch (_e) {
          /* ignore */
        }
        if (!document.querySelector('link[data-local-shoelace]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'demo/shoelace-theme-fallback.css';
          link.setAttribute('data-local-shoelace', 'true');
          document.head.appendChild(link);
        }
        try { (popup as HTMLElement).style.setProperty('--arrow-color', '#ffffff'); } catch (e) { console.debug('[ProstateMriMap] failed to set --arrow-color', e); }
      }
    } catch (_e) {
      /* ignore */
    }
    // allow popup hover to keep it open by cancelling any hide timer
    try {
      popup.addEventListener('mouseenter', () => this._cancelHidePopup());
      popup.addEventListener('mouseleave', () => this._scheduleHidePopup(150));
    } catch (_e) {
      /* ignore */
    }
    console.debug('[ProstateMriMap] created sl-popup and appended to document.body', popup);
    this._zonePopupIsShoelace = true;
    this._zonePopup = popup;
    return popup;
  }

  private _scheduleHidePopup(delay = 150) {
    this._cancelHidePopup();
    try {
      this._popupHideTimer = (globalThis as unknown as Window).setTimeout(() => {
        this._popupHideTimer = null;
        this._hideZonePopup();
      }, delay) as unknown as number;
    } catch (_e) {
      // fallback: immediate hide
      this._hideZonePopup();
    }
  }

  private _cancelHidePopup() {
    if (this._popupHideTimer != null) {
      try {
        (globalThis as unknown as Window).clearTimeout(this._popupHideTimer as unknown as number);
      } catch (_e) {
        /* ignore */
      }
      this._popupHideTimer = null;
    }
  }

  private _renderZonePopupContent(lesions: Lesion[], zoneId?: string) {
    const popup = this._ensureZonePopup();
    if (!popup) return;
    const content = (popup.querySelector('.zone-popup-content') as HTMLElement | null) ?? (popup.querySelector('[slot="content"]') as HTMLElement | null);
    if (!content) return;
    content.innerHTML = this._buildPopupHtml(lesions, zoneId);
  }

  private _buildPopupHtml(lesions: Lesion[], zoneId?: string) {
    const lang = (this._language === 'sv' ? 'sv' : 'en') as 'en' | 'sv';
    const t = translations[lang];
    const title = zoneId ? `${t.zoneLabel} ${zoneId}` : '';
    let html = `<div class="popup-title" style="font-weight:600;margin-bottom:6px">${title}</div>`;
  if (!lesions || lesions.length === 0) html += `<div>No lesions</div>`;
    else {
      html += '<ul style="padding:0;margin:0;list-style:none">';
      for (const lesion of lesions) {
        const badgeColor = getPiradsColor(lesion.pirads as number);
        const badgeTextColor = (lesion.pirads && Number(lesion.pirads) >= 4) ? '#fff' : '#000';
        html += `<li style="margin-bottom:6px"><strong>${t.lesionIdLabel}:</strong> ${lesion.id}<br><strong>${t.piradsValueLabel}:</strong> <span class=\"pirads-badge\" style=\"background:${badgeColor};color:${badgeTextColor};\">${lesion.pirads}</span></li>`;
      }
      html += '</ul>';
    }
    return html;
  }

  private _showZonePopup(targetEl: Element, lesions: Lesion[] = []) {
    const popup = this._ensureZonePopup();
    if (!popup) return;
    const zoneId = targetEl.id || undefined;
    this._renderZonePopupContent(lesions, zoneId);

    // Shoelace popup usually exposes a `show(reference)` method
    try {
      // Prefer setting the popup's anchor property and activating it via the
      // `active` attribute/property per Shoelace docs. This is more reliable
      // than assuming show()/hide() exist on the element across versions.
      const p = popup as unknown as { show?: (ref: Element) => void; hide?: () => void; anchor?: unknown; active?: boolean; setAttribute?: (k: string, v: string) => void };
      console.debug('[ProstateMriMap] attempting to activate sl-popup', { popup: p, target: targetEl });

      // Set the anchor to the target element so positioning can work.
      try {
        // prefer property assignment when available
        // @ts-ignore - anchor is a documented property
        p.anchor = targetEl;
      } catch (_e) {
        try {
          // fallback: set anchor attribute to id if present
          if (targetEl.id) p.setAttribute?.('anchor', targetEl.id);
        } catch (_e2) {
          /* ignore */
        }
      }

      // Try calling show() if present; otherwise use the active property/attribute
      if (typeof p.show === 'function') {
        p.show!(targetEl);
        console.debug('[ProstateMriMap] called sl-popup.show()', { popup: p, target: targetEl });
      } else {
        try {
          // @ts-ignore - active is a documented property
          p.active = true;
          p.setAttribute?.('active', '');
          console.debug('[ProstateMriMap] set sl-popup.active and attribute', { popup: p, target: targetEl });
        } catch (err) {
          console.debug('[ProstateMriMap] could not set active on sl-popup', err);
        }
      }

      // Post-activation diagnostics: allow positioning to settle then inspect
      setTimeout(() => {
        try {
          const el = popup as unknown as HTMLElement;
          const rect = el.getBoundingClientRect();
          const cs = (globalThis as unknown as Window).getComputedStyle?.(el) ?? null;
          console.debug('[ProstateMriMap] post-activate sl-popup rect & style', { rect, display: cs?.display, visibility: cs?.visibility, opacity: cs?.opacity });
          if ((rect.width === 0 && rect.height === 0) || cs?.display === 'none' || cs?.visibility === 'hidden' || Number(cs?.opacity) === 0) {
            console.warn('[ProstateMriMap] sl-popup appears invisible after activate; forcing display and high z-index');
            try { el.setAttribute('active', ''); } catch (e) { console.debug('[ProstateMriMap] could not set active attribute', e); }
            try { el.style.display = 'block'; el.style.zIndex = '99999'; } catch (e) { console.debug('[ProstateMriMap] could not force display/zIndex', e); }
          }
        } catch (err) {
          console.debug('[ProstateMriMap] error during post-activate diagnostics', err);
        }
      }, 50);

      return;
    } catch (err) {
      console.debug('[ProstateMriMap] sl-popup activation attempt failed', err);
      return;
    }
  }

  private _hideZonePopup() {
    if (!this._zonePopup) return;
    try {
      const p = this._zonePopup as unknown as { hide?: () => void; removeAttribute?: (k: string) => void; active?: boolean };
      console.debug('[ProstateMriMap] hiding sl-popup', p);
      if (typeof p.hide === 'function') {
        p.hide();
        console.debug('[ProstateMriMap] called sl-popup.hide()');
      } else {
        try {
          // @ts-ignore - active is a documented property
          p.active = false;
          p.removeAttribute?.('active');
          console.debug('[ProstateMriMap] removed active attribute from sl-popup');
        } catch (e) {
          console.debug('[ProstateMriMap] error clearing active attribute for sl-popup', e);
        }
      }
    } catch (_err) {
      console.debug('[ProstateMriMap] error while hiding sl-popup', _err);
    }
  }

  private _dispatchZoneClick(
    zoneId: string,
    lesions: ProstateMriData["lesions"] | [],
  ) {
    const ev = new CustomEvent("zone-click", {
      detail: { zoneId, lesions },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(ev);
  }
  // detail panel methods removed; anchored popup is used instead

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "data" && newValue) {
      try {
        const parsed = JSON.parse(newValue);
        const res = validateLesionData(parsed);
        if (res.warnings.length) this._dispatchWarning(res.warnings);
        this.data = res.validData ?? null;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        this._dispatchWarning([`Failed to parse data attribute: ${msg}`]);
      }
    }
    if (name === "language") this.language = newValue || "en";
  }

  get data() {
    return this._data;
  }
  set data(v: ProstateMriData | null) {
    if (v) {
      const res = validateLesionData(v as unknown);
      if (res.warnings.length) this._dispatchWarning(res.warnings);
      this._data = res.validData ?? null;
    } else this._data = null;
    this._render();
    // ensure styles are applied after data updates so slotted SVG reflects
    // the new computed zone state immediately
    this._applyStylesToSlottedSvg();
  }

  get language() {
    return this._language;
  }
  set language(v: string) {
    this._language = v;
    this._render();
  }

  private _dispatchWarning(warnings: string[]) {
    const ev = new CustomEvent("data-warning", {
      detail: { warnings },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(ev);
    const el = this.shadow.getElementById("warnings");
    if (el) el.textContent = warnings.join("; ");
  }

  private _render() {
    const el = this.shadow.querySelector(".map");
    if (!el) return;
    if (this._data) el.setAttribute("data-loaded", "true");
    else el.removeAttribute("data-loaded");
    this._renderLegend();
  }

  private _renderLegend() {
    const lang = this.language || "en";
    const t = translations[lang as keyof typeof translations] ||
      translations.en;
    const legendEl = this.shadow.getElementById("legend");
    if (!legendEl) return;
    legendEl.innerHTML = "";

    // Title
    const title = document.createElement("h3");
    title.textContent = t.legendTitle;
    legendEl.appendChild(title);

    // PI-RADS colors
    const piradsSection = document.createElement("div");
    const piradsTitle = document.createElement("h4");
    piradsTitle.textContent = t.piradsLabel;
    piradsSection.appendChild(piradsTitle);
    for (let i = 1; i <= 5; i++) {
      const color = getPiradsColor(i);
      const item = document.createElement("div");
      const swatch = document.createElement("span");
      swatch.style.backgroundColor = color;
      swatch.style.width = "20px";
      swatch.style.height = "20px";
      swatch.style.display = "inline-block";
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(` ${i}`));
      piradsSection.appendChild(item);
    }
    legendEl.appendChild(piradsSection);

  }
}

declare global {
  interface Window {
    ProstateMriMap: typeof ProstateMriMap;
  }
  interface HTMLElementTagNameMap {
    "prostate-mri-map": ProstateMriMap;
  }
}

if (!customElements.get("prostate-mri-map")) {
  customElements.define("prostate-mri-map", ProstateMriMap);
}

export default ProstateMriMap;
