/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var D = Object.defineProperty;
var F = (i) => {
  throw TypeError(i);
};
var G = (i, t, e) => t in i ? D(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var A = (i, t, e) => G(i, typeof t != "symbol" ? t + "" : t, e), T = (i, t, e) => t.has(i) || F("Cannot " + e);
var r = (i, t, e) => (T(i, t, "read from private field"), e ? e.call(i) : t.get(i)), f = (i, t, e) => t.has(i) ? F("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, n) => (T(i, t, "write to private field"), n ? n.call(i, e) : t.set(i, e), e), p = (i, t, e) => (T(i, t, "access private method"), e);
const I = `:host {\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-width: 128px;\r
	--intrinsic-height: 128px;\r
	\r
	display: inline-block;\r
	width: var(--intrinsic-width);\r
	height: var(--intrinsic-height);\r
}\r
#outer {\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-width: 128px;\r
	--intrinsic-height: 128px;\r
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
/* None (default) */\r
\r
/* Cover */\r
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
}\r
\r
/* Scale-down */\r
[data-fit=scale-down] #image {\r
	max-width: 100%;\r
	max-height: 100%;\r
}\r
\r
/* Fit is not 'None' */\r
[data-fit=cover] img,\r
[data-fit=fill] img,\r
[data-fit=contain] img,\r
[data-fit=scale-down] img {\r
	height: 100%;\r
	width: 100%;\r
}\r
`, C = "cover", R = "middle", U = "center", L = "image/svg+xml";
const l = {
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
var h, c, w, m, y, b, o, x, H, S, E, v;
class _ extends HTMLElement {
  constructor() {
    l.logFn("constructor");
    super();
    f(this, o);
    f(this, h);
    f(this, c);
    f(this, w);
    f(this, m);
    f(this, y);
    f(this, b);
    const e = this.attachShadow({ mode: "open" }), n = document.createElement("template");
    n.innerHTML = `<style>${I}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, e.appendChild(n.content.cloneNode(!0)), d(this, h, e.querySelector("#outer")), d(this, c, e.querySelector("img")), r(this, c).addEventListener("load", () => p(this, o, x).call(this)), r(this, c).addEventListener("error", () => p(this, o, H).call(this)), new ResizeObserver((s) => {
      l.logFn("resizeObserver"), p(this, o, v).call(this);
    }).observe(this);
  }
  // Built-in method to handle changes to the observed custom attributes.
  attributeChangedCallback(e, n, a) {
    n !== a && (e === "src" ? r(this, c).src = a : e === "alt" ? r(this, c).alt = a || "" : p(this, o, v).call(this));
  }
}
h = new WeakMap(), c = new WeakMap(), w = new WeakMap(), m = new WeakMap(), y = new WeakMap(), b = new WeakMap(), o = new WeakSet(), x = async function() {
  l.logFn("imageLoadHandler"), r(this, h).classList.remove("error");
  const e = await P(r(this, c));
  d(this, w, e.width), d(this, m, e.height), d(this, y, e.aspectRatio), d(this, b, e.mimeType || ""), p(this, o, v).call(this);
}, H = function() {
  l.logFn("imageErrorHandler"), r(this, h).classList.add("error"), d(this, b, ""), r(this, c).alt = this.getAttribute("alt") || "";
  const e = r(this, c).getBoundingClientRect();
  d(this, w, e.width), d(this, m, e.height), d(this, y, e.width && e.height ? e.width / e.height : 1), p(this, o, v).call(this, e.width, e.height);
}, S = function() {
  var g;
  l.logFn("updateAlignment");
  const e = ["top", "middle", "center", "bottom"];
  let n = ((g = this.getAttribute("align")) == null ? void 0 : g.toLowerCase().split(" ")) || [], a = window.getComputedStyle(this).getPropertyValue("--align-x").toLowerCase();
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
  l.logFn("updateFit");
  const e = ["none", "cover", "fill", "contain", "scale-down"];
  let n = window.getComputedStyle(this).getPropertyValue("--fit").toLowerCase();
  e.includes(n) ? r(this, h).dataset.fit = n : (n = this.getAttribute("fit"), r(this, h).dataset.fit = e.includes(n) ? n : C);
}, v = function() {
  l.logFn("refreshImage"), p(this, o, S).call(this), p(this, o, E).call(this), this.style.setProperty("--intrinsic-width", `${r(this, w)}px`), this.style.setProperty("--intrinsic-height", `${r(this, m)}px`), r(this, h).style.setProperty("--intrinsic-width", `${r(this, w)}px`), r(this, h).style.setProperty("--intrinsic-height", `${r(this, m)}px`), r(this, h).style.setProperty("--intrinsic-aspectratio", r(this, y));
}, // Observe changes to these custom attributes.
A(_, "observedAttributes", ["src", "alt", "fit", "align", "style"]);
async function P(i) {
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
      const g = await (await fetch(i.src)).text();
      e = new DOMParser().parseFromString(g, L).querySelector("svg");
    } catch {
      const g = i.getBoundingClientRect();
      return t.width = g.width, t.height = g.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    let n = parseFloat(e.getAttribute("width")), a = parseFloat(e.getAttribute("height"));
    if (n && a)
      t.width = n, t.height = a, t.aspectRatio = t.width / t.height;
    else if (e.hasAttribute("viewBox")) {
      let s = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      s ? (s = s.map((g) => Math.abs(Number(g))), [, n, a] = s, t.width = n || 300, t.height = a || 150, t.aspectRatio = t.width / t.height) : (t.aspectRatio = 300 / 150, t.width ?? (t.width = t.height * t.aspectRatio || 300), t.height ?? (t.height = t.width * t.aspectRatio || 150));
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
