$(document).ready(function () {

    // var description;



    //on click of search button to retreive inital user input
    $("#searchBtn").on("click", function () {

        var zipCode = $("#zip-input").val();
        var radius = $("#radius-input").val();
        var inputDate = $("#date-input").val();
        console.log(zipCode, radius, inputDate);
        getLocation(zipCode);
        getMovies(zipCode, inputDate);

    });
    var distance = "";
    var radius = $("#radius-input").val();
    var today = new moment().format("YYYY-MM-DD");


    //function to get today's date and place it in date input if no input is entered
    function runToday() {

        // var inputDate = "";

        console.log(today)

        inputDate = $("#date-input").val();
        if (inputDate === "") {
            (inputDate = today);
            $('#date-input').attr({ type: "date", value: today })
        }
    };
    runToday();

    //function to get lat and lon coord
    function getLocation(zipCode) {

        // var baseUrl = "https://data.tmsapi.com/v1.1";
        // var showtimesUrl = baseUrl + '/movies/showings';
        var queryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zipCode + '&key=AIzaSyArGspblnhF4-hiENSFuiTXDuoRoxS-by8';

        $.ajax({
            url: queryUrl,
            method: "GET",
            success: function (response) {

                console.log(response);
                var lat = response.results[0].geometry.location.lat;
                var lon = response.results[0].geometry.location.lng;
                var city = response.results[0].formatted_address;

                console.log(lat, lon);
                showWeather(lat, lon, city);
                showRestaurants(lat, lon);


            },
        });

    };

    function showWeather(lat, lon) {
        var APIKey = "2d21806c273ae4d5ad203a6f6347f868";
        console.log(lat, lon);

        var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=,minutely,hourly,alerts&units=imperial&appid=" + APIKey;


        // Second call to the OpenWeatherMap API for one call 
        $.ajax({
            url: queryURL,
            method: "GET",

            // We store all of the retrieved data inside "response"
            success: function (response) {
                console.log(response);



                var temp = Math.round(response.current.temp);
                var uvIndex = response.current.uvi;
                console.log(temp);

                //posts infor on screen
                // $("#cityDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + iconURL + "\" alt=\"Weather icon\"/>");
                // console.log(temp);
                $("#currentTemp").html(" " + temp + "  &degF");
                $("#currentHumidity").html(response.current.humidity + "%");
                $("#currentWindSpeed").html(response.current.wind_speed + " MPH");
                $("#currentUVIndex").html(uvIndex);




            },


        });

    };
    function showRestaurants(lat, lon) {

        radius = $("#radius-input").val();
        if (radius === "") {
            (radius = 1000);

        }

        var queryUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&location=" + lat + "," + lon + "&radius=" + radius + "&key=AIzaSyArGspblnhF4-hiENSFuiTXDuoRoxS-by8";


        $.ajax({
            url: queryUrl,
            method: "GET",

            // We store all of the retrieved data inside "response"
            success: function (response) {
                console.log(response);



                // var temp = Math.round(response.current.temp);
                // var uvIndex = response.current.uvi;
                // console.log(temp);

                // //posts infor on screen
                // // $("#cityDate").html(city + " (" + new Date().toLocaleDateString() + ") <img id=\"icon\" src=\"" + iconURL + "\" alt=\"Weather icon\"/>");
                // // console.log(temp);
                // $("#currentTemp").html(" " + temp + "  &degF");
                // $("#currentHumidity").html(response.current.humidity + "%");
                // $("#currentWindSpeed").html(response.current.wind_speed + " MPH");
                // $("#currentUVIndex").html(uvIndex);

            },


        });
    };


    //function to retreive Movies and append to page
    function getMovies(zipCode, inputDate, apiKey) {

        var apiKey = "7byjtqn68yzm6ecsjfmcy9q3";
        queryUrl = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + inputDate + "&zip=" + zipCode + "&api_key=" + apiKey;


        $.ajax({
            url: queryUrl,
            method: "GET",
            success: function (response) {

                console.log(response);
                console.log(queryUrl);


                postMovies(response);
                //function to get movie posters and append results on page

            },
        });


    };

    function postMovies(response) {


        for (var i = 0; i < response.length; i++) {

            console.log(response[i].title);
            var title = response[i].title;
            console.log(title);
            // var showTime = response[i].showtimes[0].theatre.name;
            // console.log(showTime);
            // var title = title.replace(/\s+/g, '');

            var queryUrl = "https://www.omdbapi.com/?t=" + title + "&apikey=trilogy";
            console.log(queryUrl);
            $.ajax({
                url: queryUrl,
                method: "GET",
                success: function (response) {

                    // description = response.Plot;
                    console.log(response)
                    var imgUrl = response.Poster;
                    // var plot = response.Plot;
                    // var rated = response.Rated;
                    var image = $("<img>").addClass('col-lg-2 tile col-md-4 col-sm-6 col-xs-12').attr("src", imgUrl);
                    // console.log(plot);


                    // // Appending the image
                    // image.append(plot, rated);
                    $("#img").append(image);
                    // $("#movies-tile").append(plot, rated);



                },


            });
        };


    };

    $(document).on("click", ".movieDisplay img", function () {




        $(".modal").css("display", "block");




    })


    $(document).on("click", ".close-btn", function () {

        $(".modal").css("display", "none");





    });


    //function to display movieInfo
    // function showTimes(response) {

    //     var description = response.longDescription;
    //     var descrip = $("<p></p>").html(description);
    //     console.log(description);
    //     $(".modal-content").append(descrip);

    // }


});




