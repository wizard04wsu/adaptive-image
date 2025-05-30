/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var D = Object.defineProperty;
var x = (i) => {
  throw TypeError(i);
};
var G = (i, t, e) => t in i ? D(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var L = (i, t, e) => G(i, typeof t != "symbol" ? t + "" : t, e), F = (i, t, e) => t.has(i) || x("Cannot " + e);
var r = (i, t, e) => (F(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? x("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), g = (i, t, e, n) => (F(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), m = (i, t, e) => (F(i, t, "access private method"), e);
const I = `:host {\r
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
	height: auto;\r
}\r
\r
/* Scale-down */\r
[data-fit=scale-down] #image {\r
	max-width: 100%;\r
	max-height: 100%;\r
	width: auto;\r
	height: auto;\r
}\r
[data-fit=scale-down].svg #image {\r
	width: min(100cqw, calc(100cqh * var(--intrinsic-aspectratio)), var(--intrinsic-width));\r
	height: auto;\r
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
`, C = "cover", R = "middle", U = "center", T = "image/svg+xml";
const d = {
  enabled: !1,
  enable() {
    this.enabled = !0;
  },
  disable() {
    this.enabled = !1;
  }
};
for (const i in console)
  d[i] = function() {
    this.enabled && console[i].apply(null, arguments);
  };
d.logFn = (i) => d.log(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em;", "");
d.logFnGroup = (i) => d.group(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;", "");
var h, l, w, f, v, y, o, _, H, S, E, b;
class A extends HTMLElement {
  constructor() {
    d.logFn("constructor");
    super();
    p(this, o);
    p(this, h);
    p(this, l);
    p(this, w);
    p(this, f);
    p(this, v);
    p(this, y);
    const e = this.attachShadow({ mode: "open" }), n = document.createElement("template");
    n.innerHTML = `<style>${I}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, e.appendChild(n.content.cloneNode(!0)), g(this, h, e.querySelector("#outer")), g(this, l, e.querySelector("img")), r(this, l).addEventListener("load", () => m(this, o, _).call(this)), r(this, l).addEventListener("error", () => m(this, o, H).call(this)), new ResizeObserver((s) => {
      d.logFn("resizeObserver"), m(this, o, b).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(e, n, a) {
    n !== a && (e === "src" ? r(this, l).src = a : e === "alt" ? r(this, l).alt = a || "" : m(this, o, b).call(this));
  }
}
h = new WeakMap(), l = new WeakMap(), w = new WeakMap(), f = new WeakMap(), v = new WeakMap(), y = new WeakMap(), o = new WeakSet(), _ = async function() {
  d.logFn("imageLoadHandler"), r(this, l).classList.remove("error");
  const e = await V(r(this, l));
  g(this, w, e.width), g(this, f, e.height), g(this, v, e.aspectRatio), g(this, y, e.mimeType || ""), m(this, o, b).call(this);
}, H = function() {
  d.logFn("imageErrorHandler"), r(this, l).classList.add("error"), g(this, y, ""), r(this, l).alt = this.getAttribute("alt") || "";
  const e = r(this, l).getBoundingClientRect();
  g(this, w, e.width), g(this, f, e.height), g(this, v, e.width && e.height ? e.width / e.height : 1), m(this, o, b).call(this, e.width, e.height);
}, S = function() {
  var c;
  d.logFn("updateAlignment");
  const e = ["top", "middle", "center", "bottom"];
  let n = ((c = this.getAttribute("align")) == null ? void 0 : c.toLowerCase().split(" ")) || [], a = window.getComputedStyle(this).getPropertyValue("--align-x").toLowerCase();
  if (!["left", "center", "right"].includes(a)) {
    a = "";
    for (const u of n)
      ["left", "right"].includes(u) && (a = u);
    !a && n.includes("center") && (a = "center", n.splice(n.indexOf("center"), 1)), a || (a = U);
  }
  r(this, h).dataset.alignX = a;
  let s = window.getComputedStyle(this).getPropertyValue("--align-y").toLowerCase();
  if (!e.includes(s)) {
    s = "";
    for (const u of n)
      e.includes(u) && (s = u);
    s || (s = R);
  }
  s === "center" && (s = "middle"), r(this, h).dataset.alignY = s;
}, E = function() {
  d.logFn("updateFit");
  const e = ["none", "cover", "fill", "contain", "scale-down"];
  let n = window.getComputedStyle(this).getPropertyValue("--fit").toLowerCase();
  e.includes(n) ? r(this, h).dataset.fit = n : (n = this.getAttribute("fit"), r(this, h).dataset.fit = e.includes(n) ? n : C);
}, b = function() {
  d.logFn("refreshImage"), r(this, h).classList.remove("svg"), r(this, y) === T && r(this, h).classList.add("svg"), m(this, o, S).call(this), m(this, o, E).call(this), this.style.setProperty("--intrinsic-width", `${r(this, w)}px`), this.style.setProperty("--intrinsic-height", `${r(this, f)}px`), r(this, h).style.setProperty("--intrinsic-width", `${r(this, w)}px`), r(this, h).style.setProperty("--intrinsic-height", `${r(this, f)}px`), r(this, h).style.setProperty("--intrinsic-aspectratio", r(this, v));
}, // Observe changes to these custom attributes.
L(A, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
async function V(i) {
  d.debug("getImageProperties");
  let t = {};
  try {
    const n = await (await fetch(i.src)).blob();
    t.mimeType = n.type;
  } catch (e) {
    console.warn(`Unable to determine MIME type of ${i.src}`, e.message), t.mimeType ?? (t.mimeType = "");
  }
  if (!t.mimeType || t.mimeType === T) {
    let e;
    try {
      const c = await (await fetch(i.src)).text();
      e = new DOMParser().parseFromString(c, T).querySelector("svg");
    } catch {
      const c = i.getBoundingClientRect();
      return t.width = c.width, t.height = c.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    t.mimeType = T;
    let n = parseFloat(e.getAttribute("width")), a = parseFloat(e.getAttribute("height"));
    if (n && a)
      t.width = n, t.height = a, t.aspectRatio = t.width / t.height;
    else if (e.hasAttribute("viewBox")) {
      let s = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      s ? (s = s.map((c) => Math.abs(Number(c))), [, n, a] = s, t.width = n || 300, t.height = a || 150, t.aspectRatio = t.width / t.height) : (t.aspectRatio = 300 / 150, t.width ?? (t.width = t.height * t.aspectRatio || 300), t.height ?? (t.height = t.width * t.aspectRatio || 150));
    } else
      t.width ?? (t.width = 300), t.height ?? (t.height = 150), t.aspectRatio = t.width / t.height;
  } else if (t.width = i.naturalWidth, t.height = i.naturalHeight, t.width && t.height)
    t.aspectRatio = t.width / t.height;
  else {
    const e = i.getBoundingClientRect();
    return t.width = e.width, t.height = e.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
  }
  return t;
}
window.customElements.define("adaptive-image", A);
