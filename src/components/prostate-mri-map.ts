/// <reference lib="dom" />
import * as d3 from "d3";
import type { ProstateMriData, Lesion } from "../types.ts";
import { CANONICAL_ZONES } from "../types.ts";
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
    #detail-panel { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; z-index: 1000; }
    #detail-panel.show { display: flex; align-items: center; justify-content: center; }
    #detail-content { background: white; border: 1px solid #ccc; border-radius: 4px; padding: 1rem; max-width: 500px; max-height: 80vh; overflow-y: auto; }
    #detail-content h3 { margin-top: 0; }
    #detail-content ul { list-style: none; padding: 0; }
    #detail-content li { margin-bottom: 0.5rem; }
    #detail-close { position: absolute; top: 0.5rem; right: 0.5rem; background: none; border: none; font-size: 1.5rem; cursor: pointer; }
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
    <div id="detail-panel">
      <div id="detail-content" role="dialog" aria-modal="true">
        <button id="detail-close" aria-label="Close">&times;</button>
        <h3 id="detail-title"></h3>
        <ul id="detail-lesions"></ul>
      </div>
    </div>
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
  private _activePatterns: Set<string> = new Set();

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    // bind handlers
    this._onSlotChange = this._onSlotChange.bind(this);
    this._onZoneClick = this._onZoneClick.bind(this);
    this._onZoneKeydown = this._onZoneKeydown.bind(this);
    this._onZoneMouseEnter = this._onZoneMouseEnter.bind(this);
    this._onZoneMouseLeave = this._onZoneMouseLeave.bind(this);
    this._onZoneFocus = this._onZoneFocus.bind(this);
    this._onZoneBlur = this._onZoneBlur.bind(this);
    this._onPanelClose = this._onPanelClose.bind(this);
    this._onPanelKeydown = this._onPanelKeydown.bind(this);
    this._onFocusIn = this._onFocusIn.bind(this);
  }

  connectedCallback() {
    this._render();
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.addEventListener("slotchange", this._onSlotChange);
    // panel event listeners
    const panel = this.shadow.querySelector('#detail-panel') as HTMLElement;
    const closeBtn = this.shadow.querySelector('#detail-close') as HTMLElement;
    closeBtn.addEventListener('click', this._onPanelClose);
    panel.addEventListener('click', (e) => { if (e.target === panel) this._onPanelClose(); });
    this.shadow.addEventListener('keydown', this._onPanelKeydown);
    // initial attempt to wire slotted content if already present
    this._wireSlottedZones();
    this._applyStylesToSlottedSvg();
  }
  disconnectedCallback() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.removeEventListener("slotchange", this._onSlotChange);
    const panel = this.shadow.querySelector('#detail-panel') as HTMLElement;
    const closeBtn = this.shadow.querySelector('#detail-close') as HTMLElement;
    closeBtn.removeEventListener('click', this._onPanelClose);
    panel.removeEventListener('click', this._onPanelClose);
    this.shadow.removeEventListener('keydown', this._onPanelKeydown);
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
        })
        .on("mouseenter.zone-interaction", (event: Event) => {
          this._onZoneMouseEnter(event);
        })
        .on("mouseleave.zone-interaction", (event: Event) => {
          this._onZoneMouseLeave(event);
        })
        .on("focus.zone-interaction", (event: Event) => {
          this._onZoneFocus(event);
        })
        .on("blur.zone-interaction", (event: Event) => {
          this._onZoneBlur(event);
        });

      // Also wire elements with canonical zone IDs, even if they don't have class="zone"
      for (const zoneId of CANONICAL_ZONES) {
        const zoneElement = svgRoot.querySelector(`[id="${zoneId}"]`) as SVGElement;
        if (zoneElement && !zoneElement.classList.contains("zone")) {
          d3.select(zoneElement)
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
            })
            .on("mouseenter.zone-interaction", (event: Event) => {
              this._onZoneMouseEnter(event);
            })
            .on("mouseleave.zone-interaction", (event: Event) => {
              this._onZoneMouseLeave(event);
            })
            .on("focus.zone-interaction", (event: Event) => {
              this._onZoneFocus(event);
            })
            .on("blur.zone-interaction", (event: Event) => {
              this._onZoneBlur(event);
            });
        }
      }
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
          // Render badges (counts) after applying fills/patterns
          // REMOVED per PRD 0002: Remove badge/number display from zone visualization
          // try {
          //   renderZoneBadges(svgRoot, zoneState);
          // } catch {
          //   // non-fatal
          // }
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
    }
  }

  private _onZoneClick(e: Event) {
    const target = e.currentTarget as Element | null;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId) return;
    const lesions = this._data?.lesions.filter(l => l.zones.includes(zoneId)) || [];
    this._showDetailPanel(zoneId, lesions);
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
      this._showDetailPanel(zoneId, lesions);
      this._dispatchZoneClick(zoneId, lesions);
    }
  }

  private _onZoneMouseEnter(e: Event) {
    const target = e.currentTarget as Element | null;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId || !this._data?.lesions) return;

    // Get lesions affecting this zone
    const lesions = this._data.lesions.filter(l => l.zones.includes(zoneId));
    if (lesions.length === 0) return;

    // Find all zones covered by these lesions
    const affectedZones = new Set<string>();
    for (const lesion of lesions) {
      for (const z of lesion.zones) {
        affectedZones.add(z);
      }
    }

    // Clear previous patterns
    this._clearActivePatterns();

    // Apply patterns to all affected zones by changing their fill
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as HTMLSlotElement | null;
    if (!slot) return;
    const assigned = slot.assignedElements({ flatten: true });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (!svgRoot) continue;

      for (const affectedZoneId of affectedZones) {
        const zoneEl = svgRoot.querySelector(`#${CSS.escape(affectedZoneId)}`);
        if (!zoneEl) continue;

        // Store original fill
        const originalFill = zoneEl.getAttribute("fill");
        if (originalFill) {
          zoneEl.setAttribute("data-original-fill", originalFill);
        }

        // Get pattern IDs for this zone
        const patternIds = zoneEl.getAttribute("data-patterns");
        if (patternIds) {
          // Use the first pattern (could be enhanced to show multiple)
          const firstPatternId = patternIds.split(" ")[0];
          zoneEl.setAttribute("fill", `url(#${firstPatternId})`);
          this._activePatterns.add(affectedZoneId);
        }
      }
    }
  }

  private _onZoneMouseLeave(_e: Event) {
    this._clearActivePatterns();
  }

  private _onZoneFocus(e: Event) {
    // Treat focus like mouse enter
    this._onZoneMouseEnter(e);
  }

  private _onZoneBlur(_e: Event) {
    // Treat blur like mouse leave
    this._clearActivePatterns();
  }

  private _clearActivePatterns() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as HTMLSlotElement | null;
    if (!slot) return;
    const assigned = slot.assignedElements({ flatten: true });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (svgRoot) {
        // Restore original fills for all zones with patterns
        for (const zoneId of this._activePatterns) {
          const zoneEl = svgRoot.querySelector(`#${CSS.escape(zoneId)}`);
          if (zoneEl) {
            const originalFill = zoneEl.getAttribute("data-original-fill");
            if (originalFill) {
              zoneEl.setAttribute("fill", originalFill);
              zoneEl.removeAttribute("data-original-fill");
            }
          }
        }
      }
    }
    this._activePatterns.clear();
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

  private _showDetailPanel(zoneId: string, lesions: Lesion[]) {
    this._currentZone = zoneId;
    const panel = this.shadow.querySelector('#detail-panel') as HTMLElement;
    const title = this.shadow.querySelector('#detail-title') as HTMLElement;
    const list = this.shadow.querySelector('#detail-lesions') as HTMLElement;
    const lang = (this._language === 'sv' ? 'sv' : 'en') as 'en' | 'sv';
    const t = translations[lang];
    title.textContent = `${t.zoneLabel} ${zoneId}`;
    list.innerHTML = '';
    for (const lesion of lesions) {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${t.lesionIdLabel}:</strong> ${lesion.id}<br>
        <strong>${t.piradsValueLabel}:</strong> ${lesion.pirads}<br>
        ${lesion.details?.comment ? `<strong>${t.commentLabel}:</strong> ${lesion.details.comment}<br>` : ''}
        ${lesion.details?.size_mm ? `<strong>${t.sizeLabel}:</strong> ${lesion.details.size_mm} mm<br>` : ''}
        ${lesion.details ? `<strong>${t.detailsLabel}:</strong> ${JSON.stringify(lesion.details)}` : ''}
      `;
      list.appendChild(li);
    }
    panel.classList.add('show');
    // focus the close button
    const closeBtn = this.shadow.querySelector('#detail-close') as HTMLElement;
    closeBtn.focus();
    // add focus trapping
    this._onFocusIn = this._onFocusIn.bind(this);
    this.shadow.addEventListener('focusin', this._onFocusIn);
  }

  private _hideDetailPanel() {
    this._currentZone = null;
    const panel = this.shadow.querySelector('#detail-panel') as HTMLElement;
    panel.classList.remove('show');
    this.shadow.removeEventListener('focusin', this._onFocusIn);
  }

  private _onPanelClose() {
    this._hideDetailPanel();
  }

  private _onPanelKeydown(e: Event) {
    const ke = e as KeyboardEvent;
    if (ke.key === 'Escape') {
      this._hideDetailPanel();
    }
  }

  private _onFocusIn(e: Event) {
    if (!this._currentZone) return;
    const panel = this.shadow.querySelector('#detail-content') as HTMLElement;
    const target = e.target as Element;
    if (!panel.contains(target)) {
      const closeBtn = this.shadow.querySelector('#detail-close') as HTMLElement;
      closeBtn.focus();
    }
  }

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

    // Patterns
    const patternsSection = document.createElement("div");
    const patternsTitle = document.createElement("h4");
    patternsTitle.textContent = t.patternsLabel;
    patternsSection.appendChild(patternsTitle);
    const patternKeys = [
      "patternDiagonal",
      "patternCrosshatch",
      "patternDots",
    ] as const;
    patternKeys.forEach((key, index) => {
      const item = document.createElement("div");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "40");
      svg.setAttribute("height", "20");
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs",
      );
      const pattern = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "pattern",
      );
      pattern.setAttribute("id", `legend-pattern-${index}`);
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("width", "20");
      pattern.setAttribute("height", "20");
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rect.setAttribute("width", "20");
      rect.setAttribute("height", "20");
      rect.setAttribute("fill", "none");
      pattern.appendChild(rect);
      if (index === 0) {
        const path = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path.setAttribute("d", "M0 20 L20 0");
        path.setAttribute("stroke", "#000");
        path.setAttribute("stroke-opacity", "0.85");
        path.setAttribute("stroke-width", "2");
        pattern.appendChild(path);
      } else if (index === 1) {
        const path1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path1.setAttribute("d", "M0 20 L20 0");
        path1.setAttribute("stroke", "#000");
        path1.setAttribute("stroke-opacity", "0.7");
        path1.setAttribute("stroke-width", "1.8");
        const path2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path",
        );
        path2.setAttribute("d", "M0 0 L20 20");
        path2.setAttribute("stroke", "#000");
        path2.setAttribute("stroke-opacity", "0.7");
        path2.setAttribute("stroke-width", "1.8");
        pattern.appendChild(path1);
        pattern.appendChild(path2);
      } else {
        const circle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "#000");
        circle.setAttribute("fill-opacity", "0.45");
        pattern.appendChild(circle);
      }
      defs.appendChild(pattern);
      svg.appendChild(defs);
      const rectFill = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rectFill.setAttribute("width", "40");
      rectFill.setAttribute("height", "20");
      rectFill.setAttribute("fill", `url(#legend-pattern-${index})`);
      svg.appendChild(rectFill);
      item.appendChild(svg);
      item.appendChild(document.createTextNode(` ${t[key]}`));
      patternsSection.appendChild(item);
    });
    legendEl.appendChild(patternsSection);
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
