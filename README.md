#Starting Point

I created Starting Point because I was tired of staring a new web project and hunting down my greatest hits from various other projects. For the near future, whatever I build will have a certain set of shared needs.

##Browser Support##
I realize that IE8 is not completely dead, but it's dead to me and the clients with whom I choose to do business. One of my favorite reasons to drop IE8 support is so I can avoid employing various polyfills just to make IE8 behave like a semi-decent browser.

So that leaves the following: IE9+, Chrome, Firefox, and Opera, Safari, iOS Safari, Android 4+.

##What You Get

###Vertical Rhythm###

Establishing a vertical rhythm at the outset of a web project immediately makes every bit of subsequent HTML more readable. Compass makes this pretty easy to set up and a good tutorial exists [here][3].

###Responsive Videos and Images###

I like having a padded main content area with 100% wide images that extend beyond the padding to the viewport edges.

    <main>
      <!-- A paragraph within the padded walls -->
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

      <!-- This image will hug the viewport walls -->
      <div class="img-container">
        <img src="assets/sample.jpg" alt="">
      </div>

      <!-- Other stuff -->
    </main>

###JavaScript Utilities###

Have you ever wanted something to happen after your CSS transition or animation ended? Yes, you can fire that second transition or animation with a delay containing the same value as the first even duration—but that's a risky venture. This is where you would use **animationend** and **transitionend**.

    whichTransitionEvent /* returns correct vendor prefix */
You might use it like this:

    var transitionend = utilities.whichTransitionEvent();

    if (transitionend) { // browser supports transitionend
      container.addEventListener(transitionend, handler, false);
    }


Sometimes you want to know when a user is on a touch-supported device.

    isTouchDevice
A useful place for this would be to determine the type of event listener to attach to an element.

    var click_touch = utilities.isTouchDevice() ? "touchstart" : "click",
        toggle_menu = document.querySelector("#toggle-menu");

    toggle_menu.addEventListener(click_touch, handler);

###Useful Mixins###

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

There are more in there, but many of these I tend to use over and over across projects.

###Modular CSS Approach###

This just means all the CSS is broken down in partials (footer, animations, common, forms, etc.). These partials tend to make your code much easier to manage as your project grows.

###Useful Grunt Tasks###
Starting Point uses [Grunt][4] to handle some useful tasks.

####SVG Management####
[svgstore][5] is a lifesaver when it comes to managing SVG icons you wish to include in a sprite sheet. All you have to do is start **grunt watch** from the command line and drag an svg icon into the svg folder. svgstore will bring the svg into a sprite sheet which you can reference in an external file. Say I added an icon to the svg folder with the filename of ribbon.svg.

Immediately, I can reference that sprite in my HTML.


    <a href="http://somelink.com">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="dist/dist.svg#shape-ribbon" />
      </svg>Click the ribbon
    </a>

You can of course tweak the SVG styles from your CSS. Yeah, it's pretty easy.

####JavaScript Linting####
All JavaScript in Starting Point is strict and should stay that way. While grunt is watching, it will yell at you if you break the linter rules in some way. Missing a semi-colon? Sorry—fix it. Declared a variable at the bottom of a function? Sorry—fix it. I like having the linter around to keep me my code from getting ugly.

####Minification####
The default setting in config.rb tells compass to compress all CSS every time you trigger a save. JavaScript, however, is not included in this process. However, we're covered during a grunt watch. All JavaScript is concatenated and minified each save point.

##Installation##

```sh
$ https://github.com/naayt/starting_point.git
```

```sh
$ npm install
```

After you have the necessary modules, you'll need to run Starting Point on a server. It will work as simply a local file, but accessing the SVGs in an external file have Chrome up in arms. The easiest way to start a server on a Mac is this:

```sh
$ python -m SimpleHTTPServer 8000
```

Then just go to localhost:8000 and you should be in business.

##Contributing##

This is a barebones thing I've cobbled together in my free time. It's by no means complete in my mind. If you have any ideas to make Starting Point better, I'd love to work with you.

##Notes##

You're cloning the entire [demo][6], which is probably more than you need. If you look in the sass folder, you can remove the files beginning with _custom for a cleaner start. When I get around to it, I'll separate things further.

##License##

[MIT][7]

[1]: http://compass-style.org/
[2]: http://sass-lang.com/
[3]: http://www.zell-weekeat.com/compass-vertical-rhythm/
[4]: http://gruntjs.com/
[5]: https://github.com/FWeinb/grunt-svgstore
[6]: http://naayt.github.io/starting_point/
[7]: https://github.com/naayt/starting_point/blob/gh-pages/LICENSE
