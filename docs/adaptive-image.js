/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var W = Object.defineProperty;
var S = (e) => {
  throw TypeError(e);
};
var z = (e, n, i) => n in e ? W(e, n, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[n] = i;
var T = (e, n, i) => z(e, typeof n != "symbol" ? n + "" : n, i), A = (e, n, i) => n.has(e) || S("Cannot " + i);
var s = (e, n, i) => (A(e, n, "read from private field"), i ? i.call(e) : n.get(e)), g = (e, n, i) => n.has(e) ? S("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), o = (e, n, i, t) => (A(e, n, "write to private field"), t ? t.call(e, i) : n.set(e, i), i), c = (e, n, i) => (A(e, n, "access private method"), i);
const G = `/*====================/\r
  Variables\r
/====================*/\r
\r
#frame {\r
	\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-aspectratio: 1;\r
	--intrinsic-width: 0px;\r
	--intrinsic-height: 0px;\r
	\r
	\r
	--specified-width: var(--width, var(--attribute-width, var(--intrinsic-width)));\r
	\r
	--specified-height: var(--height, var(--attribute-height, var(--intrinsic-height)));\r
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
	width: max(100%, var(--specified-width));\r
	height: var(--specified-height);\r
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
`, R = /* @__PURE__ */ new Set(["none", "cover", "fill", "contain", "scale-down"]), M = "cover", L = /* @__PURE__ */ new Set(["top", "middle", "center", "bottom"]), N = "middle", Y = /* @__PURE__ */ new Set(["left", "center", "right"]), U = "center", H = "image/svg+xml", q = 300, x = 150;
var a, l, p, f, u, b, h, E, F, P, C, I, D, v;
class _ extends HTMLElement {
  constructor() {
    console.log("constructor()");
    super();
    g(this, h);
    g(this, a);
    g(this, l);
    g(this, p);
    g(this, f);
    g(this, u);
    g(this, b);
    const i = this.attachShadow({ mode: "open" }), t = document.createElement("template");
    t.innerHTML = `<style>${G}</style><div id="frame"><div id="mount"><img src="" alt="" part="img"></div></div>`, i.appendChild(t.content.cloneNode(!0)), o(this, a, i.querySelector("#frame")), o(this, l, i.querySelector("img")), s(this, l).addEventListener("load", () => c(this, h, E).call(this)), s(this, l).addEventListener("error", () => c(this, h, F).call(this)), new ResizeObserver((d) => c(this, h, v).call(this)).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(i, t, r) {
    console.log("attributeChangedCallback()"), t !== r && (i === "src" ? s(this, l).src = r : i === "alt" ? s(this, l).alt = r || "" : c(this, h, v).call(this));
  }
}
a = new WeakMap(), l = new WeakMap(), p = new WeakMap(), f = new WeakMap(), u = new WeakMap(), b = new WeakMap(), h = new WeakSet(), E = function() {
  console.log("imageLoadHandler()"), console.log(s(this, a)), s(this, a).classList.remove("error"), O(s(this, l)).then((i) => {
    o(this, p, i.width), o(this, f, i.height), o(this, u, i.aspectRatio), o(this, b, i.mimeType || ""), c(this, h, v).call(this);
  });
}, F = function() {
  console.log("imageErrorHandler()"), s(this, a).classList.add("error"), o(this, b, ""), s(this, l).alt = this.getAttribute("alt") || "";
  const i = s(this, l).getBoundingClientRect();
  o(this, p, i.width), o(this, f, i.height), o(this, u, i.width && i.height ? i.width / i.height : 1), c(this, h, v).call(this, i.width, i.height);
}, P = function() {
  var t;
  console.log("updateWidth()");
  let i = Number((t = this.getAttribute("width")) == null ? void 0 : t.trim());
  i && i > 0 ? s(this, a).style.setProperty("--attribute-width", `${i}px`) : s(this, a).style.removeProperty("--attribute-width");
}, C = function() {
  var t;
  console.log("updateHeight()");
  let i = Number((t = this.getAttribute("height")) == null ? void 0 : t.trim());
  i && i > 0 ? s(this, a).style.setProperty("--attribute-height", `${i}px`) : s(this, a).style.removeProperty("--attribute-height");
}, I = function() {
  console.log("updateFit()");
  let i = window.getComputedStyle(this).getPropertyValue("--fit");
  R.has(i) ? s(this, a).dataset.fit = i : (i = this.getAttribute("fit"), s(this, a).dataset.fit = R.has(i) ? i : M);
}, D = function() {
  var d;
  console.log("updateAlignment()");
  let i = new Set(((d = this.getAttribute("align")) == null ? void 0 : d.split(" ")) || []), t = window.getComputedStyle(this).getPropertyValue("--align-x");
  Y.has(t) || (t = i && Y.intersection(i).values(), t != null && t.size ? (t = t.next().value, i.delete(t)) : t = U);
  let r = window.getComputedStyle(this).getPropertyValue("--align-y");
  L.has(r) || (r = i && L.intersection(i).values(), r != null && r.size ? r = r.next().value : r = N), s(this, a).dataset.alignX = t, r === "center" && (r = "middle"), s(this, a).dataset.alignY = r;
}, v = function() {
  console.log("refreshImage()"), s(this, a).style.setProperty("--intrinsic-width", `${s(this, p)}px`), s(this, a).style.setProperty("--intrinsic-height", `${s(this, f)}px`), s(this, a).style.setProperty("--intrinsic-aspectratio", s(this, u)), c(this, h, P).call(this), c(this, h, C).call(this), c(this, h, I).call(this), c(this, h, D).call(this);
}, // Observe changes to these custom attributes.
T(_, "observedAttributes", ["src", "alt", "width", "height", "fit", "align"]);
function O(e) {
  return new Promise(async (n, i) => {
    let t = {};
    try {
      const d = await (await fetch(e.src)).blob();
      t.mimeType = d.type;
    } catch (r) {
      console.warn(`Unable to determine MIME type of ${e.src}`, r.message), t.mimeType ?? (t.mimeType = "");
    }
    if (!t.mimeType || t.mimeType === H) {
      let r;
      try {
        const w = await (await fetch(e.src)).text();
        r = new DOMParser().parseFromString(w, H).querySelector("svg");
      } catch {
        const w = e.getBoundingClientRect();
        return t.width = w.width, t.height = w.height, t.width && t.height && (t.aspectRatio = t.width / t.height), n(t);
      }
      let d = parseFloat(r.getAttribute("width")), y = parseFloat(r.getAttribute("height"));
      if (d && y)
        t.width = d, t.height = y, t.aspectRatio = t.width / t.height;
      else if (r.hasAttribute("viewBox")) {
        let m = r.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
        m ? (m = m.map((w) => Math.abs(Number(w))), [, d, y] = m, t.width = d || q, t.height = y || x, t.aspectRatio = t.width / t.height) : (t.aspectRatio = q / x, t.width ?? (t.width = t.height * t.aspectRatio || q), t.height ?? (t.height = t.width * t.aspectRatio || x));
      } else
        t.width ?? (t.width = q), t.height ?? (t.height = x), t.aspectRatio = t.width / t.height;
    } else if (t.width = e.naturalWidth, t.height = e.naturalHeight, t.width && t.height)
      t.aspectRatio = t.width / t.height;
    else {
      const r = e.getBoundingClientRect();
      return t.width = r.width, t.height = r.height, t.width && t.height && (t.aspectRatio = t.width / t.height), n(t);
    }
    return n(t);
  });
}
window.customElements.define("adaptive-image", _);
