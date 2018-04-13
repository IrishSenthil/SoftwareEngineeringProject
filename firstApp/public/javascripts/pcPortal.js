$(document).ready(
    function() {
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
        var newGameName;
        var gameAlreadyInDB = false;
        var tempGame;
        var votesRemaining;
        var noVotesLeft = false;
        var userLoggedIn = false;
        getComments();
        refreshGameValues();

        function insertIntoWishlist() {
          for(var i=0; i<5; i++) {
            if(gameOne == null || gameOne == "") {
              gameOne = wishlistGame;
              gameOneImage = wishlistImage;
              break;
            }
            if(gameTwo == null || gameTwo == "") {
              gameTwo = wishlistGame;
              gameTwoImage = wishlistImage;
              break;
            }
            if(gameThree == null || gameThree == "") {
              gameThree = wishlistGame;
              gameThreeImage = wishlistImage;
              break;
            }
            if(gameFour == null || gameFour == "") {
              gameFour = wishlistGame;
              gameFourImage = wishlistImage;
              break;
            }
            if(gameFive == null || gameFive == "") {
              gameFive = wishlistGame;
              gameFiveImage = wishlistImage;
              break;
            }
          }
          if(wishlistGame == "" || wishlistGame == null) {
              wishlistGame = "no game here";
        }
        }

        function insertToDatabase() {
          $.ajax({
              url: '/users/updateUserDetails/' + event.target.name,
              type: 'PUT',
              data: {wishGameOne : gameOne, wishGameTwo: gameTwo, wishGameThree: gameThree, wishGameFour: gameFour, wishGameFive: gameFive, wishGameOneImage: gameOneImage, wishGameTwoImage: gameTwoImage, wishGameThreeImage: gameThreeImage, wishGameFourImage: gameFourImage, wishGameFiveImage: gameFiveImage},
              success: function (result) {
                  getComments();
                  swal(wishlistGame + " has been added to your wishlist")
              }
          });
        }

        function refreshGameValues() {
          $.get("/get_gameValues", function(data) {
            for(var i = 0; i < data.length; i++) {
             if(data[i].gameName === "Battlefield 1") {
               $("#BattlefieldOne #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
               $("#BattlefieldOne #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
             }

             if(data[i].gameName === "Batman: The Enemy Within") {
               $("#BatmanTheEnemyWithin #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
               $("#BatmanTheEnemyWithin #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
             }
          }
          setTimeout(refreshGameValues, 10000);
          });
        }

        function voteOperations() {
        $.get("/users/get_current_user", function(data) {
        //var votes = 5;
        for (var i = 0; i < data.length; i++) {
            votesRemaining = data[i].votesRemaining;
            userLoggedIn = true;
            alert("votes left : " + votesRemaining);

            if ((votesRemaining - 1) < 0) {
                alert("NO VOTES LEFT");
                noVotesLeft = true;
            }
            if (noVotesLeft == false) {
                $.ajax({
                    url: '/users/updateUserDetails/' + data[i].user_name,
                    type: 'PUT',
                    data: {votesRemaining: votesRemaining - 1},
                    success: function(result) {}
                });
            }
        }
    });
}


        function upVoteGame(name) {
          $.get("/get_gameValues", function(data) {
            var alreadyExist = false;
            var noVotes = false;
            var games;
            games = data;
            for (var i = 0; i < games.length; i++) {
              if (name === games[i].gameName) {
                alreadyExist = true;

                //here
                voteOperations();
                if(userLoggedIn == false) {
                  swal("Cannot post votes", "Please log in or register to vote", "error");
                }
                //END
                if(noVotesLeft == false && userLoggedIn == true) {
                $.ajax({
                    url: '/editVotes/' + games[i]._id,
                    type: 'PUT',
                    data: { likes : games[i].likes + 1, totalVotes : data[i].totalVotes+1},
                    success: function (result) {
                      alert(games[i].likes+1);
                      //alert("noVotesLeft is "+noVotesLeft);
                    }
                });
              }
                refreshGameValues();
                break;
              }
            }

           //This is for us Developers!
            if (!alreadyExist) {
              $.post("/add_game_to_dB", {
                gameName: name
                }, function(result) {
                  alert("Introduced " + name);
                });
              }
            });
          }

          function downVoteGame(name) {
            $.get("/get_gameValues", function(data) {
              var alreadyExist = false;
              var noVotes = false;
              var games;

              games = data;
              for (var i = 0; i < games.length; i++) {
                if (name === games[i].gameName) {
                  alreadyExist = true;

                  //here
                  voteOperations();
                  alert("noVotesLeft is "+noVotesLeft);
                  //END
                  if(noVotesLeft == false && userLoggedIn == true) {
                  $.ajax({
                      url: '/editVotes/' + games[i]._id,
                      type: 'PUT',
                      data: { dislikes : games[i].dislikes + 1, totalVotes : data[i].totalVotes + 1},
                      success: function (result) {
                        alert(games[i].dislikes+1);
                        //alert("noVotesLeft is "+noVotesLeft);
                      }
                  });
                }
                  refreshGameValues();
                  break;
                }
              }

              if (!alreadyExist) {
                $.post("/add_game_to_dB", {
                  gameName: name
                  }, function(result) {
                    alert("Introduced " + name);
                  });
                }
              });
            }


        function getComments() {
                    $.get("/users/get_current_user", function (data) {
                        var posts = "";

                        for (var i = 0; i < data.length; i++) {
                          var userName = data[i].user_name;
                          wishlistArray = data[i].wishlistArray;
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
                        }

                        // Recursively call getComments every 10 second
                       setTimeout(getComments, 10000);
                    });
                }

        // Adding battleFieldOne to Wishlist
        $("#battlefieldOneWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#BattlefieldOne .panel-heading").text();
            wishlistImage = $('#BattlefieldOne .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteBattlefieldOne").click(function (event) {
            console.log(event.target.name);
            var name = $("#BattlefieldOne .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteBattlefieldOne").click(function (event) {
            console.log(event.target.name);
            var name = $("#BattlefieldOne .panel-heading").text();
            downVoteGame(name);
        });

        $("#upVoteBatmanTheEnemyWithin").click(function (event) {
            console.log(event.target.name);
            var name = $("#BatmanTheEnemyWithin .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteBatmanTheEnemyWithin").click(function (event) {
            console.log(event.target.name);
            var name = $("#BatmanTheEnemyWithin .panel-heading").text();
            downVoteGame(name);
        });

        $("#upVoteBattlerite").click(function (event) {
            console.log(event.target.name);
            var name = $("#Battlerite .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteBattlerite").click(function (event) {
            console.log(event.target.name);
            var name = $("#Battlerite .panel-heading").text();
            downVoteGame(name);
        });

        // Adding Batman The enemy within to Wishlist
        $("#batmanTheEnemyWithinWishlist").click(function (event) {
            console.log(event.target.name);
            wishlistGame = $("#BatmanTheEnemyWithin .panel-heading").text();
              wishlistImage = $('#BatmanTheEnemyWithin .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });
    });
