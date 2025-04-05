document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const BORDER_WIDTH = 5;
	
	const $ = (selector)=>document.querySelector(selector);
	
	const FITS = ['none', 'cover', 'fill', 'contain', 'scale-down'];
	
	const template = document.createElement('template');
	template.innerHTML = `<adaptive-image></adaptive-image>`;
	
	let table = $('#columns');
	
	for(const src of imageSrc){
		const row = document.createElement('div');
		for(const fit of FITS){
			const cell = document.createElement('div');
			
			const img = template.content.cloneNode(true).firstElementChild;
			img.setAttribute('src', src);
			img.setAttribute('fit', fit);
			img.setAttribute('width', '');
			img.setAttribute('height', '');
			img.setAttribute('align', '');
			img.setAttribute('border-width', '');
			img.setAttribute('alt', /dne\.jpg$/.test(src) ? 'Image not found' : '');
			cell.appendChild(img);
			
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	updateImageAttributes();
	
	$('#options').addEventListener('change', updateImageAttributes);
	$('#options').addEventListener('input', updateImageAttributes);
	
	function updateImageAttributes(event){
		
		let width = $('#widthSlider').value;
		width = $('#width').checked ? ($('#widthPercent').checked ? (width / 4) + '%' : width) : '';
		let height = $('#height').checked ? $('#heightSlider').value : '';
		let align = $('input[name="alignment"]:checked').value;
		let borderWidth = $('#showBorder').checked ? BORDER_WIDTH : '';
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			image.setAttribute('width', width);
			image.setAttribute('height', height);
			image.setAttribute('align', align);
			image.setAttribute('border-width', borderWidth);
		}
	}
});
