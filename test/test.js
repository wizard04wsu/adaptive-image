document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
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
			cell.appendChild(img.cloneNode());
			row.appendChild(cell);
		}
		table.appendChild(row);
	}
	
	updateImageAttributes();
	
	$('#options').addEventListener('change', updateImageAttributes);
	$('#options').addEventListener('input', updateImageAttributes);
	
	function updateImageAttributes(event){
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			let width = $('#widthSlider').value;
			if($('#widthPercent').checked) width = (width / 4) + '%';
			image.setAttribute('width', $('#width').checked ? width : '');
			
			let height = $('#heightSlider').value;
			image.setAttribute('height', $('#height').checked ? height : '');
			
			image.setAttribute('align', $('input[name="alignment"]:checked').value);
			
			image.setAttribute('border-width', $('#showBorder').checked ? '5' : '');
		}
	}
});
