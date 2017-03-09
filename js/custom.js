function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        document.getElementById('status').style.visibility = 'hidden';
        // Logged into your app and Facebook.
        //testAPI();
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').style.visibility = 'visible';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').style.visibility = 'visible';
    }
}

function Login() {
    FB.login(function (response) {
        statusChangeCallback(response);
    })
}

function getData(url, callback) {
    FB.api(url, {access_token : FB.getAuthResponse},
        function (response) {
            console.log(response);
            callback(response);

            if (response && !response.error) {
                console.log(response);
            }});
}

function showNextQuote() {
    var url = document.getElementById("next-url").value;
    if (url === undefined)
    {
        url = "/127620683935348/photos?fields=images&limit=1";
    }
    getData(url, function (response) {
        document.getElementById('wise-quote').src = response.data[0].images[0].source;
        document.getElementById("next-url").value = response.paging.next;
    });

}