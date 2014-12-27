var main = (function() {
  "use strict";

  var ret = {
    init: function() {
      bindings();
    }
  };

  function bindings() {
    document.addEventListener("touchstart", function(){}, true);
  }

  return ret;

})();
