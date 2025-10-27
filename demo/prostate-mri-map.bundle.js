// deno:https://esm.sh/d3-array@3.2.4/denonext/d3-array.mjs
function s(e30, t10) {
  return e30 == null || t10 == null ? NaN : e30 < t10 ? -1 : e30 > t10 ? 1 : e30 >= t10 ? 0 : NaN;
}
function H(e30, t10) {
  return e30 == null || t10 == null ? NaN : t10 < e30 ? -1 : t10 > e30 ? 1 : t10 >= e30 ? 0 : NaN;
}
function F(e30) {
  let t10, n13, o21;
  e30.length !== 2 ? (t10 = s, n13 = (u9, c11) => s(e30(u9), c11), o21 = (u9, c11) => e30(u9) - c11) : (t10 = e30 === s || e30 === H ? e30 : Xe, n13 = e30, o21 = e30);
  function r11(u9, c11, l9 = 0, m12 = u9.length) {
    if (l9 < m12) {
      if (t10(c11, c11) !== 0) return m12;
      do {
        let d11 = l9 + m12 >>> 1;
        n13(u9[d11], c11) < 0 ? l9 = d11 + 1 : m12 = d11;
      } while (l9 < m12);
    }
    return l9;
  }
  function f15(u9, c11, l9 = 0, m12 = u9.length) {
    if (l9 < m12) {
      if (t10(c11, c11) !== 0) return m12;
      do {
        let d11 = l9 + m12 >>> 1;
        n13(u9[d11], c11) <= 0 ? l9 = d11 + 1 : m12 = d11;
      } while (l9 < m12);
    }
    return l9;
  }
  function i9(u9, c11, l9 = 0, m12 = u9.length) {
    let d11 = r11(u9, c11, l9, m12 - 1);
    return d11 > l9 && o21(u9[d11 - 1], c11) > -o21(u9[d11], c11) ? d11 - 1 : d11;
  }
  return {
    left: r11,
    center: i9,
    right: f15
  };
}
function Xe() {
  return 0;
}
function b(e30) {
  return e30 === null ? NaN : +e30;
}
var de = F(s);
var ae = de.right;
var Ye = de.left;
var Ze = F(b).center;
var ve = me(oe);
var et = me(tt);
function me(e30) {
  return function(t10, n13, o21 = n13) {
    if (!((n13 = +n13) >= 0)) throw new RangeError("invalid rx");
    if (!((o21 = +o21) >= 0)) throw new RangeError("invalid ry");
    let { data: r11, width: f15, height: i9 } = t10;
    if (!((f15 = Math.floor(f15)) >= 0)) throw new RangeError("invalid width");
    if (!((i9 = Math.floor(i9 !== void 0 ? i9 : r11.length / f15)) >= 0)) throw new RangeError("invalid height");
    if (!f15 || !i9 || !n13 && !o21) return t10;
    let u9 = n13 && e30(n13), c11 = o21 && e30(o21), l9 = r11.slice();
    return u9 && c11 ? (N(u9, l9, r11, f15, i9), N(u9, r11, l9, f15, i9), N(u9, l9, r11, f15, i9), q(c11, r11, l9, f15, i9), q(c11, l9, r11, f15, i9), q(c11, r11, l9, f15, i9)) : u9 ? (N(u9, r11, l9, f15, i9), N(u9, l9, r11, f15, i9), N(u9, r11, l9, f15, i9)) : c11 && (q(c11, r11, l9, f15, i9), q(c11, l9, r11, f15, i9), q(c11, r11, l9, f15, i9)), t10;
  };
}
function N(e30, t10, n13, o21, r11) {
  for (let f15 = 0, i9 = o21 * r11; f15 < i9; ) e30(t10, n13, f15, f15 += o21, 1);
}
function q(e30, t10, n13, o21, r11) {
  for (let f15 = 0, i9 = o21 * r11; f15 < o21; ++f15) e30(t10, n13, f15, f15 + i9, o21);
}
function tt(e30) {
  let t10 = oe(e30);
  return (n13, o21, r11, f15, i9) => {
    r11 <<= 2, f15 <<= 2, i9 <<= 2, t10(n13, o21, r11 + 0, f15 + 0, i9), t10(n13, o21, r11 + 1, f15 + 1, i9), t10(n13, o21, r11 + 2, f15 + 2, i9), t10(n13, o21, r11 + 3, f15 + 3, i9);
  };
}
function oe(e30) {
  let t10 = Math.floor(e30);
  if (t10 === e30) return nt(e30);
  let n13 = e30 - t10, o21 = 2 * e30 + 1;
  return (r11, f15, i9, u9, c11) => {
    if (!((u9 -= c11) >= i9)) return;
    let l9 = t10 * f15[i9], m12 = c11 * t10, d11 = m12 + c11;
    for (let a11 = i9, p12 = i9 + m12; a11 < p12; a11 += c11) l9 += f15[Math.min(u9, a11)];
    for (let a11 = i9, p12 = u9; a11 <= p12; a11 += c11) l9 += f15[Math.min(u9, a11 + m12)], r11[a11] = (l9 + n13 * (f15[Math.max(i9, a11 - d11)] + f15[Math.min(u9, a11 + d11)])) / o21, l9 -= f15[Math.max(i9, a11 - m12)];
  };
}
function nt(e30) {
  let t10 = 2 * e30 + 1;
  return (n13, o21, r11, f15, i9) => {
    if (!((f15 -= i9) >= r11)) return;
    let u9 = e30 * o21[r11], c11 = i9 * e30;
    for (let l9 = r11, m12 = r11 + c11; l9 < m12; l9 += i9) u9 += o21[Math.min(f15, l9)];
    for (let l9 = r11, m12 = f15; l9 <= m12; l9 += i9) u9 += o21[Math.min(f15, l9 + c11)], n13[l9] = u9 / t10, u9 -= o21[Math.max(r11, l9 - c11)];
  };
}
var V = class {
  constructor() {
    this._partials = new Float64Array(32), this._n = 0;
  }
  add(t10) {
    let n13 = this._partials, o21 = 0;
    for (let r11 = 0; r11 < this._n && r11 < 32; r11++) {
      let f15 = n13[r11], i9 = t10 + f15, u9 = Math.abs(t10) < Math.abs(f15) ? t10 - (i9 - f15) : f15 - (i9 - t10);
      u9 && (n13[o21++] = u9), t10 = i9;
    }
    return n13[o21] = t10, this._n = o21 + 1, this;
  }
  valueOf() {
    let t10 = this._partials, n13 = this._n, o21, r11, f15, i9 = 0;
    if (n13 > 0) {
      for (i9 = t10[--n13]; n13 > 0 && (o21 = i9, r11 = t10[--n13], i9 = o21 + r11, f15 = r11 - (i9 - o21), !f15); ) ;
      n13 > 0 && (f15 < 0 && t10[n13 - 1] < 0 || f15 > 0 && t10[n13 - 1] > 0) && (r11 = f15 * 2, o21 = i9 + r11, r11 == o21 - i9 && (i9 = o21));
    }
    return i9;
  }
};
var ye = Array.prototype;
var be = ye.slice;
var un = ye.map;
var pt = Math.sqrt(50);
var xt = Math.sqrt(10);
var ht = Math.sqrt(2);
function W(e30, t10, n13) {
  let o21 = (t10 - e30) / Math.max(0, n13), r11 = Math.floor(Math.log10(o21)), f15 = o21 / Math.pow(10, r11), i9 = f15 >= pt ? 10 : f15 >= xt ? 5 : f15 >= ht ? 2 : 1, u9, c11, l9;
  return r11 < 0 ? (l9 = Math.pow(10, -r11) / i9, u9 = Math.round(e30 * l9), c11 = Math.round(t10 * l9), u9 / l9 < e30 && ++u9, c11 / l9 > t10 && --c11, l9 = -l9) : (l9 = Math.pow(10, r11) * i9, u9 = Math.round(e30 / l9), c11 = Math.round(t10 / l9), u9 * l9 < e30 && ++u9, c11 * l9 > t10 && --c11), c11 < u9 && 0.5 <= n13 && n13 < 2 ? W(e30, t10, n13 * 2) : [
    u9,
    c11,
    l9
  ];
}
function M(e30, t10, n13) {
  return t10 = +t10, e30 = +e30, n13 = +n13, W(e30, t10, n13)[2];
}
function gt(e30, t10, n13) {
  t10 = +t10, e30 = +e30, n13 = +n13;
  let o21 = t10 < e30, r11 = o21 ? M(t10, e30, n13) : M(e30, t10, n13);
  return (o21 ? -1 : 1) * (r11 < 0 ? 1 / -r11 : r11);
}
function* yt(e30) {
  for (let t10 of e30) yield* t10;
}
function Ee(e30) {
  return Array.from(yt(e30));
}
var At = Fe(Math.random);
function Fe(e30) {
  return function(n13, o21 = 0, r11 = n13.length) {
    let f15 = r11 - (o21 = +o21);
    for (; f15; ) {
      let i9 = e30() * f15-- | 0, u9 = n13[f15 + o21];
      n13[f15 + o21] = n13[i9 + o21], n13[i9 + o21] = u9;
    }
    return n13;
  };
}

// deno:https://esm.sh/d3-dispatch@3.0.1/denonext/d3-dispatch.mjs
var l = {
  value: () => {
  }
};
function s2() {
  for (var r11 = 0, t10 = arguments.length, n13 = {}, e30; r11 < t10; ++r11) {
    if (!(e30 = arguments[r11] + "") || e30 in n13 || /[\s.]/.test(e30)) throw new Error("illegal type: " + e30);
    n13[e30] = [];
  }
  return new f(n13);
}
function f(r11) {
  this._ = r11;
}
function h(r11, t10) {
  return r11.trim().split(/^|\s+/).map(function(n13) {
    var e30 = "", o21 = n13.indexOf(".");
    if (o21 >= 0 && (e30 = n13.slice(o21 + 1), n13 = n13.slice(0, o21)), n13 && !t10.hasOwnProperty(n13)) throw new Error("unknown type: " + n13);
    return {
      type: n13,
      name: e30
    };
  });
}
f.prototype = s2.prototype = {
  constructor: f,
  on: function(r11, t10) {
    var n13 = this._, e30 = h(r11 + "", n13), o21, u9 = -1, i9 = e30.length;
    if (arguments.length < 2) {
      for (; ++u9 < i9; ) if ((o21 = (r11 = e30[u9]).type) && (o21 = w(n13[o21], r11.name))) return o21;
      return;
    }
    if (t10 != null && typeof t10 != "function") throw new Error("invalid callback: " + t10);
    for (; ++u9 < i9; ) if (o21 = (r11 = e30[u9]).type) n13[o21] = a(n13[o21], r11.name, t10);
    else if (t10 == null) for (o21 in n13) n13[o21] = a(n13[o21], r11.name, null);
    return this;
  },
  copy: function() {
    var r11 = {}, t10 = this._;
    for (var n13 in t10) r11[n13] = t10[n13].slice();
    return new f(r11);
  },
  call: function(r11, t10) {
    if ((o21 = arguments.length - 2) > 0) for (var n13 = new Array(o21), e30 = 0, o21, u9; e30 < o21; ++e30) n13[e30] = arguments[e30 + 2];
    if (!this._.hasOwnProperty(r11)) throw new Error("unknown type: " + r11);
    for (u9 = this._[r11], e30 = 0, o21 = u9.length; e30 < o21; ++e30) u9[e30].value.apply(t10, n13);
  },
  apply: function(r11, t10, n13) {
    if (!this._.hasOwnProperty(r11)) throw new Error("unknown type: " + r11);
    for (var e30 = this._[r11], o21 = 0, u9 = e30.length; o21 < u9; ++o21) e30[o21].value.apply(t10, n13);
  }
};
function w(r11, t10) {
  for (var n13 = 0, e30 = r11.length, o21; n13 < e30; ++n13) if ((o21 = r11[n13]).name === t10) return o21.value;
}
function a(r11, t10, n13) {
  for (var e30 = 0, o21 = r11.length; e30 < o21; ++e30) if (r11[e30].name === t10) {
    r11[e30] = l, r11 = r11.slice(0, e30).concat(r11.slice(e30 + 1));
    break;
  }
  return n13 != null && r11.push({
    name: t10,
    value: n13
  }), r11;
}
var c = s2;

// deno:https://esm.sh/d3-selection@3.0.0/denonext/d3-selection.mjs
var E = "http://www.w3.org/1999/xhtml";
var N2 = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: E,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function x(t10) {
  var e30 = t10 += "", r11 = e30.indexOf(":");
  return r11 >= 0 && (e30 = t10.slice(0, r11)) !== "xmlns" && (t10 = t10.slice(r11 + 1)), N2.hasOwnProperty(e30) ? {
    space: N2[e30],
    local: t10
  } : t10;
}
function Vt(t10) {
  return function() {
    var e30 = this.ownerDocument, r11 = this.namespaceURI;
    return r11 === E && e30.documentElement.namespaceURI === E ? e30.createElement(t10) : e30.createElementNS(r11, t10);
  };
}
function Ft(t10) {
  return function() {
    return this.ownerDocument.createElementNS(t10.space, t10.local);
  };
}
function d(t10) {
  var e30 = x(t10);
  return (e30.local ? Ft : Vt)(e30);
}
function Bt() {
}
function g(t10) {
  return t10 == null ? Bt : function() {
    return this.querySelector(t10);
  };
}
function H2(t10) {
  typeof t10 != "function" && (t10 = g(t10));
  for (var e30 = this._groups, r11 = e30.length, i9 = new Array(r11), n13 = 0; n13 < r11; ++n13) for (var o21 = e30[n13], f15 = o21.length, l9 = i9[n13] = new Array(f15), u9, s14, c11 = 0; c11 < f15; ++c11) (u9 = o21[c11]) && (s14 = t10.call(u9, u9.__data__, c11, o21)) && ("__data__" in u9 && (s14.__data__ = u9.__data__), l9[c11] = s14);
  return new a2(i9, this._parents);
}
function v(t10) {
  return t10 == null ? [] : Array.isArray(t10) ? t10 : Array.from(t10);
}
function Mt() {
  return [];
}
function V2(t10) {
  return t10 == null ? Mt : function() {
    return this.querySelectorAll(t10);
  };
}
function Tt(t10) {
  return function() {
    return v(t10.apply(this, arguments));
  };
}
function U(t10) {
  typeof t10 == "function" ? t10 = Tt(t10) : t10 = V2(t10);
  for (var e30 = this._groups, r11 = e30.length, i9 = [], n13 = [], o21 = 0; o21 < r11; ++o21) for (var f15 = e30[o21], l9 = f15.length, u9, s14 = 0; s14 < l9; ++s14) (u9 = f15[s14]) && (i9.push(t10.call(u9, u9.__data__, s14, f15)), n13.push(u9));
  return new a2(i9, n13);
}
function F2(t10) {
  return function() {
    return this.matches(t10);
  };
}
function L(t10) {
  return function(e30) {
    return e30.matches(t10);
  };
}
var Pt = Array.prototype.find;
function qt(t10) {
  return function() {
    return Pt.call(this.children, t10);
  };
}
function Dt() {
  return this.firstElementChild;
}
function X(t10) {
  return this.select(t10 == null ? Dt : qt(typeof t10 == "function" ? t10 : L(t10)));
}
var It = Array.prototype.filter;
function Ot() {
  return Array.from(this.children);
}
function kt(t10) {
  return function() {
    return It.call(this.children, t10);
  };
}
function z(t10) {
  return this.selectAll(t10 == null ? Ot : kt(typeof t10 == "function" ? t10 : L(t10)));
}
function Y(t10) {
  typeof t10 != "function" && (t10 = F2(t10));
  for (var e30 = this._groups, r11 = e30.length, i9 = new Array(r11), n13 = 0; n13 < r11; ++n13) for (var o21 = e30[n13], f15 = o21.length, l9 = i9[n13] = [], u9, s14 = 0; s14 < f15; ++s14) (u9 = o21[s14]) && t10.call(u9, u9.__data__, s14, o21) && l9.push(u9);
  return new a2(i9, this._parents);
}
function b2(t10) {
  return new Array(t10.length);
}
function K() {
  return new a2(this._enter || this._groups.map(b2), this._parents);
}
function w2(t10, e30) {
  this.ownerDocument = t10.ownerDocument, this.namespaceURI = t10.namespaceURI, this._next = null, this._parent = t10, this.__data__ = e30;
}
w2.prototype = {
  constructor: w2,
  appendChild: function(t10) {
    return this._parent.insertBefore(t10, this._next);
  },
  insertBefore: function(t10, e30) {
    return this._parent.insertBefore(t10, e30);
  },
  querySelector: function(t10) {
    return this._parent.querySelector(t10);
  },
  querySelectorAll: function(t10) {
    return this._parent.querySelectorAll(t10);
  }
};
function G(t10) {
  return function() {
    return t10;
  };
}
function Ht(t10, e30, r11, i9, n13, o21) {
  for (var f15 = 0, l9, u9 = e30.length, s14 = o21.length; f15 < s14; ++f15) (l9 = e30[f15]) ? (l9.__data__ = o21[f15], i9[f15] = l9) : r11[f15] = new w2(t10, o21[f15]);
  for (; f15 < u9; ++f15) (l9 = e30[f15]) && (n13[f15] = l9);
}
function Ut(t10, e30, r11, i9, n13, o21, f15) {
  var l9, u9, s14 = /* @__PURE__ */ new Map(), c11 = e30.length, h9 = o21.length, m12 = new Array(c11), p12;
  for (l9 = 0; l9 < c11; ++l9) (u9 = e30[l9]) && (m12[l9] = p12 = f15.call(u9, u9.__data__, l9, e30) + "", s14.has(p12) ? n13[l9] = u9 : s14.set(p12, u9));
  for (l9 = 0; l9 < h9; ++l9) p12 = f15.call(t10, o21[l9], l9, o21) + "", (u9 = s14.get(p12)) ? (i9[l9] = u9, u9.__data__ = o21[l9], s14.delete(p12)) : r11[l9] = new w2(t10, o21[l9]);
  for (l9 = 0; l9 < c11; ++l9) (u9 = e30[l9]) && s14.get(m12[l9]) === u9 && (n13[l9] = u9);
}
function Xt(t10) {
  return t10.__data__;
}
function J(t10, e30) {
  if (!arguments.length) return Array.from(this, Xt);
  var r11 = e30 ? Ut : Ht, i9 = this._parents, n13 = this._groups;
  typeof t10 != "function" && (t10 = G(t10));
  for (var o21 = n13.length, f15 = new Array(o21), l9 = new Array(o21), u9 = new Array(o21), s14 = 0; s14 < o21; ++s14) {
    var c11 = i9[s14], h9 = n13[s14], m12 = h9.length, p12 = zt(t10.call(c11, c11 && c11.__data__, s14, i9)), _8 = p12.length, D9 = l9[s14] = new Array(_8), I9 = f15[s14] = new Array(_8), Rt3 = u9[s14] = new Array(m12);
    r11(c11, h9, D9, I9, Rt3, p12, e30);
    for (var y11 = 0, C11 = 0, O5, k10; y11 < _8; ++y11) if (O5 = D9[y11]) {
      for (y11 >= C11 && (C11 = y11 + 1); !(k10 = I9[C11]) && ++C11 < _8; ) ;
      O5._next = k10 || null;
    }
  }
  return f15 = new a2(f15, i9), f15._enter = l9, f15._exit = u9, f15;
}
function zt(t10) {
  return typeof t10 == "object" && "length" in t10 ? t10 : Array.from(t10);
}
function Q() {
  return new a2(this._exit || this._groups.map(b2), this._parents);
}
function W2(t10, e30, r11) {
  var i9 = this.enter(), n13 = this, o21 = this.exit();
  return typeof t10 == "function" ? (i9 = t10(i9), i9 && (i9 = i9.selection())) : i9 = i9.append(t10 + ""), e30 != null && (n13 = e30(n13), n13 && (n13 = n13.selection())), r11 == null ? o21.remove() : r11(o21), i9 && n13 ? i9.merge(n13).order() : n13;
}
function Z(t10) {
  for (var e30 = t10.selection ? t10.selection() : t10, r11 = this._groups, i9 = e30._groups, n13 = r11.length, o21 = i9.length, f15 = Math.min(n13, o21), l9 = new Array(n13), u9 = 0; u9 < f15; ++u9) for (var s14 = r11[u9], c11 = i9[u9], h9 = s14.length, m12 = l9[u9] = new Array(h9), p12, _8 = 0; _8 < h9; ++_8) (p12 = s14[_8] || c11[_8]) && (m12[_8] = p12);
  for (; u9 < n13; ++u9) l9[u9] = r11[u9];
  return new a2(l9, this._parents);
}
function $() {
  for (var t10 = this._groups, e30 = -1, r11 = t10.length; ++e30 < r11; ) for (var i9 = t10[e30], n13 = i9.length - 1, o21 = i9[n13], f15; --n13 >= 0; ) (f15 = i9[n13]) && (o21 && f15.compareDocumentPosition(o21) ^ 4 && o21.parentNode.insertBefore(f15, o21), o21 = f15);
  return this;
}
function j(t10) {
  t10 || (t10 = Yt);
  function e30(h9, m12) {
    return h9 && m12 ? t10(h9.__data__, m12.__data__) : !h9 - !m12;
  }
  for (var r11 = this._groups, i9 = r11.length, n13 = new Array(i9), o21 = 0; o21 < i9; ++o21) {
    for (var f15 = r11[o21], l9 = f15.length, u9 = n13[o21] = new Array(l9), s14, c11 = 0; c11 < l9; ++c11) (s14 = f15[c11]) && (u9[c11] = s14);
    u9.sort(e30);
  }
  return new a2(n13, this._parents).order();
}
function Yt(t10, e30) {
  return t10 < e30 ? -1 : t10 > e30 ? 1 : t10 >= e30 ? 0 : NaN;
}
function tt2() {
  var t10 = arguments[0];
  return arguments[0] = this, t10.apply(null, arguments), this;
}
function et2() {
  return Array.from(this);
}
function rt() {
  for (var t10 = this._groups, e30 = 0, r11 = t10.length; e30 < r11; ++e30) for (var i9 = t10[e30], n13 = 0, o21 = i9.length; n13 < o21; ++n13) {
    var f15 = i9[n13];
    if (f15) return f15;
  }
  return null;
}
function nt2() {
  let t10 = 0;
  for (let e30 of this) ++t10;
  return t10;
}
function it() {
  return !this.node();
}
function ot(t10) {
  for (var e30 = this._groups, r11 = 0, i9 = e30.length; r11 < i9; ++r11) for (var n13 = e30[r11], o21 = 0, f15 = n13.length, l9; o21 < f15; ++o21) (l9 = n13[o21]) && t10.call(l9, l9.__data__, o21, n13);
  return this;
}
function Kt(t10) {
  return function() {
    this.removeAttribute(t10);
  };
}
function Gt(t10) {
  return function() {
    this.removeAttributeNS(t10.space, t10.local);
  };
}
function Jt(t10, e30) {
  return function() {
    this.setAttribute(t10, e30);
  };
}
function Qt(t10, e30) {
  return function() {
    this.setAttributeNS(t10.space, t10.local, e30);
  };
}
function Wt(t10, e30) {
  return function() {
    var r11 = e30.apply(this, arguments);
    r11 == null ? this.removeAttribute(t10) : this.setAttribute(t10, r11);
  };
}
function Zt(t10, e30) {
  return function() {
    var r11 = e30.apply(this, arguments);
    r11 == null ? this.removeAttributeNS(t10.space, t10.local) : this.setAttributeNS(t10.space, t10.local, r11);
  };
}
function lt(t10, e30) {
  var r11 = x(t10);
  if (arguments.length < 2) {
    var i9 = this.node();
    return r11.local ? i9.getAttributeNS(r11.space, r11.local) : i9.getAttribute(r11);
  }
  return this.each((e30 == null ? r11.local ? Gt : Kt : typeof e30 == "function" ? r11.local ? Zt : Wt : r11.local ? Qt : Jt)(r11, e30));
}
function A(t10) {
  return t10.ownerDocument && t10.ownerDocument.defaultView || t10.document && t10 || t10.defaultView;
}
function $t(t10) {
  return function() {
    this.style.removeProperty(t10);
  };
}
function jt(t10, e30, r11) {
  return function() {
    this.style.setProperty(t10, e30, r11);
  };
}
function te(t10, e30, r11) {
  return function() {
    var i9 = e30.apply(this, arguments);
    i9 == null ? this.style.removeProperty(t10) : this.style.setProperty(t10, i9, r11);
  };
}
function ft(t10, e30, r11) {
  return arguments.length > 1 ? this.each((e30 == null ? $t : typeof e30 == "function" ? te : jt)(t10, e30, r11 ?? "")) : ut(this.node(), t10);
}
function ut(t10, e30) {
  return t10.style.getPropertyValue(e30) || A(t10).getComputedStyle(t10, null).getPropertyValue(e30);
}
function ee(t10) {
  return function() {
    delete this[t10];
  };
}
function re(t10, e30) {
  return function() {
    this[t10] = e30;
  };
}
function ne(t10, e30) {
  return function() {
    var r11 = e30.apply(this, arguments);
    r11 == null ? delete this[t10] : this[t10] = r11;
  };
}
function st(t10, e30) {
  return arguments.length > 1 ? this.each((e30 == null ? ee : typeof e30 == "function" ? ne : re)(t10, e30)) : this.node()[t10];
}
function ct(t10) {
  return t10.trim().split(/^|\s+/);
}
function B(t10) {
  return t10.classList || new at(t10);
}
function at(t10) {
  this._node = t10, this._names = ct(t10.getAttribute("class") || "");
}
at.prototype = {
  add: function(t10) {
    var e30 = this._names.indexOf(t10);
    e30 < 0 && (this._names.push(t10), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t10) {
    var e30 = this._names.indexOf(t10);
    e30 >= 0 && (this._names.splice(e30, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t10) {
    return this._names.indexOf(t10) >= 0;
  }
};
function pt2(t10, e30) {
  for (var r11 = B(t10), i9 = -1, n13 = e30.length; ++i9 < n13; ) r11.add(e30[i9]);
}
function ht2(t10, e30) {
  for (var r11 = B(t10), i9 = -1, n13 = e30.length; ++i9 < n13; ) r11.remove(e30[i9]);
}
function ie(t10) {
  return function() {
    pt2(this, t10);
  };
}
function oe2(t10) {
  return function() {
    ht2(this, t10);
  };
}
function le(t10, e30) {
  return function() {
    (e30.apply(this, arguments) ? pt2 : ht2)(this, t10);
  };
}
function mt(t10, e30) {
  var r11 = ct(t10 + "");
  if (arguments.length < 2) {
    for (var i9 = B(this.node()), n13 = -1, o21 = r11.length; ++n13 < o21; ) if (!i9.contains(r11[n13])) return false;
    return true;
  }
  return this.each((typeof e30 == "function" ? le : e30 ? ie : oe2)(r11, e30));
}
function fe() {
  this.textContent = "";
}
function ue(t10) {
  return function() {
    this.textContent = t10;
  };
}
function se(t10) {
  return function() {
    var e30 = t10.apply(this, arguments);
    this.textContent = e30 ?? "";
  };
}
function _t(t10) {
  return arguments.length ? this.each(t10 == null ? fe : (typeof t10 == "function" ? se : ue)(t10)) : this.node().textContent;
}
function ce() {
  this.innerHTML = "";
}
function ae2(t10) {
  return function() {
    this.innerHTML = t10;
  };
}
function pe(t10) {
  return function() {
    var e30 = t10.apply(this, arguments);
    this.innerHTML = e30 ?? "";
  };
}
function dt(t10) {
  return arguments.length ? this.each(t10 == null ? ce : (typeof t10 == "function" ? pe : ae2)(t10)) : this.node().innerHTML;
}
function he() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function yt2() {
  return this.each(he);
}
function me2() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function xt2() {
  return this.each(me2);
}
function gt2(t10) {
  var e30 = typeof t10 == "function" ? t10 : d(t10);
  return this.select(function() {
    return this.appendChild(e30.apply(this, arguments));
  });
}
function _e() {
  return null;
}
function vt(t10, e30) {
  var r11 = typeof t10 == "function" ? t10 : d(t10), i9 = e30 == null ? _e : typeof e30 == "function" ? e30 : g(e30);
  return this.select(function() {
    return this.insertBefore(r11.apply(this, arguments), i9.apply(this, arguments) || null);
  });
}
function de2() {
  var t10 = this.parentNode;
  t10 && t10.removeChild(this);
}
function wt() {
  return this.each(de2);
}
function ye2() {
  var t10 = this.cloneNode(false), e30 = this.parentNode;
  return e30 ? e30.insertBefore(t10, this.nextSibling) : t10;
}
function xe() {
  var t10 = this.cloneNode(true), e30 = this.parentNode;
  return e30 ? e30.insertBefore(t10, this.nextSibling) : t10;
}
function At2(t10) {
  return this.select(t10 ? xe : ye2);
}
function St(t10) {
  return arguments.length ? this.property("__data__", t10) : this.node().__data__;
}
function ge(t10) {
  return function(e30) {
    t10.call(this, e30, this.__data__);
  };
}
function ve2(t10) {
  return t10.trim().split(/^|\s+/).map(function(e30) {
    var r11 = "", i9 = e30.indexOf(".");
    return i9 >= 0 && (r11 = e30.slice(i9 + 1), e30 = e30.slice(0, i9)), {
      type: e30,
      name: r11
    };
  });
}
function we(t10) {
  return function() {
    var e30 = this.__on;
    if (e30) {
      for (var r11 = 0, i9 = -1, n13 = e30.length, o21; r11 < n13; ++r11) o21 = e30[r11], (!t10.type || o21.type === t10.type) && o21.name === t10.name ? this.removeEventListener(o21.type, o21.listener, o21.options) : e30[++i9] = o21;
      ++i9 ? e30.length = i9 : delete this.__on;
    }
  };
}
function Ae(t10, e30, r11) {
  return function() {
    var i9 = this.__on, n13, o21 = ge(e30);
    if (i9) {
      for (var f15 = 0, l9 = i9.length; f15 < l9; ++f15) if ((n13 = i9[f15]).type === t10.type && n13.name === t10.name) {
        this.removeEventListener(n13.type, n13.listener, n13.options), this.addEventListener(n13.type, n13.listener = o21, n13.options = r11), n13.value = e30;
        return;
      }
    }
    this.addEventListener(t10.type, o21, r11), n13 = {
      type: t10.type,
      name: t10.name,
      value: e30,
      listener: o21,
      options: r11
    }, i9 ? i9.push(n13) : this.__on = [
      n13
    ];
  };
}
function Ct(t10, e30, r11) {
  var i9 = ve2(t10 + ""), n13, o21 = i9.length, f15;
  if (arguments.length < 2) {
    var l9 = this.node().__on;
    if (l9) {
      for (var u9 = 0, s14 = l9.length, c11; u9 < s14; ++u9) for (n13 = 0, c11 = l9[u9]; n13 < o21; ++n13) if ((f15 = i9[n13]).type === c11.type && f15.name === c11.name) return c11.value;
    }
    return;
  }
  for (l9 = e30 ? Ae : we, n13 = 0; n13 < o21; ++n13) this.each(l9(i9[n13], e30, r11));
  return this;
}
function Et(t10, e30, r11) {
  var i9 = A(t10), n13 = i9.CustomEvent;
  typeof n13 == "function" ? n13 = new n13(e30, r11) : (n13 = i9.document.createEvent("Event"), r11 ? (n13.initEvent(e30, r11.bubbles, r11.cancelable), n13.detail = r11.detail) : n13.initEvent(e30, false, false)), t10.dispatchEvent(n13);
}
function Se(t10, e30) {
  return function() {
    return Et(this, t10, e30);
  };
}
function Ce(t10, e30) {
  return function() {
    return Et(this, t10, e30.apply(this, arguments));
  };
}
function Nt(t10, e30) {
  return this.each((typeof e30 == "function" ? Ce : Se)(t10, e30));
}
function* Lt() {
  for (var t10 = this._groups, e30 = 0, r11 = t10.length; e30 < r11; ++e30) for (var i9 = t10[e30], n13 = 0, o21 = i9.length, f15; n13 < o21; ++n13) (f15 = i9[n13]) && (yield f15);
}
var S = [
  null
];
function a2(t10, e30) {
  this._groups = t10, this._parents = e30;
}
function bt() {
  return new a2([
    [
      document.documentElement
    ]
  ], S);
}
function Ee2() {
  return this;
}
a2.prototype = bt.prototype = {
  constructor: a2,
  select: H2,
  selectAll: U,
  selectChild: X,
  selectChildren: z,
  filter: Y,
  data: J,
  enter: K,
  exit: Q,
  join: W2,
  merge: Z,
  selection: Ee2,
  order: $,
  sort: j,
  call: tt2,
  nodes: et2,
  node: rt,
  size: nt2,
  empty: it,
  each: ot,
  attr: lt,
  style: ft,
  property: st,
  classed: mt,
  text: _t,
  html: dt,
  raise: yt2,
  lower: xt2,
  append: gt2,
  insert: vt,
  remove: wt,
  clone: At2,
  datum: St,
  on: Ct,
  dispatch: Nt,
  [Symbol.iterator]: Lt
};
var Ne = bt;
function M2(t10) {
  return typeof t10 == "string" ? new a2([
    [
      document.querySelector(t10)
    ]
  ], [
    document.documentElement
  ]) : new a2([
    [
      t10
    ]
  ], S);
}
var be2 = 0;
function P() {
  return new T();
}
function T() {
  this._ = "@" + (++be2).toString(36);
}
T.prototype = P.prototype = {
  constructor: T,
  get: function(t10) {
    for (var e30 = this._; !(e30 in t10); ) if (!(t10 = t10.parentNode)) return;
    return t10[e30];
  },
  set: function(t10, e30) {
    return t10[this._] = e30;
  },
  remove: function(t10) {
    return this._ in t10 && delete t10[this._];
  },
  toString: function() {
    return this._;
  }
};

// deno:https://esm.sh/d3-drag@3.0.0/denonext/d3-drag.mjs
function w3(t10, { sourceEvent: o21, subject: i9, target: l9, identifier: f15, active: h9, x: b11, y: E19, dx: T12, dy: y11, dispatch: m12 }) {
  Object.defineProperties(this, {
    type: {
      value: t10,
      enumerable: true,
      configurable: true
    },
    sourceEvent: {
      value: o21,
      enumerable: true,
      configurable: true
    },
    subject: {
      value: i9,
      enumerable: true,
      configurable: true
    },
    target: {
      value: l9,
      enumerable: true,
      configurable: true
    },
    identifier: {
      value: f15,
      enumerable: true,
      configurable: true
    },
    active: {
      value: h9,
      enumerable: true,
      configurable: true
    },
    x: {
      value: b11,
      enumerable: true,
      configurable: true
    },
    y: {
      value: E19,
      enumerable: true,
      configurable: true
    },
    dx: {
      value: T12,
      enumerable: true,
      configurable: true
    },
    dy: {
      value: y11,
      enumerable: true,
      configurable: true
    },
    _: {
      value: m12
    }
  });
}
w3.prototype.on = function() {
  var t10 = this._.on.apply(this._, arguments);
  return t10 === this._ ? this : t10;
};

// deno:https://esm.sh/d3-color@3.1.0/denonext/d3-color.mjs
function b3(e30, t10, r11) {
  e30.prototype = t10.prototype = r11, r11.constructor = e30;
}
function g2(e30, t10) {
  var r11 = Object.create(e30.prototype);
  for (var n13 in t10) r11[n13] = t10[n13];
  return r11;
}
function u2() {
}
var p = 0.7;
var y = 1 / p;
var N3 = "\\s*([+-]?\\d+)\\s*";
var M3 = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*";
var c2 = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*";
var be3 = /^#([0-9a-f]{3,8})$/;
var de3 = new RegExp(`^rgb\\(${N3},${N3},${N3}\\)$`);
var ge2 = new RegExp(`^rgb\\(${c2},${c2},${c2}\\)$`);
var pe2 = new RegExp(`^rgba\\(${N3},${N3},${N3},${M3}\\)$`);
var me3 = new RegExp(`^rgba\\(${c2},${c2},${c2},${M3}\\)$`);
var we2 = new RegExp(`^hsl\\(${M3},${c2},${c2}\\)$`);
var ye3 = new RegExp(`^hsla\\(${M3},${c2},${c2},${M3}\\)$`);
var Y2 = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
b3(u2, H3, {
  copy(e30) {
    return Object.assign(new this.constructor(), this, e30);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Z2,
  formatHex: Z2,
  formatHex8: $e,
  formatHsl: Ne2,
  formatRgb: F3,
  toString: F3
});
function Z2() {
  return this.rgb().formatHex();
}
function $e() {
  return this.rgb().formatHex8();
}
function Ne2() {
  return W3(this).formatHsl();
}
function F3() {
  return this.rgb().formatRgb();
}
function H3(e30) {
  var t10, r11;
  return e30 = (e30 + "").trim().toLowerCase(), (t10 = be3.exec(e30)) ? (r11 = t10[1].length, t10 = parseInt(t10[1], 16), r11 === 6 ? G2(t10) : r11 === 3 ? new a3(t10 >> 8 & 15 | t10 >> 4 & 240, t10 >> 4 & 15 | t10 & 240, (t10 & 15) << 4 | t10 & 15, 1) : r11 === 8 ? C(t10 >> 24 & 255, t10 >> 16 & 255, t10 >> 8 & 255, (t10 & 255) / 255) : r11 === 4 ? C(t10 >> 12 & 15 | t10 >> 8 & 240, t10 >> 8 & 15 | t10 >> 4 & 240, t10 >> 4 & 15 | t10 & 240, ((t10 & 15) << 4 | t10 & 15) / 255) : null) : (t10 = de3.exec(e30)) ? new a3(t10[1], t10[2], t10[3], 1) : (t10 = ge2.exec(e30)) ? new a3(t10[1] * 255 / 100, t10[2] * 255 / 100, t10[3] * 255 / 100, 1) : (t10 = pe2.exec(e30)) ? C(t10[1], t10[2], t10[3], t10[4]) : (t10 = me3.exec(e30)) ? C(t10[1] * 255 / 100, t10[2] * 255 / 100, t10[3] * 255 / 100, t10[4]) : (t10 = we2.exec(e30)) ? T2(t10[1], t10[2] / 100, t10[3] / 100, 1) : (t10 = ye3.exec(e30)) ? T2(t10[1], t10[2] / 100, t10[3] / 100, t10[4]) : Y2.hasOwnProperty(e30) ? G2(Y2[e30]) : e30 === "transparent" ? new a3(NaN, NaN, NaN, 0) : null;
}
function G2(e30) {
  return new a3(e30 >> 16 & 255, e30 >> 8 & 255, e30 & 255, 1);
}
function C(e30, t10, r11, n13) {
  return n13 <= 0 && (e30 = t10 = r11 = NaN), new a3(e30, t10, r11, n13);
}
function R(e30) {
  return e30 instanceof u2 || (e30 = H3(e30)), e30 ? (e30 = e30.rgb(), new a3(e30.r, e30.g, e30.b, e30.opacity)) : new a3();
}
function V3(e30, t10, r11, n13) {
  return arguments.length === 1 ? R(e30) : new a3(e30, t10, r11, n13 ?? 1);
}
function a3(e30, t10, r11, n13) {
  this.r = +e30, this.g = +t10, this.b = +r11, this.opacity = +n13;
}
b3(a3, V3, g2(u2, {
  brighter(e30) {
    return e30 = e30 == null ? y : Math.pow(y, e30), new a3(this.r * e30, this.g * e30, this.b * e30, this.opacity);
  },
  darker(e30) {
    return e30 = e30 == null ? p : Math.pow(p, e30), new a3(this.r * e30, this.g * e30, this.b * e30, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new a3(w4(this.r), w4(this.g), w4(this.b), E2(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: J2,
  formatHex: J2,
  formatHex8: ve3,
  formatRgb: Q2,
  toString: Q2
}));
function J2() {
  return `#${m(this.r)}${m(this.g)}${m(this.b)}`;
}
function ve3() {
  return `#${m(this.r)}${m(this.g)}${m(this.b)}${m((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Q2() {
  let e30 = E2(this.opacity);
  return `${e30 === 1 ? "rgb(" : "rgba("}${w4(this.r)}, ${w4(this.g)}, ${w4(this.b)}${e30 === 1 ? ")" : `, ${e30})`}`;
}
function E2(e30) {
  return isNaN(e30) ? 1 : Math.max(0, Math.min(1, e30));
}
function w4(e30) {
  return Math.max(0, Math.min(255, Math.round(e30) || 0));
}
function m(e30) {
  return e30 = w4(e30), (e30 < 16 ? "0" : "") + e30.toString(16);
}
function T2(e30, t10, r11, n13) {
  return n13 <= 0 ? e30 = t10 = r11 = NaN : r11 <= 0 || r11 >= 1 ? e30 = t10 = NaN : t10 <= 0 && (e30 = NaN), new h2(e30, t10, r11, n13);
}
function W3(e30) {
  if (e30 instanceof h2) return new h2(e30.h, e30.s, e30.l, e30.opacity);
  if (e30 instanceof u2 || (e30 = H3(e30)), !e30) return new h2();
  if (e30 instanceof h2) return e30;
  e30 = e30.rgb();
  var t10 = e30.r / 255, r11 = e30.g / 255, n13 = e30.b / 255, i9 = Math.min(t10, r11, n13), f15 = Math.max(t10, r11, n13), s14 = NaN, x15 = f15 - i9, d11 = (f15 + i9) / 2;
  return x15 ? (t10 === f15 ? s14 = (r11 - n13) / x15 + (r11 < n13) * 6 : r11 === f15 ? s14 = (n13 - t10) / x15 + 2 : s14 = (t10 - r11) / x15 + 4, x15 /= d11 < 0.5 ? f15 + i9 : 2 - f15 - i9, s14 *= 60) : x15 = d11 > 0 && d11 < 1 ? 0 : s14, new h2(s14, x15, d11, e30.opacity);
}
function ee2(e30, t10, r11, n13) {
  return arguments.length === 1 ? W3(e30) : new h2(e30, t10, r11, n13 ?? 1);
}
function h2(e30, t10, r11, n13) {
  this.h = +e30, this.s = +t10, this.l = +r11, this.opacity = +n13;
}
b3(h2, ee2, g2(u2, {
  brighter(e30) {
    return e30 = e30 == null ? y : Math.pow(y, e30), new h2(this.h, this.s, this.l * e30, this.opacity);
  },
  darker(e30) {
    return e30 = e30 == null ? p : Math.pow(p, e30), new h2(this.h, this.s, this.l * e30, this.opacity);
  },
  rgb() {
    var e30 = this.h % 360 + (this.h < 0) * 360, t10 = isNaN(e30) || isNaN(this.s) ? 0 : this.s, r11 = this.l, n13 = r11 + (r11 < 0.5 ? r11 : 1 - r11) * t10, i9 = 2 * r11 - n13;
    return new a3(j2(e30 >= 240 ? e30 - 240 : e30 + 120, i9, n13), j2(e30, i9, n13), j2(e30 < 120 ? e30 + 240 : e30 - 120, i9, n13), this.opacity);
  },
  clamp() {
    return new h2(U2(this.h), q3(this.s), q3(this.l), E2(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    let e30 = E2(this.opacity);
    return `${e30 === 1 ? "hsl(" : "hsla("}${U2(this.h)}, ${q3(this.s) * 100}%, ${q3(this.l) * 100}%${e30 === 1 ? ")" : `, ${e30})`}`;
  }
}));
function U2(e30) {
  return e30 = (e30 || 0) % 360, e30 < 0 ? e30 + 360 : e30;
}
function q3(e30) {
  return Math.max(0, Math.min(1, e30 || 0));
}
function j2(e30, t10, r11) {
  return (e30 < 60 ? t10 + (r11 - t10) * e30 / 60 : e30 < 180 ? r11 : e30 < 240 ? t10 + (r11 - t10) * (240 - e30) / 60 : t10) * 255;
}
var P2 = Math.PI / 180;
var _ = 180 / Math.PI;
var I = 18;
var te2 = 0.96422;
var re2 = 1;
var ne2 = 0.82521;
var ie2 = 4 / 29;
var v2 = 6 / 29;
var ae3 = 3 * v2 * v2;
var Me = v2 * v2 * v2;
function fe2(e30) {
  if (e30 instanceof l2) return new l2(e30.l, e30.a, e30.b, e30.opacity);
  if (e30 instanceof o2) return le2(e30);
  e30 instanceof a3 || (e30 = R(e30));
  var t10 = S2(e30.r), r11 = S2(e30.g), n13 = S2(e30.b), i9 = B2((0.2225045 * t10 + 0.7168786 * r11 + 0.0606169 * n13) / re2), f15, s14;
  return t10 === r11 && r11 === n13 ? f15 = s14 = i9 : (f15 = B2((0.4360747 * t10 + 0.3850649 * r11 + 0.1430804 * n13) / te2), s14 = B2((0.0139322 * t10 + 0.0971045 * r11 + 0.7141733 * n13) / ne2)), new l2(116 * i9 - 16, 500 * (f15 - i9), 200 * (i9 - s14), e30.opacity);
}
function A2(e30, t10, r11, n13) {
  return arguments.length === 1 ? fe2(e30) : new l2(e30, t10, r11, n13 ?? 1);
}
function l2(e30, t10, r11, n13) {
  this.l = +e30, this.a = +t10, this.b = +r11, this.opacity = +n13;
}
b3(l2, A2, g2(u2, {
  brighter(e30) {
    return new l2(this.l + I * (e30 ?? 1), this.a, this.b, this.opacity);
  },
  darker(e30) {
    return new l2(this.l - I * (e30 ?? 1), this.a, this.b, this.opacity);
  },
  rgb() {
    var e30 = (this.l + 16) / 116, t10 = isNaN(this.a) ? e30 : e30 + this.a / 500, r11 = isNaN(this.b) ? e30 : e30 - this.b / 200;
    return t10 = te2 * D(t10), e30 = re2 * D(e30), r11 = ne2 * D(r11), new a3(O(3.1338561 * t10 - 1.6168667 * e30 - 0.4906146 * r11), O(-0.9787684 * t10 + 1.9161415 * e30 + 0.033454 * r11), O(0.0719453 * t10 - 0.2289914 * e30 + 1.4052427 * r11), this.opacity);
  }
}));
function B2(e30) {
  return e30 > Me ? Math.pow(e30, 1 / 3) : e30 / ae3 + ie2;
}
function D(e30) {
  return e30 > v2 ? e30 * e30 * e30 : ae3 * (e30 - ie2);
}
function O(e30) {
  return 255 * (e30 <= 31308e-7 ? 12.92 * e30 : 1.055 * Math.pow(e30, 1 / 2.4) - 0.055);
}
function S2(e30) {
  return (e30 /= 255) <= 0.04045 ? e30 / 12.92 : Math.pow((e30 + 0.055) / 1.055, 2.4);
}
function se2(e30) {
  if (e30 instanceof o2) return new o2(e30.h, e30.c, e30.l, e30.opacity);
  if (e30 instanceof l2 || (e30 = fe2(e30)), e30.a === 0 && e30.b === 0) return new o2(NaN, 0 < e30.l && e30.l < 100 ? 0 : NaN, e30.l, e30.opacity);
  var t10 = Math.atan2(e30.b, e30.a) * _;
  return new o2(t10 < 0 ? t10 + 360 : t10, Math.sqrt(e30.a * e30.a + e30.b * e30.b), e30.l, e30.opacity);
}
function he2(e30, t10, r11, n13) {
  return arguments.length === 1 ? se2(e30) : new o2(e30, t10, r11, n13 ?? 1);
}
function o2(e30, t10, r11, n13) {
  this.h = +e30, this.c = +t10, this.l = +r11, this.opacity = +n13;
}
function le2(e30) {
  if (isNaN(e30.h)) return new l2(e30.l, 0, 0, e30.opacity);
  var t10 = e30.h * P2;
  return new l2(e30.l, Math.cos(t10) * e30.c, Math.sin(t10) * e30.c, e30.opacity);
}
b3(o2, he2, g2(u2, {
  brighter(e30) {
    return new o2(this.h, this.c, this.l + I * (e30 ?? 1), this.opacity);
  },
  darker(e30) {
    return new o2(this.h, this.c, this.l - I * (e30 ?? 1), this.opacity);
  },
  rgb() {
    return le2(this).rgb();
  }
}));
var oe3 = -0.14861;
var L2 = 1.78277;
var K2 = -0.29227;
var z2 = -0.90649;
var k = 1.97294;
var xe2 = k * z2;
var ce2 = k * L2;
var ue2 = L2 * K2 - z2 * oe3;
function ke(e30) {
  if (e30 instanceof $2) return new $2(e30.h, e30.s, e30.l, e30.opacity);
  e30 instanceof a3 || (e30 = R(e30));
  var t10 = e30.r / 255, r11 = e30.g / 255, n13 = e30.b / 255, i9 = (ue2 * n13 + xe2 * t10 - ce2 * r11) / (ue2 + xe2 - ce2), f15 = n13 - i9, s14 = (k * (r11 - i9) - K2 * f15) / z2, x15 = Math.sqrt(s14 * s14 + f15 * f15) / (k * i9 * (1 - i9)), d11 = x15 ? Math.atan2(s14, f15) * _ - 120 : NaN;
  return new $2(d11 < 0 ? d11 + 360 : d11, x15, i9, e30.opacity);
}
function X2(e30, t10, r11, n13) {
  return arguments.length === 1 ? ke(e30) : new $2(e30, t10, r11, n13 ?? 1);
}
function $2(e30, t10, r11, n13) {
  this.h = +e30, this.s = +t10, this.l = +r11, this.opacity = +n13;
}
b3($2, X2, g2(u2, {
  brighter(e30) {
    return e30 = e30 == null ? y : Math.pow(y, e30), new $2(this.h, this.s, this.l * e30, this.opacity);
  },
  darker(e30) {
    return e30 = e30 == null ? p : Math.pow(p, e30), new $2(this.h, this.s, this.l * e30, this.opacity);
  },
  rgb() {
    var e30 = isNaN(this.h) ? 0 : (this.h + 120) * P2, t10 = +this.l, r11 = isNaN(this.s) ? 0 : this.s * t10 * (1 - t10), n13 = Math.cos(e30), i9 = Math.sin(e30);
    return new a3(255 * (t10 + r11 * (oe3 * n13 + L2 * i9)), 255 * (t10 + r11 * (K2 * n13 + z2 * i9)), 255 * (t10 + r11 * (k * n13)), this.opacity);
  }
}));

// deno:https://esm.sh/d3-interpolate@3.0.1/denonext/d3-interpolate.mjs
function T3(e30, r11, t10, n13, o21) {
  var u9 = e30 * e30, i9 = u9 * e30;
  return ((1 - 3 * e30 + 3 * u9 - i9) * r11 + (4 - 6 * u9 + 3 * i9) * t10 + (1 + 3 * e30 + 3 * u9 - 3 * i9) * n13 + i9 * o21) / 6;
}
function D2(e30) {
  var r11 = e30.length - 1;
  return function(t10) {
    var n13 = t10 <= 0 ? t10 = 0 : t10 >= 1 ? (t10 = 1, r11 - 1) : Math.floor(t10 * r11), o21 = e30[n13], u9 = e30[n13 + 1], i9 = n13 > 0 ? e30[n13 - 1] : 2 * o21 - u9, f15 = n13 < r11 - 1 ? e30[n13 + 2] : 2 * u9 - o21;
    return T3((t10 - n13 / r11) * r11, i9, o21, u9, f15);
  };
}
function H4(e30) {
  var r11 = e30.length;
  return function(t10) {
    var n13 = Math.floor(((t10 %= 1) < 0 ? ++t10 : t10) * r11), o21 = e30[(n13 + r11 - 1) % r11], u9 = e30[n13 % r11], i9 = e30[(n13 + 1) % r11], f15 = e30[(n13 + 2) % r11];
    return T3((t10 - n13 / r11) * r11, o21, u9, i9, f15);
  };
}
var w5 = (e30) => () => e30;
function Z3(e30, r11) {
  return function(t10) {
    return e30 + t10 * r11;
  };
}
function mr(e30, r11, t10) {
  return e30 = Math.pow(e30, t10), r11 = Math.pow(r11, t10) - e30, t10 = 1 / t10, function(n13) {
    return Math.pow(e30 + n13 * r11, t10);
  };
}
function v3(e30, r11) {
  var t10 = r11 - e30;
  return t10 ? Z3(e30, t10 > 180 || t10 < -180 ? t10 - 360 * Math.round(t10 / 360) : t10) : w5(isNaN(e30) ? r11 : e30);
}
function F4(e30) {
  return (e30 = +e30) == 1 ? s3 : function(r11, t10) {
    return t10 - r11 ? mr(r11, t10, e30) : w5(isNaN(r11) ? t10 : r11);
  };
}
function s3(e30, r11) {
  var t10 = r11 - e30;
  return t10 ? Z3(e30, t10) : w5(isNaN(e30) ? r11 : e30);
}
var C2 = function e(r11) {
  var t10 = F4(r11);
  function n13(o21, u9) {
    var i9 = t10((o21 = V3(o21)).r, (u9 = V3(u9)).r), f15 = t10(o21.g, u9.g), c11 = t10(o21.b, u9.b), l9 = s3(o21.opacity, u9.opacity);
    return function(a11) {
      return o21.r = i9(a11), o21.g = f15(a11), o21.b = c11(a11), o21.opacity = l9(a11), o21 + "";
    };
  }
  return n13.gamma = e, n13;
}(1);
function J3(e30) {
  return function(r11) {
    var t10 = r11.length, n13 = new Array(t10), o21 = new Array(t10), u9 = new Array(t10), i9, f15;
    for (i9 = 0; i9 < t10; ++i9) f15 = V3(r11[i9]), n13[i9] = f15.r || 0, o21[i9] = f15.g || 0, u9[i9] = f15.b || 0;
    return n13 = e30(n13), o21 = e30(o21), u9 = e30(u9), f15.opacity = 1, function(c11) {
      return f15.r = n13(c11), f15.g = o21(c11), f15.b = u9(c11), f15 + "";
    };
  };
}
var sr = J3(D2);
var hr = J3(H4);
function x2(e30, r11) {
  return e30 = +e30, r11 = +r11, function(t10) {
    return e30 * (1 - t10) + r11 * t10;
  };
}
var V4 = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g;
var E3 = new RegExp(V4.source, "g");
function gr(e30) {
  return function() {
    return e30;
  };
}
function dr(e30) {
  return function(r11) {
    return e30(r11) + "";
  };
}
function _2(e30, r11) {
  var t10 = V4.lastIndex = E3.lastIndex = 0, n13, o21, u9, i9 = -1, f15 = [], c11 = [];
  for (e30 = e30 + "", r11 = r11 + ""; (n13 = V4.exec(e30)) && (o21 = E3.exec(r11)); ) (u9 = o21.index) > t10 && (u9 = r11.slice(t10, u9), f15[i9] ? f15[i9] += u9 : f15[++i9] = u9), (n13 = n13[0]) === (o21 = o21[0]) ? f15[i9] ? f15[i9] += o21 : f15[++i9] = o21 : (f15[++i9] = null, c11.push({
    i: i9,
    x: x2(n13, o21)
  })), t10 = E3.lastIndex;
  return t10 < r11.length && (u9 = r11.slice(t10), f15[i9] ? f15[i9] += u9 : f15[++i9] = u9), f15.length < 2 ? c11[0] ? dr(c11[0].x) : gr(r11) : (r11 = c11.length, function(l9) {
    for (var a11 = 0, p12; a11 < r11; ++a11) f15[(p12 = c11[a11]).i] = p12.x(l9);
    return f15.join("");
  });
}
var $3 = 180 / Math.PI;
var B3 = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function G3(e30, r11, t10, n13, o21, u9) {
  var i9, f15, c11;
  return (i9 = Math.sqrt(e30 * e30 + r11 * r11)) && (e30 /= i9, r11 /= i9), (c11 = e30 * t10 + r11 * n13) && (t10 -= e30 * c11, n13 -= r11 * c11), (f15 = Math.sqrt(t10 * t10 + n13 * n13)) && (t10 /= f15, n13 /= f15, c11 /= f15), e30 * n13 < r11 * t10 && (e30 = -e30, r11 = -r11, c11 = -c11, i9 = -i9), {
    translateX: o21,
    translateY: u9,
    rotate: Math.atan2(r11, e30) * $3,
    skewX: Math.atan(c11) * $3,
    scaleX: i9,
    scaleY: f15
  };
}
var k2;
function P3(e30) {
  let r11 = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e30 + "");
  return r11.isIdentity ? B3 : G3(r11.a, r11.b, r11.c, r11.d, r11.e, r11.f);
}
function b4(e30) {
  return e30 == null ? B3 : (k2 || (k2 = document.createElementNS("http://www.w3.org/2000/svg", "g")), k2.setAttribute("transform", e30), (e30 = k2.transform.baseVal.consolidate()) ? (e30 = e30.matrix, G3(e30.a, e30.b, e30.c, e30.d, e30.e, e30.f)) : B3);
}
function rr(e30, r11, t10, n13) {
  function o21(l9) {
    return l9.length ? l9.pop() + " " : "";
  }
  function u9(l9, a11, p12, m12, h9, d11) {
    if (l9 !== p12 || a11 !== m12) {
      var g7 = h9.push("translate(", null, r11, null, t10);
      d11.push({
        i: g7 - 4,
        x: x2(l9, p12)
      }, {
        i: g7 - 2,
        x: x2(a11, m12)
      });
    } else (p12 || m12) && h9.push("translate(" + p12 + r11 + m12 + t10);
  }
  function i9(l9, a11, p12, m12) {
    l9 !== a11 ? (l9 - a11 > 180 ? a11 += 360 : a11 - l9 > 180 && (l9 += 360), m12.push({
      i: p12.push(o21(p12) + "rotate(", null, n13) - 2,
      x: x2(l9, a11)
    })) : a11 && p12.push(o21(p12) + "rotate(" + a11 + n13);
  }
  function f15(l9, a11, p12, m12) {
    l9 !== a11 ? m12.push({
      i: p12.push(o21(p12) + "skewX(", null, n13) - 2,
      x: x2(l9, a11)
    }) : a11 && p12.push(o21(p12) + "skewX(" + a11 + n13);
  }
  function c11(l9, a11, p12, m12, h9, d11) {
    if (l9 !== p12 || a11 !== m12) {
      var g7 = h9.push(o21(h9) + "scale(", null, ",", null, ")");
      d11.push({
        i: g7 - 4,
        x: x2(l9, p12)
      }, {
        i: g7 - 2,
        x: x2(a11, m12)
      });
    } else (p12 !== 1 || m12 !== 1) && h9.push(o21(h9) + "scale(" + p12 + "," + m12 + ")");
  }
  return function(l9, a11) {
    var p12 = [], m12 = [];
    return l9 = e30(l9), a11 = e30(a11), u9(l9.translateX, l9.translateY, a11.translateX, a11.translateY, p12, m12), i9(l9.rotate, a11.rotate, p12, m12), f15(l9.skewX, a11.skewX, p12, m12), c11(l9.scaleX, l9.scaleY, a11.scaleX, a11.scaleY, p12, m12), l9 = a11 = null, function(h9) {
      for (var d11 = -1, g7 = m12.length, M10; ++d11 < g7; ) p12[(M10 = m12[d11]).i] = M10.x(h9);
      return p12.join("");
    };
  };
}
var wr = rr(P3, "px, ", "px)", "deg)");
var Ar = rr(b4, ", ", ")", ")");
var Xr = 1e-12;
function er(e30) {
  return ((e30 = Math.exp(e30)) + 1 / e30) / 2;
}
function Nr(e30) {
  return ((e30 = Math.exp(e30)) - 1 / e30) / 2;
}
function Sr(e30) {
  return ((e30 = Math.exp(2 * e30)) - 1) / (e30 + 1);
}
var Cr = function e2(r11, t10, n13) {
  function o21(u9, i9) {
    var f15 = u9[0], c11 = u9[1], l9 = u9[2], a11 = i9[0], p12 = i9[1], m12 = i9[2], h9 = a11 - f15, d11 = p12 - c11, g7 = h9 * h9 + d11 * d11, M10, A14;
    if (g7 < Xr) A14 = Math.log(m12 / l9) / r11, M10 = function(N10) {
      return [
        f15 + N10 * h9,
        c11 + N10 * d11,
        l9 * Math.exp(r11 * N10 * A14)
      ];
    };
    else {
      var R8 = Math.sqrt(g7), Y12 = (m12 * m12 - l9 * l9 + n13 * g7) / (2 * l9 * t10 * R8), q15 = (m12 * m12 - l9 * l9 - n13 * g7) / (2 * m12 * t10 * R8), X12 = Math.log(Math.sqrt(Y12 * Y12 + 1) - Y12), cr = Math.log(Math.sqrt(q15 * q15 + 1) - q15);
      A14 = (cr - X12) / r11, M10 = function(N10) {
        var Q11 = N10 * A14, K9 = er(X12), W12 = l9 / (t10 * R8) * (K9 * Sr(r11 * Q11 + X12) - Nr(X12));
        return [
          f15 + W12 * h9,
          c11 + W12 * d11,
          l9 * K9 / er(r11 * Q11 + X12)
        ];
      };
    }
    return M10.duration = A14 * 1e3 * r11 / Math.SQRT2, M10;
  }
  return o21.rho = function(u9) {
    var i9 = Math.max(1e-3, +u9), f15 = i9 * i9, c11 = f15 * f15;
    return e2(i9, f15, c11);
  }, o21;
}(Math.SQRT2, 2, 4);
function or(e30) {
  return function(r11, t10) {
    var n13 = e30((r11 = ee2(r11)).h, (t10 = ee2(t10)).h), o21 = s3(r11.s, t10.s), u9 = s3(r11.l, t10.l), i9 = s3(r11.opacity, t10.opacity);
    return function(f15) {
      return r11.h = n13(f15), r11.s = o21(f15), r11.l = u9(f15), r11.opacity = i9(f15), r11 + "";
    };
  };
}
var Lr = or(v3);
var Br = or(s3);
function fr(e30) {
  return function(r11, t10) {
    var n13 = e30((r11 = he2(r11)).h, (t10 = he2(t10)).h), o21 = s3(r11.c, t10.c), u9 = s3(r11.l, t10.l), i9 = s3(r11.opacity, t10.opacity);
    return function(f15) {
      return r11.h = n13(f15), r11.c = o21(f15), r11.l = u9(f15), r11.opacity = i9(f15), r11 + "";
    };
  };
}
var kr = fr(v3);
var Rr = fr(s3);
function lr(e30) {
  return function r11(t10) {
    t10 = +t10;
    function n13(o21, u9) {
      var i9 = e30((o21 = X2(o21)).h, (u9 = X2(u9)).h), f15 = s3(o21.s, u9.s), c11 = s3(o21.l, u9.l), l9 = s3(o21.opacity, u9.opacity);
      return function(a11) {
        return o21.h = i9(a11), o21.s = f15(a11), o21.l = c11(Math.pow(a11, t10)), o21.opacity = l9(a11), o21 + "";
      };
    }
    return n13.gamma = r11, n13;
  }(1);
}
var Yr = lr(v3);
var qr = lr(s3);

// deno:https://esm.sh/d3-timer@3.0.1/denonext/d3-timer.mjs
var f2 = 0;
var l3 = 0;
var u3 = 0;
var F5 = 1e3;
var _3;
var s4;
var h3 = 0;
var o3 = 0;
var x3 = 0;
var c3 = typeof performance == "object" && performance.now ? performance : Date;
var I2 = typeof globalThis == "object" && globalThis.requestAnimationFrame ? globalThis.requestAnimationFrame.bind(globalThis) : function(n13) {
  setTimeout(n13, 17);
};
function w6() {
  return o3 || (I2(q4), o3 = c3.now() + x3);
}
function q4() {
  o3 = 0;
}
function i() {
  this._call = this._time = this._next = null;
}
i.prototype = y2.prototype = {
  constructor: i,
  restart: function(n13, t10, r11) {
    if (typeof n13 != "function") throw new TypeError("callback is not a function");
    r11 = (r11 == null ? w6() : +r11) + (t10 == null ? 0 : +t10), !this._next && s4 !== this && (s4 ? s4._next = this : _3 = this, s4 = this), this._call = n13, this._time = r11, v4();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, v4());
  }
};
function y2(n13, t10, r11) {
  var e30 = new i();
  return e30.restart(n13, t10, r11), e30;
}
function b5() {
  w6(), ++f2;
  for (var n13 = _3, t10; n13; ) (t10 = o3 - n13._time) >= 0 && n13._call.call(void 0, t10), n13 = n13._next;
  --f2;
}
function T4() {
  o3 = (h3 = c3.now()) + x3, f2 = l3 = 0;
  try {
    b5();
  } finally {
    f2 = 0, D3(), o3 = 0;
  }
}
function A3() {
  var n13 = c3.now(), t10 = n13 - h3;
  t10 > F5 && (x3 -= t10, h3 = n13);
}
function D3() {
  for (var n13, t10 = _3, r11, e30 = 1 / 0; t10; ) t10._call ? (e30 > t10._time && (e30 = t10._time), n13 = t10, t10 = t10._next) : (r11 = t10._next, t10._next = null, t10 = n13 ? n13._next = r11 : _3 = r11);
  s4 = n13, v4(e30);
}
function v4(n13) {
  if (!f2) {
    l3 && (l3 = clearTimeout(l3));
    var t10 = n13 - o3;
    t10 > 24 ? (n13 < 1 / 0 && (l3 = setTimeout(T4, n13 - c3.now() - x3)), u3 && (u3 = clearInterval(u3))) : (u3 || (h3 = c3.now(), u3 = setInterval(A3, F5)), f2 = 1, I2(T4));
  }
}
function N4(n13, t10, r11) {
  var e30 = new i();
  return t10 = t10 == null ? 0 : +t10, e30.restart((p12) => {
    e30.stop(), n13(p12 + t10);
  }, t10, r11), e30;
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/schedule.mjs
var A4 = c("start", "end", "cancel", "interrupt");
var R2 = [];
var g3 = 0;
var l4 = 1;
var s5 = 2;
var m2 = 3;
var y3 = 4;
var E4 = 5;
var x4 = 6;
function C3(r11, e30, t10, i9, u9, c11) {
  var _8 = r11.__transition;
  if (!_8) r11.__transition = {};
  else if (t10 in _8) return;
  G4(r11, t10, {
    name: e30,
    index: i9,
    group: u9,
    on: A4,
    tween: R2,
    time: c11.time,
    delay: c11.delay,
    duration: c11.duration,
    ease: c11.ease,
    timer: null,
    state: g3
  });
}
function U3(r11, e30) {
  var t10 = D4(r11, e30);
  if (t10.state > g3) throw new Error("too late; already scheduled");
  return t10;
}
function j3(r11, e30) {
  var t10 = D4(r11, e30);
  if (t10.state > m2) throw new Error("too late; already running");
  return t10;
}
function D4(r11, e30) {
  var t10 = r11.__transition;
  if (!t10 || !(t10 = t10[e30])) throw new Error("transition not found");
  return t10;
}
function G4(r11, e30, t10) {
  var i9 = r11.__transition, u9;
  i9[e30] = t10, t10.timer = y2(c11, 0, t10.time);
  function c11(o21) {
    t10.state = l4, t10.timer.restart(_8, t10.delay, t10.time), t10.delay <= o21 && _8(o21 - t10.delay);
  }
  function _8(o21) {
    var n13, p12, d11, a11;
    if (t10.state !== l4) return v15();
    for (n13 in i9) if (a11 = i9[n13], a11.name === t10.name) {
      if (a11.state === m2) return N4(_8);
      a11.state === y3 ? (a11.state = x4, a11.timer.stop(), a11.on.call("interrupt", r11, r11.__data__, a11.index, a11.group), delete i9[n13]) : +n13 < e30 && (a11.state = x4, a11.timer.stop(), a11.on.call("cancel", r11, r11.__data__, a11.index, a11.group), delete i9[n13]);
    }
    if (N4(function() {
      t10.state === m2 && (t10.state = y3, t10.timer.restart(h9, t10.delay, t10.time), h9(o21));
    }), t10.state = s5, t10.on.call("start", r11, r11.__data__, t10.index, t10.group), t10.state === s5) {
      for (t10.state = m2, u9 = new Array(d11 = t10.tween.length), n13 = 0, p12 = -1; n13 < d11; ++n13) (a11 = t10.tween[n13].value.call(r11, r11.__data__, t10.index, t10.group)) && (u9[++p12] = a11);
      u9.length = p12 + 1;
    }
  }
  function h9(o21) {
    for (var n13 = o21 < t10.duration ? t10.ease.call(null, o21 / t10.duration) : (t10.timer.restart(v15), t10.state = E4, 1), p12 = -1, d11 = u9.length; ++p12 < d11; ) u9[p12].call(r11, n13);
    t10.state === E4 && (t10.on.call("end", r11, r11.__data__, t10.index, t10.group), v15());
  }
  function v15() {
    t10.state = x4, t10.timer.stop(), delete i9[e30];
    for (var o21 in i9) return;
    delete r11.__transition;
  }
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/tween.mjs
function s6(t10, r11) {
  var u9, n13;
  return function() {
    var e30 = j3(this, t10), a11 = e30.tween;
    if (a11 !== u9) {
      n13 = u9 = a11;
      for (var f15 = 0, o21 = n13.length; f15 < o21; ++f15) if (n13[f15].name === r11) {
        n13 = n13.slice(), n13.splice(f15, 1);
        break;
      }
    }
    e30.tween = n13;
  };
}
function v5(t10, r11, u9) {
  var n13, e30;
  if (typeof u9 != "function") throw new Error();
  return function() {
    var a11 = j3(this, t10), f15 = a11.tween;
    if (f15 !== n13) {
      e30 = (n13 = f15).slice();
      for (var o21 = {
        name: r11,
        value: u9
      }, i9 = 0, c11 = e30.length; i9 < c11; ++i9) if (e30[i9].name === r11) {
        e30[i9] = o21;
        break;
      }
      i9 === c11 && e30.push(o21);
    }
    a11.tween = e30;
  };
}
function d2(t10, r11) {
  var u9 = this._id;
  if (t10 += "", arguments.length < 2) {
    for (var n13 = D4(this.node(), u9).tween, e30 = 0, a11 = n13.length, f15; e30 < a11; ++e30) if ((f15 = n13[e30]).name === t10) return f15.value;
    return null;
  }
  return this.each((r11 == null ? s6 : v5)(u9, t10, r11));
}
function p2(t10, r11, u9) {
  var n13 = t10._id;
  return t10.each(function() {
    var e30 = j3(this, n13);
    (e30.value || (e30.value = {}))[r11] = u9.apply(this, arguments);
  }), function(e30) {
    return D4(e30, n13).value[r11];
  };
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/interpolate.mjs
function m3(n13, r11) {
  var t10;
  return (typeof r11 == "number" ? x2 : r11 instanceof H3 ? C2 : (t10 = H3(r11)) ? (r11 = t10, C2) : _2)(n13, r11);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/attr.mjs
function p3(t10) {
  return function() {
    this.removeAttribute(t10);
  };
}
function v6(t10) {
  return function() {
    this.removeAttributeNS(t10.space, t10.local);
  };
}
function h4(t10, e30, r11) {
  var i9, u9 = r11 + "", o21;
  return function() {
    var n13 = this.getAttribute(t10);
    return n13 === u9 ? null : n13 === i9 ? o21 : o21 = e30(i9 = n13, r11);
  };
}
function m4(t10, e30, r11) {
  var i9, u9 = r11 + "", o21;
  return function() {
    var n13 = this.getAttributeNS(t10.space, t10.local);
    return n13 === u9 ? null : n13 === i9 ? o21 : o21 = e30(i9 = n13, r11);
  };
}
function b6(t10, e30, r11) {
  var i9, u9, o21;
  return function() {
    var n13, a11 = r11(this), s14;
    return a11 == null ? void this.removeAttribute(t10) : (n13 = this.getAttribute(t10), s14 = a11 + "", n13 === s14 ? null : n13 === i9 && s14 === u9 ? o21 : (u9 = s14, o21 = e30(i9 = n13, a11)));
  };
}
function A5(t10, e30, r11) {
  var i9, u9, o21;
  return function() {
    var n13, a11 = r11(this), s14;
    return a11 == null ? void this.removeAttributeNS(t10.space, t10.local) : (n13 = this.getAttributeNS(t10.space, t10.local), s14 = a11 + "", n13 === s14 ? null : n13 === i9 && s14 === u9 ? o21 : (u9 = s14, o21 = e30(i9 = n13, a11)));
  };
}
function w7(t10, e30) {
  var r11 = x(t10), i9 = r11 === "transform" ? Ar : m3;
  return this.attrTween(t10, typeof e30 == "function" ? (r11.local ? A5 : b6)(r11, i9, p2(this, "attr." + t10, e30)) : e30 == null ? (r11.local ? v6 : p3)(r11) : (r11.local ? m4 : h4)(r11, i9, e30));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/attrTween.mjs
function o4(r11, n13) {
  return function(t10) {
    this.setAttribute(r11, n13.call(this, t10));
  };
}
function f3(r11, n13) {
  return function(t10) {
    this.setAttributeNS(r11.space, r11.local, n13.call(this, t10));
  };
}
function l5(r11, n13) {
  var t10, e30;
  function u9() {
    var i9 = n13.apply(this, arguments);
    return i9 !== e30 && (t10 = (e30 = i9) && f3(r11, i9)), t10;
  }
  return u9._value = n13, u9;
}
function c4(r11, n13) {
  var t10, e30;
  function u9() {
    var i9 = n13.apply(this, arguments);
    return i9 !== e30 && (t10 = (e30 = i9) && o4(r11, i9)), t10;
  }
  return u9._value = n13, u9;
}
function h5(r11, n13) {
  var t10 = "attr." + r11;
  if (arguments.length < 2) return (t10 = this.tween(t10)) && t10._value;
  if (n13 == null) return this.tween(t10, null);
  if (typeof n13 != "function") throw new Error();
  var e30 = x(r11);
  return this.tween(t10, (e30.local ? l5 : c4)(e30, n13));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/delay.mjs
function o5(n13, t10) {
  return function() {
    U3(this, n13).delay = +t10.apply(this, arguments);
  };
}
function r(n13, t10) {
  return t10 = +t10, function() {
    U3(this, n13).delay = t10;
  };
}
function a4(n13) {
  var t10 = this._id;
  return arguments.length ? this.each((typeof n13 == "function" ? o5 : r)(t10, n13)) : D4(this.node(), t10).delay;
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/duration.mjs
function r2(n13, t10) {
  return function() {
    j3(this, n13).duration = +t10.apply(this, arguments);
  };
}
function u4(n13, t10) {
  return t10 = +t10, function() {
    j3(this, n13).duration = t10;
  };
}
function s7(n13) {
  var t10 = this._id;
  return arguments.length ? this.each((typeof n13 == "function" ? r2 : u4)(t10, n13)) : D4(this.node(), t10).duration;
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/ease.mjs
function i2(e30, t10) {
  if (typeof t10 != "function") throw new Error();
  return function() {
    j3(this, e30).ease = t10;
  };
}
function s8(e30) {
  var t10 = this._id;
  return arguments.length ? this.each(i2(t10, e30)) : D4(this.node(), t10).ease;
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/easeVarying.mjs
function i3(t10, n13) {
  return function() {
    var r11 = n13.apply(this, arguments);
    if (typeof r11 != "function") throw new Error();
    j3(this, t10).ease = r11;
  };
}
function f4(t10) {
  if (typeof t10 != "function") throw new Error();
  return this.each(i3(this._id, t10));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/filter.mjs
function v7(t10) {
  typeof t10 != "function" && (t10 = F2(t10));
  for (var a11 = this._groups, e30 = a11.length, _8 = new Array(e30), r11 = 0; r11 < e30; ++r11) for (var n13 = a11[r11], h9 = n13.length, l9 = _8[r11] = [], f15, i9 = 0; i9 < h9; ++i9) (f15 = n13[i9]) && t10.call(f15, f15.__data__, i9, n13) && l9.push(f15);
  return new o6(_8, this._parents, this._name, this._id);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/merge.mjs
function A6(a11) {
  if (a11._id !== this._id) throw new Error();
  for (var n13 = this._groups, f15 = a11._groups, h9 = n13.length, w15 = f15.length, l9 = Math.min(h9, w15), i9 = new Array(h9), r11 = 0; r11 < l9; ++r11) for (var e30 = n13[r11], d11 = f15[r11], _8 = e30.length, s14 = i9[r11] = new Array(_8), o21, t10 = 0; t10 < _8; ++t10) (o21 = e30[t10] || d11[t10]) && (s14[t10] = o21);
  for (; r11 < h9; ++r11) i9[r11] = n13[r11];
  return new o6(i9, this._parents, this._name, this._id);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/on.mjs
function h6(i9) {
  return (i9 + "").trim().split(/^|\s+/).every(function(n13) {
    var t10 = n13.indexOf(".");
    return t10 >= 0 && (n13 = n13.slice(0, t10)), !n13 || n13 === "start";
  });
}
function d3(i9, n13, t10) {
  var o21, r11, u9 = h6(n13) ? U3 : j3;
  return function() {
    var e30 = u9(this, i9), s14 = e30.on;
    s14 !== o21 && (r11 = (o21 = s14).copy()).on(n13, t10), e30.on = r11;
  };
}
function v8(i9, n13) {
  var t10 = this._id;
  return arguments.length < 2 ? D4(this.node(), t10).on.on(i9) : this.each(d3(t10, i9, n13));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/remove.mjs
function r3(t10) {
  return function() {
    var n13 = this.parentNode;
    for (var i9 in this.__transition) if (+i9 !== t10) return;
    n13 && n13.removeChild(this);
  };
}
function e3() {
  return this.on("end.remove", r3(this._id));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/select.mjs
function T5(a11) {
  var m12 = this._name, f15 = this._id;
  typeof a11 != "function" && (a11 = g(a11));
  for (var e30 = this._groups, l9 = e30.length, v15 = new Array(l9), r11 = 0; r11 < l9; ++r11) for (var i9 = e30[r11], w15 = i9.length, n13 = v15[r11] = new Array(w15), _8, h9, t10 = 0; t10 < w15; ++t10) (_8 = i9[t10]) && (h9 = a11.call(_8, _8.__data__, t10, i9)) && ("__data__" in _8 && (h9.__data__ = _8.__data__), n13[t10] = h9, C3(n13[t10], m12, f15, t10, n13, D4(_8, f15)));
  return new o6(v15, this._parents, m12, f15);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/selectAll.mjs
function B4(f15) {
  var h9 = this._name, m12 = this._id;
  typeof f15 != "function" && (f15 = V2(f15));
  for (var n13 = this._groups, u9 = n13.length, v15 = [], l9 = [], o21 = 0; o21 < u9; ++o21) for (var _8 = n13[o21], s14 = _8.length, t10, r11 = 0; r11 < s14; ++r11) if (t10 = _8[r11]) {
    for (var a11 = f15.call(t10, t10.__data__, r11, _8), p12, e30 = D4(t10, m12), i9 = 0, g7 = a11.length; i9 < g7; ++i9) (p12 = a11[i9]) && C3(p12, h9, m12, i9, a11, e30);
    v15.push(a11), l9.push(t10);
  }
  return new o6(v15, l9, h9, m12);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/selection.mjs
var o7 = Ne.prototype.constructor;
function e4() {
  return new o7(this._groups, this._parents);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/style.mjs
function a5(t10, n13) {
  var i9, r11, s14;
  return function() {
    var o21 = ut(this, t10), e30 = (this.style.removeProperty(t10), ut(this, t10));
    return o21 === e30 ? null : o21 === i9 && e30 === r11 ? s14 : s14 = n13(i9 = o21, r11 = e30);
  };
}
function p4(t10) {
  return function() {
    this.style.removeProperty(t10);
  };
}
function T6(t10, n13, i9) {
  var r11, s14 = i9 + "", o21;
  return function() {
    var e30 = ut(this, t10);
    return e30 === s14 ? null : e30 === r11 ? o21 : o21 = n13(r11 = e30, i9);
  };
}
function w8(t10, n13, i9) {
  var r11, s14, o21;
  return function() {
    var e30 = ut(this, t10), u9 = i9(this), l9 = u9 + "";
    return u9 == null && (l9 = u9 = (this.style.removeProperty(t10), ut(this, t10))), e30 === l9 ? null : e30 === r11 && l9 === s14 ? o21 : (s14 = l9, o21 = n13(r11 = e30, u9));
  };
}
function m5(t10, n13) {
  var i9, r11, s14, o21 = "style." + n13, e30 = "end." + o21, u9;
  return function() {
    var l9 = j3(this, t10), y11 = l9.on, h9 = l9.value[o21] == null ? u9 || (u9 = p4(n13)) : void 0;
    (y11 !== i9 || s14 !== h9) && (r11 = (i9 = y11).copy()).on(e30, s14 = h9), l9.on = r11;
  };
}
function x5(t10, n13, i9) {
  var r11 = (t10 += "") == "transform" ? wr : m3;
  return n13 == null ? this.styleTween(t10, a5(t10, r11)).on("end.style." + t10, p4(t10)) : typeof n13 == "function" ? this.styleTween(t10, w8(t10, r11, p2(this, "style." + t10, n13))).each(m5(this._id, t10)) : this.styleTween(t10, T6(t10, r11, n13), i9).on("end.style." + t10, null);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/styleTween.mjs
function s9(n13, e30, r11) {
  return function(t10) {
    this.style.setProperty(n13, e30.call(this, t10), r11);
  };
}
function f5(n13, e30, r11) {
  var t10, i9;
  function l9() {
    var u9 = e30.apply(this, arguments);
    return u9 !== i9 && (t10 = (i9 = u9) && s9(n13, u9, r11)), t10;
  }
  return l9._value = e30, l9;
}
function o8(n13, e30, r11) {
  var t10 = "style." + (n13 += "");
  if (arguments.length < 2) return (t10 = this.tween(t10)) && t10._value;
  if (e30 == null) return this.tween(t10, null);
  if (typeof e30 != "function") throw new Error();
  return this.tween(t10, f5(n13, e30, r11 ?? ""));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/text.mjs
function o9(t10) {
  return function() {
    this.textContent = t10;
  };
}
function i4(t10) {
  return function() {
    var n13 = t10(this);
    this.textContent = n13 ?? "";
  };
}
function r4(t10) {
  return this.tween("text", typeof t10 == "function" ? i4(p2(this, "text", t10)) : o9(t10 == null ? "" : t10 + ""));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/textTween.mjs
function u5(n13) {
  return function(t10) {
    this.textContent = n13.call(this, t10);
  };
}
function f6(n13) {
  var t10, r11;
  function i9() {
    var e30 = n13.apply(this, arguments);
    return e30 !== r11 && (t10 = (r11 = e30) && u5(e30)), t10;
  }
  return i9._value = n13, i9;
}
function o10(n13) {
  var t10 = "text";
  if (arguments.length < 1) return (t10 = this.tween(t10)) && t10._value;
  if (n13 == null) return this.tween(t10, null);
  if (typeof n13 != "function") throw new Error();
  return this.tween(t10, f6(n13));
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/transition.mjs
function w9() {
  for (var m12 = this._name, f15 = this._id, s14 = X3(), e30 = this._groups, i9 = e30.length, r11 = 0; r11 < i9; ++r11) for (var d11 = e30[r11], o21 = d11.length, n13, t10 = 0; t10 < o21; ++t10) if (n13 = d11[t10]) {
    var a11 = D4(n13, f15);
    C3(n13, m12, s14, t10, d11, {
      time: a11.time + a11.delay + a11.duration,
      delay: 0,
      duration: a11.duration,
      ease: a11.ease
    });
  }
  return new o6(e30, this._parents, m12, s14);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/end.mjs
function d4() {
  var i9, n13, e30 = this, r11 = e30._id, t10 = e30.size();
  return new Promise(function(o21, f15) {
    var u9 = {
      value: f15
    }, s14 = {
      value: function() {
        --t10 === 0 && o21();
      }
    };
    e30.each(function() {
      var c11 = j3(this, r11), a11 = c11.on;
      a11 !== i9 && (n13 = (i9 = a11).copy(), n13._.cancel.push(u9), n13._.interrupt.push(u9), n13._.end.push(s14)), c11.on = n13;
    }), t10 === 0 && o21();
  });
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/transition/index.mjs
var V5 = 0;
function o6(r11, n13, s14, m12) {
  this._groups = r11, this._parents = n13, this._name = s14, this._id = m12;
}
function e5(r11) {
  return Ne().transition(r11);
}
function X3() {
  return ++V5;
}
var t = Ne.prototype;
o6.prototype = e5.prototype = {
  constructor: o6,
  select: T5,
  selectAll: B4,
  selectChild: t.selectChild,
  selectChildren: t.selectChildren,
  filter: v7,
  merge: A6,
  selection: e4,
  transition: w9,
  call: t.call,
  nodes: t.nodes,
  node: t.node,
  size: t.size,
  empty: t.empty,
  each: t.each,
  on: v8,
  attr: w7,
  attrTween: h5,
  style: x5,
  styleTween: o8,
  text: r4,
  textTween: o10,
  remove: e3,
  tween: d2,
  delay: a4,
  duration: s7,
  ease: s8,
  easeVarying: f4,
  end: d4,
  [Symbol.iterator]: t[Symbol.iterator]
};

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/interrupt.mjs
function o11(e30, i9) {
  var r11 = e30.__transition, t10, a11, n13 = true, l9;
  if (r11) {
    i9 = i9 == null ? null : i9 + "";
    for (l9 in r11) {
      if ((t10 = r11[l9]).name !== i9) {
        n13 = false;
        continue;
      }
      a11 = t10.state > s5 && t10.state < E4, t10.state = x4, t10.timer.stop(), t10.on.call(a11 ? "interrupt" : "cancel", e30, e30.__data__, t10.index, t10.group), delete r11[l9];
    }
    n13 && delete e30.__transition;
  }
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/selection/interrupt.mjs
function n(t10) {
  return this.each(function() {
    o11(this, t10);
  });
}

// deno:https://esm.sh/d3-ease@3.0.1/denonext/d3-ease.mjs
function b7(n13) {
  return ((n13 *= 2) <= 1 ? n13 * n13 * n13 : (n13 -= 2) * n13 * n13 + 2) / 2;
}
var p5 = 3;
var Q3 = function n2(e30) {
  e30 = +e30;
  function u9(t10) {
    return Math.pow(t10, e30);
  }
  return u9.exponent = n2, u9;
}(p5);
var S3 = function n3(e30) {
  e30 = +e30;
  function u9(t10) {
    return 1 - Math.pow(1 - t10, e30);
  }
  return u9.exponent = n3, u9;
}(p5);
var m6 = function n4(e30) {
  e30 = +e30;
  function u9(t10) {
    return ((t10 *= 2) <= 1 ? Math.pow(t10, e30) : 2 - Math.pow(2 - t10, e30)) / 2;
  }
  return u9.exponent = n4, u9;
}(p5);
var h7 = Math.PI;
var M4 = h7 / 2;
function o12(n13) {
  return (Math.pow(2, -10 * n13) - 9765625e-10) * 1.0009775171065494;
}
var I3 = 0.36363636363636365;
var F6 = 6 / 11;
var G5 = 8 / 11;
var H5 = 3 / 4;
var J4 = 9 / 11;
var K3 = 10 / 11;
var N5 = 15 / 16;
var R3 = 21 / 22;
var T7 = 63 / 64;
var i5 = 1 / I3 / I3;
var O2 = 1.70158;
var W4 = function n5(e30) {
  e30 = +e30;
  function u9(t10) {
    return (t10 = +t10) * t10 * (e30 * (t10 - 1) + t10);
  }
  return u9.overshoot = n5, u9;
}(O2);
var X4 = function n6(e30) {
  e30 = +e30;
  function u9(t10) {
    return --t10 * t10 * ((t10 + 1) * e30 + t10) + 1;
  }
  return u9.overshoot = n6, u9;
}(O2);
var y4 = function n7(e30) {
  e30 = +e30;
  function u9(t10) {
    return ((t10 *= 2) < 1 ? t10 * t10 * ((e30 + 1) * t10 - e30) : (t10 -= 2) * t10 * ((e30 + 1) * t10 + e30) + 2) / 2;
  }
  return u9.overshoot = n7, u9;
}(O2);
var c5 = 2 * Math.PI;
var x6 = 1;
var f7 = 0.3;
var Y3 = function n8(e30, u9) {
  var t10 = Math.asin(1 / (e30 = Math.max(1, e30))) * (u9 /= c5);
  function a11(r11) {
    return e30 * o12(- --r11) * Math.sin((t10 - r11) / u9);
  }
  return a11.amplitude = function(r11) {
    return n8(r11, u9 * c5);
  }, a11.period = function(r11) {
    return n8(e30, r11);
  }, a11;
}(x6, f7);
var q5 = function n9(e30, u9) {
  var t10 = Math.asin(1 / (e30 = Math.max(1, e30))) * (u9 /= c5);
  function a11(r11) {
    return 1 - e30 * o12(r11 = +r11) * Math.sin((r11 + t10) / u9);
  }
  return a11.amplitude = function(r11) {
    return n9(r11, u9 * c5);
  }, a11.period = function(r11) {
    return n9(e30, r11);
  }, a11;
}(x6, f7);
var Z4 = function n10(e30, u9) {
  var t10 = Math.asin(1 / (e30 = Math.max(1, e30))) * (u9 /= c5);
  function a11(r11) {
    return ((r11 = r11 * 2 - 1) < 0 ? e30 * o12(-r11) * Math.sin((t10 - r11) / u9) : 2 - e30 * o12(r11) * Math.sin((t10 + r11) / u9)) / 2;
  }
  return a11.amplitude = function(r11) {
    return n10(r11, u9 * c5);
  }, a11.period = function(r11) {
    return n10(e30, r11);
  }, a11;
}(x6, f7);

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/selection/transition.mjs
var c6 = {
  time: null,
  delay: 0,
  duration: 250,
  ease: b7
};
function d5(t10, i9) {
  for (var r11; !(r11 = t10.__transition) || !(r11 = r11[i9]); ) if (!(t10 = t10.parentNode)) throw new Error(`transition ${i9} not found`);
  return r11;
}
function T8(t10) {
  var i9, r11;
  t10 instanceof o6 ? (i9 = t10._id, t10 = t10._name) : (i9 = X3(), (r11 = c6).time = w6(), t10 = t10 == null ? null : t10 + "");
  for (var o21 = this._groups, a11 = o21.length, e30 = 0; e30 < a11; ++e30) for (var f15 = o21[e30], s14 = f15.length, l9, n13 = 0; n13 < s14; ++n13) (l9 = f15[n13]) && C3(l9, t10, i9, n13, f15, r11 || d5(l9, i9));
  return new o6(o21, this._parents, t10, i9);
}

// deno:https://esm.sh/d3-transition@3.0.1/denonext/src/selection/index.mjs
Ne.prototype.interrupt = n;
Ne.prototype.transition = T8;

// deno:https://esm.sh/d3-brush@3.0.0/denonext/d3-brush.mjs
var { abs: gt3, max: k3, min: x7 } = Math;
function wt2(t10) {
  return [
    +t10[0],
    +t10[1]
  ];
}
function ut2(t10) {
  return [
    wt2(t10[0]),
    wt2(t10[1])
  ];
}
var tt3 = {
  name: "x",
  handles: [
    "w",
    "e"
  ].map(q6),
  input: function(t10, _8) {
    return t10 == null ? null : [
      [
        +t10[0],
        _8[0][1]
      ],
      [
        +t10[1],
        _8[1][1]
      ]
    ];
  },
  output: function(t10) {
    return t10 && [
      t10[0][0],
      t10[1][0]
    ];
  }
};
var et3 = {
  name: "y",
  handles: [
    "n",
    "s"
  ].map(q6),
  input: function(t10, _8) {
    return t10 == null ? null : [
      [
        _8[0][0],
        +t10[0]
      ],
      [
        _8[1][0],
        +t10[1]
      ]
    ];
  },
  output: function(t10) {
    return t10 && [
      t10[0][1],
      t10[1][1]
    ];
  }
};
var Mt2 = {
  name: "xy",
  handles: [
    "n",
    "w",
    "e",
    "s",
    "nw",
    "ne",
    "sw",
    "se"
  ].map(q6),
  input: function(t10) {
    return t10 == null ? null : ut2(t10);
  },
  output: function(t10) {
    return t10;
  }
};
function q6(t10) {
  return {
    type: t10
  };
}

// deno:https://esm.sh/d3-path@3.1.0/denonext/d3-path.mjs
var c7 = Math.PI;
var y6 = 2 * c7;
var u6 = 1e-6;
var q7 = y6 - u6;
function A7($9) {
  this._ += $9[0];
  for (let t10 = 1, h9 = $9.length; t10 < h9; ++t10) this._ += arguments[t10] + $9[t10];
}
function C4($9) {
  let t10 = Math.floor($9);
  if (!(t10 >= 0)) throw new Error(`invalid digits: ${$9}`);
  if (t10 > 15) return A7;
  let h9 = 10 ** t10;
  return function(i9) {
    this._ += i9[0];
    for (let s14 = 1, e30 = i9.length; s14 < e30; ++s14) this._ += Math.round(arguments[s14] * h9) / h9 + i9[s14];
  };
}
var d6 = class {
  constructor(t10) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = t10 == null ? A7 : C4(t10);
  }
  moveTo(t10, h9) {
    this._append`M${this._x0 = this._x1 = +t10},${this._y0 = this._y1 = +h9}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t10, h9) {
    this._append`L${this._x1 = +t10},${this._y1 = +h9}`;
  }
  quadraticCurveTo(t10, h9, i9, s14) {
    this._append`Q${+t10},${+h9},${this._x1 = +i9},${this._y1 = +s14}`;
  }
  bezierCurveTo(t10, h9, i9, s14, e30, a11) {
    this._append`C${+t10},${+h9},${+i9},${+s14},${this._x1 = +e30},${this._y1 = +a11}`;
  }
  arcTo(t10, h9, i9, s14, e30) {
    if (t10 = +t10, h9 = +h9, i9 = +i9, s14 = +s14, e30 = +e30, e30 < 0) throw new Error(`negative radius: ${e30}`);
    let a11 = this._x1, r11 = this._y1, l9 = i9 - t10, p12 = s14 - h9, _8 = a11 - t10, o21 = r11 - h9, n13 = _8 * _8 + o21 * o21;
    if (this._x1 === null) this._append`M${this._x1 = t10},${this._y1 = h9}`;
    else if (n13 > u6) if (!(Math.abs(o21 * l9 - p12 * _8) > u6) || !e30) this._append`L${this._x1 = t10},${this._y1 = h9}`;
    else {
      let f15 = i9 - a11, M10 = s14 - r11, v15 = l9 * l9 + p12 * p12, L10 = f15 * f15 + M10 * M10, b11 = Math.sqrt(v15), T12 = Math.sqrt(n13), m12 = e30 * Math.tan((c7 - Math.acos((v15 + n13 - L10) / (2 * b11 * T12))) / 2), x15 = m12 / T12, w15 = m12 / b11;
      Math.abs(x15 - 1) > u6 && this._append`L${t10 + x15 * _8},${h9 + x15 * o21}`, this._append`A${e30},${e30},0,0,${+(o21 * f15 > _8 * M10)},${this._x1 = t10 + w15 * l9},${this._y1 = h9 + w15 * p12}`;
    }
  }
  arc(t10, h9, i9, s14, e30, a11) {
    if (t10 = +t10, h9 = +h9, i9 = +i9, a11 = !!a11, i9 < 0) throw new Error(`negative radius: ${i9}`);
    let r11 = i9 * Math.cos(s14), l9 = i9 * Math.sin(s14), p12 = t10 + r11, _8 = h9 + l9, o21 = 1 ^ a11, n13 = a11 ? s14 - e30 : e30 - s14;
    this._x1 === null ? this._append`M${p12},${_8}` : (Math.abs(this._x1 - p12) > u6 || Math.abs(this._y1 - _8) > u6) && this._append`L${p12},${_8}`, i9 && (n13 < 0 && (n13 = n13 % y6 + y6), n13 > q7 ? this._append`A${i9},${i9},0,1,${o21},${t10 - r11},${h9 - l9}A${i9},${i9},0,1,${o21},${this._x1 = p12},${this._y1 = _8}` : n13 > u6 && this._append`A${i9},${i9},0,${+(n13 >= c7)},${o21},${this._x1 = t10 + i9 * Math.cos(e30)},${this._y1 = h9 + i9 * Math.sin(e30)}`);
  }
  rect(t10, h9, i9, s14) {
    this._append`M${this._x0 = this._x1 = +t10},${this._y0 = this._y1 = +h9}h${i9 = +i9}v${+s14}h${-i9}Z`;
  }
  toString() {
    return this._;
  }
};
function E5() {
  return new d6();
}
E5.prototype = d6.prototype;

// deno:https://esm.sh/d3-chord@3.0.1/denonext/d3-chord.mjs
var k4 = Math.PI;
var C5 = k4 / 2;
var q8 = k4 * 2;
var E6 = Array.prototype.slice;

// deno:https://esm.sh/d3-contour@4.0.2/denonext/d3-contour.mjs
var Y5 = Array.prototype;
var L3 = Y5.slice;

// deno:https://esm.sh/robust-predicates@3.0.2/denonext/robust-predicates.mjs
var rt2 = 11102230246251565e-32;
var Nt2 = (3 + 8 * rt2) * rt2;
function L4(K9) {
  return new Float64Array(K9);
}
var Cc = (3 + 16 * rt2) * rt2;
var jc = (2 + 12 * rt2) * rt2;
var Ac = (9 + 64 * rt2) * rt2 * rt2;
var xt3 = L4(4);
var xn = L4(8);
var yn = L4(12);
var tc = L4(16);
var mt2 = L4(4);
var Dc = (7 + 56 * rt2) * rt2;
var Fc = (3 + 28 * rt2) * rt2;
var qc = (26 + 288 * rt2) * rt2 * rt2;
var yt3 = L4(4);
var tn = L4(4);
var nn = L4(4);
var nc = L4(4);
var cc = L4(4);
var sc = L4(4);
var oc = L4(4);
var ec = L4(4);
var rc = L4(4);
var Cn = L4(8);
var jn = L4(8);
var An = L4(8);
var Ht2 = L4(4);
var dn = L4(8);
var ic = L4(8);
var Ct2 = L4(8);
var cn = L4(12);
var on = L4(192);
var Bn = L4(192);
var Ic = (10 + 96 * rt2) * rt2;
var Jc = (4 + 48 * rt2) * rt2;
var Kc = (44 + 576 * rt2) * rt2 * rt2;
var Pt2 = L4(4);
var Rt = L4(4);
var St2 = L4(4);
var It2 = L4(4);
var Jt2 = L4(4);
var Kt2 = L4(4);
var vt2 = L4(4);
var wt3 = L4(4);
var Qn = L4(8);
var Dn = L4(8);
var Fn = L4(8);
var qn = L4(8);
var En = L4(8);
var Gn = L4(8);
var bn = L4(8);
var hn = L4(8);
var _n = L4(8);
var Vt2 = L4(4);
var Wt2 = L4(4);
var Xt2 = L4(4);
var x8 = L4(8);
var tt4 = L4(16);
var lt2 = L4(16);
var at2 = L4(16);
var it2 = L4(32);
var Tt2 = L4(32);
var ut3 = L4(48);
var jt2 = L4(64);
var en = L4(1152);
var Hn = L4(1152);
var Pc = (16 + 224 * rt2) * rt2;
var Rc = (5 + 72 * rt2) * rt2;
var Sc = (71 + 1408 * rt2) * rt2 * rt2;
var At3 = L4(4);
var Bt2 = L4(4);
var gt4 = L4(4);
var Yt2 = L4(4);
var Zt2 = L4(4);
var Qt2 = L4(4);
var Dt2 = L4(4);
var $t2 = L4(4);
var Ft2 = L4(4);
var kt2 = L4(4);
var In = L4(24);
var Jn = L4(24);
var Kn = L4(24);
var Ln = L4(24);
var Nn = L4(24);
var On = L4(24);
var Pn = L4(24);
var Rn = L4(24);
var Sn = L4(24);
var Tn = L4(24);
var ln = L4(1152);
var vn = L4(1152);
var an = L4(1152);
var wn = L4(1152);
var lc = L4(1152);
var Vn = L4(2304);
var Wn = L4(2304);
var ac = L4(3456);
var fc = L4(5760);
var uc = L4(8);
var dc = L4(8);
var bc = L4(8);
var Tc = L4(16);
var pn = L4(24);
var Ut2 = L4(48);
var Un = L4(48);
var Mn = L4(96);
var zt2 = L4(192);
var hc = L4(384);
var _c = L4(384);
var pc = L4(384);
var Uc = L4(768);
var Mc = L4(96);
var mc = L4(96);
var vc = L4(96);
var wc = L4(1152);

// deno:https://esm.sh/delaunator@5.0.1/denonext/delaunator.mjs
var C6 = Math.pow(2, -52);
var j4 = new Uint32Array(512);

// deno:https://esm.sh/d3-delaunay@6.0.4/denonext/d3-delaunay.mjs
var q9 = 2 * Math.PI;

// deno:https://esm.sh/d3-dsv@3.0.1/denonext/d3-dsv.mjs
var y7 = {};
var A8 = {};
var x9 = 34;
var w10 = 10;
var E8 = 13;
function P4(r11) {
  return new Function("d", "return {" + r11.map(function(e30, o21) {
    return JSON.stringify(e30) + ": d[" + o21 + '] || ""';
  }).join(",") + "}");
}
function Z6(r11, e30) {
  var o21 = P4(r11);
  return function(a11, s14) {
    return e30(o21(a11), s14, r11);
  };
}
function D5(r11) {
  var e30 = /* @__PURE__ */ Object.create(null), o21 = [];
  return r11.forEach(function(a11) {
    for (var s14 in a11) s14 in e30 || o21.push(e30[s14] = s14);
  }), o21;
}
function c8(r11, e30) {
  var o21 = r11 + "", a11 = o21.length;
  return a11 < e30 ? new Array(e30 - a11 + 1).join(0) + o21 : o21;
}
function H6(r11) {
  return r11 < 0 ? "-" + c8(-r11, 6) : r11 > 9999 ? "+" + c8(r11, 6) : c8(r11, 4);
}
function L5(r11) {
  var e30 = r11.getUTCHours(), o21 = r11.getUTCMinutes(), a11 = r11.getUTCSeconds(), s14 = r11.getUTCMilliseconds();
  return isNaN(r11) ? "Invalid Date" : H6(r11.getUTCFullYear(), 4) + "-" + c8(r11.getUTCMonth() + 1, 2) + "-" + c8(r11.getUTCDate(), 2) + (s14 ? "T" + c8(e30, 2) + ":" + c8(o21, 2) + ":" + c8(a11, 2) + "." + c8(s14, 3) + "Z" : a11 ? "T" + c8(e30, 2) + ":" + c8(o21, 2) + ":" + c8(a11, 2) + "Z" : o21 || e30 ? "T" + c8(e30, 2) + ":" + c8(o21, 2) + "Z" : "");
}
function F7(r11) {
  var e30 = new RegExp('["' + r11 + `
\r]`), o21 = r11.charCodeAt(0);
  function a11(t10, n13) {
    var u9, i9, f15 = s14(t10, function(l9, m12) {
      if (u9) return u9(l9, m12 - 1);
      i9 = l9, u9 = n13 ? Z6(l9, n13) : P4(l9);
    });
    return f15.columns = i9 || [], f15;
  }
  function s14(t10, n13) {
    var u9 = [], i9 = t10.length, f15 = 0, l9 = 0, m12, N10 = i9 <= 0, d11 = false;
    t10.charCodeAt(i9 - 1) === w10 && --i9, t10.charCodeAt(i9 - 1) === E8 && --i9;
    function U9() {
      if (N10) return A8;
      if (d11) return d11 = false, y7;
      var T12, g7 = f15, R8;
      if (t10.charCodeAt(g7) === x9) {
        for (; f15++ < i9 && t10.charCodeAt(f15) !== x9 || t10.charCodeAt(++f15) === x9; ) ;
        return (T12 = f15) >= i9 ? N10 = true : (R8 = t10.charCodeAt(f15++)) === w10 ? d11 = true : R8 === E8 && (d11 = true, t10.charCodeAt(f15) === w10 && ++f15), t10.slice(g7 + 1, T12 - 1).replace(/""/g, '"');
      }
      for (; f15 < i9; ) {
        if ((R8 = t10.charCodeAt(T12 = f15++)) === w10) d11 = true;
        else if (R8 === E8) d11 = true, t10.charCodeAt(f15) === w10 && ++f15;
        else if (R8 !== o21) continue;
        return t10.slice(g7, T12);
      }
      return N10 = true, t10.slice(g7, i9);
    }
    for (; (m12 = U9()) !== A8; ) {
      for (var C11 = []; m12 !== y7 && m12 !== A8; ) C11.push(m12), m12 = U9();
      n13 && (C11 = n13(C11, l9++)) == null || u9.push(C11);
    }
    return u9;
  }
  function j9(t10, n13) {
    return t10.map(function(u9) {
      return n13.map(function(i9) {
        return h9(u9[i9]);
      }).join(r11);
    });
  }
  function I9(t10, n13) {
    return n13 == null && (n13 = D5(t10)), [
      n13.map(h9).join(r11)
    ].concat(j9(t10, n13)).join(`
`);
  }
  function O5(t10, n13) {
    return n13 == null && (n13 = D5(t10)), j9(t10, n13).join(`
`);
  }
  function M10(t10) {
    return t10.map(B8).join(`
`);
  }
  function B8(t10) {
    return t10.map(h9).join(r11);
  }
  function h9(t10) {
    return t10 == null ? "" : t10 instanceof Date ? L5(t10) : e30.test(t10 += "") ? '"' + t10.replace(/"/g, '""') + '"' : t10;
  }
  return {
    parse: a11,
    parseRows: s14,
    format: I9,
    formatBody: O5,
    formatRows: M10,
    formatRow: B8,
    formatValue: h9
  };
}
var p6 = F7(",");
var S5 = p6.parse;
var Y7 = p6.parseRows;
var z4 = p6.format;
var J5 = p6.formatBody;
var Q4 = p6.formatRows;
var W5 = p6.formatRow;
var $4 = p6.formatValue;
var v9 = F7("	");
var k5 = v9.parse;
var q10 = v9.parseRows;
var G6 = v9.format;
var K4 = v9.formatBody;
var X6 = v9.formatRows;
var _4 = v9.formatRow;
var b8 = v9.formatValue;
var rr2 = (/* @__PURE__ */ new Date("2019-01-01T00:00")).getHours() || (/* @__PURE__ */ new Date("2019-07-01T00:00")).getHours();

// deno:https://esm.sh/d3-fetch@3.0.1/denonext/d3-fetch.mjs
function d7(t10) {
  if (!t10.ok) throw new Error(t10.status + " " + t10.statusText);
  return t10.text();
}
function f8(t10, r11) {
  return fetch(t10, r11).then(d7);
}
function s10(t10) {
  return function(r11, e30, o21) {
    return arguments.length === 2 && typeof e30 == "function" && (o21 = e30, e30 = void 0), f8(r11, e30).then(function(n13) {
      return t10(n13, o21);
    });
  };
}
var g4 = s10(S5);
var w11 = s10(k5);
function a7(t10) {
  return (r11, e30) => f8(r11, e30).then((o21) => new DOMParser().parseFromString(o21, t10));
}
var E9 = a7("application/xml");
var k6 = a7("text/html");
var y8 = a7("image/svg+xml");

// deno:https://esm.sh/d3-quadtree@3.0.1/denonext/d3-quadtree.mjs
function k7(i9) {
  let t10 = +this._x.call(null, i9), e30 = +this._y.call(null, i9);
  return I4(this.cover(t10, e30), t10, e30, i9);
}
function I4(i9, t10, e30, n13) {
  if (isNaN(t10) || isNaN(e30)) return i9;
  var r11, o21 = i9._root, s14 = {
    data: n13
  }, l9 = i9._x0, h9 = i9._y0, f15 = i9._x1, a11 = i9._y1, u9, _8, p12, y11, w15, x15, d11, g7;
  if (!o21) return i9._root = s14, i9;
  for (; o21.length; ) if ((w15 = t10 >= (u9 = (l9 + f15) / 2)) ? l9 = u9 : f15 = u9, (x15 = e30 >= (_8 = (h9 + a11) / 2)) ? h9 = _8 : a11 = _8, r11 = o21, !(o21 = o21[d11 = x15 << 1 | w15])) return r11[d11] = s14, i9;
  if (p12 = +i9._x.call(null, o21.data), y11 = +i9._y.call(null, o21.data), t10 === p12 && e30 === y11) return s14.next = o21, r11 ? r11[d11] = s14 : i9._root = s14, i9;
  do
    r11 = r11 ? r11[d11] = new Array(4) : i9._root = new Array(4), (w15 = t10 >= (u9 = (l9 + f15) / 2)) ? l9 = u9 : f15 = u9, (x15 = e30 >= (_8 = (h9 + a11) / 2)) ? h9 = _8 : a11 = _8;
  while ((d11 = x15 << 1 | w15) === (g7 = (y11 >= _8) << 1 | p12 >= u9));
  return r11[g7] = o21, r11[d11] = s14, i9;
}
function Q5(i9) {
  var t10, e30, n13 = i9.length, r11, o21, s14 = new Array(n13), l9 = new Array(n13), h9 = 1 / 0, f15 = 1 / 0, a11 = -1 / 0, u9 = -1 / 0;
  for (e30 = 0; e30 < n13; ++e30) isNaN(r11 = +this._x.call(null, t10 = i9[e30])) || isNaN(o21 = +this._y.call(null, t10)) || (s14[e30] = r11, l9[e30] = o21, r11 < h9 && (h9 = r11), r11 > a11 && (a11 = r11), o21 < f15 && (f15 = o21), o21 > u9 && (u9 = o21));
  if (h9 > a11 || f15 > u9) return this;
  for (this.cover(h9, f15).cover(a11, u9), e30 = 0; e30 < n13; ++e30) I4(this, s14[e30], l9[e30], i9[e30]);
  return this;
}
function M5(i9, t10) {
  if (isNaN(i9 = +i9) || isNaN(t10 = +t10)) return this;
  var e30 = this._x0, n13 = this._y0, r11 = this._x1, o21 = this._y1;
  if (isNaN(e30)) r11 = (e30 = Math.floor(i9)) + 1, o21 = (n13 = Math.floor(t10)) + 1;
  else {
    for (var s14 = r11 - e30 || 1, l9 = this._root, h9, f15; e30 > i9 || i9 >= r11 || n13 > t10 || t10 >= o21; ) switch (f15 = (t10 < n13) << 1 | i9 < e30, h9 = new Array(4), h9[f15] = l9, l9 = h9, s14 *= 2, f15) {
      case 0:
        r11 = e30 + s14, o21 = n13 + s14;
        break;
      case 1:
        e30 = r11 - s14, o21 = n13 + s14;
        break;
      case 2:
        r11 = e30 + s14, n13 = o21 - s14;
        break;
      case 3:
        e30 = r11 - s14, n13 = o21 - s14;
        break;
    }
    this._root && this._root.length && (this._root = l9);
  }
  return this._x0 = e30, this._y0 = n13, this._x1 = r11, this._y1 = o21, this;
}
function j5() {
  var i9 = [];
  return this.visit(function(t10) {
    if (!t10.length) do
      i9.push(t10.data);
    while (t10 = t10.next);
  }), i9;
}
function X7(i9) {
  return arguments.length ? this.cover(+i9[0][0], +i9[0][1]).cover(+i9[1][0], +i9[1][1]) : isNaN(this._x0) ? void 0 : [
    [
      this._x0,
      this._y0
    ],
    [
      this._x1,
      this._y1
    ]
  ];
}
function c9(i9, t10, e30, n13, r11) {
  this.node = i9, this.x0 = t10, this.y0 = e30, this.x1 = n13, this.y1 = r11;
}
function Y8(i9, t10, e30) {
  var n13, r11 = this._x0, o21 = this._y0, s14, l9, h9, f15, a11 = this._x1, u9 = this._y1, _8 = [], p12 = this._root, y11, w15;
  for (p12 && _8.push(new c9(p12, r11, o21, a11, u9)), e30 == null ? e30 = 1 / 0 : (r11 = i9 - e30, o21 = t10 - e30, a11 = i9 + e30, u9 = t10 + e30, e30 *= e30); y11 = _8.pop(); ) if (!(!(p12 = y11.node) || (s14 = y11.x0) > a11 || (l9 = y11.y0) > u9 || (h9 = y11.x1) < r11 || (f15 = y11.y1) < o21)) if (p12.length) {
    var x15 = (s14 + h9) / 2, d11 = (l9 + f15) / 2;
    _8.push(new c9(p12[3], x15, d11, h9, f15), new c9(p12[2], s14, d11, x15, f15), new c9(p12[1], x15, l9, h9, d11), new c9(p12[0], s14, l9, x15, d11)), (w15 = (t10 >= d11) << 1 | i9 >= x15) && (y11 = _8[_8.length - 1], _8[_8.length - 1] = _8[_8.length - 1 - w15], _8[_8.length - 1 - w15] = y11);
  } else {
    var g7 = i9 - +this._x.call(null, p12.data), q15 = t10 - +this._y.call(null, p12.data), b11 = g7 * g7 + q15 * q15;
    if (b11 < e30) {
      var N10 = Math.sqrt(e30 = b11);
      r11 = i9 - N10, o21 = t10 - N10, a11 = i9 + N10, u9 = t10 + N10, n13 = p12.data;
    }
  }
  return n13;
}
function P5(i9) {
  if (isNaN(a11 = +this._x.call(null, i9)) || isNaN(u9 = +this._y.call(null, i9))) return this;
  var t10, e30 = this._root, n13, r11, o21, s14 = this._x0, l9 = this._y0, h9 = this._x1, f15 = this._y1, a11, u9, _8, p12, y11, w15, x15, d11;
  if (!e30) return this;
  if (e30.length) for (; ; ) {
    if ((y11 = a11 >= (_8 = (s14 + h9) / 2)) ? s14 = _8 : h9 = _8, (w15 = u9 >= (p12 = (l9 + f15) / 2)) ? l9 = p12 : f15 = p12, t10 = e30, !(e30 = e30[x15 = w15 << 1 | y11])) return this;
    if (!e30.length) break;
    (t10[x15 + 1 & 3] || t10[x15 + 2 & 3] || t10[x15 + 3 & 3]) && (n13 = t10, d11 = x15);
  }
  for (; e30.data !== i9; ) if (r11 = e30, !(e30 = e30.next)) return this;
  return (o21 = e30.next) && delete e30.next, r11 ? (o21 ? r11.next = o21 : delete r11.next, this) : t10 ? (o21 ? t10[x15] = o21 : delete t10[x15], (e30 = t10[0] || t10[1] || t10[2] || t10[3]) && e30 === (t10[3] || t10[2] || t10[1] || t10[0]) && !e30.length && (n13 ? n13[d11] = e30 : this._root = e30), this) : (this._root = o21, this);
}
function B5(i9) {
  for (var t10 = 0, e30 = i9.length; t10 < e30; ++t10) this.remove(i9[t10]);
  return this;
}
function C7() {
  return this._root;
}
function D6() {
  var i9 = 0;
  return this.visit(function(t10) {
    if (!t10.length) do
      ++i9;
    while (t10 = t10.next);
  }), i9;
}
function E10(i9) {
  var t10 = [], e30, n13 = this._root, r11, o21, s14, l9, h9;
  for (n13 && t10.push(new c9(n13, this._x0, this._y0, this._x1, this._y1)); e30 = t10.pop(); ) if (!i9(n13 = e30.node, o21 = e30.x0, s14 = e30.y0, l9 = e30.x1, h9 = e30.y1) && n13.length) {
    var f15 = (o21 + l9) / 2, a11 = (s14 + h9) / 2;
    (r11 = n13[3]) && t10.push(new c9(r11, f15, a11, l9, h9)), (r11 = n13[2]) && t10.push(new c9(r11, o21, a11, f15, h9)), (r11 = n13[1]) && t10.push(new c9(r11, f15, s14, l9, a11)), (r11 = n13[0]) && t10.push(new c9(r11, o21, s14, f15, a11));
  }
  return this;
}
function F8(i9) {
  var t10 = [], e30 = [], n13;
  for (this._root && t10.push(new c9(this._root, this._x0, this._y0, this._x1, this._y1)); n13 = t10.pop(); ) {
    var r11 = n13.node;
    if (r11.length) {
      var o21, s14 = n13.x0, l9 = n13.y0, h9 = n13.x1, f15 = n13.y1, a11 = (s14 + h9) / 2, u9 = (l9 + f15) / 2;
      (o21 = r11[0]) && t10.push(new c9(o21, s14, l9, a11, u9)), (o21 = r11[1]) && t10.push(new c9(o21, a11, l9, h9, u9)), (o21 = r11[2]) && t10.push(new c9(o21, s14, u9, a11, f15)), (o21 = r11[3]) && t10.push(new c9(o21, a11, u9, h9, f15));
    }
    e30.push(n13);
  }
  for (; n13 = e30.pop(); ) i9(n13.node, n13.x0, n13.y0, n13.x1, n13.y1);
  return this;
}
function G7(i9) {
  return i9[0];
}
function H7(i9) {
  return arguments.length ? (this._x = i9, this) : this._x;
}
function J6(i9) {
  return i9[1];
}
function K5(i9) {
  return arguments.length ? (this._y = i9, this) : this._y;
}
function m7(i9, t10, e30) {
  var n13 = new A9(t10 ?? G7, e30 ?? J6, NaN, NaN, NaN, NaN);
  return i9 == null ? n13 : n13.addAll(i9);
}
function A9(i9, t10, e30, n13, r11, o21) {
  this._x = i9, this._y = t10, this._x0 = e30, this._y0 = n13, this._x1 = r11, this._y1 = o21, this._root = void 0;
}
function L6(i9) {
  for (var t10 = {
    data: i9.data
  }, e30 = t10; i9 = i9.next; ) e30 = e30.next = {
    data: i9.data
  };
  return t10;
}
var v10 = m7.prototype = A9.prototype;
v10.copy = function() {
  var i9 = new A9(this._x, this._y, this._x0, this._y0, this._x1, this._y1), t10 = this._root, e30, n13;
  if (!t10) return i9;
  if (!t10.length) return i9._root = L6(t10), i9;
  for (e30 = [
    {
      source: t10,
      target: i9._root = new Array(4)
    }
  ]; t10 = e30.pop(); ) for (var r11 = 0; r11 < 4; ++r11) (n13 = t10.source[r11]) && (n13.length ? e30.push({
    source: n13,
    target: t10.target[r11] = new Array(4)
  }) : t10.target[r11] = L6(n13));
  return i9;
};
v10.add = k7;
v10.addAll = Q5;
v10.cover = M5;
v10.data = j5;
v10.extent = X7;
v10.find = Y8;
v10.remove = P5;
v10.removeAll = B5;
v10.root = C7;
v10.size = D6;
v10.visit = E10;
v10.visitAfter = F8;
v10.x = H7;
v10.y = K5;

// deno:https://esm.sh/d3-force@3.0.0/denonext/d3-force.mjs
var U5 = Math.PI * (3 - Math.sqrt(5));

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatDecimal.mjs
function r5(e30) {
  return Math.abs(e30 = Math.round(e30)) >= 1e21 ? e30.toLocaleString("en").replace(/,/g, "") : e30.toString(10);
}
function o13(e30, i9) {
  if ((n13 = (e30 = i9 ? e30.toExponential(i9 - 1) : e30.toExponential()).indexOf("e")) < 0) return null;
  var n13, t10 = e30.slice(0, n13);
  return [
    t10.length > 1 ? t10[0] + t10.slice(2) : t10,
    +e30.slice(n13 + 1)
  ];
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/exponent.mjs
function o14(t10) {
  return t10 = o13(Math.abs(t10)), t10 ? t10[1] : NaN;
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatGroup.mjs
function s11(t10, l9) {
  return function(a11, n13) {
    for (var r11 = a11.length, h9 = [], i9 = 0, e30 = t10[0], f15 = 0; r11 > 0 && e30 > 0 && (f15 + e30 + 1 > n13 && (e30 = Math.max(1, n13 - f15)), h9.push(a11.substring(r11 -= e30, r11 + e30)), !((f15 += e30 + 1) > n13)); ) e30 = t10[i9 = (i9 + 1) % t10.length];
    return h9.reverse().join(l9);
  };
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatNumerals.mjs
function e6(n13) {
  return function(r11) {
    return r11.replace(/[0-9]/g, function(t10) {
      return n13[+t10];
    });
  };
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatSpecifier.mjs
var d8 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function o15(t10) {
  if (!(n13 = d8.exec(t10))) throw new Error("invalid format: " + t10);
  var n13;
  return new i6({
    fill: n13[1],
    align: n13[2],
    sign: n13[3],
    symbol: n13[4],
    zero: n13[5],
    width: n13[6],
    comma: n13[7],
    precision: n13[8] && n13[8].slice(1),
    trim: n13[9],
    type: n13[10]
  });
}
o15.prototype = i6.prototype;
function i6(t10) {
  this.fill = t10.fill === void 0 ? " " : t10.fill + "", this.align = t10.align === void 0 ? ">" : t10.align + "", this.sign = t10.sign === void 0 ? "-" : t10.sign + "", this.symbol = t10.symbol === void 0 ? "" : t10.symbol + "", this.zero = !!t10.zero, this.width = t10.width === void 0 ? void 0 : +t10.width, this.comma = !!t10.comma, this.precision = t10.precision === void 0 ? void 0 : +t10.precision, this.trim = !!t10.trim, this.type = t10.type === void 0 ? "" : t10.type + "";
}
i6.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatTrim.mjs
function c10(r11) {
  e: for (var t10 = r11.length, e30 = 1, a11 = -1, f15; e30 < t10; ++e30) switch (r11[e30]) {
    case ".":
      a11 = f15 = e30;
      break;
    case "0":
      a11 === 0 && (a11 = e30), f15 = e30;
      break;
    default:
      if (!+r11[e30]) break e;
      a11 > 0 && (a11 = 0);
      break;
  }
  return a11 > 0 ? r11.slice(0, a11) + r11.slice(f15 + 1) : r11;
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatPrefixAuto.mjs
var m8;
function l6(t10, i9) {
  var n13 = o13(t10, i9);
  if (!n13) return t10 + "";
  var e30 = n13[0], o21 = n13[1], r11 = o21 - (m8 = Math.max(-8, Math.min(8, Math.floor(o21 / 3))) * 3) + 1, a11 = e30.length;
  return r11 === a11 ? e30 : r11 > a11 ? e30 + new Array(r11 - a11 + 1).join("0") : r11 > 0 ? e30.slice(0, r11) + "." + e30.slice(r11) : "0." + new Array(1 - r11).join("0") + o13(t10, Math.max(0, i9 + r11 - 1))[0];
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatRounded.mjs
function f9(t10, i9) {
  var n13 = o13(t10, i9);
  if (!n13) return t10 + "";
  var e30 = n13[0], r11 = n13[1];
  return r11 < 0 ? "0." + new Array(-r11).join("0") + e30 : e30.length > r11 + 1 ? e30.slice(0, r11 + 1) + "." + e30.slice(r11 + 1) : e30 + new Array(r11 - e30.length + 2).join("0");
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/formatTypes.mjs
var m9 = {
  "%": (o21, t10) => (o21 * 100).toFixed(t10),
  b: (o21) => Math.round(o21).toString(2),
  c: (o21) => o21 + "",
  d: r5,
  e: (o21, t10) => o21.toExponential(t10),
  f: (o21, t10) => o21.toFixed(t10),
  g: (o21, t10) => o21.toPrecision(t10),
  o: (o21) => Math.round(o21).toString(8),
  p: (o21, t10) => f9(o21 * 100, t10),
  r: f9,
  s: l6,
  X: (o21) => Math.round(o21).toString(16).toUpperCase(),
  x: (o21) => Math.round(o21).toString(16)
};

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/identity.mjs
function e7(t10) {
  return t10;
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/locale.mjs
var C8 = Array.prototype.map;
var E11 = [
  "y",
  "z",
  "a",
  "f",
  "p",
  "n",
  "\xB5",
  "m",
  "",
  "k",
  "M",
  "G",
  "T",
  "P",
  "E",
  "Z",
  "Y"
];
function nn2(r11) {
  var M10 = r11.grouping === void 0 || r11.thousands === void 0 ? e7 : s11(C8.call(r11.grouping, Number), r11.thousands + ""), G11 = r11.currency === void 0 ? "" : r11.currency[0] + "", I9 = r11.currency === void 0 ? "" : r11.currency[1] + "", $9 = r11.decimal === void 0 ? "." : r11.decimal + "", j9 = r11.numerals === void 0 ? e7 : e6(C8.call(r11.numerals, String)), F14 = r11.percent === void 0 ? "%" : r11.percent + "", L10 = r11.minus === void 0 ? "\u2212" : r11.minus + "", X12 = r11.nan === void 0 ? "NaN" : r11.nan + "";
  function w15(t10) {
    t10 = o15(t10);
    var h9 = t10.fill, a11 = t10.align, m12 = t10.sign, g7 = t10.symbol, s14 = t10.zero, y11 = t10.width, c11 = t10.comma, d11 = t10.precision, k10 = t10.trim, i9 = t10.type;
    i9 === "n" ? (c11 = true, i9 = "g") : m9[i9] || (d11 === void 0 && (d11 = 12), k10 = true, i9 = "g"), (s14 || h9 === "0" && a11 === "=") && (s14 = true, h9 = "0", a11 = "=");
    var Z10 = g7 === "$" ? G11 : g7 === "#" && /[boxX]/.test(i9) ? "0" + i9.toLowerCase() : "", q15 = g7 === "$" ? I9 : /[%p]/.test(i9) ? F14 : "", S10 = m9[i9], B8 = /[defgprs%]/.test(i9);
    d11 = d11 === void 0 ? 6 : /[gprs]/.test(i9) ? Math.max(1, Math.min(21, d11)) : Math.max(0, Math.min(20, d11));
    function P10(n13) {
      var e30 = Z10, f15 = q15, p12, T12, u9;
      if (i9 === "c") f15 = S10(n13) + f15, n13 = "";
      else {
        n13 = +n13;
        var x15 = n13 < 0 || 1 / n13 < 0;
        if (n13 = isNaN(n13) ? X12 : S10(Math.abs(n13), d11), k10 && (n13 = c10(n13)), x15 && +n13 == 0 && m12 !== "+" && (x15 = false), e30 = (x15 ? m12 === "(" ? m12 : L10 : m12 === "-" || m12 === "(" ? "" : m12) + e30, f15 = (i9 === "s" ? E11[8 + m8 / 3] : "") + f15 + (x15 && m12 === "(" ? ")" : ""), B8) {
          for (p12 = -1, T12 = n13.length; ++p12 < T12; ) if (u9 = n13.charCodeAt(p12), 48 > u9 || u9 > 57) {
            f15 = (u9 === 46 ? $9 + n13.slice(p12 + 1) : n13.slice(p12)) + f15, n13 = n13.slice(0, p12);
            break;
          }
        }
      }
      c11 && !s14 && (n13 = M10(n13, 1 / 0));
      var b11 = e30.length + n13.length + f15.length, o21 = b11 < y11 ? new Array(y11 - b11 + 1).join(h9) : "";
      switch (c11 && s14 && (n13 = M10(o21 + n13, o21.length ? y11 - f15.length : 1 / 0), o21 = ""), a11) {
        case "<":
          n13 = e30 + n13 + f15 + o21;
          break;
        case "=":
          n13 = e30 + o21 + n13 + f15;
          break;
        case "^":
          n13 = o21.slice(0, b11 = o21.length >> 1) + e30 + n13 + f15 + o21.slice(b11);
          break;
        default:
          n13 = o21 + e30 + n13 + f15;
          break;
      }
      return j9(n13);
    }
    return P10.toString = function() {
      return t10 + "";
    }, P10;
  }
  function Y12(t10, h9) {
    var a11 = w15((t10 = o15(t10), t10.type = "f", t10)), m12 = Math.max(-8, Math.min(8, Math.floor(o14(h9) / 3))) * 3, g7 = Math.pow(10, -m12), s14 = E11[8 + m12 / 3];
    return function(y11) {
      return a11(g7 * y11) + s14;
    };
  }
  return {
    format: w15,
    formatPrefix: Y12
  };
}

// deno:https://esm.sh/d3-format@3.1.0/denonext/src/defaultLocale.mjs
var r6;
var e8;
var f10;
o16({
  thousands: ",",
  grouping: [
    3
  ],
  currency: [
    "$",
    ""
  ]
});
function o16(a11) {
  return r6 = nn2(a11), e8 = r6.format, f10 = r6.formatPrefix, r6;
}

// deno:https://esm.sh/d3-geo@3.1.1/denonext/d3-geo.mjs
var w12 = 1e-6;
var vn2 = 1e-12;
var N6 = Math.PI;
var F9 = N6 / 2;
var Xn = N6 / 4;
var k8 = N6 * 2;
var I5 = 180 / N6;
var R4 = N6 / 180;
var z5 = Math.abs;
var an2 = Math.atan;
var G8 = Math.atan2;
var E12 = Math.cos;
var St3 = Math.exp;
var An2 = Math.log;
var x10 = Math.sin;
var Q6 = Math.sign || function(n13) {
  return n13 > 0 ? 1 : n13 < 0 ? -1 : 0;
};
var T9 = Math.sqrt;
var Yn = Math.tan;
function Rt2(n13) {
  return n13 > 1 ? 0 : n13 < -1 ? N6 : Math.acos(n13);
}
function W6(n13) {
  return n13 > 1 ? F9 : n13 < -1 ? -F9 : Math.asin(n13);
}
function $5() {
}
var nt3 = new V();
var Mt3 = new V();
function fn(n13) {
  var t10 = n13[0], e30 = n13[1], r11 = E12(e30);
  return [
    r11 * E12(t10),
    r11 * x10(t10),
    x10(e30)
  ];
}
function xn2(n13, t10) {
  return [
    n13[1] * t10[2] - n13[2] * t10[1],
    n13[2] * t10[0] - n13[0] * t10[2],
    n13[0] * t10[1] - n13[1] * t10[0]
  ];
}
function Nn2(n13) {
  var t10 = T9(n13[0] * n13[0] + n13[1] * n13[1] + n13[2] * n13[2]);
  n13[0] /= t10, n13[1] /= t10, n13[2] /= t10;
}
function gr2(n13, t10) {
  return z5(n13) > N6 && (n13 -= Math.round(n13 / k8) * k8), [
    n13,
    t10
  ];
}
gr2.invert = gr2;
function Xt3() {
  var n13 = [], t10;
  return {
    point: function(e30, r11, i9) {
      t10.push([
        e30,
        r11,
        i9
      ]);
    },
    lineStart: function() {
      n13.push(t10 = []);
    },
    lineEnd: $5,
    rejoin: function() {
      n13.length > 1 && n13.push(n13.pop().concat(n13.shift()));
    },
    result: function() {
      var e30 = n13;
      return n13 = [], t10 = null, e30;
    }
  };
}
function Fn2(n13, t10) {
  return z5(n13[0] - t10[0]) < w12 && z5(n13[1] - t10[1]) < w12;
}
function Yt3(n13, t10, e30, r11) {
  this.x = n13, this.z = t10, this.o = e30, this.e = r11, this.v = false, this.n = this.p = null;
}
function Dt3(n13, t10, e30, r11, i9) {
  var o21 = [], a11 = [], u9, l9;
  if (n13.forEach(function(g7) {
    if (!((y11 = g7.length - 1) <= 0)) {
      var y11, S10 = g7[0], P10 = g7[y11], q15;
      if (Fn2(S10, P10)) {
        if (!S10[2] && !P10[2]) {
          for (i9.lineStart(), u9 = 0; u9 < y11; ++u9) i9.point((S10 = g7[u9])[0], S10[1]);
          i9.lineEnd();
          return;
        }
        P10[0] += 2 * w12;
      }
      o21.push(q15 = new Yt3(S10, g7, null, true)), a11.push(q15.o = new Yt3(S10, null, q15, false)), o21.push(q15 = new Yt3(P10, g7, null, false)), a11.push(q15.o = new Yt3(P10, null, q15, true));
    }
  }), !!o21.length) {
    for (a11.sort(t10), xe3(o21), xe3(a11), u9 = 0, l9 = a11.length; u9 < l9; ++u9) a11[u9].e = e30 = !e30;
    for (var s14 = o21[0], f15, p12; ; ) {
      for (var c11 = s14, m12 = true; c11.v; ) if ((c11 = c11.n) === s14) return;
      f15 = c11.z, i9.lineStart();
      do {
        if (c11.v = c11.o.v = true, c11.e) {
          if (m12) for (u9 = 0, l9 = f15.length; u9 < l9; ++u9) i9.point((p12 = f15[u9])[0], p12[1]);
          else r11(c11.x, c11.n.x, 1, i9);
          c11 = c11.n;
        } else {
          if (m12) for (f15 = c11.p.z, u9 = f15.length - 1; u9 >= 0; --u9) i9.point((p12 = f15[u9])[0], p12[1]);
          else r11(c11.x, c11.p.x, -1, i9);
          c11 = c11.p;
        }
        c11 = c11.o, f15 = c11.z, m12 = !m12;
      } while (!c11.v);
      i9.lineEnd();
    }
  }
}
function xe3(n13) {
  if (t10 = n13.length) {
    for (var t10, e30 = 0, r11 = n13[0], i9; ++e30 < t10; ) r11.n = i9 = n13[e30], i9.p = r11, r11 = i9;
    r11.n = i9 = n13[0], i9.p = r11;
  }
}
function vr(n13) {
  return z5(n13[0]) <= N6 ? n13[0] : Q6(n13[0]) * ((z5(n13[0]) + N6) % k8 - N6);
}
function Ft3(n13, t10) {
  var e30 = vr(t10), r11 = t10[1], i9 = x10(r11), o21 = [
    x10(e30),
    -E12(e30),
    0
  ], a11 = 0, u9 = 0, l9 = new V();
  i9 === 1 ? r11 = F9 + w12 : i9 === -1 && (r11 = -F9 - w12);
  for (var s14 = 0, f15 = n13.length; s14 < f15; ++s14) if (c11 = (p12 = n13[s14]).length) for (var p12, c11, m12 = p12[c11 - 1], g7 = vr(m12), y11 = m12[1] / 2 + Xn, S10 = x10(y11), P10 = E12(y11), q15 = 0; q15 < c11; ++q15, g7 = d11, S10 = A14, P10 = X12, m12 = h9) {
    var h9 = p12[q15], d11 = vr(h9), M10 = h9[1] / 2 + Xn, A14 = x10(M10), X12 = E12(M10), Y12 = d11 - g7, D9 = Y12 >= 0 ? 1 : -1, H12 = D9 * Y12, C11 = H12 > N6, nn4 = S10 * A14;
    if (l9.add(G8(nn4 * D9 * x10(H12), P10 * X12 + nn4 * E12(H12))), a11 += C11 ? Y12 + D9 * k8 : Y12, C11 ^ g7 >= e30 ^ d11 >= e30) {
      var Z10 = xn2(fn(m12), fn(h9));
      Nn2(Z10);
      var j9 = xn2(o21, Z10);
      Nn2(j9);
      var v15 = (C11 ^ Y12 >= 0 ? -1 : 1) * W6(j9[2]);
      (r11 > v15 || r11 === v15 && (Z10[0] || Z10[1])) && (u9 += C11 ^ Y12 >= 0 ? 1 : -1);
    }
  }
  return (a11 < -w12 || a11 < w12 && l9 < -vn2) ^ u9 & 1;
}
function jt3(n13, t10, e30, r11) {
  return function(i9) {
    var o21 = t10(i9), a11 = Xt3(), u9 = t10(a11), l9 = false, s14, f15, p12, c11 = {
      point: m12,
      lineStart: y11,
      lineEnd: S10,
      polygonStart: function() {
        c11.point = P10, c11.lineStart = q15, c11.lineEnd = h9, f15 = [], s14 = [];
      },
      polygonEnd: function() {
        c11.point = m12, c11.lineStart = y11, c11.lineEnd = S10, f15 = Ee(f15);
        var d11 = Ft3(s14, r11);
        f15.length ? (l9 || (i9.polygonStart(), l9 = true), Dt3(f15, hi, d11, e30, i9)) : d11 && (l9 || (i9.polygonStart(), l9 = true), i9.lineStart(), e30(null, null, 1, i9), i9.lineEnd()), l9 && (i9.polygonEnd(), l9 = false), f15 = s14 = null;
      },
      sphere: function() {
        i9.polygonStart(), i9.lineStart(), e30(null, null, 1, i9), i9.lineEnd(), i9.polygonEnd();
      }
    };
    function m12(d11, M10) {
      n13(d11, M10) && i9.point(d11, M10);
    }
    function g7(d11, M10) {
      o21.point(d11, M10);
    }
    function y11() {
      c11.point = g7, o21.lineStart();
    }
    function S10() {
      c11.point = m12, o21.lineEnd();
    }
    function P10(d11, M10) {
      p12.push([
        d11,
        M10
      ]), u9.point(d11, M10);
    }
    function q15() {
      u9.lineStart(), p12 = [];
    }
    function h9() {
      P10(p12[0][0], p12[0][1]), u9.lineEnd();
      var d11 = u9.clean(), M10 = a11.result(), A14, X12 = M10.length, Y12, D9, H12;
      if (p12.pop(), s14.push(p12), p12 = null, !!X12) {
        if (d11 & 1) {
          if (D9 = M10[0], (Y12 = D9.length - 1) > 0) {
            for (l9 || (i9.polygonStart(), l9 = true), i9.lineStart(), A14 = 0; A14 < Y12; ++A14) i9.point((H12 = D9[A14])[0], H12[1]);
            i9.lineEnd();
          }
          return;
        }
        X12 > 1 && d11 & 2 && M10.push(M10.pop().concat(M10.shift())), f15.push(M10.filter(gi));
      }
    }
    return c11;
  };
}
function gi(n13) {
  return n13.length > 1;
}
function hi(n13, t10) {
  return ((n13 = n13.x)[0] < 0 ? n13[1] - F9 - w12 : F9 - n13[1]) - ((t10 = t10.x)[0] < 0 ? t10[1] - F9 - w12 : F9 - t10[1]);
}
var Gt2 = jt3(function() {
  return true;
}, di, xi, [
  -N6,
  -F9
]);
function di(n13) {
  var t10 = NaN, e30 = NaN, r11 = NaN, i9;
  return {
    lineStart: function() {
      n13.lineStart(), i9 = 1;
    },
    point: function(o21, a11) {
      var u9 = o21 > 0 ? N6 : -N6, l9 = z5(o21 - t10);
      z5(l9 - N6) < w12 ? (n13.point(t10, e30 = (e30 + a11) / 2 > 0 ? F9 : -F9), n13.point(r11, e30), n13.lineEnd(), n13.lineStart(), n13.point(u9, e30), n13.point(o21, e30), i9 = 0) : r11 !== u9 && l9 >= N6 && (z5(t10 - r11) < w12 && (t10 -= r11 * w12), z5(o21 - u9) < w12 && (o21 -= u9 * w12), e30 = vi(t10, e30, o21, a11), n13.point(r11, e30), n13.lineEnd(), n13.lineStart(), n13.point(u9, e30), i9 = 0), n13.point(t10 = o21, e30 = a11), r11 = u9;
    },
    lineEnd: function() {
      n13.lineEnd(), t10 = e30 = NaN;
    },
    clean: function() {
      return 2 - i9;
    }
  };
}
function vi(n13, t10, e30, r11) {
  var i9, o21, a11 = x10(n13 - e30);
  return z5(a11) > w12 ? an2((x10(t10) * (o21 = E12(r11)) * x10(e30) - x10(r11) * (i9 = E12(t10)) * x10(n13)) / (i9 * o21 * a11)) : (t10 + r11) / 2;
}
function xi(n13, t10, e30, r11) {
  var i9;
  if (n13 == null) i9 = e30 * F9, r11.point(-N6, i9), r11.point(0, i9), r11.point(N6, i9), r11.point(N6, 0), r11.point(N6, -i9), r11.point(0, -i9), r11.point(-N6, -i9), r11.point(-N6, 0), r11.point(-N6, i9);
  else if (z5(n13[0] - t10[0]) > w12) {
    var o21 = n13[0] < t10[0] ? N6 : -N6;
    i9 = e30 * o21 / 2, r11.point(-o21, i9), r11.point(0, i9), r11.point(o21, i9);
  } else r11.point(t10[0], t10[1]);
}
var ft2 = 1e9;
var Wt3 = -ft2;
var Pr = new V();
var Mr = new V();
var Wn2 = 1 / 0;
var ct2 = -Wn2;
function Qt3(n13) {
  this._context = n13;
}
Qt3.prototype = {
  _radius: 4.5,
  pointRadius: function(n13) {
    return this._radius = n13, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._line === 0 && this._context.closePath(), this._point = NaN;
  },
  point: function(n13, t10) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(n13, t10), this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(n13, t10);
        break;
      }
      default: {
        this._context.moveTo(n13 + this._radius, t10), this._context.arc(n13, t10, this._radius, 0, k8);
        break;
      }
    }
  },
  result: $5
};
var Xr2 = new V();
function Mn2(n13) {
  return function(t10) {
    var e30 = new Dr();
    for (var r11 in n13) e30[r11] = n13[r11];
    return e30.stream = t10, e30;
  };
}
function Dr() {
}
Dr.prototype = {
  constructor: Dr,
  point: function(n13, t10) {
    this.stream.point(n13, t10);
  },
  sphere: function() {
    this.stream.sphere();
  },
  lineStart: function() {
    this.stream.lineStart();
  },
  lineEnd: function() {
    this.stream.lineEnd();
  },
  polygonStart: function() {
    this.stream.polygonStart();
  },
  polygonEnd: function() {
    this.stream.polygonEnd();
  }
};
var Zi = E12(30 * R4);
var Ji = Mn2({
  point: function(n13, t10) {
    this.stream.point(n13 * R4, t10 * R4);
  }
});
function nr(n13) {
  return function(t10, e30) {
    var r11 = E12(t10), i9 = E12(e30), o21 = n13(r11 * i9);
    return o21 === 1 / 0 ? [
      2,
      0
    ] : [
      o21 * i9 * x10(t10),
      o21 * x10(e30)
    ];
  };
}
function gn(n13) {
  return function(t10, e30) {
    var r11 = T9(t10 * t10 + e30 * e30), i9 = n13(r11), o21 = x10(i9), a11 = E12(i9);
    return [
      G8(t10 * o21, r11 * a11),
      W6(r11 && e30 * o21 / r11)
    ];
  };
}
var Wr = nr(function(n13) {
  return T9(2 / (1 + n13));
});
Wr.invert = gn(function(n13) {
  return 2 * W6(n13 / 2);
});
var Hr = nr(function(n13) {
  return (n13 = Rt2(n13)) && n13 / x10(n13);
});
Hr.invert = gn(function(n13) {
  return n13;
});
function Qn2(n13, t10) {
  return [
    n13,
    An2(Yn((F9 + t10) / 2))
  ];
}
Qn2.invert = function(n13, t10) {
  return [
    n13,
    2 * an2(St3(t10)) - F9
  ];
};
function Vn2(n13, t10) {
  return [
    n13,
    t10
  ];
}
Vn2.invert = Vn2;
var ht3 = 1.340264;
var dt2 = -0.081106;
var vt3 = 893e-6;
var xt4 = 3796e-6;
var rr3 = T9(3) / 2;
var oo = 12;
function Br2(n13, t10) {
  var e30 = W6(rr3 * x10(t10)), r11 = e30 * e30, i9 = r11 * r11 * r11;
  return [
    n13 * E12(e30) / (rr3 * (ht3 + 3 * dt2 * r11 + i9 * (7 * vt3 + 9 * xt4 * r11))),
    e30 * (ht3 + dt2 * r11 + i9 * (vt3 + xt4 * r11))
  ];
}
Br2.invert = function(n13, t10) {
  for (var e30 = t10, r11 = e30 * e30, i9 = r11 * r11 * r11, o21 = 0, a11, u9, l9; o21 < oo && (u9 = e30 * (ht3 + dt2 * r11 + i9 * (vt3 + xt4 * r11)) - t10, l9 = ht3 + 3 * dt2 * r11 + i9 * (7 * vt3 + 9 * xt4 * r11), e30 -= a11 = u9 / l9, r11 = e30 * e30, i9 = r11 * r11 * r11, !(z5(a11) < vn2)); ++o21) ;
  return [
    rr3 * n13 * (ht3 + 3 * dt2 * r11 + i9 * (7 * vt3 + 9 * xt4 * r11)) / E12(e30),
    W6(x10(e30) / rr3)
  ];
};
function Zr(n13, t10) {
  var e30 = E12(t10), r11 = E12(n13) * e30;
  return [
    e30 * x10(n13) / r11,
    x10(t10) / r11
  ];
}
Zr.invert = gn(an2);
function kr2(n13, t10) {
  var e30 = t10 * t10, r11 = e30 * e30;
  return [
    n13 * (0.8707 - 0.131979 * e30 + r11 * (-0.013791 + r11 * (3971e-6 * e30 - 1529e-6 * r11))),
    t10 * (1.007226 + e30 * (0.015085 + r11 * (-0.044475 + 0.028874 * e30 - 5916e-6 * r11)))
  ];
}
kr2.invert = function(n13, t10) {
  var e30 = t10, r11 = 25, i9;
  do {
    var o21 = e30 * e30, a11 = o21 * o21;
    e30 -= i9 = (e30 * (1.007226 + o21 * (0.015085 + a11 * (-0.044475 + 0.028874 * o21 - 5916e-6 * a11))) - t10) / (1.007226 + o21 * (0.015085 * 3 + a11 * (-0.044475 * 7 + 0.028874 * 9 * o21 - 5916e-6 * 11 * a11)));
  } while (z5(i9) > w12 && --r11 > 0);
  return [
    n13 / (0.8707 + (o21 = e30 * e30) * (-0.131979 + o21 * (-0.013791 + o21 * o21 * o21 * (3971e-6 - 1529e-6 * o21)))),
    e30
  ];
};
function Ur(n13, t10) {
  return [
    E12(t10) * x10(n13),
    x10(t10)
  ];
}
Ur.invert = gn(W6);
function Jr(n13, t10) {
  var e30 = E12(t10), r11 = 1 + E12(n13) * e30;
  return [
    e30 * x10(n13) / r11,
    x10(t10) / r11
  ];
}
Jr.invert = gn(function(n13) {
  return 2 * an2(n13);
});
function Kr(n13, t10) {
  return [
    An2(Yn((F9 + t10) / 2)),
    -n13
  ];
}
Kr.invert = function(n13, t10) {
  return [
    -t10,
    2 * an2(St3(n13)) - F9
  ];
};

// deno:https://esm.sh/d3-hierarchy@3.1.2/denonext/d3-hierarchy.mjs
function Ce2(e30) {
  var t10 = 0, r11 = e30.children, n13 = r11 && r11.length;
  if (!n13) t10 = 1;
  else for (; --n13 >= 0; ) t10 += r11[n13].value;
  e30.value = t10;
}
function re3() {
  return this.eachAfter(Ce2);
}
function ne3(e30, t10) {
  let r11 = -1;
  for (let n13 of this) e30.call(t10, n13, ++r11, this);
  return this;
}
function ie3(e30, t10) {
  for (var r11 = this, n13 = [
    r11
  ], i9, u9, o21 = -1; r11 = n13.pop(); ) if (e30.call(t10, r11, ++o21, this), i9 = r11.children) for (u9 = i9.length - 1; u9 >= 0; --u9) n13.push(i9[u9]);
  return this;
}
function ue3(e30, t10) {
  for (var r11 = this, n13 = [
    r11
  ], i9 = [], u9, o21, h9, l9 = -1; r11 = n13.pop(); ) if (i9.push(r11), u9 = r11.children) for (o21 = 0, h9 = u9.length; o21 < h9; ++o21) n13.push(u9[o21]);
  for (; r11 = i9.pop(); ) e30.call(t10, r11, ++l9, this);
  return this;
}
function ae4(e30, t10) {
  let r11 = -1;
  for (let n13 of this) if (e30.call(t10, n13, ++r11, this)) return n13;
}
function fe3(e30) {
  return this.eachAfter(function(t10) {
    for (var r11 = +e30(t10.data) || 0, n13 = t10.children, i9 = n13 && n13.length; --i9 >= 0; ) r11 += n13[i9].value;
    t10.value = r11;
  });
}
function oe4(e30) {
  return this.eachBefore(function(t10) {
    t10.children && t10.children.sort(e30);
  });
}
function le3(e30) {
  for (var t10 = this, r11 = De(t10, e30), n13 = [
    t10
  ]; t10 !== r11; ) t10 = t10.parent, n13.push(t10);
  for (var i9 = n13.length; e30 !== r11; ) n13.splice(i9, 0, e30), e30 = e30.parent;
  return n13;
}
function De(e30, t10) {
  if (e30 === t10) return e30;
  var r11 = e30.ancestors(), n13 = t10.ancestors(), i9 = null;
  for (e30 = r11.pop(), t10 = n13.pop(); e30 === t10; ) i9 = e30, e30 = r11.pop(), t10 = n13.pop();
  return i9;
}
function ce3() {
  for (var e30 = this, t10 = [
    e30
  ]; e30 = e30.parent; ) t10.push(e30);
  return t10;
}
function he3() {
  return Array.from(this);
}
function se3() {
  var e30 = [];
  return this.eachBefore(function(t10) {
    t10.children || e30.push(t10);
  }), e30;
}
function pe3() {
  var e30 = this, t10 = [];
  return e30.each(function(r11) {
    r11 !== e30 && t10.push({
      source: r11.parent,
      target: r11
    });
  }), t10;
}
function* de4() {
  var e30 = this, t10, r11 = [
    e30
  ], n13, i9, u9;
  do
    for (t10 = r11.reverse(), r11 = []; e30 = t10.pop(); ) if (yield e30, n13 = e30.children) for (i9 = 0, u9 = n13.length; i9 < u9; ++i9) r11.push(n13[i9]);
  while (r11.length);
}
function T10(e30, t10) {
  e30 instanceof Map ? (e30 = [
    void 0,
    e30
  ], t10 === void 0 && (t10 = Oe)) : t10 === void 0 && (t10 = be4);
  for (var r11 = new M6(e30), n13, i9 = [
    r11
  ], u9, o21, h9, l9; n13 = i9.pop(); ) if ((o21 = t10(n13.data)) && (l9 = (o21 = Array.from(o21)).length)) for (n13.children = o21, h9 = l9 - 1; h9 >= 0; --h9) i9.push(u9 = o21[h9] = new M6(o21[h9])), u9.parent = n13, u9.depth = n13.depth + 1;
  return r11.eachBefore(Z7);
}
function Te() {
  return T10(this).eachBefore(Ve);
}
function be4(e30) {
  return e30.children;
}
function Oe(e30) {
  return Array.isArray(e30) ? e30[1] : null;
}
function Ve(e30) {
  e30.data.value !== void 0 && (e30.value = e30.data.value), e30.data = e30.data.data;
}
function Z7(e30) {
  var t10 = 0;
  do
    e30.height = t10;
  while ((e30 = e30.parent) && e30.height < ++t10);
}
function M6(e30) {
  this.data = e30, this.depth = this.height = 0, this.parent = null;
}
M6.prototype = T10.prototype = {
  constructor: M6,
  count: re3,
  each: ne3,
  eachAfter: ue3,
  eachBefore: ie3,
  find: ae4,
  sum: fe3,
  sort: oe4,
  path: le3,
  ancestors: ce3,
  descendants: he3,
  leaves: se3,
  links: pe3,
  copy: Te,
  [Symbol.iterator]: de4
};
function S6(e30, t10, r11, n13, i9) {
  for (var u9 = e30.children, o21, h9 = -1, l9 = u9.length, f15 = e30.value && (n13 - t10) / e30.value; ++h9 < l9; ) o21 = u9[h9], o21.y0 = r11, o21.y1 = i9, o21.x0 = t10, o21.x1 = t10 += o21.value * f15;
}
function W7(e30, t10) {
  this._ = e30, this.parent = null, this.children = null, this.A = null, this.a = this, this.z = 0, this.m = 0, this.c = 0, this.s = 0, this.t = null, this.i = t10;
}
W7.prototype = Object.create(M6.prototype);
function E13(e30, t10, r11, n13, i9) {
  for (var u9 = e30.children, o21, h9 = -1, l9 = u9.length, f15 = e30.value && (i9 - r11) / e30.value; ++h9 < l9; ) o21 = u9[h9], o21.x0 = t10, o21.x1 = n13, o21.y0 = r11, o21.y1 = r11 += o21.value * f15;
}
var Q7 = (1 + Math.sqrt(5)) / 2;
function U6(e30, t10, r11, n13, i9, u9) {
  for (var o21 = [], h9 = t10.children, l9, f15, c11 = 0, s14 = 0, a11 = h9.length, p12, d11, m12 = t10.value, x15, g7, y11, _8, w15, v15, z9; c11 < a11; ) {
    p12 = i9 - r11, d11 = u9 - n13;
    do
      x15 = h9[s14++].value;
    while (!x15 && s14 < a11);
    for (g7 = y11 = x15, v15 = Math.max(d11 / p12, p12 / d11) / (m12 * e30), z9 = x15 * x15 * v15, w15 = Math.max(y11 / z9, z9 / g7); s14 < a11; ++s14) {
      if (x15 += f15 = h9[s14].value, f15 < g7 && (g7 = f15), f15 > y11 && (y11 = f15), z9 = x15 * x15 * v15, _8 = Math.max(y11 / z9, z9 / g7), _8 > w15) {
        x15 -= f15;
        break;
      }
      w15 = _8;
    }
    o21.push(l9 = {
      value: x15,
      dice: p12 < d11,
      children: h9.slice(c11, s14)
    }), l9.dice ? S6(l9, r11, n13, i9, m12 ? n13 += d11 * x15 / m12 : u9) : E13(l9, r11, n13, m12 ? r11 += p12 * x15 / m12 : i9, u9), m12 -= x15, c11 = s14;
  }
  return o21;
}
var ee3 = function e9(t10) {
  function r11(n13, i9, u9, o21, h9) {
    U6(t10, n13, i9, u9, o21, h9);
  }
  return r11.ratio = function(n13) {
    return e9((n13 = +n13) > 1 ? n13 : 1);
  }, r11;
}(Q7);
var ot2 = function e10(t10) {
  function r11(n13, i9, u9, o21, h9) {
    if ((l9 = n13._squarify) && l9.ratio === t10) for (var l9, f15, c11, s14, a11 = -1, p12, d11 = l9.length, m12 = n13.value; ++a11 < d11; ) {
      for (f15 = l9[a11], c11 = f15.children, s14 = f15.value = 0, p12 = c11.length; s14 < p12; ++s14) f15.value += c11[s14].value;
      f15.dice ? S6(f15, i9, u9, o21, m12 ? u9 += (h9 - u9) * f15.value / m12 : h9) : E13(f15, i9, u9, m12 ? i9 += (o21 - i9) * f15.value / m12 : o21, h9), m12 -= f15.value;
    }
    else n13._squarify = l9 = U6(t10, n13, i9, u9, o21, h9), l9.ratio = t10;
  }
  return r11.ratio = function(n13) {
    return e10((n13 = +n13) > 1 ? n13 : 1);
  }, r11;
}(Q7);

// deno:https://esm.sh/d3-random@3.0.1/denonext/d3-random.mjs
var a8 = Math.random;
var N7 = function e11(t10) {
  function n13(r11, o21) {
    return r11 = r11 == null ? 0 : +r11, o21 = o21 == null ? 1 : +o21, arguments.length === 1 ? (o21 = r11, r11 = 0) : o21 -= r11, function() {
      return t10() * o21 + r11;
    };
  }
  return n13.source = e11, n13;
}(a8);
var E14 = function e12(t10) {
  function n13(r11, o21) {
    return arguments.length < 2 && (o21 = r11, r11 = 0), r11 = Math.floor(r11), o21 = Math.floor(o21) - r11, function() {
      return Math.floor(t10() * o21 + r11);
    };
  }
  return n13.source = e12, n13;
}(a8);
var s12 = function e13(t10) {
  function n13(r11, o21) {
    var u9, f15;
    return r11 = r11 == null ? 0 : +r11, o21 = o21 == null ? 1 : +o21, function() {
      var l9;
      if (u9 != null) l9 = u9, u9 = null;
      else do
        u9 = t10() * 2 - 1, l9 = t10() * 2 - 1, f15 = u9 * u9 + l9 * l9;
      while (!f15 || f15 > 1);
      return r11 + o21 * l9 * Math.sqrt(-2 * Math.log(f15) / f15);
    };
  }
  return n13.source = e13, n13;
}(a8);
var L7 = function e14(t10) {
  var n13 = s12.source(t10);
  function r11() {
    var o21 = n13.apply(this, arguments);
    return function() {
      return Math.exp(o21());
    };
  }
  return r11.source = e14, r11;
}(a8);
var x11 = function e15(t10) {
  function n13(r11) {
    return (r11 = +r11) <= 0 ? () => 0 : function() {
      for (var o21 = 0, u9 = r11; u9 > 1; --u9) o21 += t10();
      return o21 + u9 * t10();
    };
  }
  return n13.source = e15, n13;
}(a8);
var P6 = function e16(t10) {
  var n13 = x11.source(t10);
  function r11(o21) {
    if ((o21 = +o21) == 0) return t10;
    var u9 = n13(o21);
    return function() {
      return u9() / o21;
    };
  }
  return r11.source = e16, r11;
}(a8);
var H8 = function e17(t10) {
  function n13(r11) {
    return function() {
      return -Math.log1p(-t10()) / r11;
    };
  }
  return n13.source = e17, n13;
}(a8);
var C9 = function e18(t10) {
  function n13(r11) {
    if ((r11 = +r11) < 0) throw new RangeError("invalid alpha");
    return r11 = 1 / -r11, function() {
      return Math.pow(1 - t10(), r11);
    };
  }
  return n13.source = e18, n13;
}(a8);
var F10 = function e19(t10) {
  function n13(r11) {
    if ((r11 = +r11) < 0 || r11 > 1) throw new RangeError("invalid p");
    return function() {
      return Math.floor(t10() + r11);
    };
  }
  return n13.source = e19, n13;
}(a8);
var g5 = function e20(t10) {
  function n13(r11) {
    if ((r11 = +r11) < 0 || r11 > 1) throw new RangeError("invalid p");
    return r11 === 0 ? () => 1 / 0 : r11 === 1 ? () => 1 : (r11 = Math.log1p(-r11), function() {
      return 1 + Math.floor(Math.log1p(-t10()) / r11);
    });
  }
  return n13.source = e20, n13;
}(a8);
var p7 = function e21(t10) {
  var n13 = s12.source(t10)();
  function r11(o21, u9) {
    if ((o21 = +o21) < 0) throw new RangeError("invalid k");
    if (o21 === 0) return () => 0;
    if (u9 = u9 == null ? 1 : +u9, o21 === 1) return () => -Math.log1p(-t10()) * u9;
    var f15 = (o21 < 1 ? o21 + 1 : o21) - 1 / 3, l9 = 1 / (3 * Math.sqrt(f15)), m12 = o21 < 1 ? () => Math.pow(t10(), 1 / o21) : () => 1;
    return function() {
      do {
        do
          var i9 = n13(), c11 = 1 + l9 * i9;
        while (c11 <= 0);
        c11 *= c11 * c11;
        var d11 = 1 - t10();
      } while (d11 >= 1 - 0.0331 * i9 * i9 * i9 * i9 && Math.log(d11) >= 0.5 * i9 * i9 + f15 * (1 - c11 + Math.log(c11)));
      return f15 * c11 * m12() * u9;
    };
  }
  return r11.source = e21, r11;
}(a8);
var M7 = function e22(t10) {
  var n13 = p7.source(t10);
  function r11(o21, u9) {
    var f15 = n13(o21), l9 = n13(u9);
    return function() {
      var m12 = f15();
      return m12 === 0 ? 0 : m12 / (m12 + l9());
    };
  }
  return r11.source = e22, r11;
}(a8);
var v11 = function e23(t10) {
  var n13 = g5.source(t10), r11 = M7.source(t10);
  function o21(u9, f15) {
    return u9 = +u9, (f15 = +f15) >= 1 ? () => u9 : f15 <= 0 ? () => 0 : function() {
      for (var l9 = 0, m12 = u9, i9 = f15; m12 * i9 > 16 && m12 * (1 - i9) > 16; ) {
        var c11 = Math.floor((m12 + 1) * i9), d11 = r11(c11, m12 - c11 + 1)();
        d11 <= i9 ? (l9 += c11, m12 -= c11, i9 = (i9 - d11) / (1 - d11)) : (m12 = c11 - 1, i9 /= d11);
      }
      for (var w15 = i9 < 0.5, G11 = w15 ? i9 : 1 - i9, R8 = n13(G11), S10 = R8(), h9 = 0; S10 <= m12; ++h9) S10 += R8();
      return l9 + (w15 ? h9 : m12 - h9);
    };
  }
  return o21.source = e23, o21;
}(a8);
var y9 = function e24(t10) {
  function n13(r11, o21, u9) {
    var f15;
    return (r11 = +r11) == 0 ? f15 = (l9) => -Math.log(l9) : (r11 = 1 / r11, f15 = (l9) => Math.pow(l9, r11)), o21 = o21 == null ? 0 : +o21, u9 = u9 == null ? 1 : +u9, function() {
      return o21 + u9 * f15(-Math.log1p(-t10()));
    };
  }
  return n13.source = e24, n13;
}(a8);
var U7 = function e25(t10) {
  function n13(r11, o21) {
    return r11 = r11 == null ? 0 : +r11, o21 = o21 == null ? 1 : +o21, function() {
      return r11 + o21 * Math.tan(Math.PI * t10());
    };
  }
  return n13.source = e25, n13;
}(a8);
var W8 = function e26(t10) {
  function n13(r11, o21) {
    return r11 = r11 == null ? 0 : +r11, o21 = o21 == null ? 1 : +o21, function() {
      var u9 = t10();
      return r11 + o21 * Math.log(u9 / (1 - u9));
    };
  }
  return n13.source = e26, n13;
}(a8);
var q11 = function e27(t10) {
  var n13 = p7.source(t10), r11 = v11.source(t10);
  function o21(u9) {
    return function() {
      for (var f15 = 0, l9 = u9; l9 > 16; ) {
        var m12 = Math.floor(0.875 * l9), i9 = n13(m12)();
        if (i9 > l9) return f15 + r11(m12 - 1, l9 / i9)();
        f15 += m12, l9 -= i9;
      }
      for (var c11 = -Math.log1p(-t10()), d11 = 0; c11 <= l9; ++d11) c11 -= Math.log1p(-t10());
      return f15 + d11;
    };
  }
  return o21.source = e27, o21;
}(a8);

// deno:https://esm.sh/d3-scale-chromatic@3.1.0/denonext/d3-scale-chromatic.mjs
function f11(e30) {
  for (var d11 = e30.length / 6 | 0, b11 = new Array(d11), r11 = 0; r11 < d11; ) b11[r11] = "#" + e30.slice(r11 * 6, ++r11 * 6);
  return b11;
}
var W9 = f11("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf");
var j6 = f11("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666");
var q12 = f11("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666");
var z6 = f11("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0");
var E15 = f11("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928");
var F11 = f11("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2");
var H9 = f11("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc");
var J7 = f11("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999");
var K6 = f11("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3");
var N8 = f11("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f");
var Q8 = f11("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab");
var a9 = (e30) => sr(e30[e30.length - 1]);
var p8 = new Array(3).concat("d8b365f5f5f55ab4ac", "a6611adfc27d80cdc1018571", "a6611adfc27df5f5f580cdc1018571", "8c510ad8b365f6e8c3c7eae55ab4ac01665e", "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e", "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e", "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e", "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30", "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30").map(f11);
var X8 = a9(p8);
var s13 = new Array(3).concat("af8dc3f7f7f77fbf7b", "7b3294c2a5cfa6dba0008837", "7b3294c2a5cff7f7f7a6dba0008837", "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837", "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837", "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837", "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837", "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b", "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b").map(f11);
var Z8 = a9(s13);
var l7 = new Array(3).concat("e9a3c9f7f7f7a1d76a", "d01c8bf1b6dab8e1864dac26", "d01c8bf1b6daf7f7f7b8e1864dac26", "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221", "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221", "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221", "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221", "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419", "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419").map(f11);
var $6 = a9(l7);
var n12 = new Array(3).concat("998ec3f7f7f7f1a340", "5e3c99b2abd2fdb863e66101", "5e3c99b2abd2f7f7f7fdb863e66101", "542788998ec3d8daebfee0b6f1a340b35806", "542788998ec3d8daebf7f7f7fee0b6f1a340b35806", "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806", "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806", "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08", "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08").map(f11);
var ff = a9(n12);
var i7 = new Array(3).concat("ef8a62f7f7f767a9cf", "ca0020f4a58292c5de0571b0", "ca0020f4a582f7f7f792c5de0571b0", "b2182bef8a62fddbc7d1e5f067a9cf2166ac", "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac", "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac", "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac", "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061", "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061").map(f11);
var ef = a9(i7);
var u7 = new Array(3).concat("ef8a62ffffff999999", "ca0020f4a582bababa404040", "ca0020f4a582ffffffbababa404040", "b2182bef8a62fddbc7e0e0e09999994d4d4d", "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d", "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d", "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d", "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a", "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a").map(f11);
var af = a9(u7);
var x12 = new Array(3).concat("fc8d59ffffbf91bfdb", "d7191cfdae61abd9e92c7bb6", "d7191cfdae61ffffbfabd9e92c7bb6", "d73027fc8d59fee090e0f3f891bfdb4575b4", "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4", "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4", "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4", "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695", "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695").map(f11);
var df = a9(x12);
var h8 = new Array(3).concat("fc8d59ffffbf91cf60", "d7191cfdae61a6d96a1a9641", "d7191cfdae61ffffbfa6d96a1a9641", "d73027fc8d59fee08bd9ef8b91cf601a9850", "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850", "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850", "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850", "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837", "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837").map(f11);
var cf = a9(h8);
var v12 = new Array(3).concat("fc8d59ffffbf99d594", "d7191cfdae61abdda42b83ba", "d7191cfdae61ffffbfabdda42b83ba", "d53e4ffc8d59fee08be6f59899d5943288bd", "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd", "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd", "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd", "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2", "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2").map(f11);
var bf = a9(v12);
var M8 = new Array(3).concat("e5f5f999d8c92ca25f", "edf8fbb2e2e266c2a4238b45", "edf8fbb2e2e266c2a42ca25f006d2c", "edf8fbccece699d8c966c2a42ca25f006d2c", "edf8fbccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824", "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b").map(f11);
var rf = a9(M8);
var w13 = new Array(3).concat("e0ecf49ebcda8856a7", "edf8fbb3cde38c96c688419d", "edf8fbb3cde38c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68856a7810f7c", "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b", "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b").map(f11);
var of = a9(w13);
var y10 = new Array(3).concat("e0f3dba8ddb543a2ca", "f0f9e8bae4bc7bccc42b8cbe", "f0f9e8bae4bc7bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac", "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e", "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081").map(f11);
var tf = a9(y10);
var A10 = new Array(3).concat("fee8c8fdbb84e34a33", "fef0d9fdcc8afc8d59d7301f", "fef0d9fdcc8afc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59e34a33b30000", "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000", "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000").map(f11);
var mf = a9(A10);
var B6 = new Array(3).concat("ece2f0a6bddb1c9099", "f6eff7bdc9e167a9cf02818a", "f6eff7bdc9e167a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf1c9099016c59", "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450", "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636").map(f11);
var pf = a9(B6);
var P7 = new Array(3).concat("ece7f2a6bddb2b8cbe", "f1eef6bdc9e174a9cf0570b0", "f1eef6bdc9e174a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d", "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b", "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858").map(f11);
var sf = a9(P7);
var G9 = new Array(3).concat("e7e1efc994c7dd1c77", "f1eef6d7b5d8df65b0ce1256", "f1eef6d7b5d8df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0dd1c77980043", "f1eef6d4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f", "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f").map(f11);
var lf = a9(G9);
var R5 = new Array(3).concat("fde0ddfa9fb5c51b8a", "feebe2fbb4b9f768a1ae017e", "feebe2fbb4b9f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177", "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177", "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a").map(f11);
var nf = a9(R5);
var g6 = new Array(3).concat("edf8b17fcdbb2c7fb8", "ffffcca1dab441b6c4225ea8", "ffffcca1dab441b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c42c7fb8253494", "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84", "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58").map(f11);
var uf = a9(g6);
var Y9 = new Array(3).concat("f7fcb9addd8e31a354", "ffffccc2e69978c679238443", "ffffccc2e69978c67931a354006837", "ffffccd9f0a3addd8e78c67931a354006837", "ffffccd9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32", "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529").map(f11);
var xf = a9(Y9);
var O3 = new Array(3).concat("fff7bcfec44fd95f0e", "ffffd4fed98efe9929cc4c02", "ffffd4fed98efe9929d95f0e993404", "ffffd4fee391fec44ffe9929d95f0e993404", "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04", "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506").map(f11);
var hf = a9(O3);
var C10 = new Array(3).concat("ffeda0feb24cf03b20", "ffffb2fecc5cfd8d3ce31a1c", "ffffb2fecc5cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cf03b20bd0026", "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026", "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(f11);
var vf = a9(C10);
var S7 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(f11);
var Mf = a9(S7);
var I6 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(f11);
var wf = a9(I6);
var _5 = new Array(3).concat("f0f0f0bdbdbd636363", "f7f7f7cccccc969696525252", "f7f7f7cccccc969696636363252525", "f7f7f7d9d9d9bdbdbd969696636363252525", "f7f7f7d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525", "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000").map(f11);
var yf = a9(_5);
var D7 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(f11);
var Af = a9(D7);
var L8 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(f11);
var Bf = a9(L8);
var T11 = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(f11);
var Pf = a9(T11);
var gf = qr(X2(300, 0.5, 0), X2(-240, 0.5, 1));
var Yf = qr(X2(-100, 0.75, 0.35), X2(80, 1.5, 0.8));
var Of = qr(X2(260, 0.75, 0.35), X2(80, 1.5, 0.8));
var o17 = X2();
var t2 = V3();
var If = Math.PI / 3;
var _f = Math.PI * 2 / 3;
function m10(e30) {
  var d11 = e30.length;
  return function(b11) {
    return e30[Math.max(0, Math.min(d11 - 1, Math.floor(b11 * d11)))];
  };
}
var Tf = m10(f11("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var kf = m10(f11("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf"));
var Vf = m10(f11("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4"));
var Wf = m10(f11("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921"));

// deno:https://esm.sh/d3-time@3.1.0/denonext/d3-time.mjs
var q13 = /* @__PURE__ */ new Date();
var A11 = /* @__PURE__ */ new Date();
function o18(t10, e30, u9, C11) {
  function i9(r11) {
    return t10(r11 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+r11)), r11;
  }
  return i9.floor = (r11) => (t10(r11 = /* @__PURE__ */ new Date(+r11)), r11), i9.ceil = (r11) => (t10(r11 = new Date(r11 - 1)), e30(r11, 1), t10(r11), r11), i9.round = (r11) => {
    let n13 = i9(r11), c11 = i9.ceil(r11);
    return r11 - n13 < c11 - r11 ? n13 : c11;
  }, i9.offset = (r11, n13) => (e30(r11 = /* @__PURE__ */ new Date(+r11), n13 == null ? 1 : Math.floor(n13)), r11), i9.range = (r11, n13, c11) => {
    let h9 = [];
    if (r11 = i9.ceil(r11), c11 = c11 == null ? 1 : Math.floor(c11), !(r11 < n13) || !(c11 > 0)) return h9;
    let a11;
    do
      h9.push(a11 = /* @__PURE__ */ new Date(+r11)), e30(r11, c11), t10(r11);
    while (a11 < r11 && r11 < n13);
    return h9;
  }, i9.filter = (r11) => o18((n13) => {
    if (n13 >= n13) for (; t10(n13), !r11(n13); ) n13.setTime(n13 - 1);
  }, (n13, c11) => {
    if (n13 >= n13) if (c11 < 0) for (; ++c11 <= 0; ) for (; e30(n13, -1), !r11(n13); ) ;
    else for (; --c11 >= 0; ) for (; e30(n13, 1), !r11(n13); ) ;
  }), u9 && (i9.count = (r11, n13) => (q13.setTime(+r11), A11.setTime(+n13), t10(q13), t10(A11), Math.floor(u9(q13, A11))), i9.every = (r11) => (r11 = Math.floor(r11), !isFinite(r11) || !(r11 > 0) ? null : r11 > 1 ? i9.filter(C11 ? (n13) => C11(n13) % r11 === 0 : (n13) => i9.count(0, n13) % r11 === 0) : i9)), i9;
}
var x13 = o18(() => {
}, (t10, e30) => {
  t10.setTime(+t10 + e30);
}, (t10, e30) => e30 - t10);
x13.every = (t10) => (t10 = Math.floor(t10), !isFinite(t10) || !(t10 > 0) ? null : t10 > 1 ? o18((e30) => {
  e30.setTime(Math.floor(e30 / t10) * t10);
}, (e30, u9) => {
  e30.setTime(+e30 + u9 * t10);
}, (e30, u9) => (u9 - e30) / t10) : x13);
var E16 = x13.range;
var p9 = o18((t10) => {
  t10.setTime(t10 - t10.getMilliseconds());
}, (t10, e30) => {
  t10.setTime(+t10 + e30 * 1e3);
}, (t10, e30) => (e30 - t10) / 1e3, (t10) => t10.getUTCSeconds());
var G10 = p9.range;
var H10 = o18((t10) => {
  t10.setTime(t10 - t10.getMilliseconds() - t10.getSeconds() * 1e3);
}, (t10, e30) => {
  t10.setTime(+t10 + e30 * 6e4);
}, (t10, e30) => (e30 - t10) / 6e4, (t10) => t10.getMinutes());
var ct3 = H10.range;
var W10 = o18((t10) => {
  t10.setUTCSeconds(0, 0);
}, (t10, e30) => {
  t10.setTime(+t10 + e30 * 6e4);
}, (t10, e30) => (e30 - t10) / 6e4, (t10) => t10.getUTCMinutes());
var at3 = W10.range;
var I7 = o18((t10) => {
  t10.setTime(t10 - t10.getMilliseconds() - t10.getSeconds() * 1e3 - t10.getMinutes() * 6e4);
}, (t10, e30) => {
  t10.setTime(+t10 + e30 * 36e5);
}, (t10, e30) => (e30 - t10) / 36e5, (t10) => t10.getHours());
var mt3 = I7.range;
var w14 = o18((t10) => {
  t10.setUTCMinutes(0, 0, 0);
}, (t10, e30) => {
  t10.setTime(+t10 + e30 * 36e5);
}, (t10, e30) => (e30 - t10) / 36e5, (t10) => t10.getUTCHours());
var lt3 = w14.range;
var k9 = o18((t10) => t10.setHours(0, 0, 0, 0), (t10, e30) => t10.setDate(t10.getDate() + e30), (t10, e30) => (e30 - t10 - (e30.getTimezoneOffset() - t10.getTimezoneOffset()) * 6e4) / 864e5, (t10) => t10.getDate() - 1);
var yt4 = k9.range;
var J8 = o18((t10) => {
  t10.setUTCHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setUTCDate(t10.getUTCDate() + e30);
}, (t10, e30) => (e30 - t10) / 864e5, (t10) => t10.getUTCDate() - 1);
var gt5 = J8.range;
var z7 = o18((t10) => {
  t10.setUTCHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setUTCDate(t10.getUTCDate() + e30);
}, (t10, e30) => (e30 - t10) / 864e5, (t10) => Math.floor(t10 / 864e5));
var Tt3 = z7.range;
function d9(t10) {
  return o18((e30) => {
    e30.setDate(e30.getDate() - (e30.getDay() + 7 - t10) % 7), e30.setHours(0, 0, 0, 0);
  }, (e30, u9) => {
    e30.setDate(e30.getDate() + u9 * 7);
  }, (e30, u9) => (u9 - e30 - (u9.getTimezoneOffset() - e30.getTimezoneOffset()) * 6e4) / 6048e5);
}
var U8 = d9(0);
var K7 = d9(1);
var L9 = d9(2);
var N9 = d9(3);
var P8 = d9(4);
var Q9 = d9(5);
var R6 = d9(6);
var V6 = U8.range;
var pt3 = K7.range;
var xt5 = L9.range;
var Mt4 = N9.range;
var dt3 = P8.range;
var ft3 = Q9.range;
var ht4 = R6.range;
function f12(t10) {
  return o18((e30) => {
    e30.setUTCDate(e30.getUTCDate() - (e30.getUTCDay() + 7 - t10) % 7), e30.setUTCHours(0, 0, 0, 0);
  }, (e30, u9) => {
    e30.setUTCDate(e30.getUTCDate() + u9 * 7);
  }, (e30, u9) => (u9 - e30) / 6048e5);
}
var S8 = f12(0);
var X9 = f12(1);
var Z9 = f12(2);
var _6 = f12(3);
var $7 = f12(4);
var tt5 = f12(5);
var et4 = f12(6);
var rt3 = S8.range;
var Dt4 = X9.range;
var Ct3 = Z9.range;
var Ut3 = _6.range;
var St4 = $7.range;
var Ft4 = tt5.range;
var Yt4 = et4.range;
var b9 = o18((t10) => {
  t10.setDate(1), t10.setHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setMonth(t10.getMonth() + e30);
}, (t10, e30) => e30.getMonth() - t10.getMonth() + (e30.getFullYear() - t10.getFullYear()) * 12, (t10) => t10.getMonth());
var vt4 = b9.range;
var j7 = o18((t10) => {
  t10.setUTCDate(1), t10.setUTCHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setUTCMonth(t10.getUTCMonth() + e30);
}, (t10, e30) => e30.getUTCMonth() - t10.getUTCMonth() + (e30.getUTCFullYear() - t10.getUTCFullYear()) * 12, (t10) => t10.getUTCMonth());
var Ht3 = j7.range;
var F12 = o18((t10) => {
  t10.setMonth(0, 1), t10.setHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setFullYear(t10.getFullYear() + e30);
}, (t10, e30) => e30.getFullYear() - t10.getFullYear(), (t10) => t10.getFullYear());
F12.every = (t10) => !isFinite(t10 = Math.floor(t10)) || !(t10 > 0) ? null : o18((e30) => {
  e30.setFullYear(Math.floor(e30.getFullYear() / t10) * t10), e30.setMonth(0, 1), e30.setHours(0, 0, 0, 0);
}, (e30, u9) => {
  e30.setFullYear(e30.getFullYear() + u9 * t10);
});
var Wt4 = F12.range;
var Y10 = o18((t10) => {
  t10.setUTCMonth(0, 1), t10.setUTCHours(0, 0, 0, 0);
}, (t10, e30) => {
  t10.setUTCFullYear(t10.getUTCFullYear() + e30);
}, (t10, e30) => e30.getUTCFullYear() - t10.getUTCFullYear(), (t10) => t10.getUTCFullYear());
Y10.every = (t10) => !isFinite(t10 = Math.floor(t10)) || !(t10 > 0) ? null : o18((e30) => {
  e30.setUTCFullYear(Math.floor(e30.getUTCFullYear() / t10) * t10), e30.setUTCMonth(0, 1), e30.setUTCHours(0, 0, 0, 0);
}, (e30, u9) => {
  e30.setUTCFullYear(e30.getUTCFullYear() + u9 * t10);
});
var It3 = Y10.range;
function ut4(t10, e30, u9, C11, i9, r11) {
  let n13 = [
    [
      p9,
      1,
      1e3
    ],
    [
      p9,
      5,
      5 * 1e3
    ],
    [
      p9,
      15,
      15 * 1e3
    ],
    [
      p9,
      30,
      30 * 1e3
    ],
    [
      r11,
      1,
      6e4
    ],
    [
      r11,
      5,
      5 * 6e4
    ],
    [
      r11,
      15,
      15 * 6e4
    ],
    [
      r11,
      30,
      30 * 6e4
    ],
    [
      i9,
      1,
      36e5
    ],
    [
      i9,
      3,
      3 * 36e5
    ],
    [
      i9,
      6,
      6 * 36e5
    ],
    [
      i9,
      12,
      12 * 36e5
    ],
    [
      C11,
      1,
      864e5
    ],
    [
      C11,
      2,
      2 * 864e5
    ],
    [
      u9,
      1,
      6048e5
    ],
    [
      e30,
      1,
      2592e6
    ],
    [
      e30,
      3,
      3 * 2592e6
    ],
    [
      t10,
      1,
      31536e6
    ]
  ];
  function c11(a11, l9, T12) {
    let D9 = l9 < a11;
    D9 && ([a11, l9] = [
      l9,
      a11
    ]);
    let y11 = T12 && typeof T12.range == "function" ? T12 : h9(a11, l9, T12), v15 = y11 ? y11.range(a11, +l9 + 1) : [];
    return D9 ? v15.reverse() : v15;
  }
  function h9(a11, l9, T12) {
    let D9 = Math.abs(l9 - a11) / T12, y11 = F(([, , st2]) => st2).right(n13, D9);
    if (y11 === n13.length) return t10.every(gt(a11 / 31536e6, l9 / 31536e6, T12));
    if (y11 === 0) return x13.every(Math.max(gt(a11, l9, T12), 1));
    let [v15, it3] = n13[D9 / n13[y11 - 1][2] < n13[y11][2] / D9 ? y11 - 1 : y11];
    return v15.every(it3);
  }
  return [
    c11,
    h9
  ];
}
var [kt3, zt3] = ut4(Y10, j7, S8, z7, w14, W10);
var [Ot2, bt2] = ut4(F12, b9, U8, k9, I7, H10);

// deno:https://esm.sh/d3-time-format@4.1.0/denonext/src/locale.mjs
function H11(e30) {
  if (0 <= e30.y && e30.y < 100) {
    var n13 = new Date(-1, e30.m, e30.d, e30.H, e30.M, e30.S, e30.L);
    return n13.setFullYear(e30.y), n13;
  }
  return new Date(e30.y, e30.m, e30.d, e30.H, e30.M, e30.S, e30.L);
}
function b10(e30) {
  if (0 <= e30.y && e30.y < 100) {
    var n13 = new Date(Date.UTC(-1, e30.m, e30.d, e30.H, e30.M, e30.S, e30.L));
    return n13.setUTCFullYear(e30.y), n13;
  }
  return new Date(Date.UTC(e30.y, e30.m, e30.d, e30.H, e30.M, e30.S, e30.L));
}
function p10(e30, n13, t10) {
  return {
    y: e30,
    m: n13,
    d: t10,
    H: 0,
    M: 0,
    S: 0,
    L: 0
  };
}
function be5(e30) {
  var n13 = e30.dateTime, t10 = e30.date, u9 = e30.time, y11 = e30.periods, T12 = e30.days, k10 = e30.shortDays, W12 = e30.months, L10 = e30.shortMonths, K9 = v13(y11), ee4 = D8(y11), ne4 = v13(T12), te3 = D8(T12), re5 = v13(k10), ue4 = D8(k10), oe5 = v13(W12), ae5 = D8(W12), ce4 = v13(L10), fe4 = D8(L10), U9 = {
    a: Ce3,
    A: Me2,
    b: pe4,
    B: ve4,
    c: null,
    d: _7,
    e: _7,
    f: nn3,
    g: mn,
    G: yn2,
    H: Je,
    I: Ke,
    j: en2,
    L: z8,
    m: tn2,
    M: rn,
    p: De2,
    q: Se2,
    Q: X10,
    s: j8,
    S: un2,
    u: on2,
    U: an3,
    V: cn2,
    w: fn2,
    W: ln2,
    x: null,
    X: null,
    y: sn,
    Y: gn2,
    Z: hn2,
    "%": P9
  }, C11 = {
    a: we3,
    A: de5,
    b: xe4,
    B: ke3,
    c: null,
    d: q14,
    e: q14,
    f: Mn3,
    g: Ln2,
    G: Hn2,
    H: Tn2,
    I: Un2,
    j: Cn2,
    L: E17,
    m: pn2,
    M: vn3,
    p: We,
    q: Le,
    Q: X10,
    s: j8,
    S: Dn2,
    u: Sn2,
    U: wn2,
    V: dn2,
    w: xn3,
    W: kn,
    x: null,
    X: null,
    y: Wn3,
    Y: Yn2,
    Z: bn2,
    "%": P9
  }, ie4 = {
    a: se4,
    A: me4,
    b: ge3,
    B: ye4,
    c: he4,
    d: Q10,
    e: Q10,
    f: Ge,
    g: R7,
    G: A12,
    H: V7,
    I: V7,
    j: Pe,
    L: Be,
    m: qe,
    M: Xe2,
    p: le4,
    q: _e2,
    Q: $e2,
    s: Ee3,
    S: je,
    u: Ie,
    U: Ae2,
    V: Re,
    w: Ze2,
    W: Qe,
    x: Te2,
    X: Ue,
    y: R7,
    Y: A12,
    Z: Ve2,
    "%": ze
  };
  U9.x = h9(t10, U9), U9.X = h9(u9, U9), U9.c = h9(n13, U9), C11.x = h9(t10, C11), C11.X = h9(u9, C11), C11.c = h9(n13, C11);
  function h9(o21, a11) {
    return function(c11) {
      var r11 = [], s14 = -1, i9 = 0, m12 = o21.length, g7, M10, Z10;
      for (c11 instanceof Date || (c11 = /* @__PURE__ */ new Date(+c11)); ++s14 < m12; ) o21.charCodeAt(s14) === 37 && (r11.push(o21.slice(i9, s14)), (M10 = I8[g7 = o21.charAt(++s14)]) != null ? g7 = o21.charAt(++s14) : M10 = g7 === "e" ? " " : "0", (Z10 = a11[g7]) && (g7 = Z10(c11, M10)), r11.push(g7), i9 = s14 + 1);
      return r11.push(o21.slice(i9, s14)), r11.join("");
    };
  }
  function O5(o21, a11) {
    return function(c11) {
      var r11 = p10(1900, void 0, 1), s14 = Y12(r11, o21, c11 += "", 0), i9, m12;
      if (s14 != c11.length) return null;
      if ("Q" in r11) return new Date(r11.Q);
      if ("s" in r11) return new Date(r11.s * 1e3 + ("L" in r11 ? r11.L : 0));
      if (a11 && !("Z" in r11) && (r11.Z = 0), "p" in r11 && (r11.H = r11.H % 12 + r11.p * 12), r11.m === void 0 && (r11.m = "q" in r11 ? r11.q : 0), "V" in r11) {
        if (r11.V < 1 || r11.V > 53) return null;
        "w" in r11 || (r11.w = 1), "Z" in r11 ? (i9 = b10(p10(r11.y, 0, 1)), m12 = i9.getUTCDay(), i9 = m12 > 4 || m12 === 0 ? X9.ceil(i9) : X9(i9), i9 = J8.offset(i9, (r11.V - 1) * 7), r11.y = i9.getUTCFullYear(), r11.m = i9.getUTCMonth(), r11.d = i9.getUTCDate() + (r11.w + 6) % 7) : (i9 = H11(p10(r11.y, 0, 1)), m12 = i9.getDay(), i9 = m12 > 4 || m12 === 0 ? K7.ceil(i9) : K7(i9), i9 = k9.offset(i9, (r11.V - 1) * 7), r11.y = i9.getFullYear(), r11.m = i9.getMonth(), r11.d = i9.getDate() + (r11.w + 6) % 7);
      } else ("W" in r11 || "U" in r11) && ("w" in r11 || (r11.w = "u" in r11 ? r11.u % 7 : "W" in r11 ? 1 : 0), m12 = "Z" in r11 ? b10(p10(r11.y, 0, 1)).getUTCDay() : H11(p10(r11.y, 0, 1)).getDay(), r11.m = 0, r11.d = "W" in r11 ? (r11.w + 6) % 7 + r11.W * 7 - (m12 + 5) % 7 : r11.w + r11.U * 7 - (m12 + 6) % 7);
      return "Z" in r11 ? (r11.H += r11.Z / 100 | 0, r11.M += r11.Z % 100, b10(r11)) : H11(r11);
    };
  }
  function Y12(o21, a11, c11, r11) {
    for (var s14 = 0, i9 = a11.length, m12 = c11.length, g7, M10; s14 < i9; ) {
      if (r11 >= m12) return -1;
      if (g7 = a11.charCodeAt(s14++), g7 === 37) {
        if (g7 = a11.charAt(s14++), M10 = ie4[g7 in I8 ? a11.charAt(s14++) : g7], !M10 || (r11 = M10(o21, c11, r11)) < 0) return -1;
      } else if (g7 != c11.charCodeAt(r11++)) return -1;
    }
    return r11;
  }
  function le4(o21, a11, c11) {
    var r11 = K9.exec(a11.slice(c11));
    return r11 ? (o21.p = ee4.get(r11[0].toLowerCase()), c11 + r11[0].length) : -1;
  }
  function se4(o21, a11, c11) {
    var r11 = re5.exec(a11.slice(c11));
    return r11 ? (o21.w = ue4.get(r11[0].toLowerCase()), c11 + r11[0].length) : -1;
  }
  function me4(o21, a11, c11) {
    var r11 = ne4.exec(a11.slice(c11));
    return r11 ? (o21.w = te3.get(r11[0].toLowerCase()), c11 + r11[0].length) : -1;
  }
  function ge3(o21, a11, c11) {
    var r11 = ce4.exec(a11.slice(c11));
    return r11 ? (o21.m = fe4.get(r11[0].toLowerCase()), c11 + r11[0].length) : -1;
  }
  function ye4(o21, a11, c11) {
    var r11 = oe5.exec(a11.slice(c11));
    return r11 ? (o21.m = ae5.get(r11[0].toLowerCase()), c11 + r11[0].length) : -1;
  }
  function he4(o21, a11, c11) {
    return Y12(o21, n13, a11, c11);
  }
  function Te2(o21, a11, c11) {
    return Y12(o21, t10, a11, c11);
  }
  function Ue(o21, a11, c11) {
    return Y12(o21, u9, a11, c11);
  }
  function Ce3(o21) {
    return k10[o21.getDay()];
  }
  function Me2(o21) {
    return T12[o21.getDay()];
  }
  function pe4(o21) {
    return L10[o21.getMonth()];
  }
  function ve4(o21) {
    return W12[o21.getMonth()];
  }
  function De2(o21) {
    return y11[+(o21.getHours() >= 12)];
  }
  function Se2(o21) {
    return 1 + ~~(o21.getMonth() / 3);
  }
  function we3(o21) {
    return k10[o21.getUTCDay()];
  }
  function de5(o21) {
    return T12[o21.getUTCDay()];
  }
  function xe4(o21) {
    return L10[o21.getUTCMonth()];
  }
  function ke3(o21) {
    return W12[o21.getUTCMonth()];
  }
  function We(o21) {
    return y11[+(o21.getUTCHours() >= 12)];
  }
  function Le(o21) {
    return 1 + ~~(o21.getUTCMonth() / 3);
  }
  return {
    format: function(o21) {
      var a11 = h9(o21 += "", U9);
      return a11.toString = function() {
        return o21;
      }, a11;
    },
    parse: function(o21) {
      var a11 = O5(o21 += "", false);
      return a11.toString = function() {
        return o21;
      }, a11;
    },
    utcFormat: function(o21) {
      var a11 = h9(o21 += "", C11);
      return a11.toString = function() {
        return o21;
      }, a11;
    },
    utcParse: function(o21) {
      var a11 = O5(o21 += "", true);
      return a11.toString = function() {
        return o21;
      }, a11;
    }
  };
}
var I8 = {
  "-": "",
  _: " ",
  0: "0"
};
var l8 = /^\s*\d+/;
var Fe2 = /^%/;
var Ne3 = /[\\^$*+?|[\]().{}]/g;
function f13(e30, n13, t10) {
  var u9 = e30 < 0 ? "-" : "", y11 = (u9 ? -e30 : e30) + "", T12 = y11.length;
  return u9 + (T12 < t10 ? new Array(t10 - T12 + 1).join(n13) + y11 : y11);
}
function Oe2(e30) {
  return e30.replace(Ne3, "\\$&");
}
function v13(e30) {
  return new RegExp("^(?:" + e30.map(Oe2).join("|") + ")", "i");
}
function D8(e30) {
  return new Map(e30.map((n13, t10) => [
    n13.toLowerCase(),
    t10
  ]));
}
function Ze2(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 1));
  return u9 ? (e30.w = +u9[0], t10 + u9[0].length) : -1;
}
function Ie(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 1));
  return u9 ? (e30.u = +u9[0], t10 + u9[0].length) : -1;
}
function Ae2(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.U = +u9[0], t10 + u9[0].length) : -1;
}
function Re(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.V = +u9[0], t10 + u9[0].length) : -1;
}
function Qe(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.W = +u9[0], t10 + u9[0].length) : -1;
}
function A12(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 4));
  return u9 ? (e30.y = +u9[0], t10 + u9[0].length) : -1;
}
function R7(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.y = +u9[0] + (+u9[0] > 68 ? 1900 : 2e3), t10 + u9[0].length) : -1;
}
function Ve2(e30, n13, t10) {
  var u9 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(n13.slice(t10, t10 + 6));
  return u9 ? (e30.Z = u9[1] ? 0 : -(u9[2] + (u9[3] || "00")), t10 + u9[0].length) : -1;
}
function _e2(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 1));
  return u9 ? (e30.q = u9[0] * 3 - 3, t10 + u9[0].length) : -1;
}
function qe(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.m = u9[0] - 1, t10 + u9[0].length) : -1;
}
function Q10(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.d = +u9[0], t10 + u9[0].length) : -1;
}
function Pe(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 3));
  return u9 ? (e30.m = 0, e30.d = +u9[0], t10 + u9[0].length) : -1;
}
function V7(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.H = +u9[0], t10 + u9[0].length) : -1;
}
function Xe2(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.M = +u9[0], t10 + u9[0].length) : -1;
}
function je(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 2));
  return u9 ? (e30.S = +u9[0], t10 + u9[0].length) : -1;
}
function Be(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 3));
  return u9 ? (e30.L = +u9[0], t10 + u9[0].length) : -1;
}
function Ge(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10, t10 + 6));
  return u9 ? (e30.L = Math.floor(u9[0] / 1e3), t10 + u9[0].length) : -1;
}
function ze(e30, n13, t10) {
  var u9 = Fe2.exec(n13.slice(t10, t10 + 1));
  return u9 ? t10 + u9[0].length : -1;
}
function $e2(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10));
  return u9 ? (e30.Q = +u9[0], t10 + u9[0].length) : -1;
}
function Ee3(e30, n13, t10) {
  var u9 = l8.exec(n13.slice(t10));
  return u9 ? (e30.s = +u9[0], t10 + u9[0].length) : -1;
}
function _7(e30, n13) {
  return f13(e30.getDate(), n13, 2);
}
function Je(e30, n13) {
  return f13(e30.getHours(), n13, 2);
}
function Ke(e30, n13) {
  return f13(e30.getHours() % 12 || 12, n13, 2);
}
function en2(e30, n13) {
  return f13(1 + k9.count(F12(e30), e30), n13, 3);
}
function z8(e30, n13) {
  return f13(e30.getMilliseconds(), n13, 3);
}
function nn3(e30, n13) {
  return z8(e30, n13) + "000";
}
function tn2(e30, n13) {
  return f13(e30.getMonth() + 1, n13, 2);
}
function rn(e30, n13) {
  return f13(e30.getMinutes(), n13, 2);
}
function un2(e30, n13) {
  return f13(e30.getSeconds(), n13, 2);
}
function on2(e30) {
  var n13 = e30.getDay();
  return n13 === 0 ? 7 : n13;
}
function an3(e30, n13) {
  return f13(U8.count(F12(e30) - 1, e30), n13, 2);
}
function $8(e30) {
  var n13 = e30.getDay();
  return n13 >= 4 || n13 === 0 ? P8(e30) : P8.ceil(e30);
}
function cn2(e30, n13) {
  return e30 = $8(e30), f13(P8.count(F12(e30), e30) + (F12(e30).getDay() === 4), n13, 2);
}
function fn2(e30) {
  return e30.getDay();
}
function ln2(e30, n13) {
  return f13(K7.count(F12(e30) - 1, e30), n13, 2);
}
function sn(e30, n13) {
  return f13(e30.getFullYear() % 100, n13, 2);
}
function mn(e30, n13) {
  return e30 = $8(e30), f13(e30.getFullYear() % 100, n13, 2);
}
function gn2(e30, n13) {
  return f13(e30.getFullYear() % 1e4, n13, 4);
}
function yn2(e30, n13) {
  var t10 = e30.getDay();
  return e30 = t10 >= 4 || t10 === 0 ? P8(e30) : P8.ceil(e30), f13(e30.getFullYear() % 1e4, n13, 4);
}
function hn2(e30) {
  var n13 = e30.getTimezoneOffset();
  return (n13 > 0 ? "-" : (n13 *= -1, "+")) + f13(n13 / 60 | 0, "0", 2) + f13(n13 % 60, "0", 2);
}
function q14(e30, n13) {
  return f13(e30.getUTCDate(), n13, 2);
}
function Tn2(e30, n13) {
  return f13(e30.getUTCHours(), n13, 2);
}
function Un2(e30, n13) {
  return f13(e30.getUTCHours() % 12 || 12, n13, 2);
}
function Cn2(e30, n13) {
  return f13(1 + J8.count(Y10(e30), e30), n13, 3);
}
function E17(e30, n13) {
  return f13(e30.getUTCMilliseconds(), n13, 3);
}
function Mn3(e30, n13) {
  return E17(e30, n13) + "000";
}
function pn2(e30, n13) {
  return f13(e30.getUTCMonth() + 1, n13, 2);
}
function vn3(e30, n13) {
  return f13(e30.getUTCMinutes(), n13, 2);
}
function Dn2(e30, n13) {
  return f13(e30.getUTCSeconds(), n13, 2);
}
function Sn2(e30) {
  var n13 = e30.getUTCDay();
  return n13 === 0 ? 7 : n13;
}
function wn2(e30, n13) {
  return f13(S8.count(Y10(e30) - 1, e30), n13, 2);
}
function J9(e30) {
  var n13 = e30.getUTCDay();
  return n13 >= 4 || n13 === 0 ? $7(e30) : $7.ceil(e30);
}
function dn2(e30, n13) {
  return e30 = J9(e30), f13($7.count(Y10(e30), e30) + (Y10(e30).getUTCDay() === 4), n13, 2);
}
function xn3(e30) {
  return e30.getUTCDay();
}
function kn(e30, n13) {
  return f13(X9.count(Y10(e30) - 1, e30), n13, 2);
}
function Wn3(e30, n13) {
  return f13(e30.getUTCFullYear() % 100, n13, 2);
}
function Ln2(e30, n13) {
  return e30 = J9(e30), f13(e30.getUTCFullYear() % 100, n13, 2);
}
function Yn2(e30, n13) {
  return f13(e30.getUTCFullYear() % 1e4, n13, 4);
}
function Hn2(e30, n13) {
  var t10 = e30.getUTCDay();
  return e30 = t10 >= 4 || t10 === 0 ? $7(e30) : $7.ceil(e30), f13(e30.getUTCFullYear() % 1e4, n13, 4);
}
function bn2() {
  return "+0000";
}
function P9() {
  return "%";
}
function X10(e30) {
  return +e30;
}
function j8(e30) {
  return Math.floor(+e30 / 1e3);
}

