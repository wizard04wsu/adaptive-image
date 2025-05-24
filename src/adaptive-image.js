import CSS from './adaptive-image.css?raw';

const FIT_KEYWORDS = new Set(['none', 'cover', 'fill', 'contain', 'scale-down']);
const DEFAULT_FIT = "cover";
const ALIGN_Y_KEYWORDS = new Set(['top', 'middle', 'center', 'bottom']);
const DEFAULT_ALIGN_Y = "middle";
const ALIGN_X_KEYWORDS = new Set(['left', 'center', 'right']);
const DEFAULT_ALIGN_X = "center";

const SVG_MIME_TYPE = 'image/svg+xml';
const SVG_DEFAULT_WIDTH = 300;
const SVG_DEFAULT_HEIGHT = 150;


/**
 * Custom element to display an image within a bounding box (like a photo in a picture frame),
 * scaled and aligned according to the element's attributes.
 *
 * @class AdaptiveImage
 */
class AdaptiveImage extends HTMLElement {
	
	// Observe changes to these custom attributes.
	static observedAttributes = ['src', 'alt', 'width', 'height', 'fit', 'align'];
	
	#frame;
	#img;
	
	#intrinsicWidth;
	#intrinsicHeight;
	#intrinsicAspectRatio;
	#mimeType;
	
	constructor(){
		// Create an instance of AdaptiveImage.
		console.log('constructor()');
		
		super();
		
		// Create the shadow DOM and clone the template.
		const shadowRoot = this.attachShadow({mode: 'open'});
		const template = document.createElement('template');
		template.innerHTML = `<style>${CSS}</style><div id="frame"><div id="mount"><img src="" alt="" part="img"></div></div>`;
		shadowRoot.appendChild(template.content.cloneNode(true));
		
		// Save references to the internal elements.
		this.#frame = shadowRoot.querySelector('#frame');
		this.#img = shadowRoot.querySelector('img');
		
		// Handle success or failure loading a new src.
		this.#img.addEventListener('load', ()=>this.#imageLoadHandler());
		this.#img.addEventListener('error', ()=>this.#imageErrorHandler());
		
		// Update the component when it is resized.
		const resizeObserver = new ResizeObserver((entries)=>this.#refreshImage());
		resizeObserver.observe(this);
	}
	
	// Built-in method to handle changes to the observed custom attributes.
	attributeChangedCallback(name, oldValue, newValue){
		// Sync attribute changes with this object's properties.
		console.log('attributeChangedCallback()');
		
		if(oldValue !== newValue){
			
			if(name === 'src'){
				this.#img.src = newValue;
			}
			else if(name === 'alt'){
				this.#img.alt = newValue || '';
			}
			else{
				this.#refreshImage();
			}
		}
	}
	
	#imageLoadHandler(){
		// The image has loaded.
		console.log('imageLoadHandler()');
		
		console.log(this.#frame);
		// Remove the error class if it was added previously.
		this.#frame.classList.remove('error');
		
		// Get the properties of the image file.
		getImageProperties(this.#img)
			.then((properties)=>{
				
				// Set the intrinsic dimensions, aspect ratio, and MIME type.
				this.#intrinsicWidth = properties.width;
				this.#intrinsicHeight = properties.height;
				this.#intrinsicAspectRatio = properties.aspectRatio;
				this.#mimeType = properties.mimeType || '';
				
				// Update the image component's attributes.
				this.#refreshImage();
			});
	}
	
	#imageErrorHandler(){
		// There was an error loading the image.
		console.log('imageErrorHandler()');
		
		// Add the error class to the frame element.
		this.#frame.classList.add('error');
		
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
	
	#updateWidth(){
		console.log('updateWidth()');
		
		let attributeWidth = Number(this.getAttribute('width')?.trim());
		if(attributeWidth && attributeWidth > 0){
			this.#frame.style.setProperty('--attribute-width', `${attributeWidth}px`);
		}
		else{
			this.#frame.style.removeProperty('--attribute-width');
		}
	}
	
	#updateHeight(){
		console.log('updateHeight()');
		
		let attributeHeight = Number(this.getAttribute('height')?.trim());
		if(attributeHeight && attributeHeight > 0){
			this.#frame.style.setProperty('--attribute-height', `${attributeHeight}px`);
		}
		else{
			this.#frame.style.removeProperty('--attribute-height');
		}
	}
	
