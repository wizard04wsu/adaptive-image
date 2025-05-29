/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var D = Object.defineProperty;
var L = (i) => {
  throw TypeError(i);
};
var G = (i, t, e) => t in i ? D(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var A = (i, t, e) => G(i, typeof t != "symbol" ? t + "" : t, e), F = (i, t, e) => t.has(i) || L("Cannot " + e);
var r = (i, t, e) => (F(i, t, "read from private field"), e ? e.call(i) : t.get(i)), w = (i, t, e) => t.has(i) ? L("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), l = (i, t, e, n) => (F(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), p = (i, t, e) => (F(i, t, "access private method"), e);
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
var h, c, f, m, v, y, o, x, H, S, E, b;
class _ extends HTMLElement {
  constructor() {
    d.logFn("constructor");
    super();
    w(this, o);
    w(this, h);
    w(this, c);
    w(this, f);
    w(this, m);
    w(this, v);
    w(this, y);
    const e = this.attachShadow({ mode: "open" }), n = document.createElement("template");
    n.innerHTML = `<style>${I}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, e.appendChild(n.content.cloneNode(!0)), l(this, h, e.querySelector("#outer")), l(this, c, e.querySelector("img")), r(this, c).addEventListener("load", () => p(this, o, x).call(this)), r(this, c).addEventListener("error", () => p(this, o, H).call(this)), new ResizeObserver((a) => {
      d.logFn("resizeObserver"), p(this, o, b).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(e, n, s) {
    n !== s && (e === "src" ? r(this, c).src = s : e === "alt" ? r(this, c).alt = s || "" : p(this, o, b).call(this));
  }
}
h = new WeakMap(), c = new WeakMap(), f = new WeakMap(), m = new WeakMap(), v = new WeakMap(), y = new WeakMap(), o = new WeakSet(), x = async function() {
  d.logFn("imageLoadHandler"), r(this, h).classList.remove("error");
  const e = await V(r(this, c));
  l(this, f, e.width), l(this, m, e.height), l(this, v, e.aspectRatio), l(this, y, e.mimeType || ""), p(this, o, b).call(this);
}, H = function() {
  d.logFn("imageErrorHandler"), r(this, h).classList.add("error"), l(this, y, ""), r(this, c).alt = this.getAttribute("alt") || "";
  const e = r(this, c).getBoundingClientRect();
  l(this, f, e.width), l(this, m, e.height), l(this, v, e.width && e.height ? e.width / e.height : 1), p(this, o, b).call(this, e.width, e.height);
}, S = function() {
  var g;
  d.logFn("updateAlignment");
  const e = ["top", "middle", "center", "bottom"];
  let n = ((g = this.getAttribute("align")) == null ? void 0 : g.toLowerCase().split(" ")) || [], s = window.getComputedStyle(this).getPropertyValue("--align-x").toLowerCase();
  if (!["left", "center", "right"].includes(s)) {
    s = "";
    for (const u of n)
      ["left", "right"].includes(u) && (s = u);
    !s && n.includes("center") && (s = "center", n.splice(n.indexOf("center"), 1)), s || (s = U);
  }
  r(this, h).dataset.alignX = s;
  let a = window.getComputedStyle(this).getPropertyValue("--align-y").toLowerCase();
  if (!e.includes(a)) {
    a = "";
    for (const u of n)
      e.includes(u) && (a = u);
    a || (a = R);
  }
  a === "center" && (a = "middle"), r(this, h).dataset.alignY = a;
}, E = function() {
  d.logFn("updateFit");
  const e = ["none", "cover", "fill", "contain", "scale-down"];
  let n = window.getComputedStyle(this).getPropertyValue("--fit").toLowerCase();
  e.includes(n) ? r(this, h).dataset.fit = n : (n = this.getAttribute("fit"), r(this, h).dataset.fit = e.includes(n) ? n : C);
}, b = function() {
  d.logFn("refreshImage"), r(this, h).classList.remove("svg"), r(this, y) === T && r(this, h).classList.add("svg"), p(this, o, S).call(this), p(this, o, E).call(this), this.style.setProperty("--intrinsic-width", `${r(this, f)}px`), this.style.setProperty("--intrinsic-height", `${r(this, m)}px`), r(this, h).style.setProperty("--intrinsic-width", `${r(this, f)}px`), r(this, h).style.setProperty("--intrinsic-height", `${r(this, m)}px`), r(this, h).style.setProperty("--intrinsic-aspectratio", r(this, v));
}, // Observe changes to these custom attributes.
A(_, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
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
      const g = await (await fetch(i.src)).text();
      e = new DOMParser().parseFromString(g, T).querySelector("svg");
    } catch {
      const g = i.getBoundingClientRect();
      return t.width = g.width, t.height = g.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    t.mimeType = T;
    let n = parseFloat(e.getAttribute("width")), s = parseFloat(e.getAttribute("height"));
    if (n && s)
      t.width = n, t.height = s, t.aspectRatio = t.width / t.height;
    else if (e.hasAttribute("viewBox")) {
      let a = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      a ? (a = a.map((g) => Math.abs(Number(g))), [, n, s] = a, t.width = n || 300, t.height = s || 150, t.aspectRatio = t.width / t.height) : (t.aspectRatio = 300 / 150, t.width ?? (t.width = t.height * t.aspectRatio || 300), t.height ?? (t.height = t.width * t.aspectRatio || 150));
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
window.customElements.define("adaptive-image", _);
