var utilities = (function() {
  "use strict";

  var end_prefixes = {
    animation: {
      'animation'      : 'animationend',
      'OAnimation'     : 'oAnimationEnd',
      'MozAnimation'   : 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    },
    transition: {
      'transition'      :'transitionend',
      'OTransition'     :'oTransitionEnd',
      'MozTransition'   :'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }
  };


  var ret = {
    whichCSSEvent: function(event_type) {
      var el = document.createElement('fakeelement');

      if (event_type === "animation" || event_type === "transition") {

        for (var a in end_prefixes[event_type]) {

          if (el.style[a] !== "undefined") {
            return end_prefixes[event_type][a];
          }
        }
      }
    },

    getScrollHeight: function() {
      return ("scrollY" in window) ? window.scrollY : document.documentElement.scrollTop;
    },

    isTouchDevice: function() {
      return document.querySelector("html").classList.contains('touch');
    },

    loadTemplate: function(template, destination) {
      var t     = document.querySelector(template),
          clone = document.importNode(t.content, true);

      destination.setAttribute("aria-busy", "true");
      destination.appendChild(clone);
      destination.setAttribute("aria-busy", "false");
    },

    preventDefault: function(e) {
      if (e.preventDefault()) {
        e.preventDefault();
      } else {
        return false;
      }
    }
  };

  return ret;
})();
