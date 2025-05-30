# Adaptive Image HTML Component
A custom HTML component that simplifies the fit and alignment of an image in its container. This supports SVG images as well.

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
| fit			| The method used to scale the image to fit inside the component's content box. Accepted values are the same as for the [CSS `object-fit` property](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit#values): `none`, `cover`, `fill`, `contain`, or `scale-down`. Default is `cover`.	|
| align			| One or two space-separated values for how the image should be aligned inside the component's content box. `top`/`center`/`bottom` and `left`/`middle`/`right`. Default is `center middle`. 	|

Additionally, the following CSS properties may be used. These have priority over the element attributes.

| Property			| Description	|
|---			|---		|
| &#x2011;&#x2011;fit			| The method used to scale the image to fit inside the component's content box (`none`, `cover`, `fill`, `contain`, `scale-down`). Default is `cover`.	|
| &#x2011;&#x2011;align&#x2011;x			| Horizontal alignment inside the component's content box (`left`/`center`/`right`). Default is `center`. 	|
| &#x2011;&#x2011;align&#x2011;y			| Vertical alignment inside the component's content box (`top`/`middle`/`bottom`). Default is `middle`. 	|
| &#x2011;&#x2011;overflow			| How to show any [overflow](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) of the image outside the component's content box. Default is `hidden`. 	|

Styles can be applied to the image itself using the `::part(img)` pseudo-element.
