# Adaptive Image HTML Component
Custom HTML component that simplifies the sizing, fit, and alignment of an image, including SVG images.

---

```
<script type="module" src="adaptive-image.js"></script>

<adaptive-image src="image.jpg" alt=""></adaptive-image>
```

The `<adaptive-image>` element supports these attributes:

| Name			| Description	|
|---			|---		|
| src			| Path to the image file.	|
| alt			| Alternate text for the image.	|
| fit			| How the image should be resized to fit its container. Accepted values are the same as for the [CSS `object-fit` property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#values): `none`, `cover`, `fill`, `contain`, `scale-down`. Default is `none`.	|
| width			| Width of the image container. Can be a number of pixels (e.g., `50`) or a percentage (e.g., `50%`). Default is auto width.	|
| height		| Height of the image container in pixels (e.g., `50`). Default is auto height.	|
| border-width	| Width of the border in pixels. Default is `0`.	|
| align			| Two space-separated values for how the image should be aligned. `top`/`middle`/`bottom` and `left`/`center`/`right`. Default is `top left`. 	|

The `::part()` CSS pseudo-element can be used with the values `frame` to style the border and background and `img` to style the image itself.