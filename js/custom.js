function statusChangeCallback(response, callback) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        document.getElementById('status').style.display = "none";
        document.getElementById('next').disabled = "";
        callback();
        // Logged into your app and Facebook.
        //testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('next').disabled = "disabled";
        document.getElementById('status').style.display = "block";
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('next').disabled = "disabled";
        document.getElementById('status').style.display = "block";
    }
}

function Login() {
    FB.login(function (response) {
        statusChangeCallback(response);
    })
}

function getData(url, callback) {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response, function () {
            FB.api(url, {access_token : FB.getAuthResponse},
                function (response) {
                    console.log(response);
                    callback(response);

                    if (response && !response.error) {
                        console.log(response);
                    }});
        });
    });
}

function showNextQuote() {
    var url = document.getElementById("next-url").value;
    if (url === undefined)
    {
        url = "/127620683935348/photos?fields=images,link&limit=1";
    }
    getData(url, function (response) {
        document.getElementById('wise-quote').src = response.data[0].images[0].source;
        document.getElementById("next-url").value = response.paging.next;
        document.getElementById("source").value = response.data[0].link;
    });
}

function share() {
    var source = document.getElementById("source").value;
    var url = "https://twitter.com/intent/tweet?text="
        + encodeURI("Wise words is here:\n")
        + source
        + encodeURI("\nFor more visit our website:\n")
        + "?url="
        + document.URL;
    window.open(url);
}

$(document).ready(function () {
    // default value
    document.getElementById('wise-quote').src = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/16640764_1435876939776376_2375711762220921804_n.jpg?oh=175e7fb0a5ab3f92ea1518bf4514e1ba&oe=5972EED0';
    document.getElementById('source').value = 'https://www.facebook.com/WQ2010/photos/a.127620683935348.14126.127603680603715/1435876939776376/?type=3&theater';
})