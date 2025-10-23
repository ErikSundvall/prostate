// Minimal Web Component scaffold for prostate-mri-map
import type { ProstateMriData } from "../types.ts";

class ProstateMriMap extends HTMLElement {
  private _data: ProstateMriData | null = null;
  private _language = "en";

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>
        :host { display:block; font-family: system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial; }
      </style>
      <div id="root">Prostate MRI Map (placeholder)</div>
    `;
  }

  static get observedAttributes() {
    return ["language", "data"];
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null,
  ) {
    if (name === "language" && newValue) this.language = newValue;
    if (name === "data" && newValue) {
      try {
        const parsed = JSON.parse(newValue);
        this.data = parsed;
      } catch {
        // ignore parse errors for now
      }
    }
  }

  connectedCallback() {
    // placeholder
  }

  disconnectedCallback() {
    // cleanup
  }

  get language() {
    return this._language;
  }
  set language(v: string) {
    this._language = v; /* re-render if needed */
  }

  get data() {
    return this._data;
  }
  set data(v: unknown) {
    // Accept unknown here; will validate/normalize via utils when implemented
    this._data = (v as ProstateMriData) ??
      null; /* validate and render in future */
  }
}

customElements.define("prostate-mri-map", ProstateMriMap);

export default ProstateMriMap;
