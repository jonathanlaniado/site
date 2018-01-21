var bgImages = [];

// adds all image locations from the assets/backgrounds/ directory to an array
$.ajax({
  url: "/assets/backgrounds/",
  async: false,
  success: function(data) {
    $(data).find("a:contains(.jpg)").each(function() {
      bgImages.push($(this).attr("href"));
    });
  }
});

// calculates a random number between the specified values
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(document).ready(function() {
  var rand = getRand(0, bgImages.length);
  $('html').css('background-image', 'url(' + bgImages[rand] + ')');
  $('html').css('background-position', 'center');
  $('html').css('background-size', 'center');
  $('html').css('background-repeat', 'no-repeat');
  $('html').css('background-attachment', 'fixed');
});