function stopScrolling(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

// animates the hamburger menu popup
$(document).ready(function() {
  $('.hamburger').click(function() {
    $('.hamburger').toggleClass('is-active');
    $('.hamburger-inner').toggleClass('white');
    if ($('.hb-menu').hasClass('menu-selected')) {
      $('.hb-menu').toggleClass('slide-out-top');
      $('body').css('overflow', initial);
    } else {
      $('.hb-menu').toggleClass('menu-selected');
      $('.hb-menu').toggleClass('slide-in-top');
      $('body').css('overflow', 'hidden');
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