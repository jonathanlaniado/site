//target the entire page, and listen for touch events
$('html, body').on('touchstart touchmove', function(e) {
  //prevent native touch activity like scrolling
  e.preventDefault();
});

// animates the hamburger menu popup
$(document).ready(function() {
  $('.hamburger').click(function() {
    $('.hamburger').toggleClass('is-active');
    $('.hamburger-inner').toggleClass('white');
    $('body').toggleClass('no-scroll');
    if ($('.hb-menu').hasClass('menu-selected')) {
      $('.hb-menu').toggleClass('slide-out-top');
    } else {
      $('.hb-menu').toggleClass('menu-selected');
      $('.hb-menu').toggleClass('slide-in-top');
    }
  });
});

// closes the hamburger menu if the window is resized
$(window).resize(function() {
  if (($(window).width() > 813) && ($('.hb-menu').hasClass('menu-selected'))) {
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