/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var H = Object.defineProperty;
var q = (o) => {
  throw TypeError(o);
};
var P = (o, n, r) => n in o ? H(o, n, { enumerable: !0, configurable: !0, writable: !0, value: r }) : o[n] = r;
var F = (o, n, r) => P(o, typeof n != "symbol" ? n + "" : n, r), y = (o, n, r) => n.has(o) || q("Cannot " + r);
var h = (o, n, r) => (y(o, n, "read from private field"), r ? r.call(o) : n.get(o)), m = (o, n, r) => n.has(o) ? q("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(o) : n.set(o, r), l = (o, n, r, i) => (y(o, n, "write to private field"), i ? i.call(o, r) : n.set(o, r), r), c = (o, n, r) => (y(o, n, "access private method"), r);
const I = `/*====================/\r
  Variables\r
/====================*/\r
\r
#frame {\r
	\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-aspectratio: 1;\r
	--intrinsic-width: 0px;\r
	--intrinsic-height: 0px;\r
}\r
\r
/*====================/\r
  Structure\r
/====================*/\r
\r
:host {\r
	display: inline-block;\r
}\r
\r
/*=== The Canvas ===*/\r
\r
#frame {\r
	container-type: size;\r
	position: relative;\r
	overflow: hidden;\r
	width: var(--width);\r
	height: var(--height);\r
}\r
\r
/*=== The Artwork ===*/\r
\r
img {\r
	box-sizing: content-box;\r
	display: inline-block;\r
	position: relative;\r
	position: absolute;\r
	box-sizing: content-box;\r
	transform: translateX(var(--translateX)) translateY(var(--translateY));\r
	\r
	/* For alt text of broken images. */\r
	white-space: nowrap;\r
	line-height: 1;\r
}\r
#frame.error img {\r
	width: auto;\r
	min-width: auto;\r
	max-width: none;\r
	height: auto;\r
	min-height: auto;\r
	max-height: none;\r
	left: 0;\r
	top: 0;\r
	transform: translateY(50cqh) translateY(-50%);\r
}\r
:host([align~=top]) #frame.error img {\r
	transform: translateY(0cqh) translateY(0%);\r
}\r
:host([align~=bottom]) #frame.error img {\r
	transform: translateY(100cqh) translateY(-100%);\r
}\r
\r
/*====================/\r
  Fit\r
/====================*/\r
\r
/*=== Using \`fit\` attribute ===*/\r
\r
:host([fit=none]) img {\r
	width: var(--intrinsic-width);\r
}\r
:host([fit=cover]) img {\r
	width: max(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
	min-width: 100cqw;\r
	min-height: 100cqh;\r
}\r
:host([fit=fill]) img {\r
	width: 100%;\r
	height: 100%;\r
}\r
:host([fit=contain]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
}\r
:host([fit=scale-down]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio), var(--intrinsic-width));\r
}\r
\r
/*=== Using \`--fit\` property ===*/\r
\r
:host([fit=none]) img {\r
	width: var(--intrinsic-width);\r
}\r
:host([fit=cover]) img {\r
	width: max(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
	min-width: 100cqw;\r
	min-height: 100cqh;\r
}\r
:host([fit=fill]) img {\r
	width: 100%;\r
	height: 100%;\r
}\r
:host([fit=contain]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
}\r
:host([fit=scale-down]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio), var(--intrinsic-width));\r
}\r
\r
/*====================/\r
  Alignment\r
/====================*/\r
\r
/*=== Horizontal ===*/\r
\r
img,\r
:host([align~=center]) img {\r
	--translateX: -50%;\r
	left: 50cqw;\r
}\r
:host([align~=left]) img {\r
	--translateX: 0%;\r
	left: 0cqw;\r
}\r
:host([align~=right]) img {\r
	--translateX: -100%;\r
	left: 100cqw;\r
}\r
\r
/*=== Vertical ===*/\r
\r
img,\r
:host([align~=center]) img {\r
	--translateY: -50%;\r
	top: 50cqh;\r
}\r
:host([align~=top]) img {\r
	--translateY: 0%;\r
	top: 0;\r
}\r
:host([align~=bottom]) img {\r
	--translateY: -100%;\r
	top: 100cqh;\r
}\r
`;
function M(o, n = [0, 0]) {
  let r, i;
  if (n instanceof HTMLElement) {
    const p = n.getBoundingClientRect();
    r = p.left, i = p.top;
  } else
    [r, i] = n;
  const e = o.getBoundingClientRect(), a = window.getComputedStyle(o), t = {
    // Outer edge of margins.
    marginBox: {},
    // Outer edge of borders.
    borderBox: {
      top: e.top - i,
      right: e.right - r,
      bottom: e.bottom - i,
      left: e.left - r,
      height: e.height,
      // === element.offsetHeight
      width: e.width
      // === element.offsetWidth
    },
    // Inner edge of borders, including scrollbar gutters, padding, and content.
    scrollbarBox: {},
    // Padding and content, excluding scrollbar gutters.
    paddingBox: {
      height: o.clientHeight,
      width: o.clientWidth
    },
    // Content without the surrounding padding.
    contentBox: {},
    // The width of each margin (pulled from computed style; can be negative).
    marginWidth: {},
    // The width of each border (pulled from computed style).
    borderWidth: {},
    // The width of each scrollbar gutter.
    // A scrollbar isn't necessarily displayed, but space can be reserved for it regardless.
    scrollbarWidth: {},
    // The width of the padding on each side (pulled from computed style).
    paddingWidth: {}
  };
  return t.marginWidth.top = parseFloat(a.marginTopWidth), t.marginWidth.right = parseFloat(a.marginRightWidth), t.marginWidth.bottom = parseFloat(a.marginBottomWidth), t.marginWidth.left = parseFloat(a.marginLeftWidth), t.borderWidth.top = parseFloat(a.borderTopWidth), t.borderWidth.right = parseFloat(a.borderRightWidth), t.borderWidth.bottom = parseFloat(a.borderBottomWidth), t.borderWidth.left = parseFloat(a.borderLeftWidth), t.scrollbarWidth.top = 0, t.scrollbarWidth.right = t.borderBox.width - t.borderWidth.left - t.borderWidth.right - t.paddingBox.width, t.scrollbarWidth.bottom = t.borderBox.height - t.borderWidth.top - t.borderWidth.bottom - t.paddingBox.height, t.scrollbarWidth.left = 0, a.scrollbarGutter === "stable both-edges" && (t.scrollbarWidth.right /= 2, t.scrollbarWidth.bottom /= 2, t.scrollbarWidth.top = t.scrollbarWidth.bottom, t.scrollbarWidth.left = t.scrollbarWidth.right), t.paddingWidth.top = parseFloat(a.paddingTop), t.paddingWidth.right = parseFloat(a.paddingRight), t.paddingWidth.bottom = parseFloat(a.paddingBottom), t.paddingWidth.left = parseFloat(a.paddingLeft), t.marginBox.top = t.borderBox.top - t.marginWidth.top, t.marginBox.right = t.borderBox.right + t.marginWidth.right, t.marginBox.bottom = t.borderBox.bottom + t.marginWidth.bottom, t.marginBox.left = t.borderBox.left - t.marginWidth.left, t.marginBox.x = t.marginBox.left, t.marginBox.y = t.marginBox.top, t.marginBox.height = t.marginBox.bottom - t.marginBox.top, t.marginBox.width = t.marginBox.right - t.marginBox.left, t.borderBox.x = t.borderBox.left, t.borderBox.y = t.borderBox.top, t.scrollbarBox.top = t.borderBox.top + t.borderWidth.top, t.scrollbarBox.right = t.borderBox.right - t.borderWidth.right, t.scrollbarBox.bottom = t.borderBox.bottom - t.borderWidth.bottom, t.scrollbarBox.left = t.borderBox.left + t.borderWidth.left, t.scrollbarBox.x = t.scrollbarBox.left, t.scrollbarBox.y = t.scrollbarBox.top, t.scrollbarBox.height = t.scrollbarBox.bottom - t.scrollbarBox.top, t.scrollbarBox.width = t.scrollbarBox.right - t.scrollbarBox.left, t.paddingBox.top = t.scrollbarBox.top + t.scrollbarWidth.top, t.paddingBox.right = t.scrollbarBox.right - t.scrollbarWidth.right, t.paddingBox.bottom = t.scrollbarBox.bottom - t.scrollbarWidth.bottom, t.paddingBox.left = t.scrollbarBox.left + t.scrollbarWidth.left, t.paddingBox.x = t.paddingBox.left, t.paddingBox.y = t.paddingBox.top, t.contentBox.top = t.paddingBox.top + t.paddingWidth.top, t.contentBox.right = t.paddingBox.right - t.paddingWidth.right, t.contentBox.bottom = t.paddingBox.bottom - t.paddingWidth.bottom, t.contentBox.left = t.paddingBox.left + t.paddingWidth.left, t.contentBox.x = t.contentBox.left, t.contentBox.y = t.contentBox.top, t.contentBox.height = t.contentBox.bottom - t.contentBox.top, t.contentBox.width = t.contentBox.right - t.contentBox.left, t;
}
const R = /* @__PURE__ */ new Set(["none", "cover", "fill", "contain", "scale-down"]), z = "cover", S = /* @__PURE__ */ new Set(["top", "middle", "center", "bottom"]), G = "middle", T = /* @__PURE__ */ new Set(["left", "center", "right"]), O = "center", A = "image/svg+xml", u = 300, v = 150;
var s, g, b, x, f, W, d, Y, C, _, D, E, B;
class L extends HTMLElement {
  constructor() {
    console.log("constructor()");
    super();
    m(this, d);
    m(this, s);
    m(this, g);
    m(this, b);
    m(this, x);
    m(this, f);
    m(this, W);
    const r = this.attachShadow({ mode: "open" }), i = document.createElement("template");
    i.innerHTML = `<style>${I}</style><div id="frame"><div id="mount"><img src="" alt="" part="img"></div></div>`, r.appendChild(i.content.cloneNode(!0)), l(this, s, r.querySelector("#frame")), l(this, g, r.querySelector("img")), h(this, g).addEventListener("load", () => c(this, d, Y).call(this)), h(this, g).addEventListener("error", () => c(this, d, C).call(this)), new ResizeObserver((a) => {
      console.log("resizeObserver"), c(this, d, B).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(r, i, e) {
    console.log("attributeChangedCallback()"), console.log(r, i, e), i !== e && (r === "src" ? h(this, g).src = e : r === "alt" ? h(this, g).alt = e || "" : c(this, d, B).call(this));
  }
}
s = new WeakMap(), g = new WeakMap(), b = new WeakMap(), x = new WeakMap(), f = new WeakMap(), W = new WeakMap(), d = new WeakSet(), Y = function() {
  console.log("imageLoadHandler()"), console.log(h(this, s)), h(this, s).classList.remove("error"), U(h(this, g)).then((r) => {
    l(this, b, r.width), l(this, x, r.height), l(this, f, r.aspectRatio), l(this, W, r.mimeType || ""), c(this, d, B).call(this);
  });
}, C = function() {
  console.log("imageErrorHandler()"), h(this, s).classList.add("error"), l(this, W, ""), h(this, g).alt = this.getAttribute("alt") || "";
  const r = h(this, g).getBoundingClientRect();
  l(this, b, r.width), l(this, x, r.height), l(this, f, r.width && r.height ? r.width / r.height : 1), c(this, d, B).call(this, r.width, r.height);
}, _ = function() {
  console.log("updateDimensions()"), h(this, s).style.removeProperty("--width"), h(this, s).style.removeProperty("--height");
  const r = M(this);
  let i, e;
  this.style.width ? i = r.scrollbarBox.width : i = Math.max(h(this, b), r.scrollbarBox.width), this.style.height ? e = r.scrollbarBox.height : e = Math.max(h(this, x), r.scrollbarBox.height), h(this, s).style.setProperty("--width", `${i}px`), h(this, s).style.setProperty("--height", `${e}px`);
}, D = function() {
  console.log("updateFit()");
  let r = window.getComputedStyle(this).getPropertyValue("--fit");
  R.has(r) ? h(this, s).dataset.fit = r : (r = this.getAttribute("fit"), h(this, s).dataset.fit = R.has(r) ? r : z);
}, E = function() {
  var a;
  console.log("updateAlignment()");
  let r = new Set(((a = this.getAttribute("align")) == null ? void 0 : a.split(" ")) || []), i = window.getComputedStyle(this).getPropertyValue("--align-x");
  T.has(i) || (i = r && T.intersection(r).values(), i != null && i.size ? (i = i.next().value, r.delete(i)) : i = O);
  let e = window.getComputedStyle(this).getPropertyValue("--align-y");
  S.has(e) || (e = r && S.intersection(r).values(), e != null && e.size ? e = e.next().value : e = G), h(this, s).dataset.alignX = i, e === "center" && (e = "middle"), h(this, s).dataset.alignY = e;
}, B = function() {
  console.log("refreshImage()"), h(this, s).style.setProperty("--intrinsic-width", `${h(this, b)}px`), h(this, s).style.setProperty("--intrinsic-height", `${h(this, x)}px`), h(this, s).style.setProperty("--intrinsic-aspectratio", h(this, f)), c(this, d, _).call(this), c(this, d, D).call(this), c(this, d, E).call(this);
}, // Observe changes to these custom attributes.
F(L, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
function U(o) {
  return new Promise(async (n, r) => {
    let i = {};
    try {
      const a = await (await fetch(o.src)).blob();
      i.mimeType = a.type;
    } catch (e) {
      console.warn(`Unable to determine MIME type of ${o.src}`, e.message), i.mimeType ?? (i.mimeType = "");
    }
    if (!i.mimeType || i.mimeType === A) {
      let e;
      try {
        const w = await (await fetch(o.src)).text();
        e = new DOMParser().parseFromString(w, A).querySelector("svg");
      } catch {
        const w = o.getBoundingClientRect();
        return i.width = w.width, i.height = w.height, i.width && i.height && (i.aspectRatio = i.width / i.height), n(i);
      }
      let a = parseFloat(e.getAttribute("width")), t = parseFloat(e.getAttribute("height"));
      if (a && t)
        i.width = a, i.height = t, i.aspectRatio = i.width / i.height;
      else if (e.hasAttribute("viewBox")) {
        let p = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
        p ? (p = p.map((w) => Math.abs(Number(w))), [, a, t] = p, i.width = a || u, i.height = t || v, i.aspectRatio = i.width / i.height) : (i.aspectRatio = u / v, i.width ?? (i.width = i.height * i.aspectRatio || u), i.height ?? (i.height = i.width * i.aspectRatio || v));
      } else
        i.width ?? (i.width = u), i.height ?? (i.height = v), i.aspectRatio = i.width / i.height;
    } else if (i.width = o.naturalWidth, i.height = o.naturalHeight, i.width && i.height)
      i.aspectRatio = i.width / i.height;
    else {
      const e = o.getBoundingClientRect();
      return i.width = e.width, i.height = e.height, i.width && i.height && (i.aspectRatio = i.width / i.height), n(i);
    }
    return n(i);
  });
}
window.customElements.define("adaptive-image", L);
