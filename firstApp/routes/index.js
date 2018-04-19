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
///// colette added//////
var zenge_comments = require('../models/zenge_comments');
var zeroTimeDilema_comments = require('../models/zeroTimeDilema_comments');
var zenoClash2_comments = require('../models/zenoClash2_comments');
var zenoEscapeVLR_comments = require('../models/zeroEscapeVLR_comments');
var yookaLaylee_comments = require('../models/yookaLaylee_comments');
var yarsRevenge_comments = require('../models/yarsRevenge_comments');
var yaibaNinjaGaidenZ_comments = require('../models/yaibaNinjaGaidenZ_comments');
var xCom2_comments = require('../models/xCom2_comments');
var xBlades_comments = require('../models/xBlades_comments');
var xenonValkyrie_comments = require('../models/xenonValkyrie_comments');
var watchDogs_comments= require('../models/watchDogs_comments');
var theWitcher3_comments = require('../models/theWitcher3_comments');
var weHappyFew_comments = require('../models/weHappyFew_comments');
var velvetAssassin_comments = require('../models/velvetAssassin_comments');
var vanquish_comments = require('../models/vanquish_comments');
var virtuaTennis4_comments = require('../models/virtuaTennis4_comments');
var ultimateMvsC_comments = require('../models/ultimateMvsC_comments');
var urbanEmpire_comments = require('../models/urbanEmpire_comments');
var unchartedTheLostLegacy_comments = require('../models/unchartedTheLostLegacy_comments');
var tombRaider_comments = require('../models/tombRaider_comments');
var terraria_comments = require('../models/terraria_comments');
var teamFortress2_comments = require('../models/teamFortress2_comments');
var sims3_comments = require('../models/sims3_comments');
var sonicMania_comments = require('../models/sonicMania_comments');
var starbound_comments = require('../models/starbound_comments');
var rime_comments = require('../models/rime_comments');
var rogueLegacy_comments = require('../models/rogueLegacy_comments');
var rememberMe_comments = require('../models/rememberMe_comments');
var qube_comments = require('../models/qube_comments');
var pubg_comments = require('../models/pubg_comments');
var portal2_comments = require('../models/portal2_comments');
var quadrilateralCowboy_comments = require('../models/quadrilateralCowboy_comments');
var quake4_comments = require('../models/quake4_comments');
var plagueInc_comments = require('../models/plagueInc_comments');
var oxygenNotIncluded_comments = require('../models/oxygenNotIncluded_comments');
var onimusha3DS_comments = require('../models/onimusha3DS_comments');
var nba2k18_comments = require('../models/nba2k18_comments');
var nierAutomata_comments = require('../models/nierAutomata_comments');
var niNoKuni2_comments = require('../models/niNoKuni2_comments');
var oulast2_comments = require('../models/outlast2_comments');

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


//-------------------------Comments for CallOfDutyBlack3.hbs------------------------------------------

