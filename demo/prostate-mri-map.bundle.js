// src/types.ts
var CANONICAL_ZONES = (() => {
  const zones = [];
  for (let g = 1; g <= 4; g++) {
    for (const letter of [
      "A",
      "B",
      "C"
    ]) {
      for (const suffix of [
        "v",
        "d"
      ]) {
        zones.push(`${g}${letter}${suffix}`);
      }
    }
  }
  return zones;
})();

// src/utils/data-schema.ts
function normalizeZoneId(id) {
  return id.trim().replace(/\s+/g, "").toUpperCase().replace(/V$/i, "v").replace(/D$/i, "d");
}
function validateLesionData(raw) {
  const warnings = [];
  if (!raw || typeof raw !== "object") {
    warnings.push("Data must be an object");
    return {
      warnings
    };
  }
  const obj = raw;
  if (!Array.isArray(obj["lesions"])) {
    warnings.push("Missing or invalid 'lesions' array");
    return {
      warnings
    };
  }
  const lesionsRaw = obj["lesions"];
  const lesions = [];
  for (const l of lesionsRaw) {
    if (!l || typeof l !== "object") {
      warnings.push("Invalid lesion entry (not an object)");
      continue;
    }
    const rec = l;
    const id = String(rec.id ?? "").trim();
    if (!id) {
      warnings.push("Lesion missing id");
      continue;
    }
    const pirads = Number(rec.pirads ?? NaN);
    if (!Number.isInteger(pirads) || pirads < 1 || pirads > 5) {
      warnings.push(`Lesion ${id} has invalid pirads '${rec.pirads}'`);
    }
    let zones = [];
    if (Array.isArray(rec.zones)) {
      zones = rec.zones.map((z) => normalizeZoneId(String(z)));
    } else if (typeof rec.zones === "string") {
      zones = [
        normalizeZoneId(rec.zones)
      ];
    }
    const validZones = [];
    for (const z of zones) {
      if (CANONICAL_ZONES.includes(z)) validZones.push(z);
      else warnings.push(`Lesion ${id} references invalid zone '${z}'`);
    }
    const deduped = Array.from(new Set(validZones));
    lesions.push({
      id,
      pirads,
      zones: deduped,
      details: rec.details
    });
  }
  const validData = {
    lesions
  };
  return {
    validData,
    warnings
  };
}

