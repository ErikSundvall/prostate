/// <reference lib="dom" />
import type { ProstateMriData } from "../types.ts";

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
    const slot = this.shadow.querySelector('slot[name="map-svg"]') as
      | HTMLSlotElement
      | null;
    if (!slot) return;
    const nodes = slot.assignedNodes({ flatten: true }) as Node[];
    // find any SVG elements inside assigned nodes
    const svgs: SVGElement[] = [];
    for (const n of nodes) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        const el = n as Element;
        const tag = (el.tagName || "").toLowerCase();
        if (tag === "svg") svgs.push(el as unknown as SVGElement);
        else {svgs.push(
            ...Array.from(
              el.querySelectorAll("svg"),
            ) as unknown as SVGElement[],
          );}
      }
    }
    // For each svg, attach attributes and listeners to zone shapes with IDs
    for (const svg of svgs) {
      const zoneShapes = Array.from(svg.querySelectorAll("[id]")) as Element[];
      for (const shape of zoneShapes) {
        const id = (shape as Element).id;
        if (!id) continue;
        // make interactive
        (shape as HTMLElement).setAttribute("tabindex", "0");
        (shape as HTMLElement).setAttribute("role", "button");
        if (!(shape as Element).getAttribute("aria-label")) {
          (shape as Element).setAttribute("aria-label", `Zone ${id}`);
        }
        shape.addEventListener("click", this._onZoneClick as EventListener);
        shape.addEventListener("keydown", this._onZoneKeydown as EventListener);
      }
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
        this.data = parsed as ProstateMriData;
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
    this._data = v;
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