// // Initial array of movies
// var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// // displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayMovieInfo() {

//     var movie = $(this).attr("data-name");
//     var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

//     // Creating an AJAX call for the specific movie button being clicked
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {

//         // Creating a div to hold the movie
//         var movieDiv = $("<div class='movie'>");

//         // Storing the rating data
//         var rating = response.Rated;

//         // Creating an element to have the rating displayed

//         var pOne = $("<p>").text("Rating: " + rating);

//         pOne.css("padding-left", "20px")

//         // Displaying the rating
//         movieDiv.append(pOne);

//         // Storing the release year
//         var released = response.Released;



//         // Creating an element to hold the release year
//         var pTwo = $("<p>").text("Released: " + released);



//         // Displaying the release year

//         pTwo.css("padding-left", "20px")

//         movieDiv.append(pTwo);

//         var actors = response.Actors;

//         var actorscast = $("<p>").text("Actors: " + actors)

//         actorscast.css("padding-left", "20px")

//         movieDiv.append(actorscast)

//         // Storing the plot
//         var plot = response.Plot;

//         // Creating an element to hold the plot
//         var pThree = $("<p>").text("Plot: " + plot);

//         pThree.css("padding-left", "20px")
//         // Appending the plot
//         movieDiv.append(pThree);

//         // Retrieving the URL for the image
//         var imgURL = response.Poster;

//         // Creating an element to hold the image
//         var image = $("<img>").attr("src", imgURL);
//         image.css("padding-left", "20px")

//         // Appending the image
//         movieDiv.append(image);

//         // Putting the entire movie above the previous movies
//         $("#movies-view").prepend(movieDiv);

//         movieDiv.css("background-color", "pink")

//         // var responsefull =  $("<div>").text("response:" + JSON.stringify(response));

//         // responsefull.css("margin-top", "20px")

//         // movieDiv.append(responsefull)

//         movieDiv.css("color", "green")

//         movieDiv.css("border", "15px red ridge")

//         movieDiv.css("offset-x", "50px")

//         movieDiv.css("offset-y", "50px")

//         movieDiv.css("blur-radius", "50px")

//     });

// }

// // Function for displaying movie data
// function renderButtons() {

//     // Deleting the movies prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons-view").empty();

//     // Looping through the array of movies
//     for (var i = 0; i < movies.length; i++) {

//         // Then dynamicaly generating buttons for each movie in the array
//         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//         var a = $("<button>");
//         // Adding a class of movie-btn to our button
//         a.addClass("movie-btn");
//         // Adding a data-attribute
//         a.attr("data-name", movies[i]);
//         // Providing the initial button text
//         a.text(movies[i]);
//         // Adding the button to the buttons-view div
//         $("#buttons-view").append(a);
//     }
// }

// // This function handles events where a movie button is clicked
// $("#add-movie").on("click", function (event) {
//     event.preventDefault();
//     // This line grabs the input from the textbox
//     var movie = $("#movie-input").val().trim();

//     // Adding movie from the textbox to our array
//     movies.push(movie);

//     // Calling renderButtons which handles the processing of our movie array
//     renderButtons();
// });

// // Adding a click event listener to all elements with a class of "movie-btn"
// $(document).on("click", ".movie-btn", displayMovieInfo);

// // Calling the renderButtons function to display the initial buttons
// renderButtons();
//     // </script>