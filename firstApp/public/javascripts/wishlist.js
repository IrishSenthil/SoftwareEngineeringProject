$(document).ready(
    function() {
        var totalCharacters = 500;
        var showPosts = false;
        var like = false;
        var dislike = false;
        var wishlistArray = [];
        var testArray = ["Hi","Guys"];
        var gameArray = [];
        var gameOne;
        var gameTwo;
        var gameThree;
        var gameFour;
        var gameFive;
        var gameOneImage;
        var gameTwoImage;
        var gameThreeImage;
        var gameFourImage;
        var gameFiveImage;
        var changed = false;
        var gamesInWishlist = 0;
        var gameOnePresent = false;
        var gameTwoPresent = false;
        var gameThreePresent = false;
        var gameFourPresent = false;
        var gameFivePresent = false;
        var userName;
        var value = 0;

        $("#postForm").keyup(function (event) {
            var inputText = event.target.value;
            $("#charRemaining").html(totalCharacters - inputText.length);
        });

        getComments();

        /**
         * When the page loads (or is refreshed) we request all comments from the server
         */

        function getComments() {
            $.get("/users/get_current_user", function (data) {
                var posts = "";
              //  alert(gamesInWishlist);

                for (var i = 0; i < data.length; i++) {
                  var userName = data[i].user_name;
                  gameOne = data[i].wishGameOne;
                  gameTwo = data[i].wishGameTwo;
                  gameThree = data[i].wishGameThree;
                  gameFour = data[i].wishGameFour;
                  gameFive = data[i].wishGameFive;

                  gameOneImage = data[i].wishGameOneImage;
                  gameTwoImage = data[i].wishGameTwoImage;
                  gameThreeImage = data[i].wishGameThreeImage;
                  gameFourImage = data[i].wishGameFourImage;
                  gameFiveImage = data[i].wishGameFiveImage;


                    if((gameOne != "") && gameOnePresent == false) {
                      gamesInWishlist++;
                      gameOnePresent = true;
                      value = 0;
                      posts += "<br><br><div class='panel panel-primary'> <div class='panel-heading' style='text-align: center; border-bottom-right-radius: 50px;'>"+ gameOne +"</div><div class='panel-body'> <img src='"+ gameOneImage +"' class='img-responsive topImage col-6' alt='Image'> <button type='button' value='"+ value +"' name='" + data[i]._id + "'id='removeButton' class='wishlistRight col-3 btn btn-danger'>Remove</button><br><br><br><div class='wishlistRight col-3 btn btn-success'>Purchase</div></div></div><br>";

                    }
                    if((gameTwo != "") && gameTwoPresent == false) {
                      gamesInWishlist++;
                      gameTwoPresent = true;
                      value = 1;
                      posts += "<br><div class='panel panel-primary'> <div class='panel-heading' style='text-align: center; border-bottom-right-radius: 50px;'>"+ gameTwo +"</div><div class='panel-body'> <img src='"+ gameTwoImage +"' class='img-responsive topImage col-6' alt='Image'> <button type='button' value='"+ value +"' name='" + data[i]._id + "'id='removeButton' class='wishlistRight col-3 btn btn-danger'>Remove</button><br><br><br><div class='wishlistRight col-3 btn btn-success'>Purchase</div></div></div>";

                    }
                    if((gameThree != "") && gameThreePresent == false) {
                      gamesInWishlist++;
                      gameThreePresent = true;
                      value = 2;
                      posts += "<br><div class='panel panel-primary'> <div class='panel-heading' style='text-align: center; border-bottom-right-radius: 50px;'>"+ gameThree +"</div><div class='panel-body'> <img src='"+ gameThreeImage +"' class='img-responsive topImage col-6' alt='Image'> <button type='button' value='"+ value +"' name='" + data[i]._id + "'id='removeButton' class='wishlistRight col-3 btn btn-danger'>Remove</button><br><br><br><div class='wishlistRight col-3 btn btn-success'>Purchase</div></div></div><br>";

                    }
                    if((gameFour != "") && gameFourPresent == false) {
                      gamesInWishlist++;
                      gameFourPresent = true;
                      value = 3;
                      posts += "<br><div class='panel panel-primary'> <div class='panel-heading' style='text-align: center; border-bottom-right-radius: 50px;'>"+ gameFour +"</div><div class='panel-body'> <img src='"+ gameFourImage +"' class='img-responsive topImage col-6' alt='Image'> <button type='button' value='"+ value +"' name='" + data[i]._id + "'id='removeButton' class='wishlistRight col-3 btn btn-danger'>Remove</button><br><br><br><div class='wishlistRight col-3 btn btn-success'>Purchase</div></div></div><br>";

                    }
                    if((gameFive != "") && gameFivePresent == false) {
                      gamesInWishlist++;
                      gameFivePresent = true;
                      value = 4;
                      posts += "<br><div class='panel panel-primary'> <div class='panel-heading' style='text-align: center; border-bottom-right-radius: 50px;'>"+ gameFive +"</div><div class='panel-body'> <img src='"+ gameFiveImage +"' class='img-responsive topImage col-6' alt='Image'> <button type='button' value='"+ value +"' name='" + data[i]._id + "'id='removeButton' class='wishlistRight col-3 btn btn-danger'>Remove</button><br><br><br><div class='wishlistRight col-3 btn btn-success'>Purchase</div></div></div><br>";

                    }
                }



                $("#feedPosts").html(posts);
                $("#count").html(data.length);
                $("#feedPosts").show();

                // Recursively call getComments every 10 second
               //setTimeout(getComments, 10000);
            });
        }

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

        $("#feedPosts").click(function (event) {
            console.log(event.target.name);
            if(event.target.value == 0) {
              gameOne = "";
              gameOnePresent = false;
            }
            if(event.target.value == 1) {
              gameTwo = "";
              gameTwoPresent = false;
            }
            if(event.target.value == 2) {
              gameThree = "";
              gameThreePresent = false;
            }
            if(event.target.value == 3) {
              gameFour = "";
              gameFourPresent = false;
            }
            if(event.target.value == 4) {
              gameFive = "";
              gameFivePresent = false;
            }
                $.ajax({
                    url: '/users/updateUserDetails/' + event.target.name,
                    type: 'PUT',
                    data: {wishGameOne : gameOne, wishGameTwo: gameTwo, wishGameThree: gameThree, wishGameFour: gameFour, wishGameFive: gameFive},
                    success: function (result) {
                        gamesInWishlist = 0;
                        getComments();
                        window.location.reload();
                        swal("Wishlist updated!")
                    }
                });
        });
    });
