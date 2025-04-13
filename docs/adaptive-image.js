/* Copyright (c) 2025 Andy Harrison | github.com/wizard04wsu/adaptive-image */
var L = Object.defineProperty;
var A = (s) => {
  throw TypeError(s);
};
var S = (s, h, e) => h in s ? L(s, h, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[h] = e;
var R = (s, h, e) => S(s, typeof h != "symbol" ? h + "" : h, e), T = (s, h, e) => h.has(s) || A("Cannot " + e);
var i = (s, h, e) => (T(s, h, "read from private field"), e ? e.call(s) : h.get(s)), u = (s, h, e) => h.has(s) ? A("Cannot add the same private member more than once") : h instanceof WeakSet ? h.add(s) : h.set(s, e), y = (s, h, e, a) => (T(s, h, "write to private field"), a ? a.call(s, e) : h.set(s, e), e), p = (s, h, e) => (T(s, h, "access private method"), e);
const D = `<div id="frame" part="frame">\r
	<div id="mount">\r
		<img src="" alt="" part="img">\r
	</div>\r
</div>\r
`, E = `/*====================/\r
  Variables\r
/====================*/\r
\r
#frame {\r
	\r
	/* These variables are set via JavaScript. */\r
	--intrinsic-width: 0;\r
	--intrinsic-height: 0;\r
	--intrinsic-aspectratio: 1;\r
	--specified-width: 0;\r
	--specified-height: 0;\r
	--specified-aspectratio: 1;\r
	--border-width: 0;\r
	\r
	\r
	--intrinsic-width-px: calc(var(--intrinsic-width) * 1px);\r
	--intrinsic-height-px: calc(var(--intrinsic-height) * 1px);\r
	--specified-width-px: calc(var(--specified-width) * 1px);\r
	--specified-width-percent: calc(var(--specified-width) * 1%);\r
	--specified-height-px: calc(var(--specified-height) * 1px);\r
	--border-width-px: calc(var(--border-width) * 1px);\r
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
/*=== The Frame ===*/\r
\r
#frame {\r
	container-type: inline-size;\r
	overflow: hidden;\r
	box-sizing: content-box;\r
	width: var(--intrinsic-width-px);\r
	max-width: 100%;\r
	max-width: calc(100% - 2 * var(--border-width-px));\r
	border-width: var(--border-width-px) !important;\r
}\r
#frame.hasWidth {\r
	width: var(--specified-width-px);\r
}\r
#frame.hasWidthPercentage {\r
	width: var(--specified-width-percent);\r
}\r
\r
/*=== The Mounting Board ===*/\r
\r
#mount {\r
	container-type: size;\r
	position: relative;\r
	width: min(100cqw, var(--intrinsic-width-px));\r
	height: var(--intrinsic-height-px);\r
}\r
.hasWidth #mount,\r
.hasWidthPercentage #mount {\r
	width: 100cqw;\r
}\r
.hasHeight #mount {\r
	height: var(--specified-height-px);\r
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
/*=== None ===*/\r
\r
:host([fit=none]) img {\r
	width: var(--intrinsic-width-px);\r
}\r
\r
/*=== Cover ===*/\r
\r
:host([fit=cover]) img {\r
	width: max(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
	min-width: 100cqw;\r
	min-height: 100cqh;\r
}\r
\r
/*=== Fill ===*/\r
\r
:host([fit=fill]) img {\r
	width: 100%;\r
	height: 100%;\r
}\r
\r
/*=== Contain ===*/\r
\r
:host([fit=contain]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio));\r
}\r
\r
/*=== Scale-down ===*/\r
\r
:host([fit=scale-down]) img {\r
	width: min(100cqw, 100cqh * var(--intrinsic-aspectratio), var(--intrinsic-width-px));\r
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
`, F = "cover", P = ["none", "cover", "fill", "contain", "scale-down"];
var n, c, x, g, o, q, H, I, b;
class _ extends HTMLElement {
  constructor() {
    super();
    u(this, o);
    u(this, n, {
      intrinsic: {},
      specified: {}
    });
    u(this, c);
    u(this, x);
    u(this, g);
    const e = this.attachShadow({ mode: "open" }), a = document.createElement("template");
    a.innerHTML = `<style>${E}</style>${D}`, e.appendChild(a.content.cloneNode(!0)), y(this, c, e.querySelector("#frame")), y(this, x, e.querySelector("#mount")), y(this, g, e.querySelector("img")), P.includes(this.getAttribute("fit")) || this.setAttribute("fit", F), i(this, g).addEventListener("load", () => {
      i(this, c).classList.remove("error"), G(i(this, g)).then((r) => {
        i(this, n).intrinsic.width = r.width, i(this, n).intrinsic.height = r.height, i(this, n).intrinsic.aspectRatio = r.aspectRatio, i(this, n).mimeType = r.mimeType || "", p(this, o, b).call(this);
      });
    }), i(this, g).addEventListener("error", () => {
      i(this, c).classList.add("error"), i(this, n).mimeType = "", i(this, g).alt = this.getAttribute("alt") || "";
      const r = i(this, g).getBoundingClientRect();
      i(this, n).intrinsic.width = r.width, i(this, n).intrinsic.height = r.height, i(this, n).intrinsic.aspectRatio = r.width && r.height ? r.width / r.height : 1, p(this, o, b).call(this, !this.getAttribute("width") && r.width, !this.getAttribute("height") && r.height);
    }), this.addEventListener("resize", p(this, o, b));
  }
  attributeChangedCallback(e, a, r) {
    a !== r && (e === "src" ? i(this, g).src = r : e === "width" || e === "height" || e === "border-width" ? p(this, o, b).call(this) : e === "alt" && (i(this, g).alt = r || ""));
  }
}
n = new WeakMap(), c = new WeakMap(), x = new WeakMap(), g = new WeakMap(), o = new WeakSet(), q = function(e, a) {
  const r = {}, l = (e || this.getAttribute("width") || "").trim();
  l.endsWith("%") ? (r.width = Math.abs(Number(l.slice(0, -1)) || 0), r.widthIsPercentage = !0) : (r.width = Math.abs(Number(l) || 0), r.widthIsPercentage = !1);
  const t = (a || this.getAttribute("height") || "").trim();
  return r.height = Number(t) || 0, r.borderWidth = Number(this.getAttribute("border-width")) || 0, r;
}, H = function(e, a = !1, r) {
  i(this, n).specified.width = e, i(this, n).specified.widthIsPercentage = e && a;
  let l = e, t = i(this, n).intrinsic.aspectRatio;
  i(this, n).specified.height ? (e || (l = i(this, n).specified.height * i(this, n).intrinsic.aspectRatio), t = l / i(this, n).specified.height) : e || (l = i(this, n).intrinsic.width), i(this, c).style.setProperty("--specified-width", l), i(this, c).style.setProperty("--specified-aspectratio", t), i(this, n).specified.aspectRatio = t, r !== void 0 && i(this, c).style.setProperty("--border-width", r);
}, I = function(e) {
  i(this, n).specified.height = e;
  let a = e, r = i(this, n).intrinsic.aspectRatio;
  i(this, n).specified.width ? (e || (a = i(this, n).specified.width / i(this, n).intrinsic.aspectRatio), r = i(this, n).specified.width / a) : e || (a = i(this, n).intrinsic.height), i(this, c).style.setProperty("--specified-height", a), i(this, c).style.setProperty("--specified-aspectratio", r), i(this, n).specified.aspectRatio = r;
}, b = function(e, a) {
  const r = p(this, o, q).call(this);
  p(this, o, H).call(this, e || r.width, r.widthIsPercentage, r.borderWidth), p(this, o, I).call(this, a || r.height), i(this, c).classList.toggle("hasWidth", !!i(this, n).specified.width), i(this, c).classList.toggle("hasWidthPercentage", !!i(this, n).specified.widthIsPercentage), i(this, c).classList.toggle("hasHeight", !!i(this, n).specified.height), i(this, c).style.setProperty("--intrinsic-width", i(this, n).intrinsic.width), i(this, c).style.setProperty("--intrinsic-height", i(this, n).intrinsic.height), i(this, c).style.setProperty("--intrinsic-aspectratio", i(this, n).intrinsic.aspectRatio);
}, // Observe changes to these custom attributes.
R(_, "observedAttributes", ["src", "alt", "width", "height", "fit", "align", "border-width"]);
function G(s) {
  const h = "image/svg+xml";
  return new Promise(async (r, l) => {
    let t = {};
    try {
      const w = await (await fetch(s.src)).blob();
      t.mimeType = w.type;
    } catch (d) {
      console.warn(`Unable to determine MIME type of ${s.src}`, d.message), t.mimeType ?? (t.mimeType = "");
    }
    if (!t.mimeType || t.mimeType === h) {
      let d;
      try {
        const f = await (await fetch(s.src)).text();
        d = new DOMParser().parseFromString(f, h).querySelector("svg");
      } catch {
        const f = s.getBoundingClientRect();
        return t.width = f.width, t.height = f.height, t.width && t.height && (t.aspectRatio = t.width / t.height), r(t);
      }
      let w = parseFloat(d.getAttribute("width")), v = parseFloat(d.getAttribute("height"));
      if (w && v)
        t.width = w, t.height = v, t.aspectRatio = t.width / t.height;
      else if (d.hasAttribute("viewBox")) {
        let m = d.getAttribute("viewBox").match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
        m ? (m = m.map((f) => Math.abs(Number(f))), [, w, v] = m, t.width = w || 300, t.height = v || 150, t.aspectRatio = t.width / t.height) : (t.aspectRatio = 300 / 150, t.width ?? (t.width = t.height * t.aspectRatio || 300), t.height ?? (t.height = t.width * t.aspectRatio || 150));
      } else
        t.width ?? (t.width = 300), t.height ?? (t.height = 150), t.aspectRatio = t.width / t.height;
    } else if (t.width = s.naturalWidth, t.height = s.naturalHeight, t.width && t.height)
      t.aspectRatio = t.width / t.height;
    else {
      const d = s.getBoundingClientRect();
      return t.width = d.width, t.height = d.height, t.width && t.height && (t.aspectRatio = t.width / t.height), r(t);
    }
    return r(t);
  });
}
window.customElements.define("adaptive-image", _);
