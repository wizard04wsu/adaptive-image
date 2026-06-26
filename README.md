# Adaptive Image Web Component
A custom HTML element that simplifies the fit and alignment of an image in its container. This supports SVG images as well.

[Demo page](https://wizard04wsu.github.io/adaptive-image/index.html)

---

Include the script in `<head>`.
```
<script type="module" src="adaptive-image.js"></script>
```

Add Adaptive Image components like so:
```
<adaptive-image src="example.jpg" alt=""></adaptive-image>
```

---

The `<adaptive-image>` element supports the following attributes.

| Attribute			| Description	|
|---			|---		|
| src			| Path to the image file.	|
| alt			| Alternate text for the image.	|
| image-title			| Title for the image (not for the entire component).	|
| fit			| The method used to scale the image to fit inside the component's content box. Accepted values are the same as for the [CSS `object-fit` property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#values): `none`, `cover`, `fill`, `contain`, or `scale-down`. Default is `cover`.	|
| align-x			| How the image should be horizontallyaligned inside the component's content box. Accepted values are `left`, `center`, or `right`. Default is `center`.	|
| align-y			| How the image should be vertically aligned inside the component's content box. Accepted values are `top`, `middle`, or `bottom`. Default is `middle`.	|

Additionally, the following CSS property may be used. This is only for demonstration purposes.

| Property			| Description	|
|---			|---		|
| &#x2011;&#x2011;overflow			| Set to `visible` to show any overflow of the image outside the component's content box. 	|

Styles can be applied to the image itself using the `::part(img)` pseudo-element.
