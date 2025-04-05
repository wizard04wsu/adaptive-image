# Adaptive Image HTML Component
A custom HTML component that simplifies the scaling, fit, and alignment of an image, including SVG images.

The intent is to display an image like a picture frame hanging on a wall: the border around the component as the _frame_, the background as the _mounting board_, and the image as the _artwork_.

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
| fit			| The method used to scale the image to fit inside the frame. Accepted values are the same as for the [CSS `object-fit` property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#values): `none`, `cover`, `fill`, `contain`, `scale-down`. Default is `cover`.	|
| width			| Inner width of the frame. Can be a number of pixels (e.g., `50`) or a percentage (e.g., `50%`). Default is the image's intrinsic width.	|
| height		| Inner height of the frame in pixels (e.g., `50`). Default is the image's intrinsic height.	|
| border-width	| Width of the frame in pixels. Default is `0`.	|
| align			| Two space-separated values for how the image should be aligned inside the frame. `top`/`center`/`bottom` and `left`/`center`/`right`. Default is `center center` (or just `center`). 	|

The `::part()` CSS pseudo-element can be used to style parts of the component.
- `frame` - style the border and background (excluding the border width)
- `img` - apply filters to the image
