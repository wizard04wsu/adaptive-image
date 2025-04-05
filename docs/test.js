document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const BORDER_WIDTH = 5;
	
	const $ = (selector)=>document.querySelector(selector);
	
	const FITS = ['none', 'cover', 'fill', 'contain', 'scale-down'];
	
	const template = document.createElement('template');
	template.innerHTML = `<adaptive-image></adaptive-image>`;
	
	let table = $('#columns');
	let resizeObserverMap = new Map;
	
	for(const src of imageSrc){
		const row = document.createElement('div');
		for(const fit of FITS){
			const cell = document.createElement('div');
			
			const imgMasked = template.content.cloneNode(true).firstElementChild;
			imgMasked.setAttribute('src', src);
			imgMasked.setAttribute('fit', fit);
			imgMasked.setAttribute('width', '');
			imgMasked.setAttribute('height', '');
			imgMasked.setAttribute('align', '');
			imgMasked.setAttribute('border-width', '');
			imgMasked.setAttribute('alt', /dne\.jpg$/.test(src) ? 'Image not found' : '');
			cell.appendChild(imgMasked);
			
			const imgVisible = imgMasked.cloneNode(true);
			const resizeObserver = new ResizeObserver((entries)=>{
				let borderWidth = $('#showBorder').checked ? 2 * BORDER_WIDTH : 0;
				for(const entry of entries){
					if(entry.contentRect.height - borderWidth != Number(imgMasked.getAttribute('height'))){
						imgMasked.setAttribute('height', Math.max(0, entry.contentRect.height - borderWidth));
					}
				}
			});
			resizeObserverMap.set(imgVisible, resizeObserver);
			cell.appendChild(imgVisible);
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	updateImageAttributes();
	
	$('#options').addEventListener('change', updateImageAttributes);
	$('#options').addEventListener('input', updateImageAttributes);
	for(const [img, observer] of resizeObserverMap){
		observer.observe(img);
	}
	resizeObserverMap.clear();
	
	function updateImageAttributes(event){
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			let width = $('#widthSlider').value;
			if($('#widthPercent').checked) width = (width / 4) + '%';
			image.setAttribute('width', $('#width').checked ? width : '');
			
			let height = $('#heightSlider').value;
			image.setAttribute('height', $('#height').checked ? height : '');
			
			image.setAttribute('align', $('input[name="alignment"]:checked').value);
			
			image.setAttribute('border-width', $('#showBorder').checked ? BORDER_WIDTH : '');
		}
	}
});
