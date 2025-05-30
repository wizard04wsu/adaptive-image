import CSS from './adaptive-image.css?raw';

const HTML = `<style>${CSS}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`;

const DEFAULT_FIT = "cover";

const DEFAULT_ALIGN_Y = "middle";
const DEFAULT_ALIGN_X = "center";

const SVG_MIME_TYPE = 'image/svg+xml';
const SVG_DEFAULT_WIDTH = 300;
const SVG_DEFAULT_HEIGHT = 150;


const debug = {
	enabled: false,
	enable(){ this.enabled = true; },
	disable(){ this.enabled = false; },
};
for(const f in console){
	debug[f] = function (){
		if(this.enabled) console[f].apply(null, arguments);
	};
}
debug.logFn = (fnName) => debug.log(`%c\u0192%c${fnName}%c()`, 'font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;', 'border-bottom:1px dotted #888; padding-left:1em;', '');
debug.logFnGroup = (fnName) => debug.group(`%c\u0192%c${fnName}%c()`, 'font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;', 'border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;', '');
//debug.enable();


/**
 * HTML component to display an image per the specified fit and alignment.
 *
 * @class AdaptiveImage
 */
class AdaptiveImage extends HTMLElement {
	
	#outer;
	#img;
	
	#intrinsicWidth;
	#intrinsicHeight;
	#intrinsicAspectRatio;
	#mimeType;
	
	constructor(){
		// Create an instance of AdaptiveImage.
		debug.logFn('constructor');
		
		super();
		
		// Create the shadow DOM and clone the template.
		const shadowRoot = this.attachShadow({mode: 'open'});
		const template = document.createElement('template');
		template.innerHTML = HTML;
		shadowRoot.appendChild(template.content.cloneNode(true));
		
		// Save references to the internal elements.
		this.#outer = shadowRoot.querySelector('#outer');
		this.#img = shadowRoot.querySelector('img');
		
		// Handle success or failure loading a new src.
		this.#img.addEventListener('load', ()=>this.#imageLoadHandler());
		this.#img.addEventListener('error', ()=>this.#imageErrorHandler());
		
		// Update the component when it is resized.
		const resizeObserver = new ResizeObserver((entries)=>{
			debug.logFn('resizeObserver');
			this.#refreshImage();
		});
		resizeObserver.observe(this);
	}
	
	// Observe changes to these custom attributes.
	static observedAttributes = ['src', 'alt', 'fit', 'align', 'style'];
	
	// Built-in method to handle changes to the observed custom attributes.
	attributeChangedCallback(name, oldValue, newValue){
		
		if(oldValue !== newValue){
			
			if(name === 'src'){
				this.#img.src = newValue;
			}
			else if(name === 'alt'){
				this.#img.alt = newValue || '';
			}
			else {
				this.#refreshImage();
			}
		}
	}
	
	async #imageLoadHandler(){
		// The image has loaded.
		debug.logFn('imageLoadHandler');
		
		// Remove the error class if it was added previously.
		this.#img.classList.remove('error');
		
		// Get the properties of the image file.
		const imageProperties = await getImageProperties(this.#img);
		
		// Set the intrinsic dimensions, aspect ratio, and MIME type.
		this.#intrinsicWidth = imageProperties.width;
		this.#intrinsicHeight = imageProperties.height;
		this.#intrinsicAspectRatio = imageProperties.aspectRatio;
		this.#mimeType = imageProperties.mimeType || '';
		
		// Update the image component's attributes.
		this.#refreshImage();
	}
	
	#imageErrorHandler(){
		// There was an error loading the image.
		debug.logFn('imageErrorHandler');
		
		// Add the error class to the outer element.
		this.#img.classList.add('error');
		
		// Clear the MIME type if it was set previously.
		this.#mimeType = '';
		
		// Clear the alt attribute of the image element.
		this.#img.alt = this.getAttribute('alt') || '';
		
		// Set the dimensions for the broken image (icon and alt text).
		const rect = this.#img.getBoundingClientRect();
		this.#intrinsicWidth = rect.width;
		this.#intrinsicHeight = rect.height;
		this.#intrinsicAspectRatio = (rect.width && rect.height) ? rect.width / rect.height : 1;
		
