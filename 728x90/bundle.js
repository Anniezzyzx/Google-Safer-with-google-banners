(function () {
  'use strict';

  // BannerUtils version 3.2.0
  function getBrowser() {
    // desktop browsers as of 2019-10-04
    var browserslist = ['other', 'blink', 'chrome', 'safari', 'opera', 'ie', 'edge', 'firefox'];
    var browser = 0;

    if ('WebkitAppearance' in document.documentElement.style) {
      browser = 1; // chrome/safari/opera/edge/firefox

      if (/google/i.test(window.navigator.vendor)) browser = 2;
      if (/apple/i.test(window.navigator.vendor)) browser = 3;
      if (!!window.opr && !!window.opr.addons || !!window.opera || / OPR\//.test(window.navigator.userAgent)) browser = 4;
    }

    if (
    /*@cc_on!@*/
    !!document.documentMode) browser = 5; // ie 6-11

    if (browser !== 5 && !!window.StyleMedia) browser = 6;
    if (typeof InstallTrigger !== 'undefined' || 'MozAppearance' in document.documentElement.style) browser = 7;
    return browserslist[browser];
  }
  getBrowser();
  ({
    // https://bit.ly/32ZIpgo
    traceOn: window.console.log.bind(window.console, '%s'),
    traceOff: function traceOff() {},
    trace: window.console.log.bind(window.console, '%s'),

    set debug(bool) {
      this._debug = bool;
      bool ? this.trace = this.traceOn : this.trace = this.traceOff;
    },

    get debug() {
      return this._debug;
    }

  });
  function domIds(scope) {
    if (scope === void 0) {
      scope = document;
    }

    var all = scope.getElementsByTagName('*');
    var haveIds = {};
    var i = all.length;

    while (i--) {
      if (all[i].id) {
        var safeId = all[i].id.replace(/-|:|\./g, '_');
        haveIds[safeId] = all[i];
      }
    }

    return haveIds;
  }

  var Banner = {
    init: function init() {
      display();

      function display() {
        // Setup -------------------------------------------------
        var dom = domIds();
        clickThrough();
        animation(); // Animations --------------------------------------------

        function animation() {
          gsap.registerPlugin(CustomEase);
          var tl = gsap.timeline({
            defaults: {
              ease: 'sine.inOut'
            },
            onComplete: rollover
          });
          tl.from('#txt-1,#txt-2,#txt-3,#txt-4,#txt-5,#txt-6,#txt-7,#txt-8,#txt-9,#txt-10,#txt-11,#txt-12', 0.4, {
            stagger: 0.2,
            autoAlpha: 0,
            y: 10
          }).add(animeLock('#txt-4'), 1).add(animeLogo(), 2);
          dom.ad_content.classList.remove('invisible');
        } // Spritesheets ------------------------------------------------


        function animeLogo() {
          var _spriteW = 120;
          var _spriteFrames = 63;

          var _totalPosition = "-" + _spriteW * _spriteFrames + "px 0";

          var tl = gsap.timeline();
          tl.to('.logo-animation', {
            duration: 2,
            backgroundPosition: _totalPosition,
            ease: "steps( " + _spriteFrames + ")"
          });
          return tl;
        }

        function animeLock(_pillDiv) {
          var _spriteW = 80;
          var _spriteFrames = 10;

          var _totalPosition = "-" + _spriteW * _spriteFrames + "px 0";

          var tl = gsap.timeline();
          tl.to('.lock-animation', {
            duration: 0.5,
            backgroundPosition: _totalPosition,
            ease: "steps( " + _spriteFrames + ")"
          }).fromTo(_pillDiv, {
            y: 5
          }, {
            y: 0,
            duration: 0.4
          }, 0.4);
          return tl;
        } // Events ------------------------------------------------


        function rollover() {
          dom.ad_content.addEventListener('mouseenter', function () {// Hover enter code goes here. Please remove this comment.
          });
          dom.ad_content.addEventListener('mouseleave', function () {// Hover out code goes here. Please remove this comment.
          });
        }

        function clickThrough() {
          dom.ad_content.addEventListener('click', function () {
            return window.open(window.clickTag || window.clickTAG);
          });
        }
      }
    }
  };

  window.onload = function () {
    return window.requestAnimationFrame(Banner.init);
  };

}());
