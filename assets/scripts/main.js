(function(window) {
  function stroll(callback, origin, destination, next, timestamp, now) {
    var duration = Math.abs(destination - origin) / 4;
    var time = Math.min(1, (now - timestamp) / duration);
    var easing = time < 0.5 ? 2 * time * time : -1 + (4 - 2 * time) * time;

    window.scroll(0, Math.ceil(easing * (destination - origin) + origin));

    if (
      window.pageYOffset >= destination - 2 &&
      window.pageYOffset <= destination + 2
    ) {
      callback();
    } else {
      next(
        stroll.bind(undefined, callback, origin, destination, next, timestamp)
      );
    }
  }

  function scrollToSection(offset, id, e) {
    e.preventDefault();

    var section = document.getElementById(id);

    var max =
      document.documentElement.offsetHeight -
      document.documentElement.clientHeight;

    var origin = window.pageYOffset;
    var destination =
      section.offsetHeight > window.innerHeight * 1.1
        ? section.offsetTop - Math.round(window.innerHeight / 10)
        : section.offsetTop -
          Math.round((window.innerHeight - section.offsetHeight) / 2);

    var next =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitAnimationFrame ||
      function(fn) {
        setTimeout(fn, 15, Date.now());
      };

    console.log(origin);
    console.log(Math.min(destination, max));

    next(
      stroll.bind(
        undefined,
        function() {
          window.history.pushState(undefined, "", "#" + id);
        },
        origin,
        Math.min(destination, max),
        next,
        window.performance ? window.performance.now() : Date.now()
      )
    );
  }

  var menu = document.getElementById("menu");

  if (menu && menu.children && menu.children.length) {
    window.addEventListener(
      "load",
      function() {
        var offset = window.innerWidth < 480 ? menu.offsetHeight : 0;

        for (var i = 0; i < menu.children.length; i++) {
          var item = menu.children[i];

          item.addEventListener(
            "click",
            scrollToSection.bind(
              undefined,
              offset,
              item.href.slice(item.href.lastIndexOf("#") + 1)
            )
          );
        }
      },
      { once: true }
    );
  }
})(window);