router.post('/add_CallOfDutyBlack3_Comments', function(req, res, next) {
    comment = new CallOfDutyBlack3_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_CallOfDutyBlack3_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    CallOfDutyBlack3_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_CallOfDutyBlack3_Comments/:id', function(req, res, next){

    var id = req.params.id;
    CallOfDutyBlack3_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_CallOfDutyBlack3_Comment/:id', function(req, res, next){

    var id = req.params.id;
    CallOfDutyBlack3_Comments.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for CallOfDutyGhost.hbs------------------------------------------

router.post('/add_CallOfDutyGhost_Comments', function(req, res, next) {
    comment = new CallOfDutyGhost_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_CallOfDutyGhost_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    CallOfDutyGhost_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_CallOfDutyGhost_Comments/:id', function(req, res, next){

    var id = req.params.id;
  CallOfDutyGhost_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    CallOfDutyGhost_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Divinity_2------------------------------------------

router.post('/add_Divinity_2_Comments', function(req, res, next) {
    comment = new Divinity_2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Divinity_2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Divinity_2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Divinity_2_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Divinity_2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Divinity_2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Doom------------------------------------------

router.post('/add_Doom_Comments', function(req, res, next) {
    comment = new Doom_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Doom_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Doom_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Doom_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Doom_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Doom_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Divinity------------------------------------------

router.post('/add_Divinity_Comments', function(req, res, next) {
    comment = new Divinity_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Divinity_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Divinity_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Divinity_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Divinity_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Divinity_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for DragonsDogma------------------------------------------

router.post('/add_DragonsDogma_Comments', function(req, res, next) {
    comment = new Doom_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_DragonsDogma_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    DragonsDogma_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_DragonsDogma_Comments/:id', function(req, res, next){

    var id = req.params.id;
    DragonsDogma_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    DragonsDogma_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Dishonoured2------------------------------------------

router.post('/add_Dishonoured2_Comments', function(req, res, next) {
    comment = new Dishonoured2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Dishonoured2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Dishonoured2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Dishonoured2_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Dishonoured2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Dishonoured2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for DeusEx------------------------------------------

router.post('/add_DeusEx_Comments', function(req, res, next) {
    comment = new DeusEx_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_DeusEx_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    DeusEx_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_DeusEx_Comments/:id', function(req, res, next){

    var id = req.params.id;
    DeusEx_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    DeusEx_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for EvilWithin.hbs------------------------------------------

router.post('/add_EvilWithin_Comments', function(req, res, next) {
    comment = new EvilWithin_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_EvilWithin_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    EvilWithin_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_EvilWithin_Comments/:id', function(req, res, next){

    var id = req.params.id;
    EvilWithin_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    EvilWithin_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for EvilWithin2.hbs------------------------------------------

router.post('/add_EvilWithin2_Comments', function(req, res, next) {
    comment = new EvilWithin2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_EvilWithin2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    EvilWithin2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_EvilWithin2_Comments/:id', function(req, res, next){

    var id = req.params.id;
    EvilWithin2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  EvilWithin2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Evolve.hbs------------------------------------------

router.post('/add_Evolve_Comments', function(req, res, next) {
    comment = new Evolve_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Evolve_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Evolve_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Evolve_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Evolve_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Evolve_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for FF15.hbs------------------------------------------

router.post('/add_FF15_Comments', function(req, res, next) {
    comment = new FF15_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_FF15_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    FF15_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_FF15_Comments/:id', function(req, res, next){

    var id = req.params.id;
  FF15_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  FF15_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Fallout4.hbs------------------------------------------

router.post('/add_Fallout4_Comments', function(req, res, next) {
    comment = new Fallout4_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Fallout4_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Fallout4_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Fallout4_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Fallout4_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Fallout4_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for FF7.hbs------------------------------------------

router.post('/add_FF7_Comments', function(req, res, next) {
    comment = new FF7_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_FF7_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    FF7_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_FF7_Comments/:id', function(req, res, next){

    var id = req.params.id;
  FF7_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  FF7_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for GTA5.hbs------------------------------------------

router.post('/add_GTA5_Comments', function(req, res, next) {
    comment = new GTA5_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_GTA5_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    GTA5_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_GTA5_Comments/:id', function(req, res, next){

    var id = req.params.id;
  GTA5_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  GTA5_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for GTA4.hbs------------------------------------------

router.post('/add_GTA4_Comments', function(req, res, next) {
    comment = new GTA4_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_GTA4_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    GTA4_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_GTA4_Comments/:id', function(req, res, next){

    var id = req.params.id;
 GTA4_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  GTA4_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for GhostReconWild.hbs------------------------------------------

router.post('/add_GhostReconWild_Comments', function(req, res, next) {
    comment = new GhostReconWild_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_GhostReconWild_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    GhostReconWild_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_GhostReconWild_Comments/:id', function(req, res, next){

    var id = req.params.id;
 GhostReconWild_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  GhostReconWild_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for HalfLife2.hbs------------------------------------------

router.post('/add_HalfLife2_Comments', function(req, res, next) {
    comment = new HalfLife2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_HalfLife2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    HalfLife2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_HalfLife2_Comments/:id', function(req, res, next){

    var id = req.params.id;
 HalfLife2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  HalfLife2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Hitman.hbs------------------------------------------

router.post('/add_Hitman_Comments', function(req, res, next) {
    comment = new Hitman_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Hitman_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Hitman_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Hitman_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Hitman_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Hitman_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Hunt.hbs------------------------------------------

router.post('/add_Hunt_Comments', function(req, res, next) {
    comment = new Hunt_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Hunt_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Hunt_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Hunt_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Hunt_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Hunt_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Injustice.hbs------------------------------------------

router.post('/add_Injustice_Comments', function(req, res, next) {
    comment = new Injustice_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Injustice_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Injustice_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Injustice_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Injustice_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Injustice_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Injustice2.hbs------------------------------------------

router.post('/add_Injustice2_Comments', function(req, res, next) {
    comment = new Injustice2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Injustice2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Injustice2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Injustice2_Comments/:id', function(req, res, next){

    var id = req.params.id;
    Injustice2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Injustice2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for IcewindDale.hbs------------------------------------------

router.post('/add_IcewindDale_Comments', function(req, res, next) {
    comment = new IcewindDale_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_IcewindDale_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    IcewindDale_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_IcewindDale_Comments/:id', function(req, res, next){

    var id = req.params.id;
    IcewindDale_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  IcewindDale_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for JadeEmpire.hbs------------------------------------------

router.post('/add_JadeEmpire_Comments', function(req, res, next) {
    comment = new JadeEmpire_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_JadeEmpire_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    JadeEmpire_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_JadeEmpire_Comments/:id', function(req, res, next){

    var id = req.params.id;
    JadeEmpire_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  JadeEmpire_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for JustCause2.hbs------------------------------------------

router.post('/add_JustCause2_Comments', function(req, res, next) {
    comment = new JustCause2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_JustCause2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    JustCause2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_JustCause2_Comments/:id', function(req, res, next){

    var id = req.params.id;
  JustCause2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  JustCause2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for JustCause3.hbs------------------------------------------

router.post('/add_JustCause3_Comments', function(req, res, next) {
    comment = new JustCause3_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_JustCause3_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    JustCause3_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_JustCause3_Comments/:id', function(req, res, next){

    var id = req.params.id;
  JustCause3_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  JustCause3_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for KillerInstinct.hbs------------------------------------------

router.post('/add_KillerInstinct_Comments', function(req, res, next) {
    comment = new KillerInstinct_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_KillerInstinct_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    KillerInstinct_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_KillerInstinct_Comments/:id', function(req, res, next){

    var id = req.params.id;
  KillerInstinct_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  KillerInstinct_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for KillingFloor.hbs------------------------------------------

router.post('/add_KillingFloor_Comments', function(req, res, next) {
    comment = new KillingFloor_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_KillingFloor_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    KillingFloor_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_KillingFloor_Comments/:id', function(req, res, next){

    var id = req.params.id;
  KillingFloor_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  KillingFloor_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for KillingFloor2.hbs------------------------------------------

router.post('/add_KillingFloor2_Comments', function(req, res, next) {
    comment = new KillingFloor2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_KillingFloor2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    KillingFloor2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_KillingFloor2_Comments/:id', function(req, res, next){

    var id = req.params.id;
  KillingFloor2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  KillingFloor2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for LifeIsStrange.hbs------------------------------------------

router.post('/add_LifeIsStrange_Comments', function(req, res, next) {
    comment = new LifeIsStrange_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_LifeIsStrange_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    LifeIsStrange_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_LifeIsStrange_Comments/:id', function(req, res, next){

    var id = req.params.id;
  LifeIsStrange_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  LifeIsStrange_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Left4Dead.hbs------------------------------------------

router.post('/add_Left4Dead_Comments', function(req, res, next) {
    comment = new Left4Dead_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Left4Dead_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Left4Dead_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Left4Dead_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Left4Dead_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Left4Dead_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Left4Dead2.hbs------------------------------------------

router.post('/add_Left4Dead2_Comments', function(req, res, next) {
    comment = new Left4Dead2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Left4Dead2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Left4Dead2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Left4Dead2_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Left4Dead2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Left4Dead2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Mafia2.hbs------------------------------------------

router.post('/add_Mafia2_Comments', function(req, res, next) {
    comment = new Mafia2_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Mafia2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Mafia2_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Mafia2_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Mafia2_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Mafia2_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for MetalGear5.hbs------------------------------------------

router.post('/add_MetalGear5_Comments', function(req, res, next) {
    comment = new MetalGear5_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_MetalGear5_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    MetalGear5_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_MetalGear5_Comments/:id', function(req, res, next){

    var id = req.params.id;
  MetalGear5_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  MetalGear5_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for Metro.hbs------------------------------------------

router.post('/add_Metro_Comments', function(req, res, next) {
    comment = new Metro_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_Metro_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    Metro_Comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_Metro_Comments/:id', function(req, res, next){

    var id = req.params.id;
  Metro_Comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
  Metro_Comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});


//-------------------------------------------------------------------------------------------

/////////colette added from here
//-------------------------Comments for zenge------------------------------------------

router.post('/add_zenge_Comment', function(req, res, next) {
    comment = new zenge_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_zenge_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    zenge_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_zenge_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zenge_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_zenge_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zenge_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for zeroTimeDilema------------------------------------------

router.post('/add_zeroTimeDilema_Comment', function(req, res, next) {
    comment = new zeroTimeDilema_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_zeroTimeDilema_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    zeroTimeDilema_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_zeroTimeDilema_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zeroTimeDilema_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_zeroTimeDilema_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zeroTimeDilema_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
////new game comments////
//-------------------------Comments for yooka Laylee------------------------------------------

router.post('/add_yookaLaylee_Comment', function(req, res, next) {
    comment = new yookaLaylee_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_yookaLaylee_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    yookaLaylee_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_yookaLaylee_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yookaLaylee_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_yookaLaylee_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yookaLaylee_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for zenoClash2------------------------------------------

router.post('/add_zenoClash2_Comment', function(req, res, next) {
    comment = new zenge_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_zenoClash2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    zenoClash2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_zenoClash2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zenoClash2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_zenoClash2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zenoClash2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//-------------------------Comments for zeroEscapeVLR------------------------------------------

router.post('/add_zeroEscapeVLR_Comment', function(req, res, next) {
    comment = new zenge_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_zeroEscapeVLR_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    zeroEscapeVLR_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_zeroEscapeVLR_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zeroEscapeVLR_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_zeroEscapeVLR_Comment/:id', function(req, res, next){

    var id = req.params.id;
    zeroEscapeVLR_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/////comments for yars revnege
router.post('/add_yarsRevenge_Comment', function(req, res, next) {
    comment = new yarsRevenge_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_yarsRevenge_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    yarsRevenge_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_yarsRevenge_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yarsRevenge_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_yarsRevenge_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yarsRevenge_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///start comments yaiba ninja Gaiden
router.post('/add_yaibaNinjaGaidenZ_Comment', function(req, res, next) {
    comment = new yaibaNinjaGaidenZ_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_yaibaNinjaGaidenZ_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    yaibaNinjaGaidenZ_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_yaibaNinjaGaidenZ_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yaibaNinjaGaidenZ_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_yaibaNinjaGaidenZ_Comment/:id', function(req, res, next){

    var id = req.params.id;
    yaibaNinjaGaidenZ_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

////////xcom2 comments
router.post('/add_xCom2_Comment', function(req, res, next) {
    comment = new xCom2_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_xCom2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    xCom2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_xCom2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xCom2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_xCom2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xCom2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

//////xenon valkyrie commentsSchema
router.post('/add_xenonValkyrie_Comment', function(req, res, next) {
    comment = new xenonValkyrie_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_xenonValkyrie_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    xenonValkyrie_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_xenonValkyrie_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xenonValkyrie_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_xenonValkyrie_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xenonValkyrie_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});


////// xblades comments
router.post('/add_xBlades_Comment', function(req, res, next) {
    comment = new xBlades_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_xBlades_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  xBlades_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_xBlades_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xBlades_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_xBlades_Comment/:id', function(req, res, next){

    var id = req.params.id;
    xBlades_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
//watchdogs comments
router.post('/add_watchDogs_Comment', function(req, res, next) {
    comment = new watchDogs_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_watchDogs_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  watchDogs_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_watchDogs_Comment/:id', function(req, res, next){

    var id = req.params.id;
    watchDogs_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_watchDogs_Comment/:id', function(req, res, next){

    var id = req.params.id;
    watchDogs_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

////////we happpy few comments
router.post('/add_weHappyFew_Comment', function(req, res, next) {
    comment = new weHappyFew_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_weHappyFew_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  weHappyFew_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_weHappyFew_Comment/:id', function(req, res, next){

    var id = req.params.id;
    weHappyFew_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_weHappyFew_Comment/:id', function(req, res, next){

    var id = req.params.id;
    weHappyFew_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////the witcher3
router.post('/add_theWitcher3_Comment', function(req, res, next) {
    comment = new theWitcher3_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_theWitcher3_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  theWitcher3_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_theWitcher3_Comment/:id', function(req, res, next){

    var id = req.params.id;
    theWitcher3_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_theWitcher3_Comment/:id', function(req, res, next){

    var id = req.params.id;
    theWitcher3_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});



//////////vanquish_comments
router.post('/add_vanquish_Comment', function(req, res, next) {
    comment = new vanquish_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_vanquish_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  vanquish_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_vanquish_Comment/:id', function(req, res, next){

    var id = req.params.id;
    vanquish_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_vanquish_Comment/:id', function(req, res, next){

    var id = req.params.id;
    vanquish_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});


///////velvet velvetAssassin_comments
router.post('/add_velvetAssassin_Comment', function(req, res, next) {
    comment = new velvetAssassin_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_velvetAssassin_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  velvetAssassin_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_velvetAssassin_Comment/:id', function(req, res, next){

    var id = req.params.id;
    velvetAssassin_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_velvetAssassin_Comment/:id', function(req, res, next){

    var id = req.params.id;
    velvetAssassin_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});


////////virtua tennnis comments
router.post('/add_virtuaTennis4_Comment', function(req, res, next) {
    comment = new virtuaTennis4_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_virtuaTennis4_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  theWitcher3_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_virtuaTennis4_Comment/:id', function(req, res, next){

    var id = req.params.id;
    theWitcher3_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_virtuaTennis4_Comment/:id', function(req, res, next){

    var id = req.params.id;
    virtuaTennis4_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

///////end new game comments/////
/////ultimate marvel vs capcom
router.post('/add_ultimateMvsC_Comment', function(req, res, next) {
    comment = new ultimateMvsC_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_ultimateMvsC_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    ultimateMvsC_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_ultimateMvsC_Comment/:id', function(req, res, next){

    var id = req.params.id;
    ultimateMvsC_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_ultimateMvsC_Comment/:id', function(req, res, next){

    var id = req.params.id;
    ultimateMvsC_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// unchartedTheLostLegacy
router.post('/add_unchartedTheLostLegacy_Comment', function(req, res, next) {
    comment = new unchartedTheLostLegacy_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_unchartedTheLostLegacy_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    xCom2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_unchartedTheLostLegacy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    unchartedTheLostLegacy_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_unchartedTheLostLegacy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    unchartedTheLostLegacy_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
//////urbanEmpire
router.post('/add_urbanEmpire_Comment', function(req, res, next) {
    comment = new urbanEmpire_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_urbanEmpire_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    urbanEmpire_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_urbanEmpire_Comment/:id', function(req, res, next){

    var id = req.params.id;
    urbanEmpire_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_urbanEmpire_Comment/:id', function(req, res, next){

    var id = req.params.id;
    urbanEmpire_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
////tombRaider_comments
router.post('/add_tombRaider_Comment', function(req, res, next) {
    comment = new tombRaider_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_tombRaider_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    tombRaider_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_tombRaider_Comment/:id', function(req, res, next){

    var id = req.params.id;
    tombRaider_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_tombRaider_Comment/:id', function(req, res, next){

    var id = req.params.id;
    tombRaider_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

///terraria
router.post('/add_terraria_Comment', function(req, res, next) {
    comment = new terraria_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_terraria_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    terraria_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_terraria_Comment/:id', function(req, res, next){

    var id = req.params.id;
    terraria_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_terraria_Comment/:id', function(req, res, next){

    var id = req.params.id;
  terraria_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

////////teamfortress2
router.post('/add_teamFortress2_Comment', function(req, res, next) {
    comment = new teamFortress2_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_teamFortress2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    teamFortress2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_teamFortress2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    teamFortress2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_teamFortress2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    teamFortress2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
////////sonicMania
router.post('/add_sonicMania_Comment', function(req, res, next) {
    comment = new sonicMania_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_sonicMania_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
  sonicMania_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_sonicMania_Comment/:id', function(req, res, next){

    var id = req.params.id;
    sonicMania_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_sonicMania_Comment/:id', function(req, res, next){

    var id = req.params.id;
    sonicMania_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
////////starbound
router.post('/add_starbound_Comment', function(req, res, next) {
    comment = new starbound_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_starbound_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    starbound_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_starbound_Comment/:id', function(req, res, next){

    var id = req.params.id;
    starbound_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_starbound_Comment/:id', function(req, res, next){

    var id = req.params.id;
    starbound_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
////////sims3
router.post('/add_sims3_Comment', function(req, res, next) {
    comment = new sims3_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_sims3_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    sims3_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_sims3_Comment/:id', function(req, res, next){

    var id = req.params.id;
    sims3_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_sims3_Comment/:id', function(req, res, next){

    var id = req.params.id;
    sims3_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
//////rime
router.post('/add_rime_Comment', function(req, res, next) {
    comment = new rime_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_rime_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    rime_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_rime_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rime_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_rime_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rime_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////////rogue legacy
router.post('/add_rogueLegacy_Comment', function(req, res, next) {
    comment = new rogueLegacy_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_rogueLegacy_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    rogueLegacy_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_rogueLegacy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rogueLegacy_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_rogueLegacy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rogueLegacy_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////remember me
router.post('/add_rememberMe_Comment', function(req, res, next) {
    comment = new rememberMe_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_rememberMe_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    rememberMe_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_rememberMe_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rememberMe_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_rememberMe_Comment/:id', function(req, res, next){

    var id = req.params.id;
    rememberMe_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////portal2
router.post('/add_portal2_Comment', function(req, res, next) {
    comment = new portal2_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_portal2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    portal2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_portal2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    portal2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_portal2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    portal2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////pubg
router.post('/add_pubg_Comment', function(req, res, next) {
    comment = new pubg_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_pugb_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    pugb_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_pubg_Comment/:id', function(req, res, next){

    var id = req.params.id;
    pubg_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_pubg_Comment/:id', function(req, res, next){

    var id = req.params.id;
    pubg_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////plagueInc
router.post('/add_plagueInc_Comment', function(req, res, next) {
    comment = new plagueInc_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_plagueInc_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    plagueInc_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_plagueInc_Comment/:id', function(req, res, next){

    var id = req.params.id;
    plagueInc_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_plagueInc_Comment/:id', function(req, res, next){

    var id = req.params.id;
    plagueInc_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////quadrilateralCowboy
router.post('/add_quadrilateralCowboy_Comment', function(req, res, next) {
    comment = new quadrilateralCowboy_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_quadrilateralCowboy_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    quadrilateralCowboy_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_quadrilateralCowboy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    quadrilateralCowboy_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_quadrilateralCowboy_Comment/:id', function(req, res, next){

    var id = req.params.id;
    quadrilateralCowboy_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
///////qube
router.post('/add_qube_Comment', function(req, res, next) {
    comment = new qube_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_qube_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    qube_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_qube_Comment/:id', function(req, res, next){

    var id = req.params.id;
    qube_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_qube_Comment/:id', function(req, res, next){

    var id = req.params.id;
    qube_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// quake4
router.post('/add_quake4_Comment', function(req, res, next) {
    comment = new quake4_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_quake4_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    quake4_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_quake4_Comment/:id', function(req, res, next){

    var id = req.params.id;
    quake4_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_quake4_Comment/:id', function(req, res, next){

    var id = req.params.id;
    quake4_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// outlast2
router.post('/add_outlast2_Comment', function(req, res, next) {
    comment = new outlast2_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_outlast2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    outlast2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_outlast2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    outlast2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_outlast2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    outlast2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// oxygenNotIncluded_comments
router.post('/add_oxygenNotIncluded_Comment', function(req, res, next) {
    comment = new oxygenNotIncluded_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_oxygenNotIncluded_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    oxygenNotIncluded_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_oxygenNotIncluded_Comment/:id', function(req, res, next){

    var id = req.params.id;
    oxygenNotIncluded_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_oxygenNotIncluded_Comment/:id', function(req, res, next){

    var id = req.params.id;
    oxygenNotIncluded_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// onimusha3DS_comments
router.post('/add_onimusha3DS_Comment', function(req, res, next) {
    comment = new onimusha3DS_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_onimusha3DS_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    onimusha3DS_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_onimusha3DS_Comment/:id', function(req, res, next){

    var id = req.params.id;
    onimusha3DS_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_onimusha3DS_Comment/:id', function(req, res, next){

    var id = req.params.id;
    onimusha3DS_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// niNoKuni2
router.post('/add_niNoKuni2_Comment', function(req, res, next) {
    comment = new niNoKuni2_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_niNoKuni2_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    niNoKuni2_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_niNoKuni2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    niNoKuni2_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_niNoKuni2_Comment/:id', function(req, res, next){

    var id = req.params.id;
    niNoKuni2_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// nierAutomata
router.post('/add_nierAutomata_Comment', function(req, res, next) {
    comment = new nierAutomata_comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_nierAutomata_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    nierAutomata_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_nierAutomata_Comment/:id', function(req, res, next){

    var id = req.params.id;
  nierAutomata_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_nierAutomata_Comment/:id', function(req, res, next){

    var id = req.params.id;
    nierAutomata_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});
/////// nba2k18
router.post('/add_nba2k18_Comment', function(req, res, next) {
    comment = new nba2k18_Comments(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

router.get('/get_nba2k18_Comments', function(req, res, next) {

    //Pass in the object query and return the response through obj.json()
    nba2k18_comments.find({}, function(err, comments){
        if(err)
            res.send(err);

        res.json(comments);
    })

});

router.delete('/remove_nba2k18_Comment/:id', function(req, res, next){

    var id = req.params.id;
    nba2k18_comments.remove({_id:id}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The comment has been removed succesfully"});
    });
});

router.put('/update_nba2k18_Comment/:id', function(req, res, next){

    var id = req.params.id;
    nba2k18_comments.update({_id:id}, req.body.likes, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

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
