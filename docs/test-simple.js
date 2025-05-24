document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const BORDER_WIDTH = 5;
	
	const $ = (selector)=>document.querySelector(selector);
	
	updateImageAttributes();
	
	$('#options').addEventListener('change', updateImageAttributes);
	$('#options').addEventListener('input', updateImageAttributes);
	
	function updateImageAttributes(event){
		
		let src = $('#imageSrc').value;
		let alt = src === 'dne.jpg' ? 'Image not found' : '';
		let fit = $('input[name="fit"]:checked').value;
		let width = $('#widthSlider').value;
		width = $('#width').checked ? ($('#widthPercent').checked ? (width / 4) + '%' : width) : '';
		let height = $('#height').checked ? $('#heightSlider').value : '';
		let align = $('input[name="alignment"]:checked').value;
		let borderWidth = $('#showBorder').checked ? BORDER_WIDTH : 0;
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			image.setAttribute('src', src);
			image.setAttribute('alt', alt);
			image.setAttribute('fit', fit);
			image.setAttribute('width', width);
			image.setAttribute('height', height);
			image.setAttribute('align', align);
			//image.setAttribute('border-width', borderWidth);
			image.style.borderWidth = borderWidth+'px';
		}
	}
});
