var express = require('express');
var router = express.Router();
var User = require('../models/usersModel');
var jwt = require('jsonwebtoken');
var currentUser;
var currentUserID;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//------------------------------API to register a user--------------------------------------------

router.post('/register', function(req, res, next){
    var username = req.body.user_name;
    var password = req.body.password;
    // Check if account already exists
    User.findOne({ 'user_name' :  username }, function(err, user)
    {
        if (err)
            res.send(err);
        // check to see if theres already a user with that email
        if (user) {
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } else {
            // If there is no user with that username create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.user_name = username;
            currentUser = username;
            newUser.password = newUser.generateHash(password);
            newUser.access_token = createJwt({user_name:username});
            newUser.save(function(err, user) {
                if (err)
                    throw err;
                res.cookie('Authorization', 'Bearer ' + user.access_token);
                res.json('success : account created');

            });
        }
    });
});

//-------------------------------API to login a user----------------------------------------------

router.post('/login', function(req, res, next){
    var username = req.body.user_name;
    currentUser = username;
    var password = req.body.password;
    User.findOne({'user_name': username}, function (err, user) {
        // if there are any errors, return the error
        if (err)
            res.send(err);
        // If user account found then check the password
        if (user) {
            // Compare passwords
            if (user.validPassword(password)) {
                // Success : Assign new access token for the session
                user.access_token = createJwt({user_name: username});
                user.save();
                res.cookie('Authorization', 'Bearer ' + user.access_token);
                res.json({'success' : 'loggedIn'});
            }
            else {
                res.status(401).send({
                    "status": "error",
                    "body": "Email or password does not match"
                });
            }
        }
        else
        {
            res.status(401).send({
                "status": "error",
                "body": "Username not found"
            });
        } }); });

//---------------------------API to get users------------------------------------------

router.get('/get_current_user', function(req, res, next) {
    User.find({'user_name':currentUser}, function(err, users){
        if(err)
            res.send(err);

        for(var i=0; i<users.length; i++) {
          if(users.user_name === currentUser) {
            currentUserID = users[i]._id;
          }
        }
        res.json(users);
    })

});

router.put('/updateUserDetails/:username', function(req, res, next){

    User.update({'user_name':currentUser}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

router.delete('/remove_user/:username', function(req, res, next){

    //var id = req.params.id;
    if(currentUser == null) {
      currentUser = "USER UNDEFINED";
    }
    User.remove({'user_name':currentUser}, function(err){
        if(err)
            res.send(err);

        res.json({status : "The user " + currentUser + " has been removed succesfully"});
    });
});
//---------------------------API to render register.hbs------------------------------------------

router.get('/register', function(req, res, next) {
//  try {
    //    var jwtString = req.cookies.Authorization.split(" ");
    //    var profile = verifyJwt(jwtString[1]);
      //  if (profile) {
            res.render('register');
      //  }
   // }catch (err) {
   //          res.json({
   //              "status": "error",
   //              "body": [
   //                  "You are not logged in."
   //              ]
   //          });
  //      }
//}
});

//----------------------------API to render login.hbs---------------------------------------------

router.get('/login', function(req, res, next) {
res.render('login');
});
//Test
router.get('/feed', function(req, res, next) {
    res.render('feed');
});

//--------------------------API to render pcportal.hbs--------------------------------------------

router.get('/switch_Portal_One', function(req, res, next) {
    res.render('switch_Portal_One');
});

//--------------------------API to render pcportal.hbs--------------------------------------------

router.get('/pcportal', function(req, res, next) {
    res.render('pcportal');
});

//-------------------------API to render abzu.hbs-------------------------------------------------

router.get('/abzu', function(req, res, next) {
    res.render('abzu');
});

//-------------------------API to render anarcute.hbs-------------------------------------------------

router.get('/anarcute', function(req, res, next) {
    res.render('anarcute');
});

//-------------------------API to render antihero.hbs-------------------------------------------------

router.get('/antihero', function(req, res, next) {
    res.render('antihero');
});

//-------------------------API to render aporia.hbs-------------------------------------------------

router.get('/aporia', function(req, res, next) {
    res.render('aporia');
});

//-------------------------API to render assasinsCreedOrigins.hbs-------------------------------------------------

router.get('/assasinsCreedOrigins', function(req, res, next) {
    res.render('assasinsCreedOrigins');
});

//-------------------------API to render ashesOfTheSingularity.hbs-------------------------------------------------

router.get('/ashesOfTheSingularity', function(req, res, next) {
    res.render('ashesOfTheSingularity');
});

//-------------------------API to render battlefieldOne.hbs-------------------------------------------------

router.get('/battlefieldOne', function(req, res, next) {
    res.render('battlefieldOne');
});

//-------------------------API to render aceAttorney.hbs-------------------------------------------------

router.get('/aceAttorney', function(req, res, next) {
    res.render('aceAttorney');
});

//-------------------------API to render aeigisDefenders.hbs-------------------------------------------------

router.get('/aeigisDefenders', function(req, res, next) {
    res.render('aeigisDefenders');
});

//-------------------------API to render axiomVerge.hbs-------------------------------------------------

router.get('/axiomVerge', function(req, res, next) {
    res.render('axiomVerge');
});

//-------------------------API to render batmanTheEnemyWithin.hbs-------------------------------------------------

router.get('/batmanTheEnemyWithin', function(req, res, next) {
    res.render('batmanTheEnemyWithin');
});

//-------------------------API to render bendyAndTheInkMachine.hbs-------------------------------------------------

router.get('/bendyAndTheInkMachine', function(req, res, next) {
    res.render('bendyAndTheInkMachine');
});

//-------------------------API to render bulbBoy.hbs-------------------------------------------------

router.get('/bulbBoy', function(req, res, next) {
    res.render('bulbBoy');
});

//------------------------------------------------------------------------------------------------

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
