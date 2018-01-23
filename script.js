// animates several elements on the page
$(document).ready(function() {
  $('.hamburger').click(function() {
    $('.hamburger').toggleClass('is-active');
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

$(window).resize(function() {
  if (($(window).width() > 813) && ($('.hb-menu').hasClass('menu-selected'))) {
    $('.hb-menu').addClass('slide-out-top');
    $('.hamburger').removeClass('is-active');
  }
});