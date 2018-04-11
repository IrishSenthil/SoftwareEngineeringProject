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
        var testy = false;
        getComments();

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

        function voteOperations() {
          $.get("/users/get_current_user", function (data) {
            var votes = 5;
            for (var i = 0; i < data.length; i++) {
              votes = data[i].votesRemaining;
              alert("votes left : "+ votes)
              if((votes-1)<0) {
              alert("NO VOTES LEFT");
            } else {
              $.ajax({
                  url: '/users/updateUserDetails/' + data[i].user_name,
                  type: 'PUT',
                  data: { votesRemaining : votes - 1},
                  success: function (result) {
                      //getComments();
                  }
              });
            }
            }
          });
        }


        function upVoteGame(name) {
          $.get("/get_gameValues", function(data) {
            var alreadyExist = false;
            var games;

            games = data;
            for (var i = 0; i < games.length; i++) {
              if (name === games[i].gameName) {
                alreadyExist = true;

                voteOperations();

                $.ajax({
                    url: '/editVotes/' + games[i]._id,
                    type: 'PUT',
                    data: { likes : games[i].likes + 1, totalVotes : data[i].totalVotes+1},
                    success: function (result) {
                      alert(games[i].likes+1)
                    }
                });
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

          function downVoteGame(name) {
            $.get("/get_gameValues", function(data) {
              var alreadyExist = false;

              for (var i = 0; i < data.length; i++) {
                if (name === data[i].gameName) {
                  alreadyExist = true;
                  $.ajax({
                      url: '/editVotes/' + data[i]._id,
                      type: 'PUT',
                      data: { dislikes : data[i].dislikes + 1, totalVotes : data[i].totalVotes+1},
                      success: function (result) {
                        alert(data[i].dislikes + 1)
                      }
                  });
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
