var hbMenuActive = false;
// animates the hamburger menu popup
$(document).ready(function() {
  $('.hamburger').click(function() {
    hbMenuActive = !hbMenuActive;
    $('.hamburger').toggleClass('is-active');
    $('.hamburger-inner').toggleClass('white');
    $('body').toggleClass('no-scroll');
    if ($('.hb-menu').hasClass('menu-revealed')) {
      $('.hb-menu').addClass('slide-out-top');
      $('html, body').off('touchmove', function(e) {
        e.preventDefault();
      });
      console.log("No!")
    } else {
      $('.hb-menu').toggleClass('menu-revealed');
      $('.hb-menu').addClass('slide-in-top');
      $('.hb-menu').removeClass('slide-out-top');
      $('html, body').on('touchmove', function(e) {
        e.preventDefault();
      });
      console.log("Yes!")
    }
  });
});

// closes the hamburger menu if the window is resized
$(window).resize(function() {
  if (($(window).width() > 813) && ($('.hb-menu').hasClass('menu-revealed'))) {
    $('.hb-menu').addClass('slide-out-top');
    $('.hamburger').removeClass('is-active');
    $('.hamburger-inner').removeClass('white');
  }
});

// animates the logo on the homepage
$(document).ready(function() {
  $('.logo').click(function() {
    $('.logo').addClass('rotate-center');
    setTimeout(function() {
      $('.logo').removeClass('rotate-center');
    }, 400);
  });
});