// calculates a random number between the specifi≥ed values
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// adds all image locations from the assets/backgrounds/ directory to an array
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

    $(document).ready(function() {
      var rand = getRand(0, bgImages.length);
      $('html').css('background-image', 'url(' + paths[rand] + ')');
      $('html').css('background-position', 'center');
      $('html').css('background-size', 'center');
      $('html').css('background-repeat', 'no-repeat');
      $('html').css('background-attachment', 'fixed');
    });
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
  });


// $.ajax({
//   url: "/assets/backgrounds/",
//   async: false,
//   success: function(data) {
//     $(data).find("a:contains(.jpg)").each(function() {
//       bgImages.push($(this).attr("href"));
//     });
//   }
// });