var totalCharacters = 500;
var showPosts = false;
var like = false;
var dislike = false;
var currentUser = "hi";

$("#postForm").keyup(function (event) {
    var inputText = event.target.value;
    $("#charRemaining").html(totalCharacters - inputText.length);
});

getComments();

/**
 * When the page loads (or is refreshed) we request all comments from the server
 */

function getComments() {
  $.get("/users/get_current_user", function(data) {
    currentUser = data[0].user_name;
  });
    $.get("/get_yookaLaylee_Comments", function (data) {
        var posts = "";
        var showButton = "block";
        for (var i = 0; i < data.length; i++) {
          var userName = data[i].user_name;
          var comment = data[i].comment;
          var date = data[i].date_created;
          showButton = "block";
          if(userName !== currentUser) {
            showButton = "none";
          }
            posts += "<div class='comments'><div class='row well' style='border-radius: 20px; margin: auto;'><div class='title col-xs-9' style='color: #ffb014; font-weight: bold;'>"
                 + userName + "<p style='font-weight: normal; color: black ;display: inline;'>" + " @ " + date + "</p>" + "<br>" + "<p style='font-weight: normal; color: black'>"
                 + comment + "</p></div><div class='col-xs-3'>" + "<button type='button' value='0' name='" + data[i]._id + "' class='btn btn-danger deleteButton' style='display:"+ showButton +"'>" +
                "Delete</button>" +"<div style='padding-top: 20px'>"+"<button type='button' value='1' name='" + data[i]._id + "' class='btn btn-info updateButton'style='display:"+ showButton +"''>" +
                "Update</button></div></div></div></div>" + "</div></div>";
        }






        $("#feedPosts").html(posts);
        $("#count").html(data.length);
        if (!showPosts)
            $("#feedPosts").hide();
        else
            $("#feedPosts").show();

        // Recursively call getComments every 10 second
       //setTimeout(getComments, 10000);
    });
}

/**
 * Event handler for when the user submits a comment
 */
$("#postForm").submit(function (event) {
    event.preventDefault();
    console.log(event.target.name);
    $.post("/add_yookaLaylee_Comment", {
        user_name: currentUser,
        comment: event.target.inputPost.value
    }, function (result) {
      getComments();
    });
    $("#charRemaining").html(totalCharacters);

    event.target.reset();
});


$("#btn-count").click(function (event) {
    var options = {};
    if (!showPosts) {
        $("#feedPosts").show("blind", options, 1000);
        showPosts = true;
    }
    else {
        $("#feedPosts").hide("blind", options, 1000);
        showPosts = false;
    }
});

/**
 * Event handler for when the user deletes a comment
 */
$("#feedPosts").click(function (event) {
    console.log(event.target.name);
    if (event.target.value == 0) {
      swal("Comment deleted!")
        $.ajax({
            url: '/remove_yookaLaylee_Comment/' + event.target.name,
            type: 'DELETE',
            success: function (result) {
                getComments();
            }
        });
    }
});

$("#feedPosts").click(function (event) {
    console.log(event.target.name);
    if (event.target.value == 1) {
      var updatedComment = prompt("Please enter your new comment:");
      if(updatedComment == "" || updatedComment == null) {
          updatedComment = data[i].comment;
    }
        $.ajax({
            url: '/update_yookaLaylee_Comment/' + event.target.name,
            type: 'PUT',
            data: {comment : updatedComment},
            success: function (result) {
                getComments();
                swal("Comment updated!")
            }
        });
    }
});
