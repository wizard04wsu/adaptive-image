/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var P = Object.defineProperty;
var F = (o) => {
  throw TypeError(o);
};
var I = (o, n, i) => n in o ? P(o, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : o[n] = i;
var R = (o, n, i) => I(o, typeof n != "symbol" ? n + "" : n, i), v = (o, n, i) => n.has(o) || F("Cannot " + i);
var a = (o, n, i) => (v(o, n, "read from private field"), i ? i.call(o) : n.get(o)), b = (o, n, i) => n.has(o) ? F("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(o) : n.set(o, i), d = (o, n, i, r) => (v(o, n, "write to private field"), r ? r.call(o, i) : n.set(o, i), i), c = (o, n, i) => (v(o, n, "access private method"), i);
const M = `/*====================/\r
  Variables\r
/====================*/\r
\r
div {\r
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
/*#frame {\r
	container-type: size;\r
	position: relative;\r
	overflow: hidden;\r
	width: var(--width);\r
	height: var(--height);\r
}*/\r
\r
/*=== The Artwork ===*/\r
\r
/*img {\r
	box-sizing: content-box;\r
	display: inline-block;\r
	position: relative;\r
	position: absolute;\r
	box-sizing: content-box;\r
	transform: translateX(var(--translateX)) translateY(var(--translateY));\r
	\r
	/* For alt text of broken images. */\r
/*	white-space: nowrap;\r
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
}*/\r
\r
:host #outer {\r
	height: 100%;\r
	overflow: hidden;\r
}\r
\r
/*====================/\r
  Fit\r
/====================*/\r
\r
/*=== Using \`fit\` attribute ===*/\r
\r
:host #inner {\r
	height: 100%;\r
}\r
:host([fit=contain]) #inner {\r
	width: auto;\r
	max-width: 100%;\r
	aspect-ratio: var(--intrinsic-aspectratio);\r
}\r
\r
:host([fit=cover]) img {\r
	width: fit-content;\r
	height: fit-content;\r
	min-width: 100%;\r
	min-height: 100%;\r
}\r
:host([fit=fill]) img {\r
	width: 100%;\r
	height: 100%;\r
}\r
:host([fit=contain]) img {\r
	width: 100%;\r
	aspect-ratio: inherit;\r
}\r
:host([fit=scale-down]) img {\r
	max-width: 100%;\r
	max-height: 100%;\r
}\r
\r
/*=== Using \`--fit\` property ===*/\r
\r
/*TODO*/\r
\r
/*====================/\r
  Alignment\r
/====================*/\r
\r
:host #inner {\r
	text-align: left;\r
	transform: translateX(var(--translateX)) translateY(var(--translateY));\r
}\r
:host img {\r
	transform: translateX(calc(-1 * var(--translateX))) translateY(calc(-1 * var(--translateY)));\r
}\r
\r
/*=== Horizontal ===*/\r
\r
/* Center (default) */\r
:host #inner { --translateX: 50%; }\r
\r
/* Left */\r
:host([align~=left]) #inner { --translateX: 0%; }\r
\r
/* Right */\r
:host([align~=right]) #inner { --translateX: 100%; }\r
\r
/*=== Vertical ===*/\r
\r
/* Middle (default) */\r
:host #inner { --translateY: 50%; }\r
\r
/* Top */\r
:host([align~=top]) #inner { --translateY: 0%; }\r
\r
/* Bottom */\r
:host([align~=bottom]) #inner { --translateY: 100%; }\r
`;
function X(o, n = [0, 0]) {
  let i, r;
  if (n instanceof HTMLElement) {
    const p = n.getBoundingClientRect();
    i = p.left, r = p.top;
  } else
    [i, r] = n;
  const e = o.getBoundingClientRect(), s = window.getComputedStyle(o), t = {
    // Outer edge of margins.
    marginBox: {},
    // Outer edge of borders.
    borderBox: {
      top: e.top - r,
      right: e.right - i,
      bottom: e.bottom - r,
      left: e.left - i,
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
  return t.marginWidth.top = parseFloat(s.marginTopWidth), t.marginWidth.right = parseFloat(s.marginRightWidth), t.marginWidth.bottom = parseFloat(s.marginBottomWidth), t.marginWidth.left = parseFloat(s.marginLeftWidth), t.borderWidth.top = parseFloat(s.borderTopWidth), t.borderWidth.right = parseFloat(s.borderRightWidth), t.borderWidth.bottom = parseFloat(s.borderBottomWidth), t.borderWidth.left = parseFloat(s.borderLeftWidth), t.scrollbarWidth.top = 0, t.scrollbarWidth.right = t.borderBox.width - t.borderWidth.left - t.borderWidth.right - t.paddingBox.width, t.scrollbarWidth.bottom = t.borderBox.height - t.borderWidth.top - t.borderWidth.bottom - t.paddingBox.height, t.scrollbarWidth.left = 0, s.scrollbarGutter === "stable both-edges" && (t.scrollbarWidth.right /= 2, t.scrollbarWidth.bottom /= 2, t.scrollbarWidth.top = t.scrollbarWidth.bottom, t.scrollbarWidth.left = t.scrollbarWidth.right), t.paddingWidth.top = parseFloat(s.paddingTop), t.paddingWidth.right = parseFloat(s.paddingRight), t.paddingWidth.bottom = parseFloat(s.paddingBottom), t.paddingWidth.left = parseFloat(s.paddingLeft), t.marginBox.top = t.borderBox.top - t.marginWidth.top, t.marginBox.right = t.borderBox.right + t.marginWidth.right, t.marginBox.bottom = t.borderBox.bottom + t.marginWidth.bottom, t.marginBox.left = t.borderBox.left - t.marginWidth.left, t.marginBox.x = t.marginBox.left, t.marginBox.y = t.marginBox.top, t.marginBox.height = t.marginBox.bottom - t.marginBox.top, t.marginBox.width = t.marginBox.right - t.marginBox.left, t.borderBox.x = t.borderBox.left, t.borderBox.y = t.borderBox.top, t.scrollbarBox.top = t.borderBox.top + t.borderWidth.top, t.scrollbarBox.right = t.borderBox.right - t.borderWidth.right, t.scrollbarBox.bottom = t.borderBox.bottom - t.borderWidth.bottom, t.scrollbarBox.left = t.borderBox.left + t.borderWidth.left, t.scrollbarBox.x = t.scrollbarBox.left, t.scrollbarBox.y = t.scrollbarBox.top, t.scrollbarBox.height = t.scrollbarBox.bottom - t.scrollbarBox.top, t.scrollbarBox.width = t.scrollbarBox.right - t.scrollbarBox.left, t.paddingBox.top = t.scrollbarBox.top + t.scrollbarWidth.top, t.paddingBox.right = t.scrollbarBox.right - t.scrollbarWidth.right, t.paddingBox.bottom = t.scrollbarBox.bottom - t.scrollbarWidth.bottom, t.paddingBox.left = t.scrollbarBox.left + t.scrollbarWidth.left, t.paddingBox.x = t.paddingBox.left, t.paddingBox.y = t.paddingBox.top, t.contentBox.top = t.paddingBox.top + t.paddingWidth.top, t.contentBox.right = t.paddingBox.right - t.paddingWidth.right, t.contentBox.bottom = t.paddingBox.bottom - t.paddingWidth.bottom, t.contentBox.left = t.paddingBox.left + t.paddingWidth.left, t.contentBox.x = t.contentBox.left, t.contentBox.y = t.contentBox.top, t.contentBox.height = t.contentBox.bottom - t.contentBox.top, t.contentBox.width = t.contentBox.right - t.contentBox.left, t;
}
const T = /* @__PURE__ */ new Set(["none", "cover", "fill", "contain", "scale-down"]), z = "cover", S = /* @__PURE__ */ new Set(["top", "middle", "bottom"]), O = "middle", A = /* @__PURE__ */ new Set(["left", "center", "right"]), G = "center", L = "image/svg+xml", u = 300, y = 150;
var h, g, m, x, B, W, l, C, D, _, E, H, w;
class Y extends HTMLElement {
  constructor() {
    console.log("constructor()");
    super();
    b(this, l);
    b(this, h);
    b(this, g);
    b(this, m);
    b(this, x);
    b(this, B);
    b(this, W);
    const i = this.attachShadow({ mode: "open" }), r = document.createElement("template");
    r.innerHTML = `<style>${M}</style><div id="outer"><div id="inner"><img src="" alt="" part="img"></div></div>`, i.appendChild(r.content.cloneNode(!0)), d(this, h, i.querySelector("#frame")), d(this, g, i.querySelector("img")), a(this, g).addEventListener("load", () => c(this, l, C).call(this)), a(this, g).addEventListener("error", () => c(this, l, D).call(this)), new ResizeObserver((s) => {
      console.log("resizeObserver"), c(this, l, w).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(i, r, e) {
    console.log("attributeChangedCallback()"), console.log(i, r, e), r !== e && (i === "src" ? a(this, g).src = e : i === "alt" ? a(this, g).alt = e || "" : c(this, l, w).call(this));
  }
}
h = new WeakMap(), g = new WeakMap(), m = new WeakMap(), x = new WeakMap(), B = new WeakMap(), W = new WeakMap(), l = new WeakSet(), C = function() {
  console.log("imageLoadHandler()"), console.log(a(this, h)), a(this, h).classList.remove("error"), U(a(this, g)).then((i) => {
    d(this, m, i.width), d(this, x, i.height), d(this, B, i.aspectRatio), d(this, W, i.mimeType || ""), c(this, l, w).call(this);
  });
}, D = function() {
  console.log("imageErrorHandler()"), a(this, h).classList.add("error"), d(this, W, ""), a(this, g).alt = this.getAttribute("alt") || "";
  const i = a(this, g).getBoundingClientRect();
  d(this, m, i.width), d(this, x, i.height), d(this, B, i.width && i.height ? i.width / i.height : 1), c(this, l, w).call(this, i.width, i.height);
}, _ = function() {
  console.log("updateDimensions()"), a(this, h).style.removeProperty("--width"), a(this, h).style.removeProperty("--height");
  const i = X(this);
  let r, e;
  this.style.width ? r = i.scrollbarBox.width : r = Math.max(a(this, m), i.scrollbarBox.width), this.style.height ? e = i.scrollbarBox.height : e = Math.max(a(this, x), i.scrollbarBox.height), a(this, h).style.setProperty("--width", `${r}px`), a(this, h).style.setProperty("--height", `${e}px`);
}, E = function() {
  console.log("updateFit()");
  let i = window.getComputedStyle(this).getPropertyValue("--fit");
  T.has(i) ? a(this, h).dataset.fit = i : (i = this.getAttribute("fit"), a(this, h).dataset.fit = T.has(i) ? i : z);
}, H = function() {
  var s;
  console.log("updateAlignment()");
  let i = new Set(((s = this.getAttribute("align")) == null ? void 0 : s.split(" ")) || []), r = window.getComputedStyle(this).getPropertyValue("--align-x");
  A.has(r) || (r = i && A.intersection(i).values(), r != null && r.size ? r = r.next().value : r = G), a(this, h).dataset.alignX = r;
  let e = window.getComputedStyle(this).getPropertyValue("--align-y");
  S.has(e) || (e = i && S.intersection(i).values(), e != null && e.size ? e = e.next().value : e = O), a(this, h).dataset.alignY = e;
}, w = function() {
  console.log("refreshImage()"), a(this, h).style.setProperty("--intrinsic-width", `${a(this, m)}px`), a(this, h).style.setProperty("--intrinsic-height", `${a(this, x)}px`), a(this, h).style.setProperty("--intrinsic-aspectratio", a(this, B)), c(this, l, _).call(this), c(this, l, E).call(this), c(this, l, H).call(this);
}, // Observe changes to these custom attributes.
R(Y, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
function U(o) {
  return new Promise(async (n, i) => {
    let r = {};
    try {
      const s = await (await fetch(o.src)).blob();
      r.mimeType = s.type;
    } catch (e) {
      console.warn(`Unable to determine MIME type of ${o.src}`, e.message), r.mimeType ?? (r.mimeType = "");
    }
    if (!r.mimeType || r.mimeType === L) {
      let e;
      try {
        const f = await (await fetch(o.src)).text();
        e = new DOMParser().parseFromString(f, L).querySelector("svg");
      } catch {
        const f = o.getBoundingClientRect();
        return r.width = f.width, r.height = f.height, r.width && r.height && (r.aspectRatio = r.width / r.height), n(r);
      }
      let s = parseFloat(e.getAttribute("width")), t = parseFloat(e.getAttribute("height"));
      if (s && t)
        r.width = s, r.height = t, r.aspectRatio = r.width / r.height;
      else if (e.hasAttribute("viewBox")) {
        let p = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
        p ? (p = p.map((f) => Math.abs(Number(f))), [, s, t] = p, r.width = s || u, r.height = t || y, r.aspectRatio = r.width / r.height) : (r.aspectRatio = u / y, r.width ?? (r.width = r.height * r.aspectRatio || u), r.height ?? (r.height = r.width * r.aspectRatio || y));
      } else
        r.width ?? (r.width = u), r.height ?? (r.height = y), r.aspectRatio = r.width / r.height;
    } else if (r.width = o.naturalWidth, r.height = o.naturalHeight, r.width && r.height)
      r.aspectRatio = r.width / r.height;
    else {
      const e = o.getBoundingClientRect();
      return r.width = e.width, r.height = e.height, r.width && r.height && (r.aspectRatio = r.width / r.height), n(r);
    }
    return n(r);
  });
}
window.customElements.define("adaptive-image", Y);
