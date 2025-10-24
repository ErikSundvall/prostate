/// <reference lib="dom" />
import type { ProstateMriData } from "../types.ts";
import { validateLesionData } from "../utils/data-schema.ts";
import { computeZoneState, applyZoneStyles } from "../utils/palette-and-patterns.ts";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host { display:block; }
    .map { width:100%; height:auto; }
    #warnings { color: var(--pirads-5, #A50F15); margin-top:0.5rem; font-size:0.9rem; }
  </style>
  <div class="map" part="map">
    <slot name="map-svg"></slot>
    <div id="warnings" aria-live="polite"></div>
  </div>
`;

export class ProstateMriMap extends HTMLElement {
  static get observedAttributes() {
    return ["language", "data", "theme"];
  }

  private shadow: ShadowRoot;
  private _data: ProstateMriData | null = null;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    // bind handlers
    this._onSlotChange = this._onSlotChange.bind(this);
    this._onZoneClick = this._onZoneClick.bind(this);
    this._onZoneKeydown = this._onZoneKeydown.bind(this);
  }

  connectedCallback() {
    this._render();
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.addEventListener("slotchange", this._onSlotChange);
    // initial attempt to wire slotted content if already present
    this._wireSlottedZones();
  }
  disconnectedCallback() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (slot) slot.removeEventListener("slotchange", this._onSlotChange);
    this._unwireSlottedZones();
  }

  // --- zone interaction plumbing ---
  private _onSlotChange() {
    this._wireSlottedZones();
  }

  private _wireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as HTMLSlotElement | null;
    if (!slot) return;
      slot.addEventListener('slotchange', () => {
        // forward clicks and keyboard events from slotted SVG shapes
        const nodes = slot.assignedElements({ flatten: true });
        nodes.forEach(node => {
          node.querySelectorAll('.zone').forEach((z: Element) => {
            z.setAttribute('tabindex', '0');
            // wire click and keyboard handlers to existing methods
            z.addEventListener('click', (ev) => this._onZoneClick(ev as unknown as Event));
            z.addEventListener('keydown', (ev: KeyboardEvent) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault();
                this._onZoneKeydown(ev);
              }
            });
          });
        });

        // After slot content changes, re-apply computed styles to the slotted SVG
        // so the visualization stays in sync with `this._data`.
        this._applyStylesToSlottedSvg();
      });
    }

  /**
   * Find any slotted SVG root(s) and apply computed zone styles to them.
   * This calls into the utilities `computeZoneState` and `applyZoneStyles`.
   */
  private _applyStylesToSlottedSvg(): void {
    try {
      const slot = this.shadow.querySelector('slot[name="map-svg"]') as HTMLSlotElement | null;
      if (!slot) return;
      const nodes = slot.assignedNodes({ flatten: true });
      const lesions = Array.isArray(this._data?.lesions) ? this._data.lesions : [];
      const zoneState = computeZoneState(lesions);
      for (const node of nodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const el = node as Element;
        // If the slotted node is the svg root itself, use it, otherwise look
        // for an <svg> descendant.
        let svgRoot: Element | null = null;
        if (el.tagName && el.tagName.toLowerCase() === 'svg') {
          svgRoot = el;
        } else {
          svgRoot = el.querySelector('svg');
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
    const nodes = slot.assignedNodes({ flatten: true }) as Node[];
    for (const n of nodes) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        const el = n as Element;
        const zoneShapes = Array.from(el.querySelectorAll("[id]")) as Element[];
        for (const shape of zoneShapes) {
          shape.removeEventListener(
            "click",
            this._onZoneClick as EventListener,
          );
          shape.removeEventListener(
            "keydown",
            this._onZoneKeydown as EventListener,
          );
        }
      }
    }
  }

  private _onZoneClick(e: Event) {
    const target = e.currentTarget as Element | null;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId) return;
    this._dispatchZoneClick(zoneId, []);
  }

  private _onZoneKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const target = e.currentTarget as Element | null;
      if (!target) return;
      const zoneId = target.id || null;
      if (!zoneId) return;
      this._dispatchZoneClick(zoneId, []);
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
    if (name === "language") this._render();
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
