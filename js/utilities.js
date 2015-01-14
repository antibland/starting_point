var utilities = (function() {
  "use strict";

  var ret = {
    whichAnimationEvent: function() {
      var a,
          el = document.createElement('fakeelement'),
          animations = {
            'animation':'animationend',
            'OAnimation':'oAnimationEnd',
            'MozTransition':'animationend',
            'WebkitTransition':'webkitAnimationEnd'
          };

      for (a in animations){
        if(el.style[a] !== undefined){
          return animations[a];
        }
      }
    },

    whichTransitionEvent: function() {
      var t,
          el = document.createElement('fakeelement'),
          transitions = {
            'transition':'transitionend',
            'OTransition':'oTransitionEnd',
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
          };

      for (t in transitions){
        if (el.style[t] !== undefined){
          return transitions[t];
        }
      }
    },

    isTouchDevice: function() {
      return document.querySelector("html").classList.contains('touch');
    },

    chain: function(obj) {
      var waiting_for = document.querySelector(obj.waiting_for),
          next_up     = document.querySelector(obj.next_up),
          apply       = obj.apply;

      function applyClass() {
        next_up.classList.add(apply);
      }

      if (transitionend) {
        waiting_for.addEventListener(transitionend, applyClass, false);
      }
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
