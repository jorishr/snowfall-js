/*!
 * Snowfall.js - A JavaScript library for creating and animating snowflakes on a web page
 * https://github.com/Andrey-1988-dev/snowfall.js
 *
 * Author: Andrey Yurkevich (https://github.com/Andrey-1988-dev)
 * Contact: yurkevich.a.n.1988@gmail.com
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Version: 1.1.0
 * Date: 2021-11-27T00:00Z
 *
 * Date Modified: 2024-01-31
 * The current code below is a fork of the original with minor additions,
 * optimization and extensions. The same license applies.
 *
 * Contributor: Joris Raymaekers (https://liondigits.com/)
 * Contact: joris@liondigits.com
 * Github: https://github.com/snowfall-js-plugin
 */
import { params } from "./index.js";

/**
 * Class representing a snowflake on the canvas.
 */
export class Snowflake {
  /**
   * Creates a snowflake instance with random coordinates, font size, speed, color, and text.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {number} h - The font size / height of snowflake.
   * @param {number} s - The speed.
   * @param {string} c - The color.
   * @param {string} t - The text.
   */
  constructor(canvas, h, s, c, t) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.h = h;
    this.s = s;
    this.c = c;
    this.t = t;
  }

  /**
   * Calculates and returns the new position of the snowflake relative to the edge of the canvas.
   *
   * @param {number} oldPosition - The old position of the snowflake.
   * @param {number} oldCanvasSize - The old size of the canvas.
   * @param {number} newCanvasSize - The new size of the canvas.
   * @returns {number} - The new position of the snowflake.
   */
  calculateNewPosition = (oldPosition, oldCanvasSize, newCanvasSize) => {
    let percentage = oldPosition / (oldCanvasSize / 100);
    return (newCanvasSize / 100) * percentage;
  };

  /**
   * Updates the position of the snowflake after canvas resize.
   *
   * @param {number} oldCanvasWidth - The old canvas width.
   * @param {number} oldCanvasHeight - The old canvas height.
   * @param {number} newCanvasWidth - The new canvas width.
   * @param {number} newCanvasHeight - The new canvas height.
   */
  updateAfterCanvasResize = (
    oldCanvasWidth,
    oldCanvasHeight,
    newCanvasWidth,
    newCanvasHeight
  ) => {
    if (oldCanvasWidth !== newCanvasWidth) {
      this.x = this.calculateNewPosition(
        this.x,
        oldCanvasWidth,
        newCanvasWidth
      );
    }
    if (oldCanvasHeight !== newCanvasHeight) {
      this.y = this.calculateNewPosition(
        this.y,
        oldCanvasHeight,
        newCanvasHeight
      );
    }
  };

  /**
   * Draws the snowflake on the canvas if it is within the visible area.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw = (ctx) => {
    // Check if the snowflake is within the visible area
    if (
      this.x + this.h >= window.scrollX &&
      this.x - this.h <= window.scrollX + window.innerWidth &&
      this.y + this.h >= window.scrollY &&
      this.y - this.h <= window.scrollY + window.innerHeight
    ) {
      ctx.fillStyle = this.c; // set the color
      ctx.font = this.h + "px Arial, sans-serif"; // set the font and text size
      ctx.fillText(this.t, this.x, this.y); // draw the text with the snowflake symbol
    }
  };

  /**
   * Batch draws snowflakes for better performance.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   * @param {Snowflake[]} snowflakes - Array of snowflake instances.
   * @param {number} scrollX - The horizontal scroll position.
   * @param {number} scrollY - The vertical scroll position.
   * @param {number} windowWidth - The window width.
   * @param {number} windowHeight - The window height.
   */
  static batchDraw(
    ctx,
    snowflakes,
    scrollX,
    scrollY,
    windowWidth,
    windowHeight
  ) {
    // FillStyle is the same for all snowflakes
    ctx.fillStyle = snowflakes[0].c;

    ctx.beginPath();

    for (let snowflake of snowflakes) {
      if (snowflake.isVisible(scrollX, scrollY, windowWidth, windowHeight)) {
        ctx.font = snowflake.h + "px Arial, sans-serif";
        ctx.fillText(snowflake.t, snowflake.x, snowflake.y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }

  /**
   * Checks if the snowflake is inside the visible window.
   *
   * @param {number} scrollX - The horizontal scroll position.
   * @param {number} scrollY - The vertical scroll position.
   * @param {number} windowWidth - The window width.
   * @param {number} windowHeight - The window height.
   * @returns {boolean} - True if visible, false otherwise.
   */
  isVisible = (scrollX, scrollY, windowWidth, windowHeight) => {
    return (
      this.x + this.h >= scrollX &&
      this.x - this.h <= scrollX + windowWidth &&
      this.y + this.h >= scrollY &&
      this.y - this.h <= scrollY + windowHeight
    );
  };

  /**
   * Updates the position of the snowflake.
   *
   * @param {HTMLCanvasElement} canvas - The canvas element.
   */
  update = (canvas) => {
    // increase the y coordinate by the speed
    this.y += this.s;

    if (this.s > 0) {
      // if the snowflake goes beyond the bottom edge of the canvas, move it to the top
      if (this.y > canvas.height) {
        this.y = -this.h;
        this.x = Math.random() * canvas.width;
      }
    } else {
      if (this.y < 0) {
        this.y = canvas.height + this.h;
        this.x = Math.random() * canvas.width;
      }
    }
  };
}

/**
 * Class representing the snowfall animation.
 */
export class Snowfall {
  requestAnimationFrame;
  /**
   * Create a Snowfall instance with customizable options.
   *
   * @param {Object} options - Configuration options for the snowfall animation.
   * @param {number} options.count - Number of snowflakes.
   * @param {number} options.minRadius - Minimum radius of snowflakes.
   * @param {number} options.maxRadius - Maximum radius of snowflakes.
   * @param {number} options.minSpeed - Minimum falling speed of snowflakes.
   * @param {number} options.maxSpeed - Maximum falling speed of snowflakes.
   * @param {string} options.text - Text or symbol representing the snowflake.
   * @param {string} options.color - Color of the snowflakes.
   * @param {string} options.zIndex - Z-index of the snowfall canvas.
   */
  constructor(options = {}) {
    let {
      count = 100,
      minRadius = 10,
      maxRadius = 30,
      minSpeed = 3,
      maxSpeed = 10,
      text = "❄",
      color = "#99ccff",
      zIndex = "1000",
    } = options;

    count = Number(count);
    minRadius = Number(minRadius);
    if (minRadius <= 0) {
      minRadius = 10;
    }
    maxRadius = Number(maxRadius);
    if (maxRadius <= 0) {
      maxRadius = 30;
    }
    minSpeed = Number(minSpeed);
    maxSpeed = Number(maxSpeed);

    const snowfieldCanvas = document.createElement("canvas");
    snowfieldCanvas.id = "snowfall";
    snowfieldCanvas.style.zIndex = zIndex;
    snowfieldCanvas.style.position = "absolute";
    snowfieldCanvas.style.top = "0";
    snowfieldCanvas.style.left = "0";
    snowfieldCanvas.style.pointerEvents = "none";

    document.body.append(snowfieldCanvas);

    this.canvas = snowfieldCanvas;
    this.ctx = this.canvas.getContext("2d");

    this.resizeCanvas();
    window.addEventListener("resize", this.resizeHandler);
    this.resizeHandler = () => {
      requestAnimationFrame(this.resizeCanvas.bind(this));
    };

    this.snowflakes = [];
    this.count = count;
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.minSpeed = minSpeed;
    this.maxSpeed = maxSpeed;
    this.color = color;
    this.text = text;

    this.createSnowflakes();
    this.animateSnowflakes();
  }

  /**
   * Resize the canvas and update snowflake positions after a window resize.
   */
  resizeCanvas = () => {
    let oldCanvasWidth, oldCanvasHeight;
    if (this.snowflakes) {
      oldCanvasWidth = this.canvas.width;
      oldCanvasHeight = this.canvas.height;
    }
    this.canvas.style.display = "none";

    // Set the width and height of the canvas equal to the width and height of the browser window
    if (window.devicePixelRatio > 1) {
      let scrollWidth = document.documentElement.scrollWidth;
      let scrollHeight;
      if (params.snowfall.canvasHeightLimit !== 0) {
        scrollHeight = Math.min(
          document.documentElement.scrollHeight,
          window.innerHeight * params.snowfall.canvasHeightLimit
        );
      } else scrollHeight = document.documentElement.scrollHeight;
      this.canvas.width = scrollWidth * window.devicePixelRatio;
      this.canvas.height = scrollHeight * window.devicePixelRatio;
      this.canvas.style.width = scrollWidth + "px";
      this.canvas.style.height = scrollHeight + "px";
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    } else {
      this.canvas.width = document.documentElement.scrollWidth;
      this.canvas.height = document.documentElement.scrollHeight;
    }

    this.canvas.style.display = "";

    if (this.snowflakes) {
      let newCanvasWidth = this.canvas.width;
      let newCanvasHeight = this.canvas.height;

      for (let snowflake of this.snowflakes) {
        snowflake.updateAfterCanvasResize(
          oldCanvasWidth,
          oldCanvasHeight,
          newCanvasWidth,
          newCanvasHeight
        );
      }
    }
  };

  /**
   * Create snowflakes based on the specified count and parameters.
   * Generates a random radius (r) within the minimum and maximum radius.
   * Generates a relative value (rp) which is the position inside the specified
   * radius range: 0-100. This is is used to adjust the speed of the snowflake * according to its size.
   * Generates the speed (s) based on the size of the snowflake.
   */
  createSnowflakes = () => {
    for (let i = 0; i < this.count; i++) {
      let r =
        this.minRadius + Math.random() * (this.maxRadius - this.minRadius);
      let rp;
      if (this.minRadius !== this.maxRadius) {
        rp = (r - this.minRadius) / ((this.maxRadius - this.minRadius) / 100);
      } else {
        rp = 100;
      }
      let s = this.minSpeed + ((this.maxSpeed - this.minSpeed) / 100) * rp;

      let snowflake = new Snowflake(this.canvas, r, s, this.color, this.text);
      this.snowflakes.push(snowflake);
    }
  };

  /**
   * Animate the snowflakes by clearing the canvas and updating their positions.
   */
  animateSnowflakes = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    Snowflake.batchDraw(
      this.ctx,
      this.snowflakes,
      window.scrollX,
      window.scrollY,
      window.innerWidth,
      window.innerHeight
    );

    // Update the positions of the snowflakes
    for (let snowflake of this.snowflakes) {
      snowflake.update(this.canvas);
    }

    // Request a new animation frame
    this.requestAnimationFrame = requestAnimationFrame(this.animateSnowflakes);
  };

  /**
   * Destroy the snowfall animation and remove the canvas element.
   */
  destroy = () => {
    window.removeEventListener("resize", this.resizeHandler);
    cancelAnimationFrame(this.requestAnimationFrame);
    document.getElementById("snowfall").remove();

    for (let name in this) {
      delete this[name];
    }
    // Empty the array of snowflakes
    this.snowflakes = [];
  };
}