		// Update the image component's attributes, manually setting the width and height if necessary.
		this.#refreshImage(rect.width, rect.height);
	}
	
	#updateAlignment(){
		debug.logFn('updateAlignment');
		
		const alignYKeywords = ['top', 'middle', 'center', 'bottom'];
		
		// Get values from the component's `align` attribute.
		let align = this.getAttribute('align')?.toLowerCase().split(' ') || [];
		
		
		// Get value of the `--align-x` property.
		let alignX = window.getComputedStyle(this).getPropertyValue('--align-x').toLowerCase();
		
		if(!['left', 'center', 'right'].includes(alignX)){
			// Property value does not match a horizontal alignment keyword.
			
			alignX = '';
			
			// Find a matching horizontal alignment keyword in the `align` attribute value.
			// This is done in such a way to allow 'center' to also be used as a vertical alignment keyword equivalent to 'middle'.
			for(const keyword of align){
				if(['left', 'right'].includes(keyword)){
					alignX = keyword;
				}
			}
			if(!alignX && align.includes('center')){
				alignX = 'center';
				align.splice(align.indexOf('center'), 1);
			}
			alignX ||= DEFAULT_ALIGN_X;
		}
		
		// Set the `data-align-x` attribute of #outer.
		this.#outer.dataset.alignX = alignX;
		
		
		// Get value of the `--align-y` property.
		let alignY = window.getComputedStyle(this).getPropertyValue('--align-y').toLowerCase();
		
		if(!alignYKeywords.includes(alignY)){
			// Property value does not match a vertical alignment keyword.
			
			alignY = '';
			
			// Find a matching vertical alignment keyword in the `align` attribute value.
			for(const keyword of align){
				if(alignYKeywords.includes(keyword)){
					alignY = keyword;
				}
			}
			alignY ||= DEFAULT_ALIGN_Y;
		}
		
		// Set the `data-align-y` attribute of #outer.
		if(alignY === 'center') alignY = 'middle';
		this.#outer.dataset.alignY = alignY;
	}
	
	#updateFit(){
		debug.logFn('updateFit');
		
		const fitKeywords = ['none', 'cover', 'fill', 'contain', 'scale-down'];
		
		// Get value of the `--fit` property.
		let fit = window.getComputedStyle(this).getPropertyValue('--fit').toLowerCase();
		
		if(fitKeywords.includes(fit)){
			// Property value matches a fit keyword.
			
			// Set the `data-fit` attribute of #outer.
			this.#outer.dataset.fit = fit;
		}
		else{
			
			// Get value of the component's `fit` attribute.
			fit = this.getAttribute('fit');
			
			// Set the `data-fit` attribute of #outer.
			this.#outer.dataset.fit = fitKeywords.includes(fit) ? fit : DEFAULT_FIT;
		}
	}
	
	#refreshImage(){
		debug.logFn('refreshImage');
		
		this.#outer.classList.remove('svg');
		if(this.#mimeType === SVG_MIME_TYPE) this.#outer.classList.add('svg');
		
		// Set data-align-x, data-align-y, and data-fit attributes.
		this.#updateAlignment();
		this.#updateFit();
		
		// Set CSS variables.
		this.style.setProperty('--intrinsic-width', `${this.#intrinsicWidth}px`);
		this.style.setProperty('--intrinsic-height', `${this.#intrinsicHeight}px`);
		this.#outer.style.setProperty('--intrinsic-width', `${this.#intrinsicWidth}px`);
		this.#outer.style.setProperty('--intrinsic-height', `${this.#intrinsicHeight}px`);
		this.#outer.style.setProperty('--intrinsic-aspectratio', this.#intrinsicAspectRatio);
	}
}

/**
 * Image properties.
 * @typedef {Object} ImageProps
 * @property {number} width
 * @property {number} height
 * @property {number} aspectRatio
 * @property {String} [mimeType]
 */

/**
 * Returns the intrinsic dimensions of an image and the image type. If intrinsic dimensions cannot be obtained, the dimensions of the image as it is currently displayed are used instead.
 *
 * @param {HTMLImageElement} imgElem
 * @return {ImageProps}
 */
