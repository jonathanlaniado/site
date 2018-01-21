// calculates a random number between the specifi≥ed values
function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

var forEach = function(t, o, r) {
  if ("[object Object]" === Object.prototype.toString.call(t))
    for (var c in t) Object.prototype.hasOwnProperty.call(t, c) && o.call(r, t[c], c, t);
  else
    for (var e = 0, l = t.length; l > e; e++) o.call(r, t[e], e, t)
};
var hamburgers = document.querySelectorAll(".hamburger");
if (hamburgers.length > 0) {
  forEach(hamburgers, function(hamburger) {
    hamburger.addEventListener("click", function() {
      this.classList.toggle("is-active");
    }, false);
  });
}