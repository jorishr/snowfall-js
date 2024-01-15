# Snowfall-js-plugin

Snowfall-js-plugin is a JavaScript library to add some winter magic to your project. This package creates animated snowflakes on a web page using HTML5 canvas and JavaScript classes, no dependencies. You can customize the number, size, speed, color and text of the snowflakes, and enjoy the beautiful snow falling effect on your website or app. Snowfall.js-plugin is easy to use and compatible with most browsers and devices.

The plugins comes with optional features:

- keyboard focusable and customizable switches to allow the users to toggle the animation on/off — simply add one or more containers with the proper class name;
- store the user preferences in local storage;
- enable hardware restriction to automatically disable the animation on low end devices;
- enable a date range: for example, only activate the animation during winter months.

## Installation

To use the Snowfall-js-plugin, you need to install the NPM package:

```bash
npm install snowfall-js-plugin
```

**Note**: If you only want the snowfall.js file without the bells and whistles, download the file snowfall.js from the original [snowfall.js repo](https://github.com/Andrey-1988-dev/snowfall-js) and include it in your HTML page manually.

## Snowfall options

To create and animate snowflakes on your page, you need to create an object of the class Snowfall and pass it options as an object. For example:

```javascript
let snowfall = new Snowfall({
  count: 100, // number of snowflakes
  minRadius: 10, // minimum radius of a snowflake in pixels
  maxRadius: 30, // maximum radius of a snowflake in pixels
  minSpeed: 3, // minimum speed of a snowflake in pixels per frame
  maxSpeed: 10, // maximum speed of a snowflake in pixels per frame
  text: "\u2744", // text for a snowflake (can be any symbol or text)
  color: "#ffffff", // color of a snowflake in HEX format
  zIndex: "1000", // z-index for the snowflakes canvas
});
```

All options are optional and have default values, which you can see in the file snowfall.js. You can create multiple objects of Snowfall with different options for different effects.

## License

This project is distributed under the GNU GPL v3.0 license. You can freely use, modify and distribute this code, but you must keep the authorship of the original code and indicate the license. You must also share your changes under the same license. You can read more about the license in the file LICENSE.

## Authors

- The NPM package was created by [Joris Raymaekers](https://liondigits.com "Lion Digits").
- The custom toggle switches are based on [Codepen: animated toggle switch](https://codepen.io/jorishr/pen/xxxPPLP "Codepen Joris Raymaekers").
- The original snowfall animation was first created and published by [Andrey Yurkevich](https://github.com/Andrey-1988-dev "Andrey Yurkevich").
