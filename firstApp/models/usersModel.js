//-----------------------------Data model for a user----------------------------------------------

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util');

var usersSchema = new Schema({
    user_name: {type: String, default: null},
    password: String,
    fb_id: { type: String, default: null },
    access_token: {type: String, default: ""},
    wishGameOne: {type: String, default: ""},
    wishGameOneImage: {type: String, default: ""},
    wishGameTwo: {type: String, default: ""},
    wishGameTwoImage: {type: String, default: ""},
    wishGameThree: {type: String, default: ""},
    wishGameThreeImage: {type: String, default: ""},
    wishGameFour: {type: String, default: ""},
    wishGameFourImage: {type: String, default: ""},
    wishGameFive: {type: String, default: ""},
    wishGameFiveImage: {type: String, default: ""},
    wishlistArray: {type: String, default: ["","","","","",""]},
    votesRemaining: {type: Number, default: 5}
});

/*
 * Hashes the password for storage in the DB
 */
usersSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Compares passwords to determine if the user is who they say they are
usersSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Users', usersSchema);
