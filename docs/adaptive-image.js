/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var z = Object.defineProperty;
var R = (i) => {
  throw TypeError(i);
};
var M = (i, t, e) => t in i ? z(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var T = (i, t, e) => M(i, typeof t != "symbol" ? t + "" : t, e), L = (i, t, e) => t.has(i) || R("Cannot " + e);
var n = (i, t, e) => (L(i, t, "read from private field"), e ? e.call(i) : t.get(i)), p = (i, t, e) => t.has(i) ? R("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e), d = (i, t, e, a) => (L(i, t, "write to private field"), a ? a.call(i, e) : t.set(i, e), e), c = (i, t, e) => (L(i, t, "access private method"), e);
const k = `:host {
	/* These variables are set via JavaScript. */
	--intrinsic-width: 0px;
	--intrinsic-height: 0px;
	
	display: inline-block;
	width: var(--intrinsic-width);
	height: var(--intrinsic-height);
}
#outer {
	/* These variables are set via JavaScript. */
	--intrinsic-width: 0px;
	--intrinsic-height: 0px;
	--intrinsic-aspectratio: 1;
	
	overflow: hidden;
	height: 100%;
	line-height: 1; /* For broken images. */
}
#inner {
	/* Align */
	text-align: left;
	transform: translateX(var(--translateX)) translateY(var(--translateY));
	
	/* Fit */
	height: 100%;
	container-type: size; /* Only required for fit=contain. */
}
#image {
	/* Align */
	display: inline-block;
	transform: translateX(calc(-1 * var(--translateX))) translateY(calc(-1 * var(--translateY)));
	
	/* Fit */
	aspect-ratio: var(--intrinsic-aspectratio);
}


/*====================/
  Alignment
/====================*/

/*=== Horizontal ===*/

/* Center (default) */
#inner {
	--translateX: 50%;
}

/* Left */
[data-align-x=left] #inner {
	--translateX: 0%;
}

/* Right */
[data-align-x=right] #inner {
	--translateX: 100%;
}

/*=== Vertical ===*/

/* Middle (default) */
#inner {
	--translateY: 50%;
}

/* Top */
[data-align-y=top] #inner {
	--translateY: 0%;
}

/* Bottom */
[data-align-y=bottom] #inner {
	--translateY: 100%;
}

/* Broken image */
#inner:has(img.error) {
	display: table;
	width: max-content;
	min-width: 100%;
	transform: none;
}
#image:has(img.error) {
	display: table-cell;
	text-align: center;
	vertical-align: middle;
	height: 100cqh;
	transform: none;
}
[data-align-x=left] #image:has(img.error) {
	text-align: left;
}
[data-align-x=right] #image:has(img.error) {
	text-align: right;
}
[data-align-y=top] #image:has(img.error) {
	vertical-align: top;
}
[data-align-y=bottom] #image:has(img.error) {
	vertical-align: bottom;
}


/*====================/
  Fit
/====================*/

/* Cover (default) */
[data-fit=cover] #image {
	min-width: 100%;
	min-height: 100%;
	width: fit-content;
	height: fit-content;
}

/* Fill */
[data-fit=fill] #image {
	aspect-ratio: auto;
	width: 100%;
	height: 100%;
}

/* Contain */
[data-fit=contain] #image {
	max-width: 100%;
	max-height: 100%;
	width: min(100cqw, calc(100cqh * var(--intrinsic-aspectratio)));
	height: min(100cqh, calc(100cqw / var(--intrinsic-aspectratio)));
}

/* Scale-down */
[data-fit=scale-down] #image {
	max-width: 100%;
	max-height: 100%;
	width: min(100cqw, calc(100cqh * var(--intrinsic-aspectratio)), var(--intrinsic-width));
	height: min(100cqh, calc(100cqw / var(--intrinsic-aspectratio)), var(--intrinsic-height));
}

/* None */
[data-fit=none] #image {
	/* Width and height are required here for SVGs. Otherwise 'auto' works fine. */
	width: var(--intrinsic-width);
	height: var(--intrinsic-height);
}

/* Fit is not 'none' */
#outer:not([data-fit=none]) img {
	width: 100%;
	height: 100%;
}

/* Broken image */
#outer:has(img.error) {
	overflow: auto;
	scrollbar-width: none;
}
#image:has(img.error) {
	width: 100%;
	height: auto;
}
`, E = `<style>${k}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, S = "image/svg+xml", x = 300, C = 150, h = {
  enabled: !1,
  enable() {
    this.enabled = !0;
  },
  disable() {
    this.enabled = !1;
  }
};
for (const i in console)
  h[i] = function(...t) {
    this.enabled && console[i].apply(null, t);
  };
h.logFn = (i) => h.log(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em;", "");
h.logFnGroup = (i) => h.group(`%cƒ%c${i}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;", "");
var r, o, w, f, v, b, u, s, q, H, A, V, O, y;
class P extends HTMLElement {
  constructor() {
    h.logFn("constructor");
    super();
    p(this, s);
    p(this, r);
    p(this, o);
    p(this, w);
    p(this, f);
    p(this, v);
    p(this, b);
    p(this, u);
    const e = this.attachShadow({ mode: "open" }), a = document.createElement("template");
    a.innerHTML = E, e.appendChild(a.content.cloneNode(!0)), d(this, r, e.querySelector("#outer")), d(this, o, e.querySelector("img")), n(this, o).addEventListener("load", () => c(this, s, q).call(this)), n(this, o).addEventListener("error", () => c(this, s, H).call(this)), new ResizeObserver((g) => {
      h.logFn("resizeObserver"), c(this, s, y).call(this);
    }).observe(this);
  }
  /**
   * Built-in method to handle changes to the observed attributes of the custom element.
   * @param {string} name - Name of the attribute that changed.
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(e, a, l) {
    a !== l && (e === "src" ? n(this, o).src = l : e === "alt" ? n(this, o).alt = l || "" : c(this, s, y).call(this));
  }
  connectedCallback() {
    d(this, u, new ResizeObserver(() => {
      c(this, s, A).call(this);
    })), n(this, u).observe(this), n(this, u).observe(document.documentElement), c(this, s, A).call(this);
  }
  disconnectedCallback() {
    var e;
    (e = n(this, u)) == null || e.disconnect();
  }
}
r = new WeakMap(), o = new WeakMap(), w = new WeakMap(), f = new WeakMap(), v = new WeakMap(), b = new WeakMap(), u = new WeakMap(), s = new WeakSet(), q = async function() {
  h.logFn("imageLoadHandler"), n(this, o).classList.remove("error");
  const e = await $(n(this, o));
  d(this, w, e.width), d(this, f, e.height), d(this, v, e.aspectRatio), d(this, b, e.mimeType || ""), c(this, s, y).call(this);
}, /**
 * When an image fails to load, updates the display to indicate a broken image.
 */
H = function() {
  h.logFn("imageErrorHandler"), n(this, o).classList.add("error"), d(this, b, ""), n(this, o).alt = this.getAttribute("alt") || "";
  const e = n(this, o).getBoundingClientRect();
  d(this, w, e.width), d(this, f, e.height), d(this, v, e.width && e.height ? e.width / e.height : 1), c(this, s, y).call(this, e.width, e.height);
}, /**
 * Calculates the horizontal and vertical alignment of the image. Defaults are horizontally 'center' and vertically 'middle'.
 */
A = function() {
  var l, g, m, F;
  h.logFn("updateAlignment");
  let e = ["left", "center", "right"], a = (l = window.getComputedStyle(this).getPropertyValue("--align-x")) == null ? void 0 : l.toLowerCase();
  e.includes(a) || (a = (g = n(this, r).getAttribute("align-x")) == null ? void 0 : g.toLowerCase()), e.includes(a) || (a = "center"), n(this, r).setAttribute("align-x", a), e = ["top", "middle", "bottom"], a = (m = window.getComputedStyle(this).getPropertyValue("--align-y")) == null ? void 0 : m.toLowerCase(), e.includes(a) || (a = (F = n(this, r).getAttribute("align-y")) == null ? void 0 : F.toLowerCase()), e.includes(a) || (a = "middle"), n(this, r).setAttribute("align-y", a);
}, /**
 * Determines how to size the image within its box. Default is 'cover'.
 */
V = function() {
  var e, a;
  h.logFn("updateFit"), fit = "cover", validValues = /* @__PURE__ */ new Set(["none", "cover", "fill", "contain", "scale-down"]), fitCSS = ((e = window.getComputedStyle(this).getPropertyValue("--fit")) == null ? void 0 : e.toLowerCase()) || "", fitAttr = (a = this.getAttribute("fit")) == null ? void 0 : a.toLowerCase(), validValues.has(fitCSS) ? fit = fitCSS : validValues.has(fitAttr) && (fit = fitAttr), n(this, r).setAttribute("fit", fit);
}, O = function() {
  h.logFn("updateOverflow");
  const e = window.getComputedStyle(this).getPropertyValue("--overflow").toLowerCase();
  n(this, r).style.setProperty("overflow", e || null);
}, y = function() {
  h.logFn("refreshImage"), n(this, b) === S ? n(this, r).classList.add("svg") : n(this, r).classList.remove("svg"), c(this, s, A).call(this), c(this, s, V).call(this), c(this, s, O).call(this), this.style.setProperty("--intrinsic-width", `${n(this, w)}px`), this.style.setProperty("--intrinsic-height", `${n(this, f)}px`), n(this, r).style.setProperty("--intrinsic-width", `${n(this, w)}px`), n(this, r).style.setProperty("--intrinsic-height", `${n(this, f)}px`), n(this, r).style.setProperty("--intrinsic-aspectratio", n(this, v));
}, // Observe changes to these custom attributes.
T(P, "observedAttributes", ["src", "alt", "fit", "align-x", "align-y", "style"]);
async function $(i) {
  h.debug("getImageProperties");
  let t = {};
  try {
    const a = await (await fetch(i.src)).blob();
    t.mimeType = a.type;
  } catch (e) {
    console.warn(`Unable to determine MIME type of ${i.src}`, e.message), t.mimeType ?? (t.mimeType = "");
  }
  if (!t.mimeType || t.mimeType === S) {
    let e;
    try {
      const m = await (await fetch(i.src)).text();
      e = new DOMParser().parseFromString(m, S).querySelector("svg");
    } catch {
      const m = i.getBoundingClientRect();
      return t.width = m.width, t.height = m.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    t.mimeType = S;
    let a = parseFloat(e.getAttribute("width")), l = parseFloat(e.getAttribute("height"));
    if (a && l)
      t.width = a, t.height = l, t.aspectRatio = t.width / t.height;
    else if (e.hasAttribute("viewBox")) {
      let g = e.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      g ? (g = g.map((m) => Math.abs(Number(m))), [, a, l] = g, t.width = a || x, t.height = l || C, t.aspectRatio = t.width / t.height) : (t.aspectRatio = x / C, t.width ?? (t.width = t.height * t.aspectRatio || x), t.height ?? (t.height = t.width * t.aspectRatio || C));
    } else
      t.width ?? (t.width = x), t.height ?? (t.height = C), t.aspectRatio = t.width / t.height;
  } else if (t.width = i.naturalWidth, t.height = i.naturalHeight, t.width && t.height)
    t.aspectRatio = t.width / t.height;
  else {
    const e = i.getBoundingClientRect();
    return t.width = e.width, t.height = e.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
  }
  return t;
}
window.customElements.define("adaptive-image", P);
