// calculates a random number between the specified values
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// sets a random picture from assets/backgrounds as the homepage background
jQuery.ajax({
    url: "https://api.github.com/repos/jonathanlaniado/site/contents/assets/backgrounds",
    type: "GET",
    headers: {
      "Authorization": "Basic am9uYXRoYW5sYW5pYWRvOlpaN21KOTJvZGxEZjBOQw==",
    },
  })
  .done(function(data, textStatus, jqXHR) {
    var paths = [];
    Object.keys(data).forEach(function(key) {
      var val = data[key]["path"];
      paths.push(val);
    });
    paths.shift();
    console.log(paths.length);
    var rand = getRand(0, paths.length);
    $('html').css('background-image', 'url(' + paths[rand] + ')');
    $('html').css('background-position', 'center');
    $('html').css('background-size', 'center');
    $('html').css('background-repeat', 'no-repeat');
    $('html').css('background-attachment', 'fixed');
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
  });

$(document).ready(function() {
  $('.hamburger').click(function() {
    $(this).toggleClass('is-active');
  });
  $('.logo').click(function() {
    $(this).addClass('rotate-center');
    $(this).removeClass('rotate-center');
  });
});