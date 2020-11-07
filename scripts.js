$(document).scroll(function () {
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
      }
    
      function checkScrolling() {
        if (isScrolledIntoView($('#footer')) == true) {
          if ($('#footer').hasClass('slowReveal')) { /**/ } else {
            $('#footer').addClass('slowReveal');
          }
        } else {
          if ($('#footer').hasClass('slowReveal')) {
            $('#footer').removeClass('slowReveal');
          }
        }
      }
    
      window.onscroll = function() {
        checkScrolling();
      }
      window.onresize = function() {
        checkScrolling();
      }

});