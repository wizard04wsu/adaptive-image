export default getDimensions;

/**
 * @typedef {object} BoxDimensions
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 * @property {number} x - X coordinate of left edge.
 * @property {number} y - Y coordinate of top edge.
 * @property {number} height
 * @property {number} width
 */

/**
 * @typedef {object} PropertyWidths
 * @property {number} top
 * @property {number} right
 * @property {number} bottom
 * @property {number} left
 */

/**
 * @typedef {object} ElementDimensions
 * @property {BoxDimensions} marginBox - Outer edge of margins. Can be offset from the rest of the element.
 * @property {BoxDimensions} borderBox - Outer edge of borders.
 * @property {BoxDimensions} scrollbarBox - Inner edge of borders.
 * @property {BoxDimensions} paddingBox - Outer edge of padding. Does not include scrollbar gutters.
 * @property {BoxDimensions} contentBox - Inner edge of padding.
 * @property {PropertyWidths} marginWidth - Margin widths. Can be negative.
 * @property {PropertyWidths} borderWidth - Border widths.
 * @property {PropertyWidths} scrollbarWidth - Scrollbar gutter widths.
 * @property {PropertyWidths} paddingWidth - Padding widths.
 */

/**
 * Get the position and dimensions of the boxes around an element's margins, borders, scrollbar gutters, padding, and content.
 * @param {HTMLElement} element - The element for which to calculate positions and dimensions.
 * @param {HTMLElement|number[]} [relativeTo] - Calculate position relative to an [x, y] coordinate or another element (top-left of its border box).
 * @returns {ElementDimensions}
 */
function getDimensions(element, relativeTo = [0, 0]) {
	
	let originX, originY;
	
	if (relativeTo instanceof HTMLElement) {
		const relativeBorderBox = relativeTo.getBoundingClientRect();
		originX = relativeBorderBox.left;
		originY = relativeBorderBox.top;
	}
	else {
		[originX, originY] = relativeTo;
	}
	
	const borderBox = element.getBoundingClientRect();
	const style = window.getComputedStyle(element);
	
	const rect = {
		
		// Outer edge of margins.
		marginBox: {},
		
		// Outer edge of borders.
		borderBox: {
			top: borderBox.top - originY,
			right: borderBox.right - originX,
			bottom: borderBox.bottom - originY,
			left: borderBox.left - originX,
			height: borderBox.height, // === element.offsetHeight
			width: borderBox.width, // === element.offsetWidth
		},
		
		// Inner edge of borders, including scrollbar gutters, padding, and content.
		scrollbarBox: {},
		
		// Padding and content, excluding scrollbar gutters.
		paddingBox: {
			height: element.clientHeight,
			width: element.clientWidth,
		},
		
		// Content without the surrounding padding.
		contentBox: {},
		
		// The width of each margin (pulled from computed style; can be negative).
		marginWidth: {},
		
		// The width of each border (pulled from computed style).
		borderWidth: {},
		
		// The width of each scrollbar gutter.
		// A scrollbar isn't necessarily displayed, but space can be reserved for it regardless.
		scrollbarWidth: {},
		
		// The width of the padding on each side (pulled from computed style).
		paddingWidth: {},
	};
	
	rect.marginWidth.top = parseFloat(style.marginTopWidth);
	rect.marginWidth.right = parseFloat(style.marginRightWidth);
	rect.marginWidth.bottom = parseFloat(style.marginBottomWidth);
	rect.marginWidth.left = parseFloat(style.marginLeftWidth);
	
	rect.borderWidth.top = parseFloat(style.borderTopWidth);
	rect.borderWidth.right = parseFloat(style.borderRightWidth);
	rect.borderWidth.bottom = parseFloat(style.borderBottomWidth);
	rect.borderWidth.left = parseFloat(style.borderLeftWidth);
	
	rect.scrollbarWidth.top = 0;
	rect.scrollbarWidth.right = rect.borderBox.width - rect.borderWidth.left - rect.borderWidth.right - rect.paddingBox.width;
	rect.scrollbarWidth.bottom = rect.borderBox.height - rect.borderWidth.top - rect.borderWidth.bottom - rect.paddingBox.height;
	rect.scrollbarWidth.left = 0;
	if (style.scrollbarGutter === 'stable both-edges') {
		rect.scrollbarWidth.right /= 2;
		rect.scrollbarWidth.bottom /= 2;
		rect.scrollbarWidth.top = rect.scrollbarWidth.bottom;
		rect.scrollbarWidth.left = rect.scrollbarWidth.right;
	}
	
	rect.paddingWidth.top = parseFloat(style.paddingTop);
	rect.paddingWidth.right = parseFloat(style.paddingRight);
	rect.paddingWidth.bottom = parseFloat(style.paddingBottom);
	rect.paddingWidth.left = parseFloat(style.paddingLeft);
	
	rect.marginBox.top = rect.borderBox.top - rect.marginWidth.top;
	rect.marginBox.right = rect.borderBox.right + rect.marginWidth.right;
	rect.marginBox.bottom = rect.borderBox.bottom + rect.marginWidth.bottom;
	rect.marginBox.left = rect.borderBox.left - rect.marginWidth.left;
	rect.marginBox.x = rect.marginBox.left;
	rect.marginBox.y = rect.marginBox.top;
	rect.marginBox.height = rect.marginBox.bottom - rect.marginBox.top;
	rect.marginBox.width = rect.marginBox.right - rect.marginBox.left;
	
	rect.borderBox.x = rect.borderBox.left;
	rect.borderBox.y = rect.borderBox.top;
	
	rect.scrollbarBox.top = rect.borderBox.top + rect.borderWidth.top;
	rect.scrollbarBox.right = rect.borderBox.right - rect.borderWidth.right;
	rect.scrollbarBox.bottom = rect.borderBox.bottom - rect.borderWidth.bottom;
	rect.scrollbarBox.left = rect.borderBox.left + rect.borderWidth.left;
	rect.scrollbarBox.x = rect.scrollbarBox.left;
	rect.scrollbarBox.y = rect.scrollbarBox.top;
	rect.scrollbarBox.height = rect.scrollbarBox.bottom - rect.scrollbarBox.top;
	rect.scrollbarBox.width = rect.scrollbarBox.right - rect.scrollbarBox.left;
	
	rect.paddingBox.top = rect.scrollbarBox.top + rect.scrollbarWidth.top;
	rect.paddingBox.right = rect.scrollbarBox.right - rect.scrollbarWidth.right;
	rect.paddingBox.bottom = rect.scrollbarBox.bottom - rect.scrollbarWidth.bottom;
	rect.paddingBox.left = rect.scrollbarBox.left + rect.scrollbarWidth.left;
	rect.paddingBox.x = rect.paddingBox.left;
	rect.paddingBox.y = rect.paddingBox.top;
	
	rect.contentBox.top = rect.paddingBox.top + rect.paddingWidth.top;
	rect.contentBox.right = rect.paddingBox.right - rect.paddingWidth.right;
	rect.contentBox.bottom = rect.paddingBox.bottom - rect.paddingWidth.bottom;
	rect.contentBox.left = rect.paddingBox.left + rect.paddingWidth.left;
	rect.contentBox.x = rect.contentBox.left;
	rect.contentBox.y = rect.contentBox.top;
	rect.contentBox.height = rect.contentBox.bottom - rect.contentBox.top;
	rect.contentBox.width = rect.contentBox.right - rect.contentBox.left;
	
	return rect;
}
