document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const BORDER_WIDTH = 5;
	
	const $ = (selector)=>document.querySelector(selector);
	
	const FITS = ['none', 'cover', 'fill', 'contain', 'scale-down'];
	
	
	let table = $('#columns');
	let resizeObserverMap = new Map;
	
	for(const src of imageSrc){
		const row = document.createElement('div');
		for(const fit of FITS){
			const cell = document.createElement('div');
			
			const imgMasked = document.createElement('adaptive-image');
			imgMasked.setAttribute('src', src);
			imgMasked.setAttribute('alt', /dne\.jpg$/.test(src) ? 'Image not found' : '');
			imgMasked.setAttribute('fit', fit);
			cell.appendChild(imgMasked);
			
			const imgVisible = imgMasked.cloneNode(true);
			cell.appendChild(imgVisible);
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	updateImageAttributes();
	
	$('#options').addEventListener('change', updateImageAttributes);
	$('#options').addEventListener('input', updateImageAttributes);
	
	function updateImageAttributes(event){
		
		let width = $('#widthSlider').value;
		width = $('#width').checked ? ($('#widthPercent').checked ? (width / 4) + '%' : width+'px') : '';
		let height = $('#height').checked ? $('#heightSlider').value+'px' : '';
		let align = $('input[name="alignment"]:checked').value;
		let overflow = $('#showClipped').checked ? 'visible' : null;
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			image.setAttribute('alt', image.getAttribute('src') === 'dne.jpg' ? 'Image not found' : '');
			image.style.width = width;
			image.style.height = height;
			image.setAttribute('align', align);
			image.style.setProperty('--overflow', image.nextSibling ? overflow : null);
		}
	}
});
