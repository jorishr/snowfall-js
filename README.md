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

## Configuration options

### How to use a custom configuration

### Default configuration

Below you find the default configuration object. Most of the settings are self-explanatory but continue reading below for more information.

```js
{
  checkHardware: true,
  checkDateRange: true,
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1 - days in the month
    endDay: 15, // 1- days in the month
  },
  autostartOnMobile: true,
  autostartOnDesktop: true,
  snowfall: {
    count: 100, // number of snowflakes on the canvas
    minRadius: 10, // min size of snowflakes
    maxRadius: 30, // max size of snowflakes
    minSpeed: 3, // min fall speed of snowflakes
    maxSpeed: 10, // max fall speed of snowflakes
    text: "\u2744", // symbol or text of the snowflakes
    color: "#99ccff", // color of the snowflakes
    zIndex: "1000", // adjust according to project stacking context
  },
  switches: {
    show: true,
    storeUserSettings: true,
    styles: {
      /* background color of the switch when turned off */
      bgClrOff: "rgba(189, 195, 199, 1)", // #bdc3c7
      /* background color of the switch when turned on */
      bgClrOn: "rgba(149, 165, 166, 1)", // #95a5a6
      /* color of the moving toggle inside switch */
      toggleClr: "#ffffff",
      /* color and position of the text next to the switch */
      txtClr: "rgba(33, 37, 41, 1)", // #212529
      txtPosition: "2", // 1 = left of switch or 2 = right of switch
    },
  },
}
```

### Hardware check

Checking hardware via the browser is unreliable but a hardware check is _on by default_ to stop the animation from running on low end devices. This is useful when your website has lots of other computationally heavy JavaScript or other animations like scroll animation that are more important than fancy snowflakes. Thus, on low end devices this code will not run and no switches will be appended to the DOM.

The hardware check relies on the browser Navigator API to check hardware concurrency or device memory. One of the trade-offs to be aware of is that if the browser does not report hardware info or provides inaccurate estimates, the animation will not be loaded.

You can disable this check by setting the option: `checkHardware: false` in the configuration object.

### Date range

By default the animation is set to be loaded between December 15 and February 15 on any given year. You can set it and forget it. Outside of this date range, the animation code will _not_ be loaded and no switches will be present in the DOM.

You can set your own date range by changing the following options:

```js
{
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1 - days in the month
    endDay: 15, // 1- days in the month
  },
}
```

The date range is validated so you will get an error when, for example, startDay > endDay while startMonth is the same as the endMonth. The animation will run on February 29 in a leap year but you cannot set the start or end date to be February 29.

If you want the code to be loaded all year set `checkDateRange: false`.

### Autostart

By default, the animation will start automatically. That is, if it passes the hardware check and the current date falls within the specified date range. You can also leave the decision to run the animation up to the user. If you choose to do so, make sure you have one or more switches available on your site (see [switches](#switches)). The user then needs to manually turn the animation on.

The configuration offers two settings: autoStartOnMobile and autoStartOnDesktop. Both are set to `true` by default. This setting is based on the `window.innerWidth >= 768px` condition.

### Switches

By default the plugin will look for container elements with `class="snow-animation-switch" and append the custom switch elements as children to the container. If no container elements are found, a warning will be shown in the console.

If you only want the snow animation without the ability for the users to turn the animation on or off, you can set the option:

```js
{
  switches: {
     show: false,
  }
}
```

### Store user settings

By default, the user's preference to enable or disable the animation is stored in local storage under the key-value pair: `"userSettings": {runSnowfallAnimation: true/false}`. If you don't want this, you can disable this feature:

```js
{
  switches: {
     storeUserSettings: false,
  }
}
```

## License

This project is distributed under the GNU GPL v3.0 license. You can freely use, modify and distribute this code, but you must keep the authorship of the original code and indicate the license. You must also share your changes under the same license. You can read more about the license in the file LICENSE.

## Authors

- The NPM package was created by [Joris Raymaekers](https://liondigits.com "Lion Digits").
- The custom toggle switches are based on [Codepen: animated toggle switch](https://codepen.io/jorishr/pen/xxxPPLP "Codepen Joris Raymaekers").
- The original snowfall animation was first created and published by [Andrey Yurkevich](https://github.com/Andrey-1988-dev "Andrey Yurkevich").
