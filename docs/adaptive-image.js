/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var E = Object.defineProperty;
var A = (i) => {
  throw TypeError(i);
};
var I = (i, t, e) => t in i ? E(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var C = (i, t, e) => I(i, typeof t != "symbol" ? t + "" : t, e), T = (i, t, e) => t.has(i) || A("Cannot " + e);
var r = (i, t, e) => (T(i, t, "read from private field"), e ? e.call(i) : t.get(i)), m = (i, t, e) => t.has(i) ? A("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), c = (i, t, e, n) => (T(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), g = (i, t, e) => (T(i, t, "access private method"), e);
const _ = `:host {\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-width: 0px;\r
	--intrinsic-height: 0px;\r
	\r
	display: inline-block;\r
	width: var(--intrinsic-width);\r
	height: var(--intrinsic-height);\r
}\r
#outer {\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-width: 0px;\r
	--intrinsic-height: 0px;\r
	--intrinsic-aspectratio: 1;\r
	\r
	overflow: hidden;\r
	height: 100%;\r
	line-height: 1; /* For broken images. */\r
}\r
#inner {\r
	/* Align */\r
	text-align: left;\r
	transform: translateX(var(--translateX)) translateY(var(--translateY));\r
	\r
	/* Fit */\r
	height: 100%;\r
	container-type: size; /* Only required for fit=contain. */\r
}\r
#image {\r
	/* Align */\r
	display: inline-block;\r
	transform: translateX(calc(-1 * var(--translateX))) translateY(calc(-1 * var(--translateY)));\r
	\r
	/* Fit */\r
	aspect-ratio: var(--intrinsic-aspectratio);\r
}\r
\r
\r
/*====================/\r
  Alignment\r
/====================*/\r
\r
/*=== Horizontal ===*/\r
\r
/* Center (default) */\r
#inner {\r
	--translateX: 50%;\r
}\r
\r
/* Left */\r
[data-align-x~=left] #inner {\r
	--translateX: 0%;\r
}\r
\r
/* Right */\r
[data-align-x~=right] #inner {\r
	--translateX: 100%;\r
}\r
\r
/*=== Vertical ===*/\r
\r
/* Middle (default) */\r
#inner {\r
	--translateY: 50%;\r
}\r
\r
/* Top */\r
[data-align-y~=top] #inner {\r
	--translateY: 0%;\r
}\r
\r
/* Bottom */\r
[data-align-y~=bottom] #inner {\r
	--translateY: 100%;\r
}\r
\r
/* Broken image */\r
#inner:has(img.error) {\r
	display: table;\r
	width: max-content;\r
	min-width: 100%;\r
	transform: none;\r
}\r
#image:has(img.error) {\r
	display: table-cell;\r
	text-align: center;\r
	vertical-align: middle;\r
	height: 100cqh;\r
	transform: none;\r
}\r
[data-align-x~=left] #image:has(img.error) {\r
	text-align: left;\r
}\r
[data-align-x~=right] #image:has(img.error) {\r
	text-align: right;\r
}\r
[data-align-y~=top] #image:has(img.error) {\r
	vertical-align: top;\r
}\r
[data-align-y~=bottom] #image:has(img.error) {\r
	vertical-align: bottom;\r
}\r
\r
\r
/*====================/\r
  Fit\r
/====================*/\r
\r
/* Cover (default) */\r
[data-fit=cover] #image {\r
	min-width: 100%;\r
	min-height: 100%;\r
	width: fit-content;\r
	height: fit-content;\r
}\r
\r
/* Fill */\r
[data-fit=fill] #image {\r
	aspect-ratio: auto;\r
	width: 100%;\r
	height: 100%;\r
}\r
\r
/* Contain */\r
[data-fit=contain] #image {\r
	max-width: 100%;\r
	max-height: 100%;\r
	width: min(100cqw, calc(100cqh * var(--intrinsic-aspectratio)));\r
	height: min(100cqh, calc(100cqw / var(--intrinsic-aspectratio)));\r
}\r
\r
/* Scale-down */\r
[data-fit=scale-down] #image {\r
	max-width: 100%;\r
	max-height: 100%;\r
	width: min(100cqw, calc(100cqh * var(--intrinsic-aspectratio)), var(--intrinsic-width));\r
	height: min(100cqh, calc(100cqw / var(--intrinsic-aspectratio)), var(--intrinsic-height));\r
}\r
\r
/* None */\r
[data-fit=none] #image {\r
	/* Width and height are required here for SVGs. Otherwise 'auto' works fine. */\r
	width: var(--intrinsic-width);\r
	height: var(--intrinsic-height);\r
}\r
\r
/* Fit is not 'none' */\r
#outer:not([data-fit=none]) img {\r
	width: 100%;\r
	height: 100%;\r
}\r
\r
/* Broken image */\r
#outer:has(img.error) {\r
	overflow: auto;\r
	scrollbar-width: none;\r
}\r
#image:has(img.error) {\r
	width: 100%;\r
	height: auto;\r
}\r
`, M = `<style>${_}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, O = "cover", X = "middle", k = "center", L = "image/svg+xml", x = 300, F = 150, l = {
  enabled: !1,
  enable() {
    this.enabled = !0;
  },
  disable() {
    this.enabled = !1;
  }
};
for (const i in console)
  l[i] = function() {
    this.enabled && console[i].apply(null, arguments);
  };
l.logFn = (i) => l.log(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em;", "");
l.logFnGroup = (i) => l.group(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;", "");
var h, d, w, f, v, y, s, R, P, q, H, Y, b;
class S extends HTMLElement {
  constructor() {
    l.logFn("constructor");
    super();
    m(this, s);
    m(this, h);
    m(this, d);
    m(this, w);
    m(this, f);
    m(this, v);
    m(this, y);
    const e = this.attachShadow({ mode: "open" }), n = document.createElement("template");
    n.innerHTML = M, e.appendChild(n.content.cloneNode(!0)), c(this, h, e.querySelector("#outer")), c(this, d, e.querySelector("img")), r(this, d).addEventListener("load", () => g(this, s, R).call(this)), r(this, d).addEventListener("error", () => g(this, s, P).call(this)), new ResizeObserver((o) => {
      l.logFn("resizeObserver"), g(this, s, b).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(e, n, a) {
    n !== a && (e === "src" ? r(this, d).src = a : e === "alt" ? r(this, d).alt = a || "" : g(this, s, b).call(this));
  }
}
h = new WeakMap(), d = new WeakMap(), w = new WeakMap(), f = new WeakMap(), v = new WeakMap(), y = new WeakMap(), s = new WeakSet(), R = async function() {
  l.logFn("imageLoadHandler"), r(this, d).classList.remove("error");
  const e = await D(r(this, d));
  c(this, w, e.width), c(this, f, e.height), c(this, v, e.aspectRatio), c(this, y, e.mimeType || ""), g(this, s, b).call(this);
}, P = function() {
  l.logFn("imageErrorHandler"), r(this, d).classList.add("error"), c(this, y, ""), r(this, d).alt = this.getAttribute("alt") || "";
  const e = r(this, d).getBoundingClientRect();
  c(this, w, e.width), c(this, f, e.height), c(this, v, e.width && e.height ? e.width / e.height : 1), g(this, s, b).call(this, e.width, e.height);
}, q = function() {
  var p;
  l.logFn("updateAlignment");
  const e = ["top", "middle", "center", "bottom"];
  let n = ((p = this.getAttribute("align")) == null ? void 0 : p.toLowerCase().split(" ")) || [], a = window.getComputedStyle(this).getPropertyValue("--align-x").toLowerCase();
  if (!["left", "center", "right"].includes(a)) {
    a = "";
    for (const u of n)
      ["left", "right"].includes(u) && (a = u);
    !a && n.includes("center") && (a = "center", n.splice(n.indexOf("center"), 1)), a || (a = k);
  }
  r(this, h).dataset.alignX = a;
  let o = window.getComputedStyle(this).getPropertyValue("--align-y").toLowerCase();
  if (!e.includes(o)) {
    o = "";
    for (const u of n)
      e.includes(u) && (o = u);
    o || (o = X);
  }
  o === "center" && (o = "middle"), r(this, h).dataset.alignY = o;
}, H = function() {
  l.logFn("updateFit");
  const e = ["none", "cover", "fill", "contain", "scale-down"];
  let n = window.getComputedStyle(this).getPropertyValue("--fit").toLowerCase();
  e.includes(n) ? r(this, h).dataset.fit = n : (n = this.getAttribute("fit"), r(this, h).dataset.fit = e.includes(n) ? n : O);
}, // This was just created for the demo, but the `--adaptive-image-overflow` CSS property will still work if used otherwise.
Y = function() {
  l.logFn("updateOverflow");
  const e = window.getComputedStyle(this).getPropertyValue("--adaptive-image-overflow").toLowerCase();
  r(this, h).style.setProperty("overflow", null), e && r(this, h).style.setProperty("overflow", e);
}, b = function() {
  l.logFn("refreshImage"), r(this, h).classList.remove("svg"), r(this, y) === L && r(this, h).classList.add("svg"), g(this, s, q).call(this), g(this, s, H).call(this), g(this, s, Y).call(this), this.style.setProperty("--intrinsic-width", `${r(this, w)}px`), this.style.setProperty("--intrinsic-height", `${r(this, f)}px`), r(this, h).style.setProperty("--intrinsic-width", `${r(this, w)}px`), r(this, h).style.setProperty("--intrinsic-height", `${r(this, f)}px`), r(this, h).style.setProperty("--intrinsic-aspectratio", r(this, v));
}, // Observe changes to these custom attributes.
C(S, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
async function D(i) {
  l.debug("getImageProperties");
  let t = {};
  try {
    const n = await (await fetch(i.src)).blob();
    t.mimeType = n.type;
  } catch (e) {
    console.warn(`Unable to determine MIME type of ${i.src}`, e.message), t.mimeType ?? (t.mimeType = "");
  }
  if (!t.mimeType || t.mimeType === L) {
    let e;
    try {
      const p = await (await fetch(i.src)).text();
      e = new DOMParser().parseFromString(p, L).querySelector("svg");
    } catch {
      const p = i.getBoundingClientRect();
      return t.width = p.width, t.height = p.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    t.mimeType = L;
    let n = parseFloat(e.getAttribute("width")), a = parseFloat(e.getAttribute("height"));
    if (n && a)
      t.width = n, t.height = a, t.aspectRatio = t.width / t.height;
    else if (e.hasAttribute("viewBox")) {
      let o = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      o ? (o = o.map((p) => Math.abs(Number(p))), [, n, a] = o, t.width = n || x, t.height = a || F, t.aspectRatio = t.width / t.height) : (t.aspectRatio = x / F, t.width ?? (t.width = t.height * t.aspectRatio || x), t.height ?? (t.height = t.width * t.aspectRatio || F));
    } else
      t.width ?? (t.width = x), t.height ?? (t.height = F), t.aspectRatio = t.width / t.height;
  } else if (t.width = i.naturalWidth, t.height = i.naturalHeight, t.width && t.height)
    t.aspectRatio = t.width / t.height;
  else {
    const e = i.getBoundingClientRect();
    return t.width = e.width, t.height = e.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
  }
  return t;
}
window.customElements.define("adaptive-image", S);
