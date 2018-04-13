var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var currentDate = new Date().getDate();
var currentMonth = new Date().getMonth()+1;
var currentYear = new Date().getFullYear();

var commentsSchema = new Schema( {
    user_name: {type: String},
    comment: {type: String},
    date_created: {type: String, default: String(currentDate+"/"+currentMonth+"/"+currentYear)},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0}
});

module.exports = mongoose.model('BattlefieldOne_Comments', commentsSchema);
