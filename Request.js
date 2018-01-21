// Request (GET https://api.github.com/repos/jonathanlaniado/site/contents/assets/backgrounds)

jQuery.ajax({
    url: "https://api.github.com/repos/jonathanlaniado/site/contents/assets/backgrounds",
    type: "GET",
    headers: {
        "Authorization": "Basic am9uYXRoYW5sYW5pYWRvOlpaN21KOTJvZGxEZjBOQw==",
    },
})
.done(function(data, textStatus, jqXHR) {
    console.log("HTTP Request Succeeded: " + jqXHR.status);
    console.log(data);
})
.fail(function(jqXHR, textStatus, errorThrown) {
    console.log("HTTP Request Failed");
})
.always(function() {
    /* ... */
});


