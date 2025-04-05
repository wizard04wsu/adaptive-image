document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const $ = (id)=>document.getElementById(id);
	
	$('options').addEventListener('change', updateImageAttributes);
	$('options').addEventListener('input', updateImageAttributes);
	
	function updateImageAttributes(event){
		
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			
			let width = $('widthSlider').value;
			if($('widthPercent').checked) width = (width / 4) + '%';
			image.setAttribute('width', $('width').checked ? width : '');
			
			let height = $('heightSlider').value;
			image.setAttribute('height', $('height').checked ? height : '');
			
			if(event?.target.name === 'alignment'){
				image.setAttribute('align', event.target.value);
			}
			
			image.setAttribute('border-width', $('showBorder').checked ? '5' : '');
		}
	}
});
