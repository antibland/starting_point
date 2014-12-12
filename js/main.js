"use strict";
var main = (function() {
  var transitionend = utilities.whichTransitionEvent(),
      animationend  = utilities.whichAnimationEvent(),
      main          = document.querySelector("main");

  function init() {
    bindings();
  }

  function loaded() {
    document.querySelector("body").setAttribute("aria-busy", "false");
  }

  function bindings() {
    window.addEventListener("load", loaded);
    document.addEventListener("touchstart", function(){}, true);
  }

  function chain(obj) {
    var waiting_for = document.querySelector(obj.waiting_for),
        next_up     = document.querySelector(obj.next_up),
        apply       = obj.apply;

    transitionend && waiting_for.addEventListener(transitionend, function() {
      next_up.classList.add(apply);
    });
  }

  function loadTemplate(template, destination) {
    var t           = document.querySelector(template),
        clone       = document.importNode(t.content, true),
        destination = document.querySelector(destination);

    destination.setAttribute("aria-busy", "true");
    destination.appendChild(clone);
    destination.setAttribute("aria-busy", "false");
  }

  return {
    init: init,
    chain: chain,
    loadTemplate: loadTemplate
  };

})();
