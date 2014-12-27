var demo = (function() {
  "use strict";

  var transitionend  = utilities.whichTransitionEvent(),
      animationend   = utilities.whichAnimationEvent(),
      click_touch    = utilities.isTouchDevice() ? "touchstart" : "click",
      body           = document.querySelector("body"),
      container      = document.querySelector(".container"),
      nav            = document.querySelector("[role=navigation]"),
      content_pusher = document.querySelector(".content-pusher"),
      back_to_top    = document.querySelector("#back-to-top"),
      ret;

  ret = {
    init: function() {
      bindings();
    }
  };

  function loaded() {
    body.setAttribute("aria-busy", "false");
  }

  function closeMenu(transitions_off) {
    if (typeof transitions_off !== "undefined") {
      body.classList.add("transitions-off");
    }

    enableMobileScrolling();
    body.classList.remove("menu-open");
    nav.setAttribute("aria-hidden", "true");

    setTimeout(function() {
      body.classList.remove("transitions-off");
    });
  }

  function disableMobileScrolling() {
    content_pusher.addEventListener("touchstart", utilities.preventDefault);
    content_pusher.addEventListener("touchmove", utilities.preventDefault);
  }

  function enableMobileScrolling() {
    content_pusher.removeEventListener("touchstart", utilities.preventDefault);
    content_pusher.removeEventListener("touchmove", utilities.preventDefault);
  }

  function toggleMenu() {
    if (body.classList.contains("menu-open")) {
      body.classList.remove("menu-open");
      nav.setAttribute("aria-hidden", "true");
      enableMobileScrolling();
    } else {
      body.classList.add("menu-open");
      nav.setAttribute("aria-hidden", "false");
      disableMobileScrolling();

      setTimeout(function() {
        nav.focus();
      }, 300);
    }
  }

  function backToTop() {
    var pos_from_top = window.pageYOffset,
        scrollEndHandler,
        removeListener;

    if (pos_from_top > 0) {

      if (document.querySelector("html").classList.contains("csstransforms3d")) {
        scrollEndHandler = function() {
          removeListener();
          container.removeAttribute("style");
          window.scrollTo(0, 0);
          body.classList.remove('body-scrolling');
        };

        removeListener = function() {
          container.removeEventListener(transitionend, scrollEndHandler);
        };

        body.classList.add('body-scrolling');

        container.style.overflowY = "scroll";
        window.scrollTop = 0;

        container.style.webkitTransition = 'all .5s ease-out';
        container.style.transition = 'all .5s ease-out';

        container.style.webkitTransform = "translateY(" + pos_from_top + "px)";
        container.style.transform = "translateY(" + pos_from_top + "px)";

        if (transitionend) {
          container.addEventListener(transitionend, scrollEndHandler, false);
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }

  function bindings() {
    var toggle_menu = document.querySelector("#toggle-menu"),
        nav_links   = document.querySelectorAll(".nav-link"),
        ESC         = 27;

    [].forEach.call(nav_links, function(el) {
      el.addEventListener("click", function(e) {
        closeMenu(true);
      });
    });

    window.addEventListener("load", loaded);
    toggle_menu.addEventListener(click_touch, toggleMenu);
    back_to_top.addEventListener(click_touch, backToTop);

    document.onkeydown = function(e) {
      if (e.keyCode === ESC) {
        closeMenu();
      }
    };
  }

  return ret;

})();
