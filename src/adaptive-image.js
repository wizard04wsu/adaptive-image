import TEMPLATE_CSS from './adaptive-image.css?raw';

const TEMPLATE_HTML = `<style>${TEMPLATE_CSS}</style><div id="outer"><div id="inner"><div id="image"><img src="" alt="" part="img"></div></div></div>`;

const SVG_MIME_TYPE = 'image/svg+xml';
const SVG_DEFAULT_WIDTH = 300;
const SVG_DEFAULT_HEIGHT = 150;


const debug = {
	enabled: false,
	enable(){ this.enabled = true; },
	disable(){ this.enabled = false; },
};
for(const f in console){
	debug[f] = function (...args){
		if(this.enabled) console[f].apply(null, args);
	};
}
debug.logFn = (fnName) => debug.log(`%c\u0192%c${fnName}%c()`, 'font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;', 'border-bottom:1px dotted #888; padding-left:1em;', '');
debug.logFnGroup = (fnName) => debug.group(`%c\u0192%c${fnName}%c()`, 'font-style:italic; font-weight:bold; font-size:150%; margin-right:-0.2em;', 'border-bottom:1px dotted #888; padding-left:1em; font-weight:bold;', '');
//debug.enable();


/**
 * HTML component to display an image using the specified fit and alignment.
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
	
	#resizeObserver;
	
	constructor(){
		// Create an instance of AdaptiveImage.
		debug.logFn('constructor');
		
		super();
		
		// Create the shadow DOM and clone the template.
		this.attachShadow({mode: 'open'});
		const template = document.createElement('template');
		template.innerHTML = TEMPLATE_HTML;
		this.shadowRoot.appendChild(template.content.cloneNode(true));
		
		// Save references to the internal elements.
		this.#outer = this.shadowRoot.querySelector('#outer');
		this.#img = this.shadowRoot.querySelector('img');
		
		// Handle success or failure loading a new src.
		this.#img.addEventListener('load', ()=>this.#imageLoadHandler());
		this.#img.addEventListener('error', ()=>this.#imageErrorHandler());
	}
	
	// Observe changes to these custom attributes.
	static observedAttributes = ['src', 'alt', 'fit', 'align-x', 'align-y', 'style'];
	
	/**
	 * Built-in method to handle changes to the observed attributes of the custom element.
	 * @param {string} name - Name of the attribute that changed.
	 * @param {string} oldValue 
	 * @param {string} newValue 
	 */
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
	
	connectedCallback() {
		
		this.#resizeObserver = new ResizeObserver(() => {
			this.#refreshImage();
		});
		
		this.#resizeObserver.observe(this);
		this.#resizeObserver.observe(document.documentElement);
		
		this.#refreshImage();
	}
	
	disconnectedCallback() {
		
		this.#resizeObserver?.disconnect();
	}
	
	/**
	 * Once an image loads, its MIME type and dimensions are determined, and the display is updated.
	 */
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
	
	/**
	 * When an image fails to load, updates the display to indicate a broken image.
	 */
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
	
	/**
	 * Determines how to size the image within its box. Default is 'cover'.
	 */
	#updateFit(){
		debug.logFn('updateFit');
		
		// Fit of the image within its box (priority: /*CSS '--fit' property,*/ HTML 'fit' attribute, default 'cover')
		
		let validValues = new Set(['none', 'cover', 'fill', 'contain', 'scale-down']);
		
		let /*fitValue = window.getComputedStyle(this).getPropertyValue('--fit')?.toLowerCase().trim() || '';
		if(!validValues.has(fitValue))*/ fitValue = this.getAttribute('fit')?.toLowerCase().trim() || '';
		if(!validValues.has(fitValue)) fitValue = 'cover';
		
		// Set the `data-fit` attribute of #outer.
		this.#outer.dataset.fit = fitValue;
	}
	
	/**
	 * Calculates the horizontal and vertical alignment of the image. Defaults are horizontally 'center' and vertically 'middle'.
	 */
	#updateAlignment(){
		debug.logFn('updateAlignment');
		
		// Horizontal alignment (priority: /*CSS '--align-x' property,*/ HTML 'align-x' attribute, default 'center')
		
		let validValues = new Set(['left', 'center', 'right']);
		
		let /*alignValue = window.getComputedStyle(this).getPropertyValue('--align-x')?.toLowerCase().trim() || '';
		if(!validValues.has(alignValue))*/ alignValue = this.getAttribute('align-x')?.toLowerCase().trim() || '';
		if(!validValues.has(alignValue)) alignValue = 'center';
		
		// Set the `data-align-x` attribute of #outer.
		this.#outer.dataset.alignX = alignValue;
		
		// Vertical alignment (priority: /*CSS '--align-y' property,*/ HTML 'align-y' attribute, default 'middle')
		
		validValues = new Set(['top', 'middle', 'bottom']);
		
		/*alignValue = window.getComputedStyle(this).getPropertyValue('--align-y')?.toLowerCase().trim() || '';
		if(!validValues.has(alignValue))*/ alignValue = this.getAttribute('align-y')?.toLowerCase().trim() || '';
		if(!validValues.has(alignValue)) alignValue = 'middle';
		
		// Set the `data-align-y` attribute of #outer.
		this.#outer.dataset.alignY = alignValue;
	}
	
	#refreshImage(){
		debug.logFn('refreshImage');
		
		if(this.#mimeType === SVG_MIME_TYPE){
			this.#outer.classList.add('svg');
		}
		else{
			this.#outer.classList.remove('svg');
		}
		
		// Set align-x, align-y, and fit.
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
 * Returns the intrinsic dimensions of an image and the image type.
 * If intrinsic dimensions cannot be obtained, the dimensions of the image as it is currently displayed are used instead.
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
