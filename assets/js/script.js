$(document).ready(function () {

    var apiKey = "7byjtqn68yzm6ecsjfmcy9q3";

    $("#searchBtn").click(function () {

        var zipCode = $("#zip-input").val();
        var radius = $("#radius-input").val();
        var inputDate = $("#date-input").val();
        console.log(zipCode, radius, inputDate);
        getLocation(zipCode);
        getMovies(zipCode, inputDate, apiKey);



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

   
    //function to get movie posters and append results on page





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