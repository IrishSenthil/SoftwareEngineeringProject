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

router.get('/CallOfDutyADVWAR', function(req, res, next) {
    res.render('CallOfDutyADVWAR');
});

//-------------------------API to render CallOfDutyBlack3.hbs-------------------------------------------------

router.get('/CallOfDutyBlack3', function(req, res, next) {
    res.render('CallOfDutyBlack3');
});

//-------------------------API to render CallOfDutyGhost.hbs-------------------------------------------------

router.get('/CallOfDutyGhost', function(req, res, next) {
    res.render('CallOfDutyGhost');
});




//-------------------------API to render Divinity 2.hbs-------------------------------------------------

router.get('/Divinity2', function(req, res, next) {
    res.render('Divinity2');
});

//-------------------------API to render Doom.hbs-------------------------------------------------

router.get('/Doom', function(req, res, next) {
    res.render('Doom');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Divinity.hbs-------------------------------------------------

router.get('/Divinity', function(req, res, next) {
    res.render('Divinity');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render DragonsDogma.hbs-------------------------------------------------

router.get('/DragonsDogma', function(req, res, next) {
    res.render('DragonsDogma');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render DragonsDogma.hbs-------------------------------------------------

router.get('/Dishonoured2', function(req, res, next) {
    res.render('Dishonoured2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render DeusEX.hbs-------------------------------------------------

router.get('/DeusEx', function(req, res, next) {
    res.render('DeusEx');
});

//-------------------------API to render EvilWithin.hbs-------------------------------------------------

router.get('/EvilWithin', function(req, res, next) {
    res.render('EvilWithin');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render EvilWithin2.hbs-------------------------------------------------

router.get('/EvilWithin2', function(req, res, next) {
    res.render('EvilWithin2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Evolve.hbs-------------------------------------------------

router.get('/Evolve', function(req, res, next) {
    res.render('Evolve');
});

//-------------------------API to render FF15.hbs-------------------------------------------------

router.get('/FF15', function(req, res, next) {
    res.render('FF15');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Fallout4.hbs-------------------------------------------------

router.get('/Fallout4', function(req, res, next) {
    res.render('Fallout4');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render FF7.hbs-------------------------------------------------

router.get('/FF7', function(req, res, next) {
    res.render('FF7');
});

//-------------------------API to render GTA5.hbs-------------------------------------------------

router.get('/GTA5', function(req, res, next) {
    res.render('GTA5');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render GTA4.hbs-------------------------------------------------

router.get('/GTA4', function(req, res, next) {
    res.render('GTA4');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render GhostReconWild.hbs-------------------------------------------------

router.get('/GhostReconWild', function(req, res, next) {
    res.render('GhostReconWild');
});

//-------------------------API to render HalfLife2.hbs-------------------------------------------------

router.get('/HalfLife2', function(req, res, next) {
    res.render('HalfLife2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Hitman.hbs-------------------------------------------------

router.get('/Hitman', function(req, res, next) {
    res.render('Hitman');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Hunt.hbs-------------------------------------------------

router.get('/Hunt', function(req, res, next) {
    res.render('Hunt');
});

//-------------------------API to render Injustice.hbs-------------------------------------------------

router.get('/Injustice', function(req, res, next) {
    res.render('Injustice');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Injustice2.hbs-------------------------------------------------

router.get('/Injustice2', function(req, res, next) {
    res.render('Injustice2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render IcewindDale.hbs-------------------------------------------------

router.get('/IcewindDale', function(req, res, next) {
    res.render('IcewindDale');
});

//-------------------------API to render JadeEmpire.hbs-------------------------------------------------

router.get('/JadeEmpire', function(req, res, next) {
    res.render('JadeEmpire');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render JustCause2.hbs-------------------------------------------------

router.get('/JustCause2', function(req, res, next) {
    res.render('JustCause2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render JustCause3.hbs-------------------------------------------------

router.get('/JustCause3', function(req, res, next) {
    res.render('JustCause3');
});

//-------------------------API to render KillerInstinct.hbs-------------------------------------------------

router.get('/KillerInstinct', function(req, res, next) {
    res.render('KillerInstinct');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render KillingFloor.hbs-------------------------------------------------

router.get('/KillingFloor', function(req, res, next) {
    res.render('KillingFloor');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render KillingFloor2.hbs-------------------------------------------------

router.get('/KillingFloor2', function(req, res, next) {
    res.render('KillingFloor2');
});

//-------------------------API to render LifeIsStrange.hbs-------------------------------------------------

router.get('/LifeIsStrange', function(req, res, next) {
    res.render('LifeIsStrange');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Left4Dead.hbs-------------------------------------------------

router.get('/Left4Dead', function(req, res, next) {
    res.render('Left4Dead');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Left4Dead2.hbs-------------------------------------------------

router.get('/Left4Dead2', function(req, res, next) {
    res.render('Left4Dead2');
});

//-------------------------API to render Mafia2.hbs-------------------------------------------------

router.get('/Mafia2', function(req, res, next) {
    res.render('Mafia2');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render MetalGear5.hbs-------------------------------------------------

router.get('/MetalGear5', function(req, res, next) {
    res.render('MetalGear5');
});

//------------------------------------------------------------------------------------------------

//-------------------------API to render Metro.hbs-------------------------------------------------

router.get('/Metro', function(req, res, next) {
    res.render('Metro');
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
