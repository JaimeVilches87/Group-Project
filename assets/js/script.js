$(document).ready(function () {

    //hide modal buttons
    $("#restaurant, #dispensary, #chuck").hide();


    // function to run moment js and display date
    function runToday() {
        var today = new moment().format("YYYY-MM-DD");
        // console.log(today)

        inputDate = $("#date-input").val();
        if (inputDate === "") {
            (inputDate = today);
            $('#date-input').attr({ type: "date", value: today })
        }
    };
    runToday();

    // function to collect all user inputs and start api functions
    $("#searchBtn").on("click", function () {
        $("#restaurant, #dispensary, #chuck").show();
        var zipCode = $("#zip-input").val();
        var radius = $("#radius-input").val();
        var inputDate = $("#date-input").val();
        console.log(zipCode, radius, inputDate);

        //function to collect lat and lon to storage
        function getLocation(zipCode) {

            var queryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zipCode + '&key=AIzaSyArGspblnhF4-hiENSFuiTXDuoRoxS-by8';

            $.ajax({
                url: queryUrl,
                method: "GET",
                success: function (response) {

                    console.log(response);
                    var lat = response.results[0].geometry.location.lat;
                    var lon = response.results[0].geometry.location.lng;

                    // console.log(lat, lon, city);
                    showRestaurants(lat, lon);
                    showDispensary(lat, lon);
                    chuckNorris();
                
                },
            });

        };
        getLocation(zipCode);
        getMovies(zipCode, inputDate);
    });

    //function to show restaurants and appends results to modal
    function showRestaurants(lat, lon) {
        apiKey = "AIzaSyC84eLtW-dg2Ud5fxkqdkv2IovQMrQl9jI";
        radius = $("#radius-input").val();
        if (radius === "") {
            (radius = 1000);

        }

        var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + lon + "&radius=" + radius + "&type=restaurant&key=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            cache: false,
            // We store all of the retrieved data inside "response"
            success: function (response) {
                // console.log(response);

                for (var i = 0; i < 10; i++) {
                    var restaurantName = response.results[i].name;
                    var rating = response.results[i].rating;
                    var resAddy = response.results[i].vicinity;

                    var restName = $("<li>").append(restaurantName, "<br>", "Address: ", resAddy, "<br>", "Rating: ", rating);

                    $("#restaurant-name").append(restName);
                }
            },
        });
    };

    //function to show movies and append results to page
    function getMovies(zipCode, inputDate,) {

        var apiKey = "7byjtqn68yzm6ecsjfmcy9q3";
        queryUrl = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + inputDate + "&zip=" + zipCode + "&api_key=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            success: function (response) {
                console.log(response);
                // console.log(response[0].title);
                for (var i = 0; i < response.length; i++) {
                    var movieTitle = response[i].title;
                    var movieDescrip = response[i].longDescription;
                    var releaseYear = response[i].releaseDate;
                    var theatre = response[i].showtimes[0].theatre.name;
                    var movieInfo = $("<li>").append(movieTitle, "<br>", movieDescrip, "<br> Release Date: ", releaseYear, "<br> Playing now at: ", theatre);
                    $("#movie-views").append(movieInfo);
                }
            },
        });
    };

    //function to show nearby dispensaries and append info to modal
    function showDispensary(lat, lon) {
        apiKey = "AIzaSyC84eLtW-dg2Ud5fxkqdkv2IovQMrQl9jI";
        radius = $("#radius-input").val();
        if (radius === "") {
            (radius = 1000);

        }
        var queryUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=dispensarys&location=" + lat + "," + lon + "&radius=" + radius + "&key=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET",
            cache: false,
            // We store all of the retrieved data inside "response"
            success: function (response) {
                // console.log(response);
                // console.log(queryUrl);
                for (var i = 0; i < 10; i++) {
                    var dispensary = response.results[i].name;
                    var address = response.results[i].formatted_address;
                    var ratingDis = response.results[i].rating;
                    var disName = $("<li>").append(dispensary, "<br>", address, "<br>", "Rating: ", ratingDis);

                    $("#dispensary-name").append(disName);
                }
            },
        });
    };

    //function to get chuck norris jokes and append to modal
    function chuckNorris() {
        var queryUrl = "https://api.chucknorris.io/jokes/random";
        for (var i = 0; i < 3; i++) {
            $.ajax({
                url: queryUrl,
                method: "GET",
                cache: false,

                // We store all of the retrieved data inside "response"
                success: function (response) {
                    var norris = response.value
                    var chuckJoke = $("<li>").append(norris);
                    $("#chuck-joke").append(chuckJoke, "<br>");
                },
            });
        };
    };


//on click events to pull up modals
    $(document).on("click", "#dispensary", function () {
        $("#modal-dispensary").css("display", "block");
    });
    $(document).on("click", "#chuck", function () {
        $("#modal-chuck").css("display", "block");
    })
    $(document).on("click", "#restaurant", function () {
        $("#modal-restaurant").css("display", "block");
    });
    $(document).on("click", ".close-btn", function () {
        $(".modal").css("display", "none");
    });

   
});