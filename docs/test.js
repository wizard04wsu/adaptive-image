document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const BORDER_WIDTH = 5;
	
	const $ = (selector)=>document.querySelector(selector);
	
	const FITS = ['none', 'cover', 'fill', 'contain', 'scale-down'];
	
	
	let table = $('#columns');
	let resizeObserverMap = new Map;
	
	for(const item of imageSrc){
		
		const row = document.createElement('div');
		
		const cell = document.createElement('div');
		cell.innerHTML = `<span>${item.title}</span>`;
		row.appendChild(cell);
		
		for(const fit of FITS){
			
			const cell = document.createElement('div');
			
			const imgMasked = document.createElement('adaptive-image');
			imgMasked.setAttribute('src', item.src);
			imgMasked.setAttribute('alt', item.title === 'Broken' ? 'Image not found' : '');
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
		let alignX = $('input[name="alignment"]:checked').dataset.alignX;
		let alignY = $('input[name="alignment"]:checked').dataset.alignY;
		
		const adaptiveImages = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const adaptiveImage of adaptiveImages){
			
			adaptiveImage.setAttribute('alt', adaptiveImage.getAttribute('src') === 'dne.jpg' ? 'Image not found' : '');
			adaptiveImage.style.width = width;
			adaptiveImage.style.height = height;
			adaptiveImage.setAttribute('align-x', alignX);
			adaptiveImage.setAttribute('align-y', alignY);
		}
	}
});
