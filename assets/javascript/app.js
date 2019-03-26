
//06 Giphy App HomeWork
//========================
$(document).ready(function () {

  var topics = ["yoda", "han solo", "darth vader", "storm trooper", "boba fett"];

  function renderButtons() {

    $("#buttons-section").empty();

    for (var i = 0; i < topics.length; i++) {
      console.log(topics[i]);

      var topicButton = $("<button>");
      topicButton.addClass("topic-button");
      topicButton.attr("topic-name", topics[i]);
      topicButton.append(topics[i]);

      $("#buttons-section").append(topicButton);
    }

    $(".topic-button").on("click", function() {
    
    var topic = $(this).attr("topic-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=R9u5VRTU7cYZI9IK69QVVKAHL3j5Fj0O&q=" + topic + "&limit=1&offset=0&rating=G&lang=en";
    console.log(topic);

    $.ajax({
      url: queryURL,
      method: "GET",
      }).then(function(response) {
      //console.log(queryURL);
      //console.log(response);

      var results = response.data;

      for (var i = 0; i < results.length; i++) {

        //new topic div storage
        var topicDiv = $("<div>");
      
        // Get the Title from repsonse, put in a p tag, and add to the 
        var pTitle = $("<p>").text("Title: " + results[i].title);
        

        // create display and collect info for the rating
        var pRating = $("<p>").text("Rating: " + results[i].rating);

        //create and store image info

        var imageTopic = $("<img>");
        imageTopic.attr("src", results[i].images.fixed_height.url);
        

        //append everything to the new div
        topicDiv.append(pTitle);
        topicDiv.append(pRating);
        topicDiv.append(imageTopic);

        //store the new topic Div with all the good stuff into the html
        $("#topics-view-section").append(topicDiv);
        }
      });
    });

  }

  $("#add-topic").on("click", function(event) {
    event.preventDefault();

    var topic = $("#topic-input").val();

    topics.push(topic);

    renderButtons();
  });

  renderButtons();
});


