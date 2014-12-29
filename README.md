#Starting Point

We've all been there at some point. You're coding something and an inner voice tell us, "This should be its own thing. Don't forget to pull this code out and make it its own thing." But you're busy and you don't do it. Six months later, while working on a new project, you can't find that useful utility you once wrote. So you write it again. And again. Let's stop recreating our greatest hits over and over. 

To me, greatest hits means:

1. Clean, readable HTML
2. Reusable sass mixins and placeholders
3. A small, maintainable, vanila JavaScript library using the [module pattern][8]
4. Auto minification/concatenation/linting
5. An easy SVG workflow

##Browser Support##
I realize that IE8 is not completely dead, but it's dead to me and the clients with whom I choose to do business. One of my favorite reasons to drop IE8 support is so I can avoid employing various polyfills simply to make IE8 behave like a semi-decent browser.

So that leaves the following: IE9+, Chrome, Firefox, Opera, Safari, iOS Safari, and Android 4+.

##What's In Here?

###Vertical Rhythm###

Establishing a vertical rhythm at the outset of a web project makes your content much easier to consume. Compass makes this pretty easy to set up and you can read more about vertical rhythm [here][3].

###Responsive Videos and Images###

I like having a padded main content area with 100% wide images that extend beyond the padding to the viewport edges.
```html
<main>
  <!-- A paragraph within the padded walls -->
  <p>Some text here. Some text here. Some text here. Some text here. Some text here. Some text here. Some text here. Some text here. Some text here. </p>

  <!-- This image will hug the viewport walls -->
  <div class="img-container">
    <img src="assets/sample.jpg" alt="">
  </div>

  <!-- Other stuff -->
</main>
```

![full width image](https://dl.dropboxusercontent.com/u/24799515/img_share/full_width_image.jpg)

###JavaScript Utilities###

Have you ever wanted something to happen after your CSS transition or animation ended? Yes, you can fire that second transition or animation with a delay containing the same value as the first even duration—but that's a risky venture. This is where you would use **animationend** and **transitionend**.
```javascript
whichTransitionEvent /* returns correct vendor prefix */
```

You might use it like this:

```javascript
var transitionend = utilities.whichTransitionEvent();

if (transitionend) { // browser supports transitionend
  container.addEventListener(transitionend, handler, false);
}
```

Sometimes you want to know when a user is on a touch-supported device.

    isTouchDevice
A useful place for this would be to determine the type of event listener to attach to an element.
```javascript
var click_touch = utilities.isTouchDevice() ? "touchstart" : "click",
    toggle_menu = document.querySelector("#toggle-menu");

toggle_menu.addEventListener(click_touch, handler);
```

###Useful Mixins###
```scss
@mixin animation($animate...)
@mixin keyframes($animationName)
@mixin remove-tap-highlight
@mixin input-placeholder
@mixin box-size-all
@mixin mobile-smooth-scroll
@mixin respond-to($breakpoint)
@mixin form($custom_args: "")
@mixin form-label($font-size: 0.75rem)
@mixin transitions-off
```

###Modular CSS Approach###

This just means all the CSS is broken down in partials (footer, animations, common, forms, etc.). These partials tend to make your code much easier to manage as your project grows.

##Useful Grunt Tasks##
Starting Point uses [Grunt][4] to handle some useful tasks.

###SVG Management###
[svgstore][5] is a lifesaver when it comes to managing SVG icons you wish to include in a sprite sheet. All you have to do is start **grunt watch** from the command line and drag an svg icon into the svg folder. svgstore will bring the svg into a sprite sheet which you can reference in an external file. Say I added an icon to the svg folder with the filename of ribbon.svg.

Immediately, I can reference that sprite in my HTML.
```html
<a href="http://somelink.com">
  <svg class="icon" aria-hidden="true">
    <use xlink:href="dist/dist.svg#shape-ribbon" />
  </svg>Click the ribbon
</a>
```
You can of course tweak the SVG styles from your CSS. Yeah, it's pretty easy.

###JavaScript Linting###
All JavaScript in Starting Point is strict and should stay that way. While grunt is watching, it will yell at you if you break the linter rules in some way. Missing a semi-colon? Sorry—fix it. Declared a variable at the bottom of a function? Sorry—fix it. I like having the linter around to keep my code from getting ugly.

###Minification###
The default setting in config.rb tells compass to compress all CSS every time you trigger a save. JavaScript, however, is not included in this process. However, we're covered during a grunt watch. All JavaScript is concatenated and minified each save point.

##Installation##

```sh
$ git clone https://github.com/naayt/starting_point.git
```

```sh
$ npm install
```

```sh
$ grunt watch
```

After you have the necessary modules, you'll need to run Starting Point on a server. It will work serving a local HTML index file, but accessing the SVGs in an external file cause Chrome to throw security permission errors and serve no icons. From a Mac, the easiest way to work around this is to start a simple web server:

```sh
$ python -m SimpleHTTPServer 8000
```

Then just go to localhost:8000 and you should be in business.

##Contributing##

This is a barebones thing I've cobbled together in my free time. It's by no means complete in my mind. If you have any ideas to make Starting Point better, I'd love to work with you.

##Notes##

You're cloning the entire [demo][6], which is probably more than you need. If you look in the sass folder, you can remove the files beginning with _custom for a cleaner start and the call to demo.init() at the bottom of index.html.

##License##

[MIT][7]

[1]: http://compass-style.org/
[2]: http://sass-lang.com/
[3]: http://www.zell-weekeat.com/compass-vertical-rhythm/
[4]: http://gruntjs.com/
[5]: https://github.com/FWeinb/grunt-svgstore
[6]: http://naayt.github.io/starting_point/
[7]: https://github.com/naayt/starting_point/blob/gh-pages/LICENSE
[8]: http://goo.gl/f5LZm
