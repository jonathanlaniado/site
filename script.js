// animates several elements on the page
$(document).ready(function() {
  $('.hamburger').click(function() {
    $('.hamburger').toggleClass('is-active');
    $('.hamburger-inner').toggleClass('white');
    if ($('.hb-menu').hasClass('menu-selected')) {
      $('.hb-menu').toggleClass('slide-out-top');
    } else {
      $('.hb-menu').toggleClass('menu-selected');
      $('.hb-menu').toggleClass('slide-in-top');
    }
  });
  $('.logo').click(function() {
    $('.logo').addClass('rotate-center');
    setTimeout(function() {
      $('.logo').removeClass('rotate-center');
    }, 400);
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