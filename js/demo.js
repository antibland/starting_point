var demo = (function() {
  "use strict";

  var click_touch, body, container, nav, content_pusher, ret;

  ret = {
    init: function() {
      click_touch    = utilities.isTouchDevice() ? "touchstart" : "click";
      body           = document.querySelector("body");
      container      = document.querySelector(".container");
      nav            = document.querySelector("[role=navigation]");
      content_pusher = document.querySelector(".content-pusher");
      bindings();
    },

    toggleMenu: function() {
      var state = nav.getAttribute("aria-hidden");
      body.classList.toggle("menu-open");

      if (state === "true") {
        nav.setAttribute("aria-hidden", "false");
        disableMobileScrolling();

        setTimeout(function() {
          nav.focus();
        }, 300);
      } else {
        nav.setAttribute("aria-hidden", "true");
        enableMobileScrolling();
      }
    }
  };

  function scrollToTop() {
    if (!window.requestAnimationFrame) {
      window.location.href = "#top";
      return false;
    }

    var scrollDuration = 300,
        scrollHeight   = utilities.getScrollHeight(),
        scrollStep     = Math.PI / ( scrollDuration / 15 ),
        cosParameter   = scrollHeight / 2,
        scrollCount    = 0,
        scrollMargin;

    requestAnimationFrame(step);

    function step () {
      setTimeout(function() {

        if (utilities.getScrollHeight() !== 0) {
          requestAnimationFrame(step);
          scrollCount = scrollCount + 1;
          scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
          window.scrollTo(0, (scrollHeight - scrollMargin));
        }
      }, 15);
    }
  }

  function loaded() {
    setTimeout(function() {
      body.setAttribute("aria-busy", "false");
    }, 100);
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
    content_pusher.addEventListener("touchstart", utilities.preventDefault, false);
    content_pusher.addEventListener("touchmove", utilities.preventDefault, false);
  }

  function enableMobileScrolling() {
    content_pusher.removeEventListener("touchstart", utilities.preventDefault);
    content_pusher.removeEventListener("touchmove", utilities.preventDefault);
  }

  function bindings() {
    var toggle_menu = document.querySelector("#toggle-menu"),
        nav_links   = document.querySelectorAll(".nav-link"),
        back_to_top = document.querySelector("#back-to-top"),
        ESC         = 27;

    [].forEach.call(nav_links, function(el) {
      el.addEventListener("click", function(e) {
        closeMenu(true);
      }, false);
    });

    window.addEventListener("load", loaded, false);

    document.addEventListener("DOMContentLoaded", function() {
      toggle_menu.addEventListener(click_touch, demo.toggleMenu, false);
    }, false);

    back_to_top.addEventListener(click_touch, function(e) {
      utilities.preventDefault(e);
      scrollToTop();
    }, false);

    document.onkeydown = function(e) {
      if (e.keyCode === ESC) {
        closeMenu();
      }
    };
  }

  return ret;

})();
