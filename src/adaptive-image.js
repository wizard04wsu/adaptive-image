import html from './adaptive-image.html?raw';
import css from './adaptive-image.css?raw';

const DEFAULT_FIT = "none";
const FITS = ['none', 'cover', 'fill', 'contain', 'scale-down'];

/**
 * Custom element to display an image within a bounding box (like a photo in a picture frame),
 * scaled and aligned according to the element's attributes.
 *
 * @class AdaptiveImage
 */
class AdaptiveImage extends HTMLElement {
	
	// Observe changes to these custom attributes.
	static observedAttributes = ['src', 'alt', 'width', 'height', 'fit', 'align', 'border-width'];
	
	#properties = {
		intrinsic: {},
		specified: {},
	};
	
	#frame;
	#backing;
	#img;
	
	constructor(){
		// Create an instance of AdaptiveImage.
		
		super();
		
		const shadowRoot = this.attachShadow({mode: 'open'});
		const template = document.createElement('template');
		template.innerHTML = `<style>${css}</style>${html}`;
		shadowRoot.appendChild(template.content.cloneNode(true));
		
		
		this.#frame = shadowRoot.querySelector('#frame');
		this.#backing = shadowRoot.querySelector('#backing');
		this.#img = shadowRoot.querySelector('img');
		
		if(!FITS.includes(this.getAttribute('fit'))){
			this.setAttribute('fit', DEFAULT_FIT);
		}
		
		this.#img.addEventListener('load', ()=>{
			// The image has loaded.
			
			// Remove the error class if it was added previously.
			this.#frame.classList.remove('error');
			
			// Get the properties of the image file.
			getImageProperties(this.#img)
				.then((properties)=>{
					
					// Set the intrinsic dimensions, aspect ratio, and MIME type.
					this.#properties.intrinsic.width = properties.width;
					this.#properties.intrinsic.height = properties.height;
					this.#properties.intrinsic.aspectRatio = properties.aspectRatio;
					this.#properties.mimeType = properties.mimeType || '';
					
					// Update the image component's attributes.
					this.#refreshImage();
				});
		});
		
		this.#img.addEventListener('error', ()=>{
			// There was an error loading the image.
			
			// Add the error class to the frame element.
			this.#frame.classList.add('error');
			
			// Remove the MIME type if it was set previously.
			this.#properties.mimeType = '';
			
			// Update the alt attribute of the image element.
			this.#img.alt = this.getAttribute('alt') || '';
			
			// Set the dimensions for the broken image (icon and alt text).
			const rect = this.#img.getBoundingClientRect();
			this.#properties.intrinsic.width = rect.width;
			this.#properties.intrinsic.height = rect.height;
			this.#properties.intrinsic.aspectRatio = (rect.width && rect.height) ? rect.width / rect.height : 1;
			
			// Update the image component's attributes, manually setting the width and height if necessary.
			this.#refreshImage(!this.getAttribute('width') && rect.width, !this.getAttribute('height') && rect.height);
		});
		
		// When the component is resized, update its attributes.
		this.addEventListener('resize', this.#refreshImage);
	}
	
	attributeChangedCallback(name, oldValue, newValue){
		// Sync attribute changes with this object's properties.
		
		if(oldValue !== newValue){
			
			if(name === 'src'){
				
				this.#img.src = newValue;
			}
			else if(name === 'width' || name === 'height' || name === 'border-width'){
				
				// Parse the dimensions and update the image properties.
				this.#refreshImage();
			}
			else if(name === 'alt'){
				
				this.#img.alt = newValue || '';
			}
		}
	}
	
	#parseDimensions(widthStr, heightStr){
		
		const ret = {};
		
		const specifiedWidth = (widthStr || this.getAttribute('width') || '').trim();
		if(specifiedWidth.endsWith('%')){
			ret.width = Math.abs(Number(specifiedWidth.slice(0, -1)) || 0);
			ret.widthIsPercentage = true;
		}
		else{
			ret.width = Math.abs(Number(specifiedWidth) || 0);
			ret.widthIsPercentage = false;
		}
		
		const specifiedHeight = (heightStr || this.getAttribute('height') || '').trim();
		ret.height = Number(specifiedHeight) || 0;
		
		ret.borderWidth = Number(this.getAttribute('border-width')) || 0;
		
		return ret;
	}
	
	#updateWidth(specifiedWidth, isPercentage = false, borderWidth){
		
		this.#properties.specified.width = specifiedWidth;
		this.#properties.specified.widthIsPercentage = specifiedWidth && isPercentage;
		
		let calculatedWidth = specifiedWidth;
		let calculatedAspectRatio = this.#properties.intrinsic.aspectRatio;
		if(this.#properties.specified.height){
			if(!specifiedWidth) calculatedWidth = this.#properties.specified.height * this.#properties.intrinsic.aspectRatio;
			calculatedAspectRatio = calculatedWidth / this.#properties.specified.height;
		}
		else if(!specifiedWidth){
			calculatedWidth = this.#properties.intrinsic.width;
		}
		this.#frame.style.setProperty('--specified-width', calculatedWidth);
		this.#frame.style.setProperty('--specified-aspectratio', calculatedAspectRatio);
		this.#properties.specified.aspectRatio = calculatedAspectRatio;
		
		if(borderWidth !== void 0){
			this.#frame.style.setProperty('--border-width', borderWidth);
		}
	}
	
	#updateHeight(specifiedHeight){
		
		this.#properties.specified.height = specifiedHeight;
		
		let calculatedHeight = specifiedHeight;
		let calculatedAspectRatio = this.#properties.intrinsic.aspectRatio;
		if(this.#properties.specified.width){
			if(!specifiedHeight) calculatedHeight = this.#properties.specified.width / this.#properties.intrinsic.aspectRatio;
			calculatedAspectRatio = this.#properties.specified.width / calculatedHeight;
		}
		else if(!specifiedHeight){
			calculatedHeight = this.#properties.intrinsic.height;
		}
		this.#frame.style.setProperty('--specified-height', calculatedHeight);
		this.#frame.style.setProperty('--specified-aspectratio', calculatedAspectRatio);
		this.#properties.specified.aspectRatio = calculatedAspectRatio;
	}
	
	#refreshImage(width, height){
		
		const dims = this.#parseDimensions();
		this.#updateWidth(width || dims.width, dims.widthIsPercentage, dims.borderWidth);
		this.#updateHeight(height || dims.height);
		
		// Toggle dimension classes.
		this.#frame.classList.toggle('hasWidth', !!this.#properties.specified.width);
		this.#frame.classList.toggle('hasWidthPercentage', !!this.#properties.specified.widthIsPercentage);
		this.#frame.classList.toggle('hasHeight', !!this.#properties.specified.height);
		
		// Set CSS variables.
		this.#frame.style.setProperty('--intrinsic-width', this.#properties.intrinsic.width);
		this.#frame.style.setProperty('--intrinsic-height', this.#properties.intrinsic.height);
		this.#frame.style.setProperty('--intrinsic-aspectratio', this.#properties.intrinsic.aspectRatio);
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
	
	const SVG_MIME_TYPE = 'image/svg+xml';
	const SVG_DEFAULT_WIDTH = 300;
	const SVG_DEFAULT_HEIGHT = 150;
	
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
