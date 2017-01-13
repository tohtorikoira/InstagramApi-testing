$(function() {

    $(".lorem").hide();

    var $images = $('#images');
    var lat;
    var lng;
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    function success1(pos) {
        var crd = pos.coords;

        lat = crd.latitude;
        lng = crd.longitude;
        console.log('Your current position is:');
        console.log('Latitude : ' + lat);
        console.log('Longitude: ' + lng);
        console.log('More or less ' + crd.accuracy + ' meters.');
        url = "https://api.instagram.com/v1/media/search?lat=" + lat + "&lng=" + lng + "&access_token=";

        (insta(url));
    };


    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        $images.append('<section>' + 'ERROR(' + err.code + '): ' + err.message + '</section></br>');
    };
    navigator.geolocation.getCurrentPosition(success1, error, options);



    function insta(url) {
        $.ajax({
            type: 'GET',
            dataType: 'jsonp',
            url: url,
            success: function(data) {
                $.each(data.data, function(i, item) {
                    $images.append('<section><img src=' + +' alt=' + item.location.name + ' title=' + item.location.name + ' class="img-responsive"></br>' + item.location.name + '</section>');
                });

            }

        });
    };
});
