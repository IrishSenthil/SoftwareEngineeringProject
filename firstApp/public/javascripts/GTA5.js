$(document).ready(
    function() {
        var totalCharacters = 500;
        var showPosts = false;
        var like = false;
        var dislike = false;

        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        });

        getComments();

        /**
         * When the page loads (or is refreshed) we request all comments from the server
         */

        function getComments() {
            $.get("/get_GTA5_Comments", function (data) {
                var posts = "";


                for (var i = 0; i < data.length; i++) {
                  var userName = data[i].user_name;
                  var comment = data[i].comment;
                  var date = data[i].date_created;

                    posts += "<div class='comments'><div class='row well' style='border-radius: 20px'><div class='title col-xs-9' style='color: #ffb014; font-weight: bold;'>"
                         + userName + "<p style='font-weight: normal; color: black ;display: inline;'>" + " @ " + date + "</p>" + "<br>" + "_________________________________________________" + "<p style='font-weight: normal; color: black'>"
                         + comment + "</p></div><div class='col-xs-3'>" + "<button type='button' name='" + data[i]._id + "' class='btn btn-danger'>" +
                        "Delete</button>" +"<div style='padding-top: 20px'>"+"<button type='button' class='btn btn-info'>" +
                        "Update</button></div></div></div></div>" + "</div></div>";
                }



                $("#feedPosts").html(posts);
                $("#count").html(data.length);
                if (!showPosts)
                    $("#feedPosts").hide();
                else
                    $("#feedPosts").show();

                // Recursively call getComments every 10 second
               setTimeout(getComments, 10000);
            });
        }

        /**
         * Event handler for when the user submits a comment
         */
        $("#postForm").submit(function (event) {
            event.preventDefault();
            $.post("/add_GTA5_Comments", {
                comment: event.target.inputPost.value
            }, function (result) {
                $("#charRemaining").html(totalCharacters);
                event.target.reset();
                getComments();
            });
        });

        /**
         * Event handler for when the user deletes a comment
         */
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
            if (event.target.name) {
                $.ajax({
                    url: '/remove_GTA5_Comments/' + event.target.name,
                    type: 'DELETE',
                    success: function (result) {
                        getComments();
                    }
                });
            }
        });
    });
