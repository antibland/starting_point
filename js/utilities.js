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
    }
  };

  return ret;
})();
