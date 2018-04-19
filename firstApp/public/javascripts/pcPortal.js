
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
        var noGamesLeft = false;
        var newGameName;
        var gameAlreadyInDB = false;
        var tempGame;
        var votesRemaining;
        var noVotesLeft = false;
        var userLoggedIn = false;
        var currentDate = new Date().getDate();
        var dateOfNoVotes = 0;

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
            if((gameFive != null || gameFive != "") && (gameOne != null || gameOne != "") && (gameTwo != null || gameTwo != "") && (gameThree != null || gameThree != "") && (gameFour != null || gameFour != "")) {
              noGamesLeft = true;
            }
            break;
          }
          if(wishlistGame == "" || wishlistGame == null) {
              wishlistGame = "no game here";
        }
        if(noGamesLeft == true) {
          alert("wishlist full")
        }

        }

        function insertToDatabase() {
          if(noGamesLeft == false) {
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
        }

        function refreshVotes() {
          if((currentDate-dateOfNoVotes)>0) {
            votesRemaining = 5;
          }
        }

        function refreshGameValues() {
          $.get("/get_gameValues", function(data) {
            for(var i = 0; i < data.length; i++) {
              if(data[i].gameName === "Abzu") {
                 $("#Abzu #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#Abzu #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "aceAttorney") {
                 $("#AceAttorney #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#AceAttorney #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "Anarcute") {
                 $("#Anarcute #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#Anarcute #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "Antihero") {
                 $("#Antihero #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#Antihero #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "Aporia: Beyond The Valley") {
                 $("#Aporia #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#Aporia #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "AC Origins") {
                 $("#AssassinsCreedOrigins #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#AssassinsCreedOrigins #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }
               if(data[i].gameName === "Ashes of The Singularity") {
                 $("#AshesOfTheSingularity #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                 $("#AshesOfTheSingularity #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
               }

              if(data[i].gameName === "Battlefield 1") {
                $("#BattlefieldOne #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                $("#BattlefieldOne #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
              }

              if(data[i].gameName === "Batman: The Enemy Within") {
                $("#BatmanTheEnemyWithin #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                $("#BatmanTheEnemyWithin #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
              }

              if(data[i].gameName === "Battlerite") {
                $("#Battlerite #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                $("#Battlerite #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
              }

              if(data[i].gameName === "Bit Blaster XL") {
                $("#BitBlasterXL #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
                $("#BitBlasterXL #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Black Desert Online") {
             $("#BlackDesertOnline #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#BlackDesertOnline #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "BulletStorm") {
             $("#BulletStorm #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#BulletStorm #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Call of Duty®: Advanced Warfare") {
             $("#CallOfDutyADVWAR #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#CallOfDutyADVWAR #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Call of Duty®: Ghosts") {
             $("#CallOfDutyGhost #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#CallOfDutyGhost #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Call of Duty®: Black Ops III") {
             $("#CallOfDutyBlack3 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#CallOfDutyBlack3 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Divinity: Original Sin 2") {
             $("#Divinity2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Divinity2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Divinity: Divinity Original Sin") {
             $("#Divinity #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Divinity #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Doom") {
             $("#Doom #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Doom #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Dragons's Dogma: Dark Arisen") {
             $("#DragonsDogma #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#DragonsDogma #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Dishonoured 2") {
             $("#Dishonoured2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Dishonoured2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Deus Ex: Mankind Divided ") {
             $("#DeusEx #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#DeusEx #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "The Evil Within") {
             $("#EvilWithin #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#EvilWithin #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "The Evil Within 2") {
             $("#EvilWithin2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#EvilWithin2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Evolve Stage 2") {
             $("#Evolve #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Evolve #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "FINAL FANTASY XV") {
             $("#FF15 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#FF15 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Fallout 4") {
             $("#Fallout4 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Fallout4 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "FINAL FANTASY VII") {
             $("#FF7 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#FF7 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Grand Theft Auto V") {
             $("#GTA5 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#GTA5 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Grand Theft Auto IV") {
             $("#GTA4 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#GTA4 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Tom Clancy's Ghost Recon® Wildlands") {
             $("#GhostReconWild #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#GhostReconWild #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Half-Life 2") {
             $("#HalfLife2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#HalfLife2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Hitman: Absolution™") {
             $("#Hitman #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Hitman #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Hunt Showdown") {
             $("#Hunt #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Hunt #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Injustice: Gods Among Us") {
             $("#Injustice #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Injustice #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Injustice™ 2") {
             $("#Injustice2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Injustice2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Icewind Dale: Enhanced Edition") {
             $("#IcewindDale #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#IcewindDale #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Jade Empire™: Special Edition") {
             $("#JadeEmpire #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#JadeEmpire #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Just Cause 2") {
             $("#JustCause2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#JustCause2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Just Cause™ 3") {
             $("#JustCause3 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#JustCause3 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Killer Instinct") {
             $("#KillerInstinct #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#KillerInstinct #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Killing Floor") {
             $("#KillingFloor #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#KillingFloor #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Killing Floor 2") {
             $("#KillingFloor2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#KillingFloor2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Life is Strange - Episode 1") {
             $("#LifeIsStrange #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#LifeIsStrange #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Left 4 Dead") {
             $("#Left4Dead #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Left4Dead #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Left 4 Dead 2") {
             $("#Left4Dead2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Left4Dead2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Mafia ii") {
             $("#Mafia2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Mafia2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "METAL GEAR SOLID V") {
             $("#MetalGear5 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#MetalGear5 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Metro 2033 Redux") {
             $("#Metro #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Metro #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Ni No Kuni II : revanant Kingdom") {
             $("#NiNoKuni2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#NiNoKuni2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Nier Automata") {
             $("#NierAutomata #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#NierAutomata #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "NBA 2K18") {
             $("#Nba2k18 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Nba2k18 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Onimusha 3:Demon Seige") {
             $("#Onimusha3DS #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Onimusha3DS #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Oxygen Not Included") {
             $("#OxygenNotIncluded #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#OxygenNotIncluded #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Outlast 2") {
             $("#Outlast2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Outlast2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Portal 2") {
             $("#Portal2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Portal2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "PlayerUnkown's Battlegrounds") {
             $("#Pubg #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Pubg #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Plague Inc Evolved") {
             $("#PlagueInc #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#PlagueInc #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Q.U.B.E") {
             $("#Qube #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Qube #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Quake 4") {
             $("#Quake4 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#quake4 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Quadrilateral Cowboy") {
             $("#QuadrilateralCowboy #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#QuadrilateralCowboy #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Rime") {
             $("#Rime #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Rime #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Remember Me") {
             $("#RememberMe #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#RememberMe #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Rogue Legacy") {
             $("#RogueLegacy #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#RogueLegacy #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Sonic Mania") {
             $("#SonicMania #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#SonicMania #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Sims 3") {
             $("#Sims3 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Sims3 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Starbound") {
             $("#Starbound #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Starbound #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Tomb Raider") {
             $("#TombRaider #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#TombRaider #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Terraria") {
             $("#Terraria #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Terraria #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Team Fortress 2") {
             $("#TeamFortress2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#TeamFortress2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Ultimate Marvel vs Capcom") {
             $("#UltimateMvsC #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#UltimateMvsC #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Uncharted : The Lost Legacy") {
             $("#UnchartedTheLostLegacy #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#UnchartedTheLostLegacy #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Urban Empire") {
             $("#UrbanEmpire #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#UrbanEmpire #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Velvet Assassin") {
             $("#VelvetAssassin #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#VelvetAssassin #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Vanquish") {
             $("#Vanquish #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Vanquish #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Virtua Tennis 4") {
             $("#VirtuaTennis4 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#VirtuaTennis4 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "We Happy Few") {
             $("#WeHappyFew #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#WeHappyFew #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "The Witcher 3 : Wild Hunt") {
             $("#TheWitcher3 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#TheWitcher3 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Watch Dogs") {
             $("#WatchDogs #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#WatchDogs #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "X-Com 2") {
             $("#XCom2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#XCom2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Xenon Valkyrie") {
             $("#XenonValkyrie #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#XenonValkyrie #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "X-Blades") {
             $("#XBlades #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#XBlades #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Yooka Laylee") {
             $("#YookaLaylee #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#YookaLaylee #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Yar's Revenge") {
             $("#YarsRevenge #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#YarsRevenge #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Yaiba Ninja Gaiden Z") {
             $("#YaibaNinjaGaidenZ #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#YaibaNinjaGaidenZ #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Zenge") {
             $("#Zenge #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#Zenge #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Zero Time Dilema") {
             $("#ZeroTimeDilema #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#ZeroTimeDilema #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Zero Escape : Virtue's Last Reward") {
             $("#ZeroEscapeVLR #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#ZeroEscapeVLR #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }
           if(data[i].gameName === "Zeno Clash II") {
             $("#ZenoClash2 #userRatingLikes").html(Math.round(100*((data[i].likes)/(data[i].totalVotes)))+"%");
             $("#ZenoClash2 #userRatingDislikes").html(Math.round(100*((data[i].dislikes)/(data[i].totalVotes)))+"%");
           }



          setTimeout(refreshGameValues, 10000);
          }
        });
    }

        function voteOperations() {
        $.get("/users/get_current_user", function(data) {

        for (var i = 0; i < data.length; i++) {
            votesRemaining = data[i].votesRemaining;
            userLoggedIn = true;
            //alert("votes left : " + votesRemaining);
            if ((votesRemaining - 1) < 0) {
                swal("No votes remaining", "Please wait until tomorrow to get more votes", "error");
                dateOfNoVotes = new Date().getDate();
                noVotesLeft = true;
            }
            if(noVotesLeft == true) {
            refreshVotes();
          }
            if (noVotesLeft == false) {
                $.ajax({
                    url: '/users/updateUserDetails/' + data[i].user_name,
                    type: 'PUT',
                    data: {votesRemaining: votesRemaining - 1, noVotesDate: dateOfNoVotes},
                    success: function(result) {}
                });
            }
        }
    });
}

function checkUser() {
  if(userLoggedIn == false) {
    swal("Cannot post votes", "Please log in or register to vote", "error");
  }
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

                voteOperations();
                setTimeout(checkUser, 150);
                setTimeout(upDateUpVotes, 100);

                function upDateUpVotes() {
                  if(noVotesLeft == false && userLoggedIn == true) {
                  $.ajax({
                      url: '/editVotes/' + games[i]._id,
                      type: 'PUT',
                      data: { likes : games[i].likes + 1, totalVotes : data[i].totalVotes+1},
                      success: function (result) {
                        alertify.success("UpVoted "+name+" !");
                      }
                  });
                }
                }

                refreshGameValues();
                break;
              }
            }

           //This is for us Devs(Adds game to DB to start it off)
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
                  setTimeout(checkUser, 150);
                  setTimeout(upDateDownVotes, 100);
                  //END
                  function upDateDownVotes() {
                    if(noVotesLeft == false && userLoggedIn == true) {
                    $.ajax({
                        url: '/editVotes/' + games[i]._id,
                        type: 'PUT',
                        data: { dislikes : games[i].dislikes + 1, totalVotes : data[i].totalVotes + 1},
                        success: function (result) {
                          alertify.success("Downvoted "+name+" !");
                        }
                    });
                  }
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

                $("#abzuWishlist").click(function (event) {
                            console.log(event.target.name);

                            wishlistGame = $("#Abzu .panel-heading").text();
                            wishlistImage = $('#Abzu .topImage').attr('src');
                              insertIntoWishlist();
                              insertToDatabase();
                        });

                        $("#upVoteAbzu").click(function (event) {
                            console.log(event.target.name);
                            var name = $("#Abzu .panel-heading").text();
                            upVoteGame(name);
                        });

                        $("#downVoteAbzu").click(function (event) {
                            console.log(event.target.name);
                            var name = $("#Abzu .panel-heading").text();
                            downVoteGame(name);
                        });

        //////////anarcute
        $("#anarcuteWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#Anarcute .panel-heading").text();
            wishlistImage = $('#Anarcute .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteAnarcute").click(function (event) {
            console.log(event.target.name);
            var name = $("#Anarcute .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteAnarcute").click(function (event) {
            console.log(event.target.name);
            var name = $("#Anarcute .panel-heading").text();
            downVoteGame(name);
        });


        /////////////antihero
        $("#antiheroWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#Antihero .panel-heading").text();
            wishlistImage = $('#Antihero .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteAntihero").click(function (event) {
            console.log(event.target.name);
            var name = $("#Antihero .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteAntihero").click(function (event) {
            console.log(event.target.name);
            var name = $("#Antihero .panel-heading").text();
            downVoteGame(name);
        });

        ///////////aporia

        $("#aporiaWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#Aporia .panel-heading").text();
            wishlistImage = $('#Aporia .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteAporia").click(function (event) {
            console.log(event.target.name);
            var name = $("#Aporia .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteAporia").click(function (event) {
            console.log(event.target.name);
            var name = $("#Aporia .panel-heading").text();
            downVoteGame(name);
        });

        //////////// assassins creed origin
        $("#assassinsCreedOriginsWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#AssassinsCreedOrigins .panel-heading").text();
            wishlistImage = $('#AssassinsCreedOrigins .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteAssassinsCreedOrigins").click(function (event) {
            console.log(event.target.name);
            var name = $("#AssassinsCreedOrigins .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteAssassinsCreedOrigins").click(function (event) {
            console.log(event.target.name);
            var name = $("#AssassinsCreedOrigins .panel-heading").text();
            downVoteGame(name);
        });


        ///////////////////////// Ashes of Singularity
        $("#ashesOfTheSingularityWishlist").click(function (event) {
            console.log(event.target.name);

            wishlistGame = $("#AshesOfTheSingularity .panel-heading").text();
            wishlistImage = $('#AshesOfTheSingularity .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
        });

        $("#upVoteAshesOfTheSingularity").click(function (event) {
            console.log(event.target.name);
            var name = $("#AshesOfTheSingularity .panel-heading").text();
            upVoteGame(name);
        });

        $("#downVoteAshesOfTheSingularity").click(function (event) {
            console.log(event.target.name);
            var name = $("#AshesOfTheSingularity .panel-heading").text();
            downVoteGame(name);
        });

//------------------------------------------------------------------------------------------------------------
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

//------------------------------------------------------------------------------------------------------------
        $("#batmanTheEnemyWithinWishlist").click(function (event) {
            console.log(event.target.name);
            wishlistGame = $("#BatmanTheEnemyWithin .panel-heading").text();
              wishlistImage = $('#BatmanTheEnemyWithin .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
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

//--------------------------------------------------------------------------------------------------------------
        $("#battleriteWishlist").click(function (event) {
            console.log(event.target.name);
            wishlistGame = $("#Battlerite .panel-heading").text();
              wishlistImage = $('#Battlerite .topImage').attr('src');
              insertIntoWishlist();
              insertToDatabase();
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

        $("#bitBlasterXLWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#BitBlasterXL .panel-heading").text();
      wishlistImage = $('#BitBlasterXL .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteBitBlasterXL").click(function (event) {
    console.log(event.target.name);
    var name = $("#BitBlasterXL .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteBitBlasterXL").click(function (event) {
    console.log(event.target.name);
    var name = $("#BitBlasterXL .panel-heading").text();
    downVoteGame(name);
});

///////////////// Black desert Online
$("#blackDesertOnlineWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#BlackDesertOnline .panel-heading").text();
      wishlistImage = $('#BlackDesertOnline .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteBlackDesertOnline").click(function (event) {
    console.log(event.target.name);
    var name = $("#BlackDesertOnline .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteBlackDesertOnline").click(function (event) {
    console.log(event.target.name);
    var name = $("#BlackDesertOnline .panel-heading").text();
    downVoteGame(name);
});

//////////////////// bulllet BulletStorm
$("#bulletStromWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#BulletStorm .panel-heading").text();
      wishlistImage = $('#BulletStorm .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteBulletStorm").click(function (event) {
    console.log(event.target.name);
    var name = $("#BulletStorm .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteBulletStorm").click(function (event) {
    console.log(event.target.name);
    var name = $("#BulletStorm .panel-heading").text();
    downVoteGame(name);
});

////////////// call of callOfDutyADVWAR
$("#callOfDutyADVWARWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#CallOfDutyADVWAR .panel-heading").text();
      wishlistImage = $('#CallOfDutyADVWAR .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteCallOfDutyADVWAR").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyADVWAR .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteCallOfDutyADVWAR").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyADVWAR .panel-heading").text();
    downVoteGame(name);
});

////////////call of CallOfDutyGhost
$("#callOfDutyGhostWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#CallOfDutyGhost .panel-heading").text();
      wishlistImage = $('#CallOfDutyGhost .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteCallOfDutyGhost").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyGhost .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteCallOfDutyGhost").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyGhost .panel-heading").text();
    downVoteGame(name);
});

/////call of CallOfDutyBlack3
$("#callOfDutyBlack3Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#CallOfDutyBlack3 .panel-heading").text();
      wishlistImage = $('#CallOfDutyBlack3 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteCallOfDutyBlack3").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyBlack3 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteCallOfDutyBlack3").click(function (event) {
    console.log(event.target.name);
    var name = $("#CallOfDutyBlack3 .panel-heading").text();
    downVoteGame(name);
});



//////////divinity
$("#divinityWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Divinity .panel-heading").text();
      wishlistImage = $('#Divinity .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDivinity").click(function (event) {
    console.log(event.target.name);
    var name = $("#Divinity .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDivinity").click(function (event) {
    console.log(event.target.name);
    var name = $("#Divinity .panel-heading").text();
    downVoteGame(name);
});

/////divnity 2
$("#divinity2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Divinity2 .panel-heading").text();
      wishlistImage = $('#Divinity2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDivinity2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Divinity2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDivinity2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Divinity2 .panel-heading").text();
    downVoteGame(name);
});


/////////Doom_
$("#doomWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Doom .panel-heading").text();
      wishlistImage = $('#Doom .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDoom").click(function (event) {
    console.log(event.target.name);
    var name = $("#Doom .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDoom").click(function (event) {
    console.log(event.target.name);
    var name = $("#Doom .panel-heading").text();
    downVoteGame(name);
});


////////////dragons downVoteGame
$("#dragonsDogmaWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#DragonsDogma .panel-heading").text();
      wishlistImage = $('#DragonsDogma .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDragonsDogma").click(function (event) {
    console.log(event.target.name);
    var name = $("#DragonsDogma .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDragonsDogma").click(function (event) {
    console.log(event.target.name);
    var name = $("#DragonsDogma .panel-heading").text();
    downVoteGame(name);
});


/////////// dishonourded 2
$("#dishonoured2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Dishonoured2 .panel-heading").text();
      wishlistImage = $('#Dishonoured2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDishonoured2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Dishonoured2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDishonoured2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Dishonoured2 .panel-heading").text();
    downVoteGame(name);
});

///////////deus ex
$("#deusExWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#DeusEx .panel-heading").text();
      wishlistImage = $('#DeusEx .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteDeusEx").click(function (event) {
    console.log(event.target.name);
    var name = $("#DeusEx .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteDeusEx").click(function (event) {
    console.log(event.target.name);
    var name = $("#DeusEx .panel-heading").text();
    downVoteGame(name);
});

///////////evil Within
$("#evilWithinWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#EvilWithin .panel-heading").text();
      wishlistImage = $('#EvilWithin .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteEvilWithin").click(function (event) {
    console.log(event.target.name);
    var name = $("#EvilWithin .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteEvilWithin").click(function (event) {
    console.log(event.target.name);
    var name = $("#EvilWithin .panel-heading").text();
    downVoteGame(name);
});

/////////evil within 2
$("#evilWithin2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#EvilWithin2 .panel-heading").text();
      wishlistImage = $('#EvilWithin2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteEvilWithin2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Battlerite .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteEvilWithin2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Battlerite .panel-heading").text();
    downVoteGame(name);
});
//////////
$("#evolveWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Evolve .panel-heading").text();
      wishlistImage = $('#Evolve .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteEvolve").click(function (event) {
    console.log(event.target.name);
    var name = $("#Evolve .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteEvolve").click(function (event) {
    console.log(event.target.name);
    var name = $("#Evolve .panel-heading").text();
    downVoteGame(name);
});

//////////FF15
$("#ff15Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#FF15 .panel-heading").text();
      wishlistImage = $('#FF15 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteFF15").click(function (event) {
    console.log(event.target.name);
    var name = $("#FF15 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteFF15").click(function (event) {
    console.log(event.target.name);
    var name = $("#FF15 .panel-heading").text();
    downVoteGame(name);
});

/////ff7
$("ff7Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#FF7 .panel-heading").text();
      wishlistImage = $('#FF7 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteFF7").click(function (event) {
    console.log(event.target.name);
    var name = $("#FF7 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteFF7").click(function (event) {
    console.log(event.target.name);
    var name = $("#FF7 .panel-heading").text();
    downVoteGame(name);
});


//////////////// fallout 4
$("#fallout4Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Fallout4 .panel-heading").text();
      wishlistImage = $('#Fallout4 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteFallout4").click(function (event) {
    console.log(event.target.name);
    var name = $("#Fallout4 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteFallout4").click(function (event) {
    console.log(event.target.name);
    var name = $("#Fallout4 .panel-heading").text();
    downVoteGame(name);
});

///////////GTA5
$("#gta4Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#GTA4 .panel-heading").text();
      wishlistImage = $('#GTA4 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteGTA4").click(function (event) {
    console.log(event.target.name);
    var name = $("#GTA4 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteGTA4").click(function (event) {
    console.log(event.target.name);
    var name = $("#GTA4 .panel-heading").text();
    downVoteGame(name);
});


//////GTA5
$("#gta5Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#GTA5 .panel-heading").text();
      wishlistImage = $('#GTA5 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteGTA5").click(function (event) {
    console.log(event.target.name);
    var name = $("#GTA5 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteGTA5").click(function (event) {
    console.log(event.target.name);
    var name = $("#GTA5 .panel-heading").text();
    downVoteGame(name);
});


////////////ghost Recon
$("#ghostReconWildWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#GhostReconWild .panel-heading").text();
      wishlistImage = $('#GhostReconWild .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteGhostReconWild").click(function (event) {
    console.log(event.target.name);
    var name = $("#GhostReconWild .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteGhostReconWild").click(function (event) {
    console.log(event.target.name);
    var name = $("#GhostReconWild .panel-heading").text();
    downVoteGame(name);
});

///////////// half life
$("#halfLife2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#HalfLife2 .panel-heading").text();
      wishlistImage = $('#HalfLife2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteHalfLife2").click(function (event) {
    console.log(event.target.name);
    var name = $("#HalfLife2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteHalfLife2").click(function (event) {
    console.log(event.target.name);
    var name = $("#HalfLife2 .panel-heading").text();
    downVoteGame(name);
});

//////////////// hitmanWishlist
$("#hitmanWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Hitman .panel-heading").text();
      wishlistImage = $('#Hitman .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteHitman").click(function (event) {
    console.log(event.target.name);
    var name = $("#Hitman .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteHitman").click(function (event) {
    console.log(event.target.name);
    var name = $("#Hitman .panel-heading").text();
    downVoteGame(name);
});

////////hunt
$("#huntWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Hunt .panel-heading").text();
      wishlistImage = $('#Hunt .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteHunt").click(function (event) {
    console.log(event.target.name);
    var name = $("#Hunt .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteHunt").click(function (event) {
    console.log(event.target.name);
    var name = $("#Hunt .panel-heading").text();
    downVoteGame(name);
});


///////////// injustice
$("#injusticeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Injustice .panel-heading").text();
      wishlistImage = $('#Injustice .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteInjustice").click(function (event) {
    console.log(event.target.name);
    var name = $("#Injustice .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteInjustice").click(function (event) {
    console.log(event.target.name);
    var name = $("#Injustice .panel-heading").text();
    downVoteGame(name);
});

/////injustice 2
$("#injustice2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Injustice2 .panel-heading").text();
      wishlistImage = $('#Injustice2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteInjustice2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Injustice2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteInjustice2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Injustice2 .panel-heading").text();
    downVoteGame(name);
});


//////////ice wind Dale
$("#icewindDaleWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#IcewindDale .panel-heading").text();
      wishlistImage = $('#IcewindDale .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteIcewindDale").click(function (event) {
    console.log(event.target.name);
    var name = $("#IcewindDale .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteIcewindDale").click(function (event) {
    console.log(event.target.name);
    var name = $("#IcewindDale .panel-heading").text();
    downVoteGame(name);
});

////////jade Empire
$("#jadeEmpireWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#JadeEmpire .panel-heading").text();
      wishlistImage = $('#JadeEmpire .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteJadeEmpire").click(function (event) {
    console.log(event.target.name);
    var name = $("#JadeEmpire .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteJadeEmpire").click(function (event) {
    console.log(event.target.name);
    var name = $("#JadeEmpire .panel-heading").text();
    downVoteGame(name);
});

//////////////// just cause 2

$("#justCause2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#JustCause2 .panel-heading").text();
      wishlistImage = $('#JustCause2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteJustCause2").click(function (event) {
    console.log(event.target.name);
    var name = $("#JustCause2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteJustCause2").click(function (event) {
    console.log(event.target.name);
    var name = $("#JustCause2 .panel-heading").text();
    downVoteGame(name);
});

/////just cause 3

$("#justCause3Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#JustCause3 .panel-heading").text();
      wishlistImage = $('#JustCause3 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteJustCause3").click(function (event) {
    console.log(event.target.name);
    var name = $("#JustCause3 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteJustCause3").click(function (event) {
    console.log(event.target.name);
    var name = $("#JustCause3 .panel-heading").text();
    downVoteGame(name);
});


/////////killer Instinct
$("#killerInstinctWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#KillerInstinct .panel-heading").text();
      wishlistImage = $('#KillerInstinct .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteKillerInstinct").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillerInstinct .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteKillerInstinct").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillerInstinct .panel-heading").text();
    downVoteGame(name);
});

//////killing KillingFloor
$("#killingFloorWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#KillingFloor .panel-heading").text();
      wishlistImage = $('#KillingFloor .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteKillingFloor").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillingFloor .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteKillingFloor").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillingFloor .panel-heading").text();
    downVoteGame(name);
});

/////killing floor 2
$("#killingFloor2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#KillingFloor2 .panel-heading").text();
      wishlistImage = $('#KillingFloor2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteKillingFLoor2").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillingFloor2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteKillingFloor2").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillingFloor2 .panel-heading").text();
    downVoteGame(name);
});
///// lifre is strange
$("#lifeIsStrangeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#LifeIsStrange .panel-heading").text();
      wishlistImage = $('#LifeIsStrange .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteLifeIsStrange").click(function (event) {
    console.log(event.target.name);
    var name = $("#LifeIsStrange .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteLifeIsStrange").click(function (event) {
    console.log(event.target.name);
    var name = $("#LifeIsStrange .panel-heading").text();
    downVoteGame(name);
});
/////left for dead
$("#left4DeadWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Left4Dead .panel-heading").text();
      wishlistImage = $('#Left4Dead .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteLeft4Dead").click(function (event) {
    console.log(event.target.name);
    var name = $("#Left4Dead .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteLeft4Dead").click(function (event) {
    console.log(event.target.name);
    var name = $("#Left4Dead .panel-heading").text();
    downVoteGame(name);
});
/////left for dead 2
$("#left4Dead2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Left4Dead2 .panel-heading").text();
      wishlistImage = $('#Left4Dead2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVote:Left4Dead2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Left4Dead2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteLeft4Dead2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Left4Dead2 .panel-heading").text();
    downVoteGame(name);
});
/////mafia 2
$("#mafia2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Mafia2 .panel-heading").text();
      wishlistImage = $('#Mafia2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteMafia2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Mafia2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteMafia2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Mafia2 .panel-heading").text();
    downVoteGame(name);
});
/////metal gear
$("#metalGear5Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#MetalGear5 .panel-heading").text();
      wishlistImage = $('#MetalGear5 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteMetalGear5").click(function (event) {
    console.log(event.target.name);
    var name = $("#MetalGear5 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteMetalGear5").click(function (event) {
    console.log(event.target.name);
    var name = $("#MetalGear5 .panel-heading").text();
    downVoteGame(name);
});
/////metro
$("#metroWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Metro .panel-heading").text();
      wishlistImage = $('#Metro .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteMetro").click(function (event) {
    console.log(event.target.name);
    var name = $("#KillingFloor2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteMetro").click(function (event) {
    console.log(event.target.name);
    var name = $("#Metro .panel-heading").text();
    downVoteGame(name);
});
///// niNoKuni2
$("#niNoKuni2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#NiNoKuni2 .panel-heading").text();
      wishlistImage = $('#NiNoKuni2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteNiNoKuni2").click(function (event) {
    console.log(event.target.name);
    var name = $("#NiNoKuni2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteNiNoKuni2").click(function (event) {
    console.log(event.target.name);
    var name = $("#NiNoKuni2 .panel-heading").text();
    downVoteGame(name);
});
/////nier automata
$("#nierAutomataWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#NierAutomata .panel-heading").text();
      wishlistImage = $('#NierAutomata .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteNierAutomata").click(function (event) {
    console.log(event.target.name);
    var name = $("#NierAutomata .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteNierAutomata").click(function (event) {
    console.log(event.target.name);
    var name = $("#NierAutomata .panel-heading").text();
    downVoteGame(name);
});
/////nba
$("#nba2k18Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Nba2k18 .panel-heading").text();
      wishlistImage = $('#Nba2k18 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteNba2k18").click(function (event) {
    console.log(event.target.name);
    var name = $("#Nba2k18 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteNba2k18").click(function (event) {
    console.log(event.target.name);
    var name = $("#Nba2k18 .panel-heading").text();
    downVoteGame(name);
});
/////onimusha
$("#onimusha3DSWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Onimusha3DS .panel-heading").text();
      wishlistImage = $('#Onimusha3DS .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteOnimusha3DS").click(function (event) {
    console.log(event.target.name);
    var name = $("#Onimusha3DS .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteOnimusha3DS").click(function (event) {
    console.log(event.target.name);
    var name = $("#Onimusha3DS .panel-heading").text();
    downVoteGame(name);
});
/////oxygenNotIncluded
$("#oxygenNotIncludedWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#OxygenNotIncluded .panel-heading").text();
      wishlistImage = $('#OxygenNotIncluded .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteOxygenNotIncluded").click(function (event) {
    console.log(event.target.name);
    var name = $("#OxygenNotIncluded .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteOxygenNotIncluded").click(function (event) {
    console.log(event.target.name);
    var name = $("#OxygenNotIncluded .panel-heading").text();
    downVoteGame(name);
});
/////oulast 2
$("#outlast2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Outlast2 .panel-heading").text();
      wishlistImage = $('#Outlast2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteOutlast2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Outlast2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteOutlast2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Outlast2 .panel-heading").text();
    downVoteGame(name);
});
/////portal2
$("#portal2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Portal2 .panel-heading").text();
      wishlistImage = $('#Portal2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVotePortal2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Portal2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVotePortal2").click(function (event) {
    console.log(event.target.name);
    var name = $("#Portal2 .panel-heading").text();
    downVoteGame(name);
});

/////pubg
$("#pubgWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Pubg .panel-heading").text();
      wishlistImage = $('#Pubg .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVotePubg").click(function (event) {
    console.log(event.target.name);
    var name = $("#Pubg .panel-heading").text();
    upVoteGame(name);
});

$("#downVotePubg").click(function (event) {
    console.log(event.target.name);
    var name = $("#Pubg .panel-heading").text();
    downVoteGame(name);
});
/////plague inc
$("#plagueIncWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#PlagueInc .panel-heading").text();
      wishlistImage = $('#PlagueInc .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVotePlagueInc").click(function (event) {
    console.log(event.target.name);
    var name = $("#PlagueInc .panel-heading").text();
    upVoteGame(name);
});

$("#downVotePlagueInc").click(function (event) {
    console.log(event.target.name);
    var name = $("#PlagueInc .panel-heading").text();
    downVoteGame(name);
});
/////qube
$("#qubeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Qube .panel-heading").text();
      wishlistImage = $('#Qube .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteQube").click(function (event) {
    console.log(event.target.name);
    var name = $("#Qube .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteQube").click(function (event) {
    console.log(event.target.name);
    var name = $("#Qube .panel-heading").text();
    downVoteGame(name);
});
/////quake4
$("#quake4Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Quake4 .panel-heading").text();
      wishlistImage = $('#Quake4 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteQuake").click(function (event) {
    console.log(event.target.name);
    var name = $("#Quake4 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteQuake4").click(function (event) {
    console.log(event.target.name);
    var name = $("#Quake4 .panel-heading").text();
    downVoteGame(name);
});
/////quadrilateralCowboy
$("#quadrilateralCowboyWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#QuadrilateralCowboy .panel-heading").text();
      wishlistImage = $('#QuadrilateralCowboy .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteQuadrilateralCowboy").click(function (event) {
    console.log(event.target.name);
    var name = $("#QuadrilateralCowboy .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteQuadrilateralCowboy").click(function (event) {
    console.log(event.target.name);
    var name = $("#QuadrilateralCowboy .panel-heading").text();
    downVoteGame(name);
});
/////rime
$("#rimeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Rime .panel-heading").text();
      wishlistImage = $('#Rime .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteRime").click(function (event) {
    console.log(event.target.name);
    var name = $("#Rime .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteRime").click(function (event) {
    console.log(event.target.name);
    var name = $("#Rime .panel-heading").text();
    downVoteGame(name);
});
///// remeber me
$("#rememberMeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#RememberMe .panel-heading").text();
      wishlistImage = $('#RememberMe .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteRememberMe").click(function (event) {
    console.log(event.target.name);
    var name = $("#RememberMe .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteRememberMe").click(function (event) {
    console.log(event.target.name);
    var name = $("#RememberMe .panel-heading").text();
    downVoteGame(name);
});
/////rogue legacy
$("#rogueLegacyWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#RogueLegacy .panel-heading").text();
      wishlistImage = $('#RogueLegacy .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteRogueLegacy").click(function (event) {
    console.log(event.target.name);
    var name = $("#RogueLegacy .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteRogueLegacy").click(function (event) {
    console.log(event.target.name);
    var name = $("#RogueLegacy .panel-heading").text();
    downVoteGame(name);
});
///// sonic mania
$("#sonicManiaWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#SonicMania .panel-heading").text();
      wishlistImage = $('#SonicMania .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteSonicMania").click(function (event) {
    console.log(event.target.name);
    var name = $("#SonicMania .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteSonicMania").click(function (event) {
    console.log(event.target.name);
    var name = $("#SonicMania .panel-heading").text();
    downVoteGame(name);
});
/////sims 3
$("#sims3Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Sims3 .panel-heading").text();
      wishlistImage = $('#Sims3 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteSims3").click(function (event) {
    console.log(event.target.name);
    var name = $("#Sims3 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteSims3").click(function (event) {
    console.log(event.target.name);
    var name = $("#Sims3 .panel-heading").text();
    downVoteGame(name);
});
/////starbound
$("#starboundWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Starbound .panel-heading").text();
      wishlistImage = $('#Starbound .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteStarbound").click(function (event) {
    console.log(event.target.name);
    var name = $("#Starbound .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteStarbound").click(function (event) {
    console.log(event.target.name);
    var name = $("#Starbound .panel-heading").text();
    downVoteGame(name);
});
/////Terraria
$("#terrarriaWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Terraria .panel-heading").text();
      wishlistImage = $('#Terraria .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteTerraria").click(function (event) {
    console.log(event.target.name);
    var name = $("#Terraria .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteTerraria").click(function (event) {
    console.log(event.target.name);
    var name = $("#Terraria .panel-heading").text();
    downVoteGame(name);
});
/////killing floor 2
$("#tombRaiderWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#TombRaider .panel-heading").text();
      wishlistImage = $('#TombRaider .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteTombRaider").click(function (event) {
    console.log(event.target.name);
    var name = $("#TombRaider .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteTombRaider").click(function (event) {
    console.log(event.target.name);
    var name = $("#TombRaider .panel-heading").text();
    downVoteGame(name);
});
/////team fortress
$("#teamFortressWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#TeamFortress2 .panel-heading").text();
      wishlistImage = $('#TeamFortress2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteTeamFortress2").click(function (event) {
    console.log(event.target.name);
    var name = $("#TeamFortress2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteTeamFortress2").click(function (event) {
    console.log(event.target.name);
    var name = $("#TeamFortress2 .panel-heading").text();
    downVoteGame(name);
});
/////ultimateMvsC
$("ultimateMvsCWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#UltimateMvsC .panel-heading").text();
      wishlistImage = $('#UltimateMvsC .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteUltimateMvsC").click(function (event) {
    console.log(event.target.name);
    var name = $("#UltimateMvsC .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteUltimateMvsC").click(function (event) {
    console.log(event.target.name);
    var name = $("#UltimateMvsC .panel-heading").text();
    downVoteGame(name);
});
/////unchartedTheLostLegacy
$("#unchartedTheLostLegacyWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#UnchartedTheLostLegacy .panel-heading").text();
      wishlistImage = $('#UnchartedTheLostLegacy .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteUnchartedTheLostLegacy").click(function (event) {
    console.log(event.target.name);
    var name = $("#UnchartedTheLostLegacy .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteUnchartedTheLostLegacy").click(function (event) {
    console.log(event.target.name);
    var name = $("#UnchartedTheLostLegacy .panel-heading").text();
    downVoteGame(name);
});
/////urban empire
$("#urbanEmpireWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#UrbanEmpire .panel-heading").text();
      wishlistImage = $('#UrbanEmpire .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteUrbanEmpire").click(function (event) {
    console.log(event.target.name);
    var name = $("#UrbanEmpire .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteUrbanEmpire").click(function (event) {
    console.log(event.target.name);
    var name = $("#UrbanEmpire .panel-heading").text();
    downVoteGame(name);
});
////velvet assassin
$("#velvetAssassinWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#VelvetAssassin .panel-heading").text();
      wishlistImage = $('#VelvetAssassin .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteVelvetAssassin").click(function (event) {
    console.log(event.target.name);
    var name = $("#VelvetAssassin .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteVelvetAssassin").click(function (event) {
    console.log(event.target.name);
    var name = $("#VelvetAssassin .panel-heading").text();
    downVoteGame(name);
});
/////virtuaTennis4
$("#virtuaTennis4Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#VirtuaTennis4 .panel-heading").text();
      wishlistImage = $('#VirtuaTennis4 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteVirtuaTennis4").click(function (event) {
    console.log(event.target.name);
    var name = $("#VirtuaTennis4 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteVirtuaTennis4").click(function (event) {
    console.log(event.target.name);
    var name = $("#VirtuaTennis4 .panel-heading").text();
    downVoteGame(name);
});
/////vanquish
$("#vanquishWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Vanquish .panel-heading").text();
      wishlistImage = $('#Vanquish .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteVanquish").click(function (event) {
    console.log(event.target.name);
    var name = $("#Vanquish .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteVanquish").click(function (event) {
    console.log(event.target.name);
    var name = $("#Vanquish .panel-heading").text();
    downVoteGame(name);
});
/////we happy few
$("#weHappyFewWishlist2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#WeHappyFew .panel-heading").text();
      wishlistImage = $('#WeHappyFew .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteWeHappyFew").click(function (event) {
    console.log(event.target.name);
    var name = $("#WeHappyFew .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteWeHappyFew").click(function (event) {
    console.log(event.target.name);
    var name = $("#WeHappyFew .panel-heading").text();
    downVoteGame(name);
});
/////watchDogs
$("#watchDogsWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#WatchDogs .panel-heading").text();
      wishlistImage = $('#WatchDogs .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteWatchDogs").click(function (event) {
    console.log(event.target.name);
    var name = $("#WatchDogs .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteWatchDogs").click(function (event) {
    console.log(event.target.name);
    var name = $("#WatchDogs .panel-heading").text();
    downVoteGame(name);
});
/////////xenonValkyrie
$("#xenonValkyrieWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#XenonValkyrie .panel-heading").text();
      wishlistImage = $('#XenonValkyrie .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteXenonValkyrie").click(function (event) {
    console.log(event.target.name);
    var name = $("#XenonValkyrie .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteXenonValkyrie").click(function (event) {
    console.log(event.target.name);
    var name = $("#XenonValkyrie .panel-heading").text();
    downVoteGame(name);
});
/////xcom
$("#xcom2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#XCom2 .panel-heading").text();
      wishlistImage = $('#XCom2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteXCom2").click(function (event) {
    console.log(event.target.name);
    var name = $("#XCom2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteXCom2").click(function (event) {
    console.log(event.target.name);
    var name = $("#XCom2 .panel-heading").text();
    downVoteGame(name);
});
/////xblades
$("#xbladesWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#XBlades .panel-heading").text();
      wishlistImage = $('#XBlades .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteXBlades").click(function (event) {
    console.log(event.target.name);
    var name = $("#XBlades .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteXBlades").click(function (event) {
    console.log(event.target.name);
    var name = $("#XBlades .panel-heading").text();
    downVoteGame(name);
});
/////the TheWitcher3
$("#theWitcher3Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#TheWitcher3 .panel-heading").text();
      wishlistImage = $('#TheWitcher3 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteTheWitcher3").click(function (event) {
    console.log(event.target.name);
    var name = $("#TheWitcher3 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteTheWitcher3").click(function (event) {
    console.log(event.target.name);
    var name = $("#TheWitcher3 .panel-heading").text();
    downVoteGame(name);
});
/////yookaLaylee
$("#yookaLayleeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#YookaLaylee .panel-heading").text();
      wishlistImage = $('#YookaLaylee .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteYookaLaylee").click(function (event) {
    console.log(event.target.name);
    var name = $("#YookaLaylee .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteYookaLaylee").click(function (event) {
    console.log(event.target.name);
    var name = $("#YookaLaylee .panel-heading").text();
    downVoteGame(name);
});
/////yar YarsRevenge
$("#yarsRevengeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#YarsRevenge .panel-heading").text();
      wishlistImage = $('#YarsRevenge .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteYarsRevenge").click(function (event) {
    console.log(event.target.name);
    var name = $("#YarsRevenge .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteYarsRevenge").click(function (event) {
    console.log(event.target.name);
    var name = $("#YarsRevenge .panel-heading").text();
    downVoteGame(name);
});/////yaibaNinjaGaidenZ
$("#yaibaNinjaGaidenZWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#YaibaNinjaGaidenZ .panel-heading").text();
      wishlistImage = $('#YaibaNinjaGaidenZ .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteYaibaNinjaGaidenZ").click(function (event) {
    console.log(event.target.name);
    var name = $("#YaibaNinjaGaidenZ .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteYaibaNinjaGaidenZ").click(function (event) {
    console.log(event.target.name);
    var name = $("#YaibaNinjaGaidenZ .panel-heading").text();
    downVoteGame(name);
});
/////zengeWishlist
$("#zengeWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#Zenge .panel-heading").text();
      wishlistImage = $('#Zenge .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteZenge").click(function (event) {
    console.log(event.target.name);
    var name = $("#Zenge .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteZenge").click(function (event) {
    console.log(event.target.name);
    var name = $("#Zenge .panel-heading").text();
    downVoteGame(name);
});
/////zeno Clash
$("#zenoClash2Wishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#ZenoClash2 .panel-heading").text();
      wishlistImage = $('#ZenoClash2 .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteZenoClash2").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZenoClash2 .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteZenoClash2").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZenoClash2 .panel-heading").text();
    downVoteGame(name);
});
/////zeroTimeDilema
$("#zeroTimeDilemaWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#ZeroTimeDilema .panel-heading").text();
      wishlistImage = $('#ZeroTimeDilema .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteZeroTimeDilema").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZeroTimeDilema .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteZeroTimeDilema").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZeroTimeDilema .panel-heading").text();
    downVoteGame(name);
});
/////zeroEscapeVLR
$("#zeroEscapeVLRWishlist").click(function (event) {
    console.log(event.target.name);
    wishlistGame = $("#ZeroEscapeVLR .panel-heading").text();
      wishlistImage = $('#ZeroEscapeVLR .topImage').attr('src');
      insertIntoWishlist();
      insertToDatabase();
});

$("#upVoteZeroEscapeVLR").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZeroEscapeVLR .panel-heading").text();
    upVoteGame(name);
});

$("#downVoteZeroEscapeVLR").click(function (event) {
    console.log(event.target.name);
    var name = $("#ZeroEscapeVLR .panel-heading").text();
    downVoteGame(name);
});


    });
