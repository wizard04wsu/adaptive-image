document.addEventListener('DOMContentLoaded', ()=>{
	
	'use strict';
	
	const useWidth = document.querySelector('#width');
	const useHeight = document.querySelector('#height');
	const widthSlider = document.querySelector('#widthSlider');
	const heightSlider = document.querySelector('#heightSlider');
	const alignments = document.querySelector('#alignments');
	const showBorder = document.querySelector('#showBorder');
	
	useWidth.addEventListener('change', ()=>{
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			image.setAttribute('width', useWidth.checked ? widthSlider.value : '');
		}
	});
	widthSlider.addEventListener('input', ()=>{
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			image.setAttribute('width', useWidth.checked ? widthSlider.value : '');
		}
	});
	
	useHeight.addEventListener('change', ()=>{
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			image.setAttribute('height', useHeight.checked ? heightSlider.value : '');
		}
	});
	heightSlider.addEventListener('input', ()=>{
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			image.setAttribute('height', useHeight.checked ? heightSlider.value : '');
		}
	});
	
	alignments.addEventListener('change', (event)=>{
		if(event.target.name === 'alignment'){
			const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
			for(const image of images){
				image.setAttribute('align', event.target.value);
			}
		}
	});
	
	showBorder.addEventListener('input', ()=>{
		const images = Array.prototype.slice.call(document.querySelectorAll('adaptive-image'), 0);
		for(const image of images){
			image.setAttribute('border-width', showBorder.checked ? '5' : '');
		}
	});
	
});
