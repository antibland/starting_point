jasmine.getFixtures().fixturesPath = "spec/javascripts/fixtures";

describe("index", function() {
  var ESC = 27,
      $toggle_nav,
      $toggle_menu;

  function triggerKeydown(key) {
     var e = jQuery.Event("keydown");
    e.keyCode = key;
    $(document).trigger(e);
  }

  function callFunction(func, num_times) {
    for (var i = 0; i < num_times; i++) {
      func.call();
    }
  }

  beforeEach(function(){
    loadFixtures("index.html");
    demo.init();
    $toggle_menu = $("#toggle-menu");
    $toggle_nav = $("#toggle-nav");
  });

  describe("main navigation", function() {
    it("is initially hidden", function() {
      expect($toggle_nav).toHaveAttr("aria-hidden", "true");
    });

    it("is shown on toggle", function() {
      demo.toggleMenu();
      expect($toggle_nav).toHaveAttr("aria-hidden", "false");
    });

    it("is hidden on toggle", function() {
      callFunction(demo.toggleMenu, 2);
      expect($toggle_nav).toHaveAttr("aria-hidden", "true");
    });

    it("is hidden when escape key is pressed", function() {
      demo.toggleMenu();
      triggerKeydown(ESC);
      expect($toggle_nav).toHaveAttr("aria-hidden", "true");
    });
  });

});