async function getImageProperties(imgElem){
	debug.debug('getImageProperties');
	
	let ret = {};
	
	// Get the MIME type.
	try{
		const response = await fetch(imgElem.src);
		const blob = await response.blob();
		ret.mimeType = blob.type;
	}
	catch(err){
		// Unable to determine the MIME type.
		console.warn(`Unable to determine MIME type of ${imgElem.src}`, err.message);
		
		ret.mimeType ??= '';
	}
	
	if(!ret.mimeType || ret.mimeType === SVG_MIME_TYPE){
		// The image is an SVG or the MIME type is unknown.
		
		// Get the root SVG element.
		let svgElem;
		try{
			const response = await fetch(imgElem.src);
			const text = await response.text();
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(text, SVG_MIME_TYPE);
			svgElem = svgDoc.querySelector('svg');
		}
		catch(err){
			// Either it's not an SVG image or there was another error with the parsing.
			
			// Use the current dimensions of the image as displayed.
			const rect = imgElem.getBoundingClientRect();
			ret.width = rect.width;
			ret.height = rect.height;
			if(ret.width && ret.height) ret.aspectRatio = ret.width / ret.height;
			
			return ret;
		}
		
		// The image is an SVG.
		
		ret.mimeType = SVG_MIME_TYPE;
		
		// Get the width and height attributes.
		let svgWidth = parseFloat(svgElem.getAttribute('width'));
		let svgHeight = parseFloat(svgElem.getAttribute('height'));
		
		if(svgWidth && svgHeight){
			// The SVG dimensions are known.
			
			ret.width = svgWidth;
			ret.height = svgHeight;
			ret.aspectRatio = ret.width / ret.height;
		}
		else{
			// The width and/or height attribute is missing or is not a valid number.
			
			if(svgElem.hasAttribute('viewBox')){
				// There is a viewBox attribute.
				
				// Parse the viewBox attribute to get an aspect ratio.
				let parts = svgElem.getAttribute('viewBox')
					.match(/^\s*(?:(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s+){3}(\d+(?:e\d+)?|[+-]?\d*\.\d+(?:e\d+)?)\s*$/i);
				if(parts){
					// A match was found.
					
					// Convert each string to a non-negative number.
					parts = parts.map((p)=>Math.abs(Number(p)));
					
					// Get the last two numbers (width and height).
					[, svgWidth, svgHeight] = parts;
					
					ret.width = svgWidth || SVG_DEFAULT_WIDTH;
					ret.height = svgHeight || SVG_DEFAULT_HEIGHT;
					ret.aspectRatio = ret.width / ret.height;
				}
				else{
					// A match was not found.
					
					// Use the default SVG aspect ratio.
					ret.aspectRatio = SVG_DEFAULT_WIDTH / SVG_DEFAULT_HEIGHT;
					ret.width ??= ret.height * ret.aspectRatio || SVG_DEFAULT_WIDTH;
					ret.height ??= ret.width * ret.aspectRatio || SVG_DEFAULT_HEIGHT;
				}
			}
			else{
				// There is not a viewBox attribute.
				
				// Use the default SVG dimensions.
				ret.width ??= SVG_DEFAULT_WIDTH;
				ret.height ??= SVG_DEFAULT_HEIGHT;
				ret.aspectRatio = ret.width / ret.height;
			}
		}
	}
	else{
		// The image is a raster image (JPEG, PNG, et al.).
		
		// Get the natural dimensions.
		ret.width = imgElem.naturalWidth;
		ret.height = imgElem.naturalHeight;
		
		if(ret.width && ret.height){
			// The natural dimensions are known.
			
			// Calculate the aspect ratio.
			ret.aspectRatio = ret.width / ret.height;
		}
		else{
			// The natural width and/or height is unknown.
			
			// Use the current dimensions of the image as displayed.
			const rect = imgElem.getBoundingClientRect();
			ret.width = rect.width;
			ret.height = rect.height;
			if(ret.width && ret.height) ret.aspectRatio = ret.width / ret.height;
			
			return ret;
		}
	}
	
	return ret;
}

window.customElements.define('adaptive-image', AdaptiveImage);
