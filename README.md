#Starting Point

We've all been there. You're coding something when an inner voice suddenly announces, "This should be its own thing. Don't forget to pull this code out and make it its own thing." But you're busy and you don't do it.

Six months later...

You're working on a new project and can't find that useful utility you once wrote. So you write it again. And again. Can we please stop recreating our greatest hits ad infinitum?

These are some things I value when beginning a web project:

1. A small, vanila `JavaScript` library using the [module pattern][8]
2. Auto minification/concatenation/`JavaScript` linting
3. Reusable sass mixins and placeholders
4. A no-bullshit `SVG` workflow
5. `JavaScript` unit testing with [Jasmine][9]
6. An easy way to catch accessibility issues before going live  

##Browser Support##
IE9+, Chrome, Firefox, Opera, Safari, iOS Safari, and Android 4+.

##What's In Here?

###Vertical Rhythm###

Establishing a vertical rhythm at the outset of a web project makes your content much easier to consume. `Compass` makes this pretty easy to set up and you can read more about vertical rhythm [here][3].

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
<p align="center">
  <img src="https://dl.dropboxusercontent.com/u/24799515/img_share/full_width_image.jpg" alt="">
</p>

###JavaScript Utilities###

Have you ever wanted something to happen after your `CSS` transition or animation ended? Yes, you can fire that second transition or animation with a delay containing the same value as the first even duration—but that's a risky venture. This is where you would use `animationend` and `transitionend`, both stored in `utilities.js`.
```javascript
whichCSSEvent /* returns correct vendor prefix for desired event */
```

You might use it like this:

```javascript
var transitionend = utilities.whichCSSEvent("transition");

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

toggle_menu.addEventListener(click_touch, handler, false);
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

This just means all the `CSS` is broken down into partials (footer, animations, common, forms, etc.). These partials tend to make your code much easier to manage as your project grows. Footer changes go in the footer partial; new animations go in the animations partial. `CSS` turns out okay if you are consistent and practical.

##Grunt Tasks##
Starting Point uses [Grunt][4] to handle some common, yet tedious, tasks.

###SVG Management###
[svgstore][5] is a lifesaver when it comes to managing `SVG` icons you wish to include in a sprite sheet. All you have to do is start **grunt watch** from the command line and drag an `SVG` icon into the **svg** directory. svgstore will build the `SVG` into a sprite sheet which you can reference in an external file. Say we add an icon to the `SVG` folder with the filename of `ribbon.svg`.

Immediately, Grunt builds the file into our `SVG` sprite sheet, making it available within our `HTML`.
```html
<a href="http://somelink.com">
  <span class="hide-text">Click the ribbon</span>
  <svg class="icon" aria-hidden="true">
    <use xlink:href="dist/dist.svg#shape-ribbon" />
  </svg>
</a>
```
Of course, you can tweak the `SVG` styles from your `CSS`. It's dead simple.

###Linting###
All `JavaScript` in Starting Point is strict and should stay that way. While Grunt is watching, it will yell at you if you break the linter rules in some way. Missing a semi-colon? Sorry—fix it. Declared a variable at the bottom of a function? Sorry—fix it. I like having the linter around to keep my code from getting ugly.

###Minification###
`Ruby` users are likely familiar with `config.rb`, a file which is created for us by `Compass`. There, we can set a value for the variable `output_style`, which determines what happens each time we save a watched `sass` file. I always set this variable to `:compressed` to make my `CSS` file size as light as possible.

But what of our `JavaScript`? That should certainly be minified, too. With a few Grunt tasks, `concat` and `uglify`, this is no longer a problem—well, almost. If we instruct `concat` to join all files with a .js extension before `uglify` does the actual minification, we could have an dependency ordering problem. We need the code in `utilities.js` to load first, so that the its functions are available to any other code loaded after. This is why we organize our `concat` task in the following way:

`Gruntfile.js`
```js
concat: {
  options: {
    separator: ';'
  },
  dist: {
    src: [['js/vendor/*.js'], 'js/utilities.js', 'js/main.js', 'js/demo.js'],
    dest: 'dist/<%= pkg.name %>.js'
  }
}
```

###Automatic Prefixing###
For a long time I have used `Compass` to handle all my prefixing needs. If you are a `Compass` user, you have probably written something like this before:

```scss
@include opacity(0.8);
@include transform(translateY(0.1em) scaleX(1.1) scaleY(.9));
```

And, of course, this is fine, and we can trust `Compass` to reliably deliver us `CSS`. Using `autoprefixer`, though, we can get right to the `CSS` and skip the middleman.

```css
opacity: 0.8;
transform: translateY(0.1em), scaleX(1.1), scaleY(.9);
```

The resulting `CSS` will be the same, with the necessary prefixes included for us.

##Installation##

```sh
$ git clone https://github.com/antibland/starting_point.git
```

```sh
$ npm install
```

This is an optional step. However, if you unit test your `JavaScript` (or want to start), definitely proceed with this step.
```sh
$ bower install jquery jasmine-jquery --save-dev
```

After these files are downloaded, you'll need to include them in your Gruntfile.js
```javascript
jasmine: {
  src: 'dist/starting-point.js',
  options: {
    vendor: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
    ],
    specs: 'spec/**/*.js'
  }
}
```

You'll then be able to run tests headlessly with the following command:
```sh
$ grunt jasmine
```
If you're running the tests in the demo, you should see something like this:
<p align="center">
  <img src="https://dl.dropboxusercontent.com/u/24799515/img_share/grunt_jasmine_tests.png">
</p>

```sh
$ grunt watch
```

```sh
$ compass watch
```

After you have the necessary modules, you'll need to run Starting Point on a server. It will work serving a local `HTML` index file, but accessing the SVGs in an external file cause Chrome to throw security permission errors and serve no icons. From a Mac, the easiest way to work around this is to start a simple web server:

```sh
$ python -m SimpleHTTPServer 8000
```

Then just go to `http://localhost:8000` and you should be in business.

##Contributing##

This is a barebones thing I've cobbled together in my spare time and is by no means complete. If you have any ideas to make Starting Point better, I'd love to work with you.

##Notes##

You're cloning the entire [demo][6], which is probably more than you need. If you look in the sass folder, you can remove the files beginning with _custom for a cleaner start and the call to `demo.init()` at the bottom of `index.html`.

##License##

[MIT][7]

[1]: http://compass-style.org/
[2]: http://sass-lang.com/
[3]: http://www.zell-weekeat.com/compass-vertical-rhythm/
[4]: http://gruntjs.com/
[5]: https://github.com/FWeinb/grunt-svgstore
[6]: http://antibland.github.io/starting_point/
[7]: https://github.com/antibland/starting_point/blob/gh-pages/LICENSE
[8]: http://goo.gl/f5LZm
[9]: http://jasmine.github.io/2.0/introduction.html
