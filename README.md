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

**Note**: If you only want the snowfall.js file without the bells and whistles that this plugin package provides, download the file snowfall.js from the original [snowfall.js repo](https://github.com/Andrey-1988-dev/snowfall-js) and include it in your project manually.

### How to add the plugin to your website project

After you've installed the plugin package, import the plugin into your project's app.js or vendor.js file.

```js
import { snowAnimationStart } from "snowfall-animation-plugin";

document.addEventListener("DOMContentLoaded", function () {
  snowAnimationStart();
});
```

This will run the plugin with the default configuration. See [Configuration Options](#configuration-options) for more information.

## Demo

The package comes with a static demo page whereby you can experiment with the various configuration options for the snowfall animation and the custom on/off toggles. After you've installed the package run this command:

```bash
npx snowfall-js-plugin demo
```

This will spin up a http-server on localhost port 8080 and serve the demo page. _Note:_ you may be prompted to install http-server as a dev dependency. Once installed, click on the output link in the terminal to open the demo in your browser (localhost:8080/demo). If you see a directory list, click on the demo folder.

Once you've found your preferred configuration options, proceed to defining a custom configuration object.

## Configuration options

### Default configuration

Below you find the default configuration object. Most of the settings are self-explanatory but continue reading below for a more detailed information.

```js
const defaultParams = {
  logLevel: "default", // default or info
  checkHardware: true,
  checkDateRange: true,
  dateRange: {
    startMonth: 12, // 1-12
    endMonth: 2, // 1-12
    startDay: 15, // 1-31
    endDay: 15, // 1-31
  },
  autostartOnMobile: true,
  autostartOnDesktop: true,
  snowfall: {
    count: 100, // number of snowflakes
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
    txt: "Snow on/off",
    injectCSS: true,
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
};
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

By default, the animation will start automatically. That is, if it passes the hardware check and the current date falls within the specified date range.

You can also leave the decision to run the animation up to the user. If you choose to do so, make sure you have one or more switches available on your site (see [switches](#switches)). The user then needs to manually turn the animation on.

The configuration offers two settings: autoStartOnMobile and autoStartOnDesktop. Both are set to `true` by default. This setting is based on the `window.innerWidth >= 768px` condition. There should be no performance issues on mid-range to high-end mobile devices nor on desktop.

However, if your website already contains lots of scroll animations or other JavaScript code that requires lots of calculations, you may want to consider disabling autoStart for mobile devices. The hardware check mentioned above will already filter out low-end devices but hardware checks via the browser are not always reliable. This provides you with an extra option.

### Switches

By default the plugin will look for container elements with `class="snow-animation-switch"` and append the custom switch elements as children to the container. If no container elements are found, a warning will be shown in the console (only on `logLevel = "info"`).

If you want to use the switch functionality simply add one or more container `<div class="snow-animation-switch"></div` elements to your HTML page, for example, one in your header menu or navigation bar and one in your footer area. The behavior of these switches is synchronized, thus if you toggle the animation on/off on one switch, the state of the other switches will be updated automatically. You can add as many switches as you like.

The label text that accompanies the switch can be set in the configuration options object, as well as its position: left-side or right-side of the switch.

You can also configure the styles (colors) that will be applied to the different element components of each switch.

The switches are responsive to font-size so you can make then bigger or smaller by playing around with font-size on the parent element.

By default this plugin will append a minified CSS file to the DOM (`snowAnimationSwitchStyles.css`). If you don't want this behavior, you should add these styles (or your own) manually to your project's (S)CSS and set the option `injectCSS: false` in the custom configuration object.

```css
/* The switch has various components: 
   - The label text next to the switch can appear either left-side or right-side using flexbox order property. 
   - The checkbox element itself is made invisible and only used for its functionality.
   - The label element is the element that is actually visible to the user.
   - The switch is able to scale with the font-size.
   - You may have to adjust the line-height to get the desired vertical alignment
   - Based on https://codepen.io/jorishr/pen/xxxPPLP
*/

:root {
  --snow-animation-switch-bgClrOff: rgba(189, 195, 199, 1);
  --snow-animation-switch-bgClrOn: rgba(149, 165, 166, 1);
  --snow-animation-switch-toggleClr: #fff;
  --snow-animation-switch-txtClr: rgba(33, 37, 41, 1);
  --snow-animation-switch-txtPosition: 2;
  --snow-animation-switch-txtMargin: 0 0 0 0.75em;
}

.snow-animation-switch {
  display: none;
}

.snow-animation-switch--show {
  display: flex;
  justify-content: center;
}

.snow-animation-switch__input {
  height: 0;
  width: 0;
  visibility: hidden;
}

.snow-animation-switch__label {
  position: relative;
  display: block;
  text-indent: -9999px;
  cursor: pointer;
  width: 2.5em; /* 40px */
  height: 1.25em; /* 20px */
  background: var(--snow-animation-switch-bgClrOff);
  border-radius: 1.25em; /* 20px, equal to height */
  order: 2;
}

.snow-animation-switch__label::after {
  content: "";
  position: absolute;
  top: 0.125em; /* 2px */
  left: 0.125em; /* 2px */
  width: 1em; /* 16px */
  height: 1em; /* 16px */
  background: var(--snow-animation-switch-toggleClr);
  border-radius: 1em; /* 16px */
  transition: 0.3s;
}

/* extend the toggle when active */
.snow-animation-switch__label:active::after {
  width: 1.375em; /* 22px */
}

.snow-animation-switch__input:checked + label {
  background: var(--snow-animation-switch-bgClrOn);
}

.snow-animation-switch__input:checked + label::after {
  left: calc(100% - 0.125em); /* 100% - 2px */
  transform: translateX(-100%);
}

.snow-animation-switch__text {
  line-height: 1.25;
  order: var(--snow-animation-switch-txtPosition);
  color: var(--snow-animation-switch-txtClr);
  margin: var(--snow-animation-switch-txtMargin);
}
```

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

## Log level

The default log level will only log errors to the browser console. During development you can set `logLevel: "info"` to get more informative messages and warnings in the browser console.

### How to use a custom configuration object

You can pass a customized configuration object to the `snowfallAnimationStart()` function. For example:

```js
const customConfig = {
  logLevel: "info", // default or info
  checkHardware: false,
  snowfall: {
    count: 33,
    color: "#ffffff",
  },
  switches: {
    storeUserSettings: false,
    txt: "Snow",
  },
};

document.addEventListener("DOMContentLoaded", function () {
  snowfallAnimationStart(customConfig);
});
```

The parameters you pass via the object will be validated first and the values from the default configuration will be used as a fallback. Check for warnings or errors in your browser developer console. It is recommended to copy and paste the default configuration object and modify the settings according to your needs.

## License

This project is distributed under the GNU GPL v3.0 license. You can freely use, modify and distribute this code, but you must keep the authorship of the original code and indicate the license. You must also share your changes under the same license. You can read more about the license in the file LICENSE.

## Authors

- The NPM package was created by [Joris Raymaekers](https://liondigits.com "Lion Digits").
- The custom toggle switches are based on: [Codepen: animated toggle switch](https://codepen.io/jorishr/pen/xxxPPLP "Codepen Joris Raymaekers").
- The original snowfall animation code itself was first created and published by [Andrey Yurkevich](https://github.com/Andrey-1988-dev "Andrey Yurkevich").