	#updateFit(){
		console.log('updateFit()');
		
		// Get value of the `--fit` property.
		let fit = window.getComputedStyle(this).getPropertyValue('--fit');
		
		if(FIT_KEYWORDS.has(fit)){
			// Property value matches a fit keyword.
			
			// Set the `data-fit` attribute of #frame.
			this.#frame.dataset.fit = fit;
		}
		else{
			// Property value does not match a fit keyword.
			
			// Get value from the component's `fit` attribute. 
			fit = this.getAttribute('fit');
			
			// Set the `data-fit` attribute of #frame.
			this.#frame.dataset.fit = FIT_KEYWORDS.has(fit) ? fit : DEFAULT_FIT;
		}
	}
	
	#updateAlignment(){
		console.log('updateAlignment()');
		
		// Get values from the component's `align` attribute.
		let align = new Set(this.getAttribute('align')?.split(' ') || []);
		
		// Get value of the `--align-x` property.
		let alignX = window.getComputedStyle(this).getPropertyValue('--align-x');
		
		if(!ALIGN_X_KEYWORDS.has(alignX)){
			// Property value does not match a horizontal alignment keyword.
			
			// Get list of matching horizontal alignment keywords from the `align` attribute.
			alignX = align && ALIGN_X_KEYWORDS.intersection(align).values();
			if(alignX?.size){
				// There is at least one match.
				
				// Use the first one.
				alignX = alignX.next().value;
				
				// Remove the match in case it's 'center' so it won't match with both X and Y.
				align.delete(alignX);
			}
			else{
				// Use the default.
				alignX = DEFAULT_ALIGN_X;
			}
		}
		
		// Value from `--align-y` property.
		let alignY = window.getComputedStyle(this).getPropertyValue('--align-y');
		
		if(!ALIGN_Y_KEYWORDS.has(alignY)){
			// Property value does not match a vertical alignment keyword.
			
			// Get list of matching vertical alignment keywords from the `align` attribute.
			alignY = align && ALIGN_Y_KEYWORDS.intersection(align).values();
			if(alignY?.size){
				// There is at least one match.
				
				// Use the first one.
				alignY = alignY.next().value;
			}
			else{
				// Use the default.
				alignY = DEFAULT_ALIGN_Y;
			}
		}
		
		// Set the `data-align-x` attribute of #frame.
		this.#frame.dataset.alignX = alignX;
		
		// Set the `data-align-y` attribute of #frame.
		if(alignY === 'center') alignY = 'middle';
		this.#frame.dataset.alignY = alignY;
	}
	
	#refreshImage(){
		console.log('refreshImage()');
		
		// Set CSS variables.
		this.#frame.style.setProperty('--intrinsic-width', `${this.#intrinsicWidth}px`);
		this.#frame.style.setProperty('--intrinsic-height', `${this.#intrinsicHeight}px`);
		this.#frame.style.setProperty('--intrinsic-aspectratio', this.#intrinsicAspectRatio);
		
		this.#updateWidth();
		this.#updateHeight();
		
		this.#updateFit();
		this.#updateAlignment();
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
function getImageProperties(imgElem){
	
	return new Promise(async (resolve, reject)=>{
		
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
				
				return resolve(ret);
			}
			
			// The image is an SVG.
			
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
				
				return resolve(ret);
			}
		}
		
		return resolve(ret);
	});
}

window.customElements.define('adaptive-image', AdaptiveImage);
