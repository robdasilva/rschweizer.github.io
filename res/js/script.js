(function() {
  "use strict";

  var section,
      img,
      imgWidth,
      imgHeight,
      imgRatio;

  function init() {
    section = document.querySelector('main section');
    img = document.querySelector('header img.portrait');
    imgWidth = img.offsetWidth;
    imgHeight = img.offsetHeight;
    imgRatio = imgWidth / imgHeight;

    decipher();

    resize();
    window.addEventListener('resize', resize);
  }

  function decipher() {
    var aside = document.querySelector('main aside');
    aside.querySelector('a#mail').href = window.atob('bWFpbHRvOlJvYmVydCBTY2h3ZWl6ZXIgPG1haWxAcm9iZXJ0c2Nod2VpemVyLm1lPg==');
    aside.querySelector('a#github').href = window.atob('aHR0cHM6Ly9naXRodWIuY29tL3JzY2h3ZWl6ZXI=');
    aside.querySelector('a#linkedin').href = window.atob('aHR0cHM6Ly9saW5rZWRpbi5jb20vaW4vcnNjaHdlaXplcg==');
    aside.querySelector('a#xing').href = window.atob('aHR0cHM6Ly93d3cueGluZy5jb20vcHJvZmlsZS9Sb2JlcnRfU2Nod2VpemVyMTI=');
  }

  function resize() {
    if(window.innerWidth < 768) {
      section.removeAttribute('style');
      img.removeAttribute('style');
    } else {
      var windowWidth = window.innerWidth,
          windowHeight = window.innerHeight,
          windowRatio = windowWidth / windowHeight,
          top,
          left,
          width,
          height;

      if(windowRatio > imgRatio) {
        width = (windowWidth * 1.33333333333);
        height = (width / imgRatio);
      } else {
        height = (windowHeight * 1.33333333333);
        width = (height * imgRatio);
      }

      top = ((height - windowHeight) * -0.6);
      left = ((width - windowWidth) * -0.3);

      section.style.width = ((width * 0.36) + left) + 'px';

      img.style.position = 'fixed';
      img.style.top = top + 'px';
      img.style.left = left + 'px';
      img.style.width = width + 'px';
      img.style.height = height + 'px';
    }
  }

  window.addEventListener('load', init);
})();