// deno:https://esm.sh/d3-time-format@4.1.0/denonext/src/defaultLocale.mjs
var e28;
var o19;
var u8;
var d10;
var m11;
r9({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: [
    "AM",
    "PM"
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  shortDays: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  shortMonths: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
});
function r9(a11) {
  return e28 = be5(a11), o19 = e28.format, u8 = e28.parse, d10 = e28.utcFormat, m11 = e28.utcParse, e28;
}

// deno:https://esm.sh/d3-time-format@4.1.0/denonext/src/isoFormat.mjs
var r10 = "%Y-%m-%dT%H:%M:%S.%LZ";
function e29(t10) {
  return t10.toISOString();
}
var a10 = Date.prototype.toISOString ? e29 : d10(r10);

// deno:https://esm.sh/d3-time-format@4.1.0/denonext/src/isoParse.mjs
function o20(r11) {
  var e30 = new Date(r11);
  return isNaN(e30) ? null : e30;
}
var i8 = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? o20 : m11(r10);

// deno:https://esm.sh/d3-scale@4.0.2/denonext/d3-scale.mjs
var W11 = Symbol("implicit");

// deno:https://esm.sh/d3-shape@3.2.0/denonext/d3-shape.mjs
var Y11 = Math.cos;
var E18 = Math.sin;
var x14 = Math.sqrt;
var S9 = 1e-12;
var B7 = Math.PI;
var rt4 = B7 / 2;
var M9 = 2 * B7;
var rn2 = Array.prototype.slice;
function sn2(t10) {
  this._context = t10;
}
sn2.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(t10, n13);
        break;
    }
  }
};
function K8(t10) {
  return new sn2(t10);
}
var xt6 = tt6(K8);
function un3(t10) {
  this._curve = t10;
}
un3.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(t10, n13) {
    this._curve.point(n13 * Math.sin(t10), n13 * -Math.cos(t10));
  }
};
function tt6(t10) {
  function n13(i9) {
    return new un3(t10(i9));
  }
  return n13._curve = t10, n13;
}
var Wn4 = x14(3);
var cn3 = x14(1 / 3);
var $n = cn3 * 2;
var pn3 = E18(B7 / 10) / E18(7 * B7 / 10);
var Jn2 = E18(M9 / 10) * pn3;
var Kn2 = -Y11(M9 / 10) * pn3;
var Wt5 = x14(3);
var Qn3 = x14(3);
var O4 = x14(3) / 2;
var Jt3 = 1 / x14(12);
var Un3 = (Jt3 / 2 + 1) * 3;
function X11() {
}
function et5(t10, n13, i9) {
  t10._context.bezierCurveTo((2 * t10._x0 + t10._x1) / 3, (2 * t10._y0 + t10._y1) / 3, (t10._x0 + 2 * t10._x1) / 3, (t10._y0 + 2 * t10._y1) / 3, (t10._x0 + 4 * t10._x1 + n13) / 6, (t10._y0 + 4 * t10._y1 + i9) / 6);
}
function lt4(t10) {
  this._context = t10;
}
lt4.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        et5(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        et5(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = n13;
  }
};
function dn3(t10) {
  this._context = t10;
}
dn3.prototype = {
  areaStart: X11,
  areaEnd: X11,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._x2 = t10, this._y2 = n13;
        break;
      case 1:
        this._point = 2, this._x3 = t10, this._y3 = n13;
        break;
      case 2:
        this._point = 3, this._x4 = t10, this._y4 = n13, this._context.moveTo((this._x0 + 4 * this._x1 + t10) / 6, (this._y0 + 4 * this._y1 + n13) / 6);
        break;
      default:
        et5(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = n13;
  }
};
function yn3(t10) {
  this._context = t10;
}
yn3.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var i9 = (this._x0 + 4 * this._x1 + t10) / 6, e30 = (this._y0 + 4 * this._y1 + n13) / 6;
        this._line ? this._context.lineTo(i9, e30) : this._context.moveTo(i9, e30);
        break;
      case 3:
        this._point = 4;
      default:
        et5(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = n13;
  }
};
function gn3(t10, n13) {
  this._basis = new lt4(t10), this._beta = n13;
}
gn3.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var t10 = this._x, n13 = this._y, i9 = t10.length - 1;
    if (i9 > 0) for (var e30 = t10[0], s14 = n13[0], o21 = t10[i9] - e30, a11 = n13[i9] - s14, r11 = -1, u9; ++r11 <= i9; ) u9 = r11 / i9, this._basis.point(this._beta * t10[r11] + (1 - this._beta) * (e30 + u9 * o21), this._beta * n13[r11] + (1 - this._beta) * (s14 + u9 * a11));
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(t10, n13) {
    this._x.push(+t10), this._y.push(+n13);
  }
};
var ii = function t3(n13) {
  function i9(e30) {
    return n13 === 1 ? new lt4(e30) : new gn3(e30, n13);
  }
  return i9.beta = function(e30) {
    return t3(+e30);
  }, i9;
}(0.85);
function ot3(t10, n13, i9) {
  t10._context.bezierCurveTo(t10._x1 + t10._k * (t10._x2 - t10._x0), t10._y1 + t10._k * (t10._y2 - t10._y0), t10._x2 + t10._k * (t10._x1 - n13), t10._y2 + t10._k * (t10._y1 - i9), t10._x2, t10._y2);
}
function vt5(t10, n13) {
  this._context = t10, this._k = (1 - n13) / 6;
}
vt5.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        ot3(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
        break;
      case 1:
        this._point = 2, this._x1 = t10, this._y1 = n13;
        break;
      case 2:
        this._point = 3;
      default:
        ot3(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var ei = function t4(n13) {
  function i9(e30) {
    return new vt5(e30, n13);
  }
  return i9.tension = function(e30) {
    return t4(+e30);
  }, i9;
}(0);
function Tt4(t10, n13) {
  this._context = t10, this._k = (1 - n13) / 6;
}
Tt4.prototype = {
  areaStart: X11,
  areaEnd: X11,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._x3 = t10, this._y3 = n13;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = t10, this._y4 = n13);
        break;
      case 2:
        this._point = 3, this._x5 = t10, this._y5 = n13;
        break;
      default:
        ot3(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var oi = function t5(n13) {
  function i9(e30) {
    return new Tt4(e30, n13);
  }
  return i9.tension = function(e30) {
    return t5(+e30);
  }, i9;
}(0);
function bt3(t10, n13) {
  this._context = t10, this._k = (1 - n13) / 6;
}
bt3.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        ot3(this, t10, n13);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var ri = function t6(n13) {
  function i9(e30) {
    return new bt3(e30, n13);
  }
  return i9.tension = function(e30) {
    return t6(+e30);
  }, i9;
}(0);
function ut5(t10, n13, i9) {
  var e30 = t10._x1, s14 = t10._y1, o21 = t10._x2, a11 = t10._y2;
  if (t10._l01_a > S9) {
    var r11 = 2 * t10._l01_2a + 3 * t10._l01_a * t10._l12_a + t10._l12_2a, u9 = 3 * t10._l01_a * (t10._l01_a + t10._l12_a);
    e30 = (e30 * r11 - t10._x0 * t10._l12_2a + t10._x2 * t10._l01_2a) / u9, s14 = (s14 * r11 - t10._y0 * t10._l12_2a + t10._y2 * t10._l01_2a) / u9;
  }
  if (t10._l23_a > S9) {
    var l9 = 2 * t10._l23_2a + 3 * t10._l23_a * t10._l12_a + t10._l12_2a, h9 = 3 * t10._l23_a * (t10._l23_a + t10._l12_a);
    o21 = (o21 * l9 + t10._x1 * t10._l23_2a - n13 * t10._l12_2a) / h9, a11 = (a11 * l9 + t10._y1 * t10._l23_2a - i9 * t10._l12_2a) / h9;
  }
  t10._context.bezierCurveTo(e30, s14, o21, a11, t10._x2, t10._y2);
}
function vn4(t10, n13) {
  this._context = t10, this._alpha = n13;
}
vn4.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    if (t10 = +t10, n13 = +n13, this._point) {
      var i9 = this._x2 - t10, e30 = this._y2 - n13;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i9 * i9 + e30 * e30, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      default:
        ut5(this, t10, n13);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var si = function t7(n13) {
  function i9(e30) {
    return n13 ? new vn4(e30, n13) : new vt5(e30, 0);
  }
  return i9.alpha = function(e30) {
    return t7(+e30);
  }, i9;
}(0.5);
function Tn3(t10, n13) {
  this._context = t10, this._alpha = n13;
}
Tn3.prototype = {
  areaStart: X11,
  areaEnd: X11,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(t10, n13) {
    if (t10 = +t10, n13 = +n13, this._point) {
      var i9 = this._x2 - t10, e30 = this._y2 - n13;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i9 * i9 + e30 * e30, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = t10, this._y3 = n13;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = t10, this._y4 = n13);
        break;
      case 2:
        this._point = 3, this._x5 = t10, this._y5 = n13;
        break;
      default:
        ut5(this, t10, n13);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var ai = function t8(n13) {
  function i9(e30) {
    return n13 ? new Tn3(e30, n13) : new Tt4(e30, 0);
  }
  return i9.alpha = function(e30) {
    return t8(+e30);
  }, i9;
}(0.5);
function bn3(t10, n13) {
  this._context = t10, this._alpha = n13;
}
bn3.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    if (t10 = +t10, n13 = +n13, this._point) {
      var i9 = this._x2 - t10, e30 = this._y2 - n13;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(i9 * i9 + e30 * e30, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      default:
        ut5(this, t10, n13);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t10, this._y0 = this._y1, this._y1 = this._y2, this._y2 = n13;
  }
};
var li = function t9(n13) {
  function i9(e30) {
    return n13 ? new bn3(e30, n13) : new bt3(e30, 0);
  }
  return i9.alpha = function(e30) {
    return t9(+e30);
  }, i9;
}(0.5);
function kn2(t10) {
  this._context = t10;
}
kn2.prototype = {
  areaStart: X11,
  areaEnd: X11,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(t10, n13) {
    t10 = +t10, n13 = +n13, this._point ? this._context.lineTo(t10, n13) : (this._point = 1, this._context.moveTo(t10, n13));
  }
};
function wn3(t10) {
  return t10 < 0 ? -1 : 1;
}
function Sn3(t10, n13, i9) {
  var e30 = t10._x1 - t10._x0, s14 = n13 - t10._x1, o21 = (t10._y1 - t10._y0) / (e30 || s14 < 0 && -0), a11 = (i9 - t10._y1) / (s14 || e30 < 0 && -0), r11 = (o21 * s14 + a11 * e30) / (e30 + s14);
  return (wn3(o21) + wn3(a11)) * Math.min(Math.abs(o21), Math.abs(a11), 0.5 * Math.abs(r11)) || 0;
}
function Nn3(t10, n13) {
  var i9 = t10._x1 - t10._x0;
  return i9 ? (3 * (t10._y1 - t10._y0) / i9 - n13) / 2 : n13;
}
function Qt4(t10, n13, i9) {
  var e30 = t10._x0, s14 = t10._y0, o21 = t10._x1, a11 = t10._y1, r11 = (o21 - e30) / 3;
  t10._context.bezierCurveTo(e30 + r11, s14 + r11 * n13, o21 - r11, a11 - r11 * i9, o21, a11);
}
function kt4(t10) {
  this._context = t10;
}
kt4.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        Qt4(this, this._t0, Nn3(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(t10, n13) {
    var i9 = NaN;
    if (t10 = +t10, n13 = +n13, !(t10 === this._x1 && n13 === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, Qt4(this, Nn3(this, i9 = Sn3(this, t10, n13)), i9);
          break;
        default:
          Qt4(this, this._t0, i9 = Sn3(this, t10, n13));
          break;
      }
      this._x0 = this._x1, this._x1 = t10, this._y0 = this._y1, this._y1 = n13, this._t0 = i9;
    }
  }
};
function En2(t10) {
  this._context = new An3(t10);
}
(En2.prototype = Object.create(kt4.prototype)).point = function(t10, n13) {
  kt4.prototype.point.call(this, n13, t10);
};
function An3(t10) {
  this._context = t10;
}
An3.prototype = {
  moveTo: function(t10, n13) {
    this._context.moveTo(n13, t10);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(t10, n13) {
    this._context.lineTo(n13, t10);
  },
  bezierCurveTo: function(t10, n13, i9, e30, s14, o21) {
    this._context.bezierCurveTo(n13, t10, e30, i9, o21, s14);
  }
};
function Pn2(t10) {
  this._context = t10;
}
Pn2.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var t10 = this._x, n13 = this._y, i9 = t10.length;
    if (i9) if (this._line ? this._context.lineTo(t10[0], n13[0]) : this._context.moveTo(t10[0], n13[0]), i9 === 2) this._context.lineTo(t10[1], n13[1]);
    else for (var e30 = Rn2(t10), s14 = Rn2(n13), o21 = 0, a11 = 1; a11 < i9; ++o21, ++a11) this._context.bezierCurveTo(e30[0][o21], s14[0][o21], e30[1][o21], s14[1][o21], t10[a11], n13[a11]);
    (this._line || this._line !== 0 && i9 === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(t10, n13) {
    this._x.push(+t10), this._y.push(+n13);
  }
};
function Rn2(t10) {
  var n13, i9 = t10.length - 1, e30, s14 = new Array(i9), o21 = new Array(i9), a11 = new Array(i9);
  for (s14[0] = 0, o21[0] = 2, a11[0] = t10[0] + 2 * t10[1], n13 = 1; n13 < i9 - 1; ++n13) s14[n13] = 1, o21[n13] = 4, a11[n13] = 4 * t10[n13] + 2 * t10[n13 + 1];
  for (s14[i9 - 1] = 2, o21[i9 - 1] = 7, a11[i9 - 1] = 8 * t10[i9 - 1] + t10[i9], n13 = 1; n13 < i9; ++n13) e30 = s14[n13] / o21[n13 - 1], o21[n13] -= e30, a11[n13] -= e30 * a11[n13 - 1];
  for (s14[i9 - 1] = a11[i9 - 1] / o21[i9 - 1], n13 = i9 - 2; n13 >= 0; --n13) s14[n13] = (a11[n13] - s14[n13 + 1]) / o21[n13];
  for (o21[i9 - 1] = (t10[i9] + s14[i9 - 1]) / 2, n13 = 0; n13 < i9 - 1; ++n13) o21[n13] = 2 * t10[n13 + 1] - s14[n13 + 1];
  return [
    s14,
    o21
  ];
}
function wt5(t10, n13) {
  this._context = t10, this._t = n13;
}
wt5.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(t10, n13) {
    switch (t10 = +t10, n13 = +n13, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(t10, n13) : this._context.moveTo(t10, n13);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) this._context.lineTo(this._x, n13), this._context.lineTo(t10, n13);
        else {
          var i9 = this._x * (1 - this._t) + t10 * this._t;
          this._context.lineTo(i9, this._y), this._context.lineTo(i9, n13);
        }
        break;
      }
    }
    this._x = t10, this._y = n13;
  }
};

// deno:https://esm.sh/d3-zoom@3.0.0/denonext/d3-zoom.mjs
function v14(n13, f15, m12) {
  this.k = n13, this.x = f15, this.y = m12;
}
v14.prototype = {
  constructor: v14,
  scale: function(n13) {
    return n13 === 1 ? this : new v14(this.k * n13, this.x, this.y);
  },
  translate: function(n13, f15) {
    return n13 === 0 & f15 === 0 ? this : new v14(this.k, this.x + this.k * n13, this.y + this.k * f15);
  },
  apply: function(n13) {
    return [
      n13[0] * this.k + this.x,
      n13[1] * this.k + this.y
    ];
  },
  applyX: function(n13) {
    return n13 * this.k + this.x;
  },
  applyY: function(n13) {
    return n13 * this.k + this.y;
  },
  invert: function(n13) {
    return [
      (n13[0] - this.x) / this.k,
      (n13[1] - this.y) / this.k
    ];
  },
  invertX: function(n13) {
    return (n13 - this.x) / this.k;
  },
  invertY: function(n13) {
    return (n13 - this.y) / this.k;
  },
  rescaleX: function(n13) {
    return n13.copy().domain(n13.range().map(this.invertX, this).map(n13.invert, n13));
  },
  rescaleY: function(n13) {
    return n13.copy().domain(n13.range().map(this.invertY, this).map(n13.invert, n13));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var V8 = new v14(1, 0, 0);
F13.prototype = v14.prototype;
function F13(n13) {
  for (; !n13.__zoom; ) if (!(n13 = n13.parentNode)) return V8;
  return n13.__zoom;
}

// src/types.ts
var CANONICAL_ZONES = (() => {
  const zones = [];
  for (let g7 = 1; g7 <= 4; g7++) {
    for (const letter of [
      "A",
      "B",
      "C"
    ]) {
      for (const suffix of [
        "v",
        "d"
      ]) {
        zones.push(`${g7}${letter}${suffix}`);
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
  for (const l9 of lesionsRaw) {
    if (!l9 || typeof l9 !== "object") {
      warnings.push("Invalid lesion entry (not an object)");
      continue;
    }
    const rec = l9;
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
      zones = rec.zones.map((z9) => normalizeZoneId(String(z9)));
    } else if (typeof rec.zones === "string") {
      zones = [
        normalizeZoneId(rec.zones)
      ];
    }
    const validZones = [];
    for (const z9 of zones) {
      if (CANONICAL_ZONES.includes(z9)) validZones.push(z9);
      else warnings.push(`Lesion ${id} references invalid zone '${z9}'`);
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
function getPiradsColor(p12) {
  return PI_RADS_COLORS[Math.min(5, Math.max(1, Math.round(p12)))];
}
function computeZoneState(lesions = {}) {
  const result = {};
  for (const z9 of CANONICAL_ZONES) {
    result[z9] = {
      highestPirads: null,
      lesionIds: [],
      count: 0
    };
  }
  for (const lesion of lesions) {
    const id = lesion.id;
    const p12 = Number(lesion.pirads) || 0;
    for (const zone of lesion.zones || []) {
      if (!result[zone]) {
        result[zone] = {
          highestPirads: null,
          lesionIds: [],
          count: 0
        };
      }
      const st2 = result[zone];
      st2.lesionIds.push(id);
      st2.count = st2.lesionIds.length;
      if (st2.highestPirads === null || p12 > st2.highestPirads) {
        st2.highestPirads = p12;
      }
    }
  }
  return result;
}
function escapeAttrValue(value) {
  return String(value ?? "").replace(/"/g, '\\"');
}
function supportsD3Mutation(rootSelection) {
  const node = rootSelection.node();
  if (!node) return false;
  const ownerDoc = node.ownerDocument;
  return !!(ownerDoc && typeof ownerDoc.createElementNS === "function");
}
function findZoneElement(root, zoneId) {
  const attrSelector = `[id="${escapeAttrValue(zoneId)}"]`;
  try {
    const attrMatch = root.querySelector?.(attrSelector) ?? null;
    if (attrMatch) return attrMatch;
  } catch {
  }
  try {
    const hashMatch = root.querySelector?.(`#${zoneId}`) ?? null;
    if (hashMatch) return hashMatch;
  } catch {
  }
  if (typeof root.querySelectorAll === "function") {
    const nodes = root.querySelectorAll("[id]");
    for (const node of Array.from(nodes)) {
      if (node.getAttribute("id") === zoneId) {
        return node;
      }
    }
  }
  const elementsMap = root.elements;
  if (elementsMap) {
    for (const candidate of Object.values(elementsMap)) {
      const attr = candidate?.getAttribute?.("id") ?? null;
      const prop = candidate.id ?? null;
      if (attr === zoneId || prop === zoneId) {
        return candidate;
      }
    }
  }
  return null;
}
function selectZoneElement(rootSelection, zoneId) {
  const selector = `[id="${escapeAttrValue(zoneId)}"]`;
  const selection = rootSelection.select(selector);
  if (!selection.empty()) return selection;
  const rootNode = rootSelection.node();
  if (!rootNode) return selection;
  const fallback = findZoneElement(rootNode, zoneId);
  return fallback ? M2(fallback) : selection;
}
function ensureOverlayLayer(rootSelection) {
  let layer = rootSelection.select("g.zone-overlays");
  if (layer.empty()) {
    layer = rootSelection.append("g").attr("class", "zone-overlays").attr("data-overlay-layer", "true");
  }
  return layer;
}
function applyZoneStylesFallback(root, zoneState) {
  for (const [zoneId, state] of Object.entries(zoneState)) {
    const el = findZoneElement(root, zoneId);
    if (!el) {
      console.warn(`Zone ID "${zoneId}" not found in SVG map`);
      continue;
    }
    if (state.highestPirads === null) {
      el.setAttribute?.("fill", "none");
      el.removeAttribute?.("data-pirads");
      el.removeAttribute?.("data-patterns");
      continue;
    }
    el.setAttribute?.("fill", getPiradsColor(state.highestPirads));
    el.setAttribute?.("data-pirads", String(state.highestPirads));
    if (state.count > 1) {
      const patterns = state.lesionIds.map(getPatternId).join(" ");
      el.setAttribute?.("data-patterns", patterns);
    } else {
      el.removeAttribute?.("data-patterns");
    }
  }
}
function applyZoneStyles(root, zoneState) {
  if (!root) return;
  const rootSelection = M2(root);
  if (rootSelection.empty()) return;
  const rootNode = rootSelection.node();
  if (!rootNode) return;
  if (!supportsD3Mutation(rootSelection)) {
    applyZoneStylesFallback(rootNode, zoneState);
    return;
  }
  const overlayLayer = ensureOverlayLayer(rootSelection);
  for (const [zoneId, state] of Object.entries(zoneState)) {
    const zoneSelection = selectZoneElement(rootSelection, zoneId);
    if (zoneSelection.empty()) {
      console.warn(`Zone ID "${zoneId}" not found in SVG map`);
      continue;
    }
    if (state.highestPirads === null) {
      zoneSelection.attr("data-pirads", null).attr("fill", "none").attr("data-patterns", null);
      overlayLayer.selectAll(`use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`).remove();
      continue;
    }
    zoneSelection.attr("data-pirads", String(state.highestPirads)).attr("fill", getPiradsColor(state.highestPirads));
    if (state.count > 1) {
      const patternIds = state.lesionIds.map(getPatternId);
      zoneSelection.attr("data-patterns", patternIds.join(" "));
      ensurePatternDefs(root, state.lesionIds);
      const overlayData = state.lesionIds.map((lesionId, index) => ({
        lesionId,
        patternId: getPatternId(lesionId),
        opacity: Math.max(0.2, 0.7 - index * 0.2),
        overlayIndex: index,
        zoneId
      }));
      const zoneOverlaySelection = overlayLayer.selectAll(`use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`).data(overlayData, (d11) => d11.lesionId);
      zoneOverlaySelection.exit().remove();
      const zoneOverlayEnter = zoneOverlaySelection.enter().append("use").attr("class", "zone-overlay").attr("data-overlay-for", zoneId).attr("pointer-events", "none");
      const zoneOverlayMerge = zoneOverlayEnter.merge(zoneOverlaySelection);
      zoneOverlayMerge.attr("href", `#${zoneId}`).attr("xlink:href", `#${zoneId}`).attr("fill", (d11) => `url(#${d11.patternId})`).attr("data-pattern-id", (d11) => d11.patternId).attr("data-overlay-index", (d11) => String(d11.overlayIndex)).attr("opacity", (d11) => String(d11.opacity));
      zoneOverlayMerge.order();
    } else {
      zoneSelection.attr("data-patterns", null);
      overlayLayer.selectAll(`use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`).remove();
    }
  }
}
var PATTERN_SIZE = 20;
var PATTERN_BUILDERS = [
  (pattern) => {
    pattern.append("path").attr("d", `M0 ${PATTERN_SIZE} L${PATTERN_SIZE} 0`).attr("stroke", "#000").attr("stroke-opacity", "0.85").attr("stroke-width", "2");
  },
  (pattern) => {
    pattern.append("path").attr("d", `M0 ${PATTERN_SIZE} L${PATTERN_SIZE} 0`).attr("stroke", "#000").attr("stroke-opacity", "0.7").attr("stroke-width", "1.8");
    pattern.append("path").attr("d", `M0 0 L${PATTERN_SIZE} ${PATTERN_SIZE}`).attr("stroke", "#000").attr("stroke-opacity", "0.7").attr("stroke-width", "1.8");
  },
  (pattern) => {
    pattern.append("circle").attr("cx", PATTERN_SIZE / 2).attr("cy", PATTERN_SIZE / 2).attr("r", PATTERN_SIZE / 4).attr("fill", "#000").attr("fill-opacity", "0.45");
  }
];
function patternIndexForLesion(lesionId) {
  const normalized = String(lesionId ?? "");
  let sum = 0;
  for (let i9 = 0; i9 < normalized.length; i9++) sum += normalized.charCodeAt(i9);
  return PATTERN_BUILDERS.length ? sum % PATTERN_BUILDERS.length : 0;
}
function getPatternId(lesionId) {
  return `pattern-${String(lesionId).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
function ensurePatternDefs(root, lesionIds) {
  if (!root || !lesionIds.length) return;
  const rootSelection = M2(root);
  if (rootSelection.empty()) return;
  if (!supportsD3Mutation(rootSelection)) return;
  let defs = rootSelection.select("defs");
  if (defs.empty()) {
    defs = rootSelection.insert("defs", ":first-child");
  }
  const uniqueIds = Array.from(new Set(lesionIds));
  const data = uniqueIds.map((lesionId) => ({
    lesionId,
    patternId: getPatternId(lesionId),
    builderIndex: patternIndexForLesion(lesionId)
  }));
  const patternSelection = defs.selectAll('pattern[data-pattern-source="lesion"]').data(data, (d11) => d11.patternId);
  const patternEnter = patternSelection.enter().append("pattern").attr("id", (d11) => d11.patternId).attr("data-pattern-source", "lesion").attr("patternUnits", "userSpaceOnUse").attr("width", PATTERN_SIZE).attr("height", PATTERN_SIZE);
  patternEnter.append("rect").attr("x", 0).attr("y", 0).attr("width", PATTERN_SIZE).attr("height", PATTERN_SIZE).attr("fill", "none").attr("stroke", "none");
  patternEnter.each(function(d11) {
    const patternSelectionForBuilder = M2(this);
    const builder = PATTERN_BUILDERS[d11.builderIndex] ?? PATTERN_BUILDERS[0];
    builder(patternSelectionForBuilder);
  });
}

// src/utils/translations.ts
var translations = {
  en: {
    legendTitle: "Legend",
    piradsLabel: "PI-RADS",
    patternsLabel: "Patterns",
    patternDiagonal: "Diagonal",
    patternCrosshatch: "Crosshatch",
    patternDots: "Dots",
    zoneLabel: "Zone",
    lesionIdLabel: "ID",
    piradsValueLabel: "PI-RADS",
    commentLabel: "Comment",
    sizeLabel: "Size",
    detailsLabel: "Details"
  },
  sv: {
    legendTitle: "F\xF6rklaring",
    piradsLabel: "PI-RADS",
    patternsLabel: "M\xF6nster",
    patternDiagonal: "Diagonal",
    patternCrosshatch: "Korsat",
    patternDots: "Punkter",
    zoneLabel: "Zon",
    lesionIdLabel: "ID",
    piradsValueLabel: "PI-RADS",
    commentLabel: "Kommentar",
    sizeLabel: "Storlek",
    detailsLabel: "Detaljer"
  }
};

// src/components/prostate-mri-map.ts
var template = document.createElement("template");
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
  _language = "en";
  _currentZone = null;
  _activePatterns = /* @__PURE__ */ new Set();
  constructor() {
    super();
    this.shadow = this.attachShadow({
      mode: "open"
    });
    this.shadow.appendChild(template.content.cloneNode(true));
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
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (slot) slot.addEventListener("slotchange", this._onSlotChange);
    const panel = this.shadow.querySelector("#detail-panel");
    const closeBtn = this.shadow.querySelector("#detail-close");
    closeBtn.addEventListener("click", this._onPanelClose);
    panel.addEventListener("click", (e30) => {
      if (e30.target === panel) this._onPanelClose();
    });
    this.shadow.addEventListener("keydown", this._onPanelKeydown);
    this._wireSlottedZones();
    this._applyStylesToSlottedSvg();
  }
  disconnectedCallback() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (slot) slot.removeEventListener("slotchange", this._onSlotChange);
    const panel = this.shadow.querySelector("#detail-panel");
    const closeBtn = this.shadow.querySelector("#detail-close");
    closeBtn.removeEventListener("click", this._onPanelClose);
    panel.removeEventListener("click", this._onPanelClose);
    this.shadow.removeEventListener("keydown", this._onPanelKeydown);
    this._unwireSlottedZones();
  }
  // --- zone interaction plumbing ---
  _onSlotChange() {
    this._wireSlottedZones();
    this._applyStylesToSlottedSvg();
  }
  _wireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    const assigned = slot.assignedElements({
      flatten: true
    });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (!svgRoot) continue;
      const zones = M2(svgRoot).selectAll(".zone");
      zones.on(".zone-interaction", null).attr("tabindex", "0").attr("role", "button").attr("focusable", "true").on("click.zone-interaction", (event) => {
        this._onZoneClick(event);
      }).on("keydown.zone-interaction", (event) => {
        const keyboardEvent = event;
        if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
          keyboardEvent.preventDefault();
          this._onZoneKeydown(keyboardEvent);
        }
      }).on("mouseenter.zone-interaction", (event) => {
        this._onZoneMouseEnter(event);
      }).on("mouseleave.zone-interaction", (event) => {
        this._onZoneMouseLeave(event);
      }).on("focus.zone-interaction", (event) => {
        this._onZoneFocus(event);
      }).on("blur.zone-interaction", (event) => {
        this._onZoneBlur(event);
      });
      for (const zoneId of CANONICAL_ZONES) {
        const zoneElement = svgRoot.querySelector(`[id="${zoneId}"]`);
        if (zoneElement && !zoneElement.classList.contains("zone")) {
          M2(zoneElement).classed("zone", true).on(".zone-interaction", null).attr("tabindex", "0").attr("role", "button").attr("focusable", "true").on("click.zone-interaction", (event) => {
            this._onZoneClick(event);
          }).on("keydown.zone-interaction", (event) => {
            const keyboardEvent = event;
            if (keyboardEvent.key === "Enter" || keyboardEvent.key === " ") {
              keyboardEvent.preventDefault();
              this._onZoneKeydown(keyboardEvent);
            }
          }).on("mouseenter.zone-interaction", (event) => {
            this._onZoneMouseEnter(event);
          }).on("mouseleave.zone-interaction", (event) => {
            this._onZoneMouseLeave(event);
          }).on("focus.zone-interaction", (event) => {
            this._onZoneFocus(event);
          }).on("blur.zone-interaction", (event) => {
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
  _applyStylesToSlottedSvg() {
    try {
      const slot = this.shadow.querySelector('slot[name="map-svg"]');
      if (!slot) return;
      const nodes = slot.assignedElements({
        flatten: true
      });
      const lesions = Array.isArray(this._data?.lesions) ? this._data.lesions : [];
      const zoneState = computeZoneState(lesions);
      for (const el of nodes) {
        let svgRoot = null;
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
      this._dispatchWarning([
        `applyStyles failed: ${String(err)}`
      ]);
    }
  }
  _unwireSlottedZones() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    const assigned = slot.assignedElements({
      flatten: true
    });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (!svgRoot) continue;
      M2(svgRoot).selectAll(".zone").on(".zone-interaction", null);
    }
  }
  _onZoneClick(e30) {
    const target = e30.currentTarget;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId) return;
    const lesions = this._data?.lesions.filter((l9) => l9.zones.includes(zoneId)) || [];
    this._showDetailPanel(zoneId, lesions);
    this._dispatchZoneClick(zoneId, lesions);
  }
  _onZoneKeydown(e30) {
    if (e30.key === "Enter" || e30.key === " ") {
      e30.preventDefault();
      const target = e30.currentTarget;
      if (!target) return;
      const zoneId = target.id || null;
      if (!zoneId) return;
      const lesions = this._data?.lesions.filter((l9) => l9.zones.includes(zoneId)) || [];
      this._showDetailPanel(zoneId, lesions);
      this._dispatchZoneClick(zoneId, lesions);
    }
  }
  _onZoneMouseEnter(e30) {
    const target = e30.currentTarget;
    if (!target) return;
    const zoneId = target.id || null;
    if (!zoneId || !this._data?.lesions) return;
    const lesions = this._data.lesions.filter((l9) => l9.zones.includes(zoneId));
    if (lesions.length === 0) return;
    const affectedZones = /* @__PURE__ */ new Set();
    for (const lesion of lesions) {
      for (const z9 of lesion.zones) {
        affectedZones.add(z9);
      }
    }
    this._clearActivePatterns();
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    const assigned = slot.assignedElements({
      flatten: true
    });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (!svgRoot) continue;
      const overlayLayer = M2(svgRoot).select("g.zone-overlays");
      if (!overlayLayer.empty()) {
        for (const affectedZoneId of affectedZones) {
          overlayLayer.selectAll(`use.zone-overlay[data-overlay-for="${affectedZoneId}"]`).style("opacity", "1");
          this._activePatterns.add(affectedZoneId);
        }
      }
    }
  }
  _onZoneMouseLeave(_e3) {
    this._clearActivePatterns();
  }
  _onZoneFocus(e30) {
    this._onZoneMouseEnter(e30);
  }
  _onZoneBlur(_e3) {
    this._clearActivePatterns();
  }
  _clearActivePatterns() {
    const slot = this.shadow.querySelector('slot[name="map-svg"]');
    if (!slot) return;
    const assigned = slot.assignedElements({
      flatten: true
    });
    for (const node of assigned) {
      const svgRoot = node.tagName?.toLowerCase() === "svg" ? node : node.querySelector("svg");
      if (svgRoot) {
        const overlayLayer = M2(svgRoot).select("g.zone-overlays");
        if (!overlayLayer.empty()) {
          overlayLayer.selectAll("use.zone-overlay").style("opacity", "0");
        }
      }
    }
    this._activePatterns.clear();
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
  _showDetailPanel(zoneId, lesions) {
    this._currentZone = zoneId;
    const panel = this.shadow.querySelector("#detail-panel");
    const title = this.shadow.querySelector("#detail-title");
    const list = this.shadow.querySelector("#detail-lesions");
    const lang = this._language === "sv" ? "sv" : "en";
    const t10 = translations[lang];
    title.textContent = `${t10.zoneLabel} ${zoneId}`;
    list.innerHTML = "";
    for (const lesion of lesions) {
      const li2 = document.createElement("li");
      li2.innerHTML = `
        <strong>${t10.lesionIdLabel}:</strong> ${lesion.id}<br>
        <strong>${t10.piradsValueLabel}:</strong> ${lesion.pirads}<br>
        ${lesion.details?.comment ? `<strong>${t10.commentLabel}:</strong> ${lesion.details.comment}<br>` : ""}
        ${lesion.details?.size_mm ? `<strong>${t10.sizeLabel}:</strong> ${lesion.details.size_mm} mm<br>` : ""}
        ${lesion.details ? `<strong>${t10.detailsLabel}:</strong> ${JSON.stringify(lesion.details)}` : ""}
      `;
      list.appendChild(li2);
    }
    panel.classList.add("show");
    const closeBtn = this.shadow.querySelector("#detail-close");
    closeBtn.focus();
    this._onFocusIn = this._onFocusIn.bind(this);
    this.shadow.addEventListener("focusin", this._onFocusIn);
  }
  _hideDetailPanel() {
    this._currentZone = null;
    const panel = this.shadow.querySelector("#detail-panel");
    panel.classList.remove("show");
    this.shadow.removeEventListener("focusin", this._onFocusIn);
  }
  _onPanelClose() {
    this._hideDetailPanel();
  }
  _onPanelKeydown(e30) {
    const ke3 = e30;
    if (ke3.key === "Escape") {
      this._hideDetailPanel();
    }
  }
  _onFocusIn(e30) {
    if (!this._currentZone) return;
    const panel = this.shadow.querySelector("#detail-content");
    const target = e30.target;
    if (!panel.contains(target)) {
      const closeBtn = this.shadow.querySelector("#detail-close");
      closeBtn.focus();
    }
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
    if (name === "language") this.language = newValue || "en";
  }
  get data() {
    return this._data;
  }
  set data(v15) {
    if (v15) {
      const res = validateLesionData(v15);
      if (res.warnings.length) this._dispatchWarning(res.warnings);
      this._data = res.validData ?? null;
    } else this._data = null;
    this._render();
    this._applyStylesToSlottedSvg();
  }
  get language() {
    return this._language;
  }
  set language(v15) {
    this._language = v15;
    this._render();
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
    this._renderLegend();
  }
  _renderLegend() {
    const lang = this.language || "en";
    const t10 = translations[lang] || translations.en;
    const legendEl = this.shadow.getElementById("legend");
    if (!legendEl) return;
    legendEl.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = t10.legendTitle;
    legendEl.appendChild(title);
    const piradsSection = document.createElement("div");
    const piradsTitle = document.createElement("h4");
    piradsTitle.textContent = t10.piradsLabel;
    piradsSection.appendChild(piradsTitle);
    for (let i9 = 1; i9 <= 5; i9++) {
      const color = getPiradsColor(i9);
      const item = document.createElement("div");
      const swatch = document.createElement("span");
      swatch.style.backgroundColor = color;
      swatch.style.width = "20px";
      swatch.style.height = "20px";
      swatch.style.display = "inline-block";
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(` ${i9}`));
      piradsSection.appendChild(item);
    }
    legendEl.appendChild(piradsSection);
    const patternsSection = document.createElement("div");
    const patternsTitle = document.createElement("h4");
    patternsTitle.textContent = t10.patternsLabel;
    patternsSection.appendChild(patternsTitle);
    const patternKeys = [
      "patternDiagonal",
      "patternCrosshatch",
      "patternDots"
    ];
    patternKeys.forEach((key, index) => {
      const item = document.createElement("div");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "40");
      svg.setAttribute("height", "20");
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
      pattern.setAttribute("id", `legend-pattern-${index}`);
      pattern.setAttribute("patternUnits", "userSpaceOnUse");
      pattern.setAttribute("width", "20");
      pattern.setAttribute("height", "20");
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("width", "20");
      rect.setAttribute("height", "20");
      rect.setAttribute("fill", "none");
      pattern.appendChild(rect);
      if (index === 0) {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M0 20 L20 0");
        path.setAttribute("stroke", "#000");
        path.setAttribute("stroke-opacity", "0.85");
        path.setAttribute("stroke-width", "2");
        pattern.appendChild(path);
      } else if (index === 1) {
        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M0 20 L20 0");
        path1.setAttribute("stroke", "#000");
        path1.setAttribute("stroke-opacity", "0.7");
        path1.setAttribute("stroke-width", "1.8");
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M0 0 L20 20");
        path2.setAttribute("stroke", "#000");
        path2.setAttribute("stroke-opacity", "0.7");
        path2.setAttribute("stroke-width", "1.8");
        pattern.appendChild(path1);
        pattern.appendChild(path2);
      } else {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", "10");
        circle.setAttribute("r", "5");
        circle.setAttribute("fill", "#000");
        circle.setAttribute("fill-opacity", "0.45");
        pattern.appendChild(circle);
      }
      defs.appendChild(pattern);
      svg.appendChild(defs);
      const rectFill = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectFill.setAttribute("width", "40");
      rectFill.setAttribute("height", "20");
      rectFill.setAttribute("fill", `url(#legend-pattern-${index})`);
      svg.appendChild(rectFill);
      item.appendChild(svg);
      item.appendChild(document.createTextNode(` ${t10[key]}`));
      patternsSection.appendChild(item);
    });
    legendEl.appendChild(patternsSection);
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
