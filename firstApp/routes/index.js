var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');
var AC_Origins_Comments = require('../models/AC_Origins_Comments');
var battlefieldOne_Comments = require('../models/battlefieldOne_Comments');
var aceAttorney_Comments = require('../models/AceAttorney_Comments');
var bendyAndTheInkMachine_Comments = require('../models/bendyAndTheInkMachine_Comments');
var CallOfDutyADVWAR_Comments = require('../models/CallOfDutyADVWAR_Comments');
var CallOfDutyBlack3_Comments = require('../models/CallOfDutyBlack3_Comments');
var CallOfDutyGhost_Comments = require('../models/CallOfDutyGhost_Comments');
var Divinity_2_Comments = require('../models/Divinity_2_Comments');
var Doom_Comments = require('../models/Doom_Comments');
var Divinity_Comments = require('../models/Divinity_Comments');
var DragonsDogma_Comments = require('../models/DragonsDogma_Comments');
var Dishonoured2_Comments = require('../models/Dishonoured2_Comments');
var DeusEx_Comments = require('../models/DeusEx_Comments');
var EvilWithin_Comments = require('../models/EvilWithin_Comments');
var EvilWithin2_Comments = require('../models/EvilWithin2_Comments');
var Evolve_Comments = require('../models/Evolve_Comments');
var FF15_Comments = require('../models/FF15_Comments');
var Fallout4_Comments = require('../models/Fallout4_Comments');
var FF7_Comments = require('../models/FF7_Comments');
var GTA5_Comments = require('../models/GTA5_Comments');
var GTA4_Comments = require('../models/GTA4_Comments');
var GhostReconWild_Comments = require('../models/GhostReconWild_Comments');
var HalfLife2_Comments = require('../models/HalfLife2_Comments');
var Hitman_Comments = require('../models/Hitman_Comments');
var Hunt_Comments = require('../models/Hunt_Comments');
var Injustice_Comments = require('../models/Injustice_Comments');
var Injustice2_Comments = require('../models/Injustice2_Comments');
var IcewindDale_Comments = require('../models/IcewindDale_Comments');
var JadeEmpire_Comments = require('../models/JadeEmpire_Comments');
var JustCause2_Comments = require('../models/JustCause2_Comments');
var JustCause3_Comments = require('../models/JustCause2_Comments');
var KillerInstinct_Comments = require('../models/KillerInstinct_Comments');
var KillingFloor_Comments = require('../models/KillingFloor_Comments');
var KillingFloor2_Comments = require('../models/KillingFloor2_Comments');
var LifeIsStrange_Comments = require('../models/LifeIsStrange_Comments');
var Left4Dead_Comments = require('../models/Left4Dead_Comments');
var Left4Dead2_Comments = require('../models/Left4Dead2_Comments');
var Mafia2_Comments = require('../models/Mafia2_Comments');
var MetalGear5_Comments = require('../models/MetalGear5_Comments');
var Metro_Comments = require('../models/Metro_Comments');
var jwt = require('jsonwebtoken');
var gameValue = require('../models/gameValues');

// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var requester = new XMLHttpRequest();

//-------------------------votes for games-------------------------
router.post('/add_game_to_dB', function(req, res, next) {
    newGame = new gameValue(req.body);
    newGame.save(function (err, game) {
        if (err)
            throw err;

        res.json({
            "id": game._id
        });
    });
});

router.put('/editVotes/:id', function(req, res, next){

    var id = req.params.id;
    gameValue.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the wishlist"});
    });
});

router.get('/get_gameValues', function(req, res, next) {

    gameValue.find({}, function(err, gameValues){
        if(err)
            res.send(err);

        res.json(gameValues);
    })

});

//-----Testing wishlist------

var wishlist_items = require('../models/wishlistModel');

router.post('/add_to_wishlist', function(req, res, next) {
  try {
        var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
        if (profile) {
          wishlistItem = new wishlist_items(req.body);
          wishlistItem.save(function (err, savedComment) {
              if (err)
                  throw err;

              res.json({
                  "id": savedComment._id
              });
          });
        }
    }catch (err) {
          window.alert("Log in plz");
        }
});

router.get('/get_wishlist', function(req, res, next) {

    wishlist_items.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.put('/updateWishlist/:id', function(req, res, next){

    var id = req.params.id;
    wishlist_items.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the wishlist"});
    });
});


router.delete('/remove_from_wishlist/:id', function(req, res, next){

    var id = req.params.id;
    wishlist_items.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The game has been removed succesfully"});
    });
});

//-------------------------------Get the Home Page-------------------------------------------

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//------------------------------Get the Feeds Page-------------------------------------------

router.get('/feed', function(req, res, next) {
    res.render('feed');
});
//-------------------------Comments for AC_Origins------------------------------------------

router.post('/add_AC_Origins_Comment', function(req, res, next) {
    comment = new AC_Origins_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_AC_Origins_Comments', function(req, res, next) {

    AC_Origins_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_AC_Origins_Comment/:id', function(req, res, next){

    var id = req.params.id;
    AC_Origins_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    AC_Origins_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//----------------------------------------Comments for battlefieldOne---------------------------------------------

router.post('/add_battlefieldOne_Comment', function(req, res, next) {
    comment = new battlefieldOne_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_battleFieldOne_Comments', function(req, res, next) {

      battlefieldOne_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_battleFieldOne_Comment/:id', function(req, res, next){

    var id = req.params.id;
      battlefieldOne_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_battleFieldOne_Comment/:id', function(req, res, next){

    var id = req.params.id;
    battlefieldOne_Comments.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});



//-------------------------Adding comments to the database----------------------------------

//router.post('/add_AC_Origins_Comment', function(req, res, next) {
router.post('/addComment', function(req, res, next) {
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});



//---------------------Retrieving every single comment from the database---------------------

// router.get('/getComments', function(req, res, next) {
//
//     //Pass in the object query and return the response through obj.json()
//     Comment.find({}, function(err, comments){
//         if(err)
//             res.send(err);
//
//         res.json(comments);
//     })
//
// });

//------------------Updating a comment that is already in the database-----------------------

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function(err) {
        if(err)
            res.send(err);

        res.json({status : "The comment has been updated succesfully"});
    });
});

//-------------------------Removing a comment from the database-----------------------------

router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

//----------------------------------------Comments for aceAttorney---------------------------------------------

router.post('/add_aceAttorney_Comment', function(req, res, next) {
    comment = new aceAttorney_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_aceAttorney_Comments', function(req, res, next) {

      aceAttorney_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_aceAttorney_Comment/:id', function(req, res, next){

    var id = req.params.id;
      aceAttorney_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

//----------------------------------------Comments for aceAttorney---------------------------------------------

router.post('/add_bendyAndTheInkMachine_Comment', function(req, res, next) {
    comment = new bendyAndTheInkMachine_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_bendyAndTheInkMachine_Comments', function(req, res, next) {

      bendyAndTheInkMachine_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_bendyAndTheInkMachine_Comment/:id', function(req, res, next){

    var id = req.params.id;
      bendyAndTheInkMachine_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});


//-------------------------------------------------------------------------------------------


//Creates a Jason Web Token (JWT)
function createJwt(profile) {
    return jwt.sign(profile, 'CSIsTheWorst', {
        expiresIn: '10d'
    });
}


function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, 'CSIsTheWorst');
    return value;
}
module.exports = router;