// src/utils/palette-and-patterns.ts
var PI_RADS_COLORS = {
  5: "#A50F15",
  4: "#DE2D26",
  3: "#FB6A4A",
  2: "#FD8D3C",
  1: "#FFFFB2"
};
function getPiradsColor(p) {
  return PI_RADS_COLORS[Math.min(5, Math.max(1, Math.round(p)))];
}
function computeZoneState(lesions = {}) {
  const result = {};
  for (const z of CANONICAL_ZONES) {
    result[z] = {
      highestPirads: null,
      lesionIds: [],
      count: 0
    };
  }
  for (const lesion of lesions) {
    const id = lesion.id;
    const p = Number(lesion.pirads) || 0;
    for (const zone of lesion.zones || []) {
      if (!result[zone]) {
        result[zone] = {
          highestPirads: null,
          lesionIds: [],
          count: 0
        };
      }
      const st = result[zone];
      st.lesionIds.push(id);
      st.count = st.lesionIds.length;
      if (st.highestPirads === null || p > st.highestPirads) st.highestPirads = p;
    }
  }
  return result;
}
function applyZoneStyles(root, zoneState) {
  if (!root) return;
  console.log("palette-and-patterns.ts applyZoneStyles:", zoneState);
  for (const zoneId of Object.keys(zoneState)) {
    try {
      const safeId = String(zoneId || "").replace(/"/g, '\\"');
      const selector = `[id="${safeId}"]`;
      let el = null;
      try {
        el = root.querySelector(selector);
      } catch {
        el = null;
      }
      if (!el) {
        const maybeRoot = root;
        if (typeof maybeRoot.querySelectorAll === "function") {
          const nodes = maybeRoot.querySelectorAll("[id]");
          for (const n of Array.from(nodes)) {
            if (n.getAttribute("id") === zoneId) {
              el = n;
              break;
            }
          }
        } else if (maybeRoot.elements && typeof maybeRoot.elements === "object") {
          for (const candidate of Object.values(maybeRoot.elements)) {
            const attrId = candidate && typeof candidate.getAttribute === "function" ? candidate.getAttribute("id") : null;
            const propId = candidate?.id ?? null;
            if (attrId === zoneId || propId === zoneId) {
              el = candidate;
              break;
            }
          }
        }
      }
      if (!el) continue;
      const st = zoneState[zoneId];
      if (st.highestPirads === null) {
        el.setAttribute("fill", "none");
        el.removeAttribute("data-pirads");
        el.removeAttribute("data-patterns");
      } else {
        el.setAttribute("fill", getPiradsColor(st.highestPirads));
        el.setAttribute("data-pirads", String(st.highestPirads));
        if (st.count > 1) {
          const patterns = st.lesionIds.map(getPatternId).join(" ");
          el.setAttribute("data-patterns", patterns);
          try {
            ensurePatternDefs(root, st.lesionIds);
            const overlayParent = el.parentElement || root.querySelector && root.querySelector("#zones") || root;
            try {
              const selector2 = `[data-overlay-for="${zoneId}"]`;
              const existingAll = overlayParent && typeof overlayParent.querySelectorAll === "function" ? overlayParent.querySelectorAll(selector2) : root.querySelectorAll(selector2);
              for (const ex of Array.from(existingAll || [])) {
                if (ex.parentNode) ex.parentNode.removeChild(ex);
              }
            } catch {
            }
            const canClone = typeof el.cloneNode === "function";
            const maker = root.ownerDocument && typeof root.ownerDocument.createElementNS === "function" ? root.ownerDocument.createElementNS.bind(root.ownerDocument) : typeof root.createElementNS === "function" ? root.createElementNS.bind(root) : null;
            const insertBeforeSibling = () => {
              if (!overlayParent || !el.parentNode) return null;
              let anchor = el.nextSibling;
              while (anchor) {
                if (anchor.nodeType === 1 && anchor.getAttribute("data-overlay-for") === zoneId) {
                  anchor = anchor.nextSibling;
                  continue;
                }
                break;
              }
              return anchor;
            };
            if (canClone && overlayParent) {
              const anchor = insertBeforeSibling();
              for (let i = 0; i < st.lesionIds.length; i++) {
                const lid = st.lesionIds[i];
                const pid = getPatternId(lid);
                const overlay = el.cloneNode(false);
                overlay.removeAttribute("id");
                overlay.removeAttribute("data-pirads");
                overlay.removeAttribute("data-patterns");
                overlay.removeAttribute("tabindex");
                overlay.setAttribute("class", `${(overlay.getAttribute("class") || "").replace(/\bzone\b/g, "").trim()} zone-overlay`.trim());
                overlay.setAttribute("fill", `url(#${pid})`);
                overlay.setAttribute("stroke", "none");
                overlay.setAttribute("opacity", String(Math.max(0.2, 0.7 - i * 0.2)));
                overlay.setAttribute("data-overlay-for", zoneId);
                overlay.setAttribute("data-overlay-index", String(i));
                overlay.setAttribute("data-pattern-id", pid);
                overlay.setAttribute("pointer-events", "none");
                if (anchor) {
                  overlayParent.insertBefore(overlay, anchor);
                } else {
                  overlayParent.appendChild?.(overlay);
                }
              }
            } else if (maker) {
              for (let i = 0; i < st.lesionIds.length; i++) {
                const lid = st.lesionIds[i];
                const pid = getPatternId(lid);
                const use = maker("http://www.w3.org/2000/svg", "use");
                try {
                  use.setAttribute("href", `#${zoneId}`);
                } catch {
                  use.setAttribute("xlink:href", `#${zoneId}`);
                }
                use.setAttribute("fill", `url(#${pid})`);
                use.setAttribute("opacity", String(Math.max(0.2, 0.7 - i * 0.2)));
                use.setAttribute("data-overlay-for", zoneId);
                use.setAttribute("data-overlay-index", String(i));
                use.setAttribute("data-pattern-id", pid);
                use.setAttribute("pointer-events", "none");
                overlayParent.appendChild?.(use);
              }
            }
          } catch {
          }
        } else {
          el.removeAttribute("data-patterns");
          const existing = root.querySelector(`use[data-overlay-for="${zoneId}"]`);
          if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }
      }
    } catch (err) {
      console.warn(`applyZoneStyles: skipped ${zoneId} \u2014 ${err}`);
    }
  }
}
function getPatternId(lesionId) {
  return `pattern-${String(lesionId).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function renderZoneBadges(root, zoneState) {
  if (!root || typeof root.createElementNS !== "function") return;
  const SVG_NS = "http://www.w3.org/2000/svg";
  for (const zoneId of Object.keys(zoneState)) {
    const st = zoneState[zoneId];
    try {
      const selector = `[id="${String(zoneId).replace(/"/g, '\\"')}"]`;
      let zoneEl = null;
      try {
        zoneEl = root.querySelector(selector);
      } catch {
        zoneEl = null;
      }
      if (!zoneEl) continue;
      const badgeSelector = `g.badge[data-badge-for="${zoneId}"]`;
      let badge = root.querySelector(badgeSelector);
      if (st.count > 0) {
        let cx = 0, cy = 0;
        try {
          const bbox = zoneEl.getBBox();
          cx = bbox.x + bbox.width - 6;
          cy = bbox.y + 6;
        } catch {
          cx = 6;
          cy = 6;
        }
        if (!badge) {
          const maker = root.ownerDocument && typeof root.ownerDocument.createElementNS === "function" ? root.ownerDocument.createElementNS.bind(root.ownerDocument) : typeof root.createElementNS === "function" ? root.createElementNS.bind(root) : null;
          if (!maker) continue;
          badge = maker(SVG_NS, "g");
          badge.setAttribute("class", "badge");
          badge.setAttribute("data-badge-for", zoneId);
          const circle = maker(SVG_NS, "circle");
          circle.setAttribute("r", "8");
          circle.setAttribute("cx", String(cx));
          circle.setAttribute("cy", String(cy));
          circle.setAttribute("fill", "#ffffff");
          circle.setAttribute("stroke", "#000000");
          circle.setAttribute("stroke-width", "1");
          const text = maker(SVG_NS, "text");
          text.setAttribute("x", String(cx));
          text.setAttribute("y", String(cy + 4));
          text.setAttribute("text-anchor", "middle");
          text.setAttribute("font-size", "10");
          text.setAttribute("fill", "#000");
          text.setAttribute("data-count", String(st.count));
          text.textContent = String(st.count);
          badge.appendChild(circle);
          badge.appendChild(text);
          root.appendChild?.(badge);
        } else {
          const text = badge.querySelector("text");
          if (text) {
            text.textContent = String(st.count);
            text.setAttribute("data-count", String(st.count));
          }
          const circle = badge.querySelector("circle");
          if (circle) {
            circle.setAttribute("cx", String(cx));
            circle.setAttribute("cy", String(cy));
          }
        }
      } else {
        if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
      }
    } catch (err) {
      console.warn(`renderZoneBadges skipped ${zoneId} \u2014 ${err}`);
    }
  }
}
function ensurePatternDefs(root, lesionIds) {
  if (!root) return;
  let defs = root.querySelector("defs");
  const maker = root.ownerDocument && typeof root.ownerDocument.createElementNS === "function" ? root.ownerDocument.createElementNS.bind(root.ownerDocument) : typeof root.createElementNS === "function" ? root.createElementNS.bind(root) : null;
  const SVG_NS = "http://www.w3.org/2000/svg";
  if (!defs && maker) {
    defs = maker(SVG_NS, "defs");
    if (defs) root.insertBefore(defs, root.firstChild);
  }
  if (!defs || !maker) return;
  for (const lid of lesionIds) {
    const pid = getPatternId(lid);
    if (defs.querySelector(`#${pid}`)) continue;
    const pattern = maker(SVG_NS, "pattern");
    pattern.setAttribute("id", pid);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");
    pattern.setAttribute("width", "20");
    pattern.setAttribute("height", "20");
    const rect = maker(SVG_NS, "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("width", "20");
    rect.setAttribute("height", "20");
    rect.setAttribute("fill", "none");
    const path = maker(SVG_NS, "path");
    path.setAttribute("d", "M0 20 L20 0");
    path.setAttribute("stroke", "#000");
    path.setAttribute("stroke-opacity", "0.9");
    path.setAttribute("stroke-width", "2");
    pattern.appendChild(rect);
    pattern.appendChild(path);
    defs.appendChild(pattern);
  }
}

// src/components/prostate-mri-map.ts
var template = document.createElement("template");
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
var ProstateMriMap = class extends HTMLElement {
  static get observedAttributes() {
    return [
      "language",
      "data",
      "theme"
    ];
  }
  shadow;
  _data = null;
  constructor() {
    super();
    this.shadow = this.attachShadow({
      mode: "open"
    });
    this.shadow.appendChild(template.content.cloneNode(true));
    this._onSlotChange = this._onSlotChange.bind(this);
    this._onZoneClick = this._onZoneClick.bind(this);
    this._onZoneKeydown = this._onZoneKeydown.bind(this);
  }
  connectedCallback() {
    this._render();
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (slot) slot.addEventListener("slotchange", this._onSlotChange);
    this._wireSlottedZones();
  }
  disconnectedCallback() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (slot) slot.removeEventListener("slotchange", this._onSlotChange);
    this._unwireSlottedZones();
  }
  // --- zone interaction plumbing ---
  _onSlotChange() {
    this._wireSlottedZones();
  }
  _wireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    slot.addEventListener("slotchange", () => {
      const nodes = slot.assignedElements({
        flatten: true
      });
      nodes.forEach((node) => {
        node.querySelectorAll(".zone").forEach((z) => {
          z.setAttribute("tabindex", "0");
          z.addEventListener("click", (ev) => this._onZoneClick(ev));
          z.addEventListener("keydown", (ev) => {
            if (ev.key === "Enter" || ev.key === " ") {
              ev.preventDefault();
              this._onZoneKeydown(ev);
            }
          });
        });
      });
      this._applyStylesToSlottedSvg();
    });
  }
  /**
   * Find any slotted SVG root(s) and apply computed zone styles to them.
   * This calls into the utilities `computeZoneState` and `applyZoneStyles`.
   */
  _applyStylesToSlottedSvg() {
    try {
      const slot = this.shadow.querySelector('slot[name="map-svg"]');
      if (!slot) return;
      const nodes = slot.assignedNodes({
        flatten: true
      });
      const lesions = Array.isArray(this._data?.lesions) ? this._data.lesions : [];
      const zoneState = computeZoneState(lesions);
      for (const node of nodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        const el = node;
        let svgRoot = null;
        if (el.tagName && el.tagName.toLowerCase() === "svg") {
          svgRoot = el;
        } else {
          svgRoot = el.querySelector("svg");
        }
        if (svgRoot) {
          applyZoneStyles(svgRoot, zoneState);
          try {
            renderZoneBadges(svgRoot, zoneState);
          } catch {
          }
        }
      }
    } catch (err) {
      this._dispatchWarning([
        `applyStyles failed: ${String(err)}`
      ]);
    }
  }
  _unwireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    const nodes = slot.assignedNodes({
      flatten: true
    });
    for (const n of nodes) {
      if (n.nodeType === Node.ELEMENT_NODE) {
        const el = n;
        const zoneShapes = Array.from(el.querySelectorAll("[id]"));
        for (const shape of zoneShapes) {
          shape.removeEventListener("click", this._onZoneClick);
          shape.removeEventListener("keydown", this._onZoneKeydown);
        }
      }
    }
  }
  _onZoneClick(e) {
    const target = e.currentTarget;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId) return;
    this._dispatchZoneClick(zoneId, []);
  }
  _onZoneKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const target = e.currentTarget;
      if (!target) return;
      const zoneId = target.id || null;
      if (!zoneId) return;
      this._dispatchZoneClick(zoneId, []);
    }
  }
  _dispatchZoneClick(zoneId, lesions) {
    const ev = new CustomEvent("zone-click", {
      detail: {
        zoneId,
        lesions
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(ev);
  }
  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "data" && newValue) {
      try {
        const parsed = JSON.parse(newValue);
        const res = validateLesionData(parsed);
        if (res.warnings.length) this._dispatchWarning(res.warnings);
        this.data = res.validData ?? null;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        this._dispatchWarning([
          `Failed to parse data attribute: ${msg}`
        ]);
      }
    }
    if (name === "language") this._render();
  }
  get data() {
    return this._data;
  }
  set data(v) {
    if (v) {
      const res = validateLesionData(v);
      if (res.warnings.length) this._dispatchWarning(res.warnings);
      this._data = res.validData ?? null;
    } else this._data = null;
    this._render();
    this._applyStylesToSlottedSvg();
  }
  _dispatchWarning(warnings) {
    const ev = new CustomEvent("data-warning", {
      detail: {
        warnings
      },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(ev);
    const el = this.shadow.getElementById("warnings");
    if (el) el.textContent = warnings.join("; ");
  }
  _render() {
    const el = this.shadow.querySelector(".map");
    if (!el) return;
    if (this._data) el.setAttribute("data-loaded", "true");
    else el.removeAttribute("data-loaded");
  }
};
if (!customElements.get("prostate-mri-map")) {
  customElements.define("prostate-mri-map", ProstateMriMap);
}
var prostate_mri_map_default = ProstateMriMap;
export {
  ProstateMriMap,
  prostate_mri_map_default as default
};
