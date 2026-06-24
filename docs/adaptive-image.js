/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var M = Object.defineProperty;
var L = (e) => {
  throw TypeError(e);
};
var P = (e, t, i) => t in e ? M(e, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : e[t] = i;
var R = (e, t, i) => P(e, typeof t != "symbol" ? t + "" : t, i), A = (e, t, i) => t.has(e) || L("Cannot " + i);
var n = (e, t, i) => (A(e, t, "read from private field"), i ? i.call(e) : t.get(e)), m = (e, t, i) => t.has(e) ? L("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), o = (e, t, i, a) => (A(e, t, "write to private field"), a ? a.call(e, i) : t.set(e, i), i), c = (e, t, i) => (A(e, t, "access private method"), i);
const k = `:host {
	/* These variables are set via JavaScript. */
	--intrinsic-width: 0px;
	--intrinsic-height: 0px;
	
	display: inline-block;
	width: var(--intrinsic-width);
	height: var(--intrinsic-height);
	
	overflow: var(--overflow, hidden);
}
#outer {
	/* These variables are set via JavaScript. */
	--intrinsic-width: 0px;
	--intrinsic-height: 0px;
	--intrinsic-aspectratio: 1;
	
	height: 100%;
	line-height: 1; /* For broken images. */
	
	overflow: var(--overflow, hidden);
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
#image {
	min-width: 100%;
	min-height: 100%;
	width: fit-content;
	height: fit-content;
}

/* Fit is not 'cover' */
#outer:not([data-fit=cover]) #image {
	min-width: auto;
	min-height: auto;
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
`, Y = `<style>${k}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`, T = "image/svg+xml", x = 300, F = 150, d = {
  enabled: !1,
  enable() {
    this.enabled = !0;
  },
  disable() {
    this.enabled = !1;
  }
};
for (const e in console)
  d[e] = function(...t) {
    this.enabled && console[e].apply(null, t);
  };
d.logFn = (e) => d.log(`%cƒ%c${e}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em;", "");
d.logFnGroup = (e) => d.group(`%cƒ%c${e}%c()`, "font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;", "border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;", "");
var l, h, p, w, b, y, f, s, C, q, H, E, u;
class S extends HTMLElement {
  constructor() {
    d.logFn("constructor");
    super();
    m(this, s);
    m(this, l);
    m(this, h);
    m(this, p);
    m(this, w);
    m(this, b);
    m(this, y);
    m(this, f);
    this.attachShadow({ mode: "open" });
    const i = document.createElement("template");
    i.innerHTML = Y, this.shadowRoot.appendChild(i.content.cloneNode(!0)), o(this, l, this.shadowRoot.querySelector("#outer")), o(this, h, this.shadowRoot.querySelector("img")), n(this, h).addEventListener("load", () => c(this, s, C).call(this)), n(this, h).addEventListener("error", () => c(this, s, q).call(this));
  }
  /**
   * Built-in method to handle changes to the observed attributes of the custom element.
   * @param {string} name - Name of the attribute that changed.
   * @param {string} oldValue 
   * @param {string} newValue 
   */
  attributeChangedCallback(i, a, r) {
    a !== r && (i === "src" ? n(this, h).src = r : i === "alt" ? n(this, h).alt = r || "" : c(this, s, u).call(this));
  }
  connectedCallback() {
    o(this, f, new ResizeObserver(() => {
      c(this, s, u).call(this);
    })), n(this, f).observe(this), n(this, f).observe(document.documentElement), c(this, s, u).call(this);
  }
  disconnectedCallback() {
    var i;
    (i = n(this, f)) == null || i.disconnect();
  }
}
l = new WeakMap(), h = new WeakMap(), p = new WeakMap(), w = new WeakMap(), b = new WeakMap(), y = new WeakMap(), f = new WeakMap(), s = new WeakSet(), C = async function() {
  d.logFn("imageLoadHandler"), n(this, h).classList.remove("error");
  const i = await $(n(this, h));
  o(this, p, i.width), o(this, w, i.height), o(this, b, i.aspectRatio), o(this, y, i.mimeType || ""), c(this, s, u).call(this);
}, /**
 * When an image fails to load, updates the display to indicate a broken image.
 */
q = function() {
  d.logFn("imageErrorHandler"), n(this, h).classList.add("error"), o(this, y, ""), n(this, h).alt = this.getAttribute("alt") || "";
  const i = n(this, h).getBoundingClientRect();
  o(this, p, i.width), o(this, w, i.height), o(this, b, i.width && i.height ? i.width / i.height : 1), c(this, s, u).call(this, i.width, i.height);
}, /**
 * Determines how to size the image within its box. Default is 'cover'.
 */
H = function() {
  var r;
  d.logFn("updateFit");
  let i = /* @__PURE__ */ new Set(["none", "cover", "fill", "contain", "scale-down"]), a = ((r = this.getAttribute("fit")) == null ? void 0 : r.toLowerCase().trim()) || "";
  i.has(a) || (a = "cover"), n(this, l).dataset.fit = a;
}, /**
 * Calculates the horizontal and vertical alignment of the image. Defaults are horizontally 'center' and vertically 'middle'.
 */
E = function() {
  var r, g;
  d.logFn("updateAlignment");
  let i = /* @__PURE__ */ new Set(["left", "center", "right"]), a = ((r = this.getAttribute("align-x")) == null ? void 0 : r.toLowerCase().trim()) || "";
  i.has(a) || (a = "center"), n(this, l).dataset.alignX = a, i = /* @__PURE__ */ new Set(["top", "middle", "bottom"]), a = ((g = this.getAttribute("align-y")) == null ? void 0 : g.toLowerCase().trim()) || "", i.has(a) || (a = "middle"), n(this, l).dataset.alignY = a;
}, u = function() {
  d.logFn("refreshImage"), n(this, y) === T ? n(this, l).classList.add("svg") : n(this, l).classList.remove("svg"), c(this, s, E).call(this), c(this, s, H).call(this), this.style.setProperty("--intrinsic-width", `${n(this, p)}px`), this.style.setProperty("--intrinsic-height", `${n(this, w)}px`), n(this, l).style.setProperty("--intrinsic-width", `${n(this, p)}px`), n(this, l).style.setProperty("--intrinsic-height", `${n(this, w)}px`), n(this, l).style.setProperty("--intrinsic-aspectratio", n(this, b));
}, // Observe changes to these custom attributes.
R(S, "observedAttributes", ["src", "alt", "fit", "align-x", "align-y", "style"]);
async function $(e) {
  d.debug("getImageProperties");
  let t = {};
  try {
    const a = await (await fetch(e.src)).blob();
    t.mimeType = a.type;
  } catch (i) {
    console.warn(`Unable to determine MIME type of ${e.src}`, i.message), t.mimeType ?? (t.mimeType = "");
  }
  if (!t.mimeType || t.mimeType === T) {
    let i;
    try {
      const v = await (await fetch(e.src)).text();
      i = new DOMParser().parseFromString(v, T).querySelector("svg");
    } catch {
      const v = e.getBoundingClientRect();
      return t.width = v.width, t.height = v.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
    }
    t.mimeType = T;
    let a = parseFloat(i.getAttribute("width")), r = parseFloat(i.getAttribute("height"));
    if (a && r)
      t.width = a, t.height = r, t.aspectRatio = t.width / t.height;
    else if (i.hasAttribute("viewBox")) {
      let g = i.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
      g ? (g = g.map((v) => Math.abs(Number(v))), [, a, r] = g, t.width = a || x, t.height = r || F, t.aspectRatio = t.width / t.height) : (t.aspectRatio = x / F, t.width ?? (t.width = t.height * t.aspectRatio || x), t.height ?? (t.height = t.width * t.aspectRatio || F));
    } else
      t.width ?? (t.width = x), t.height ?? (t.height = F), t.aspectRatio = t.width / t.height;
  } else if (t.width = e.naturalWidth, t.height = e.naturalHeight, t.width && t.height)
    t.aspectRatio = t.width / t.height;
  else {
    const i = e.getBoundingClientRect();
    return t.width = i.width, t.height = i.height, t.width && t.height && (t.aspectRatio = t.width / t.height), t;
  }
  return t;
}
window.customElements.define("adaptive-image", S);
