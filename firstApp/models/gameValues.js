var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var currentDate = new Date().getDate();
var currentMonth = new Date().getMonth()+1;
var currentYear = new Date().getFullYear();

var valuesSchema = new Schema({
    gameName: {type: String, default: ""},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    totalVotes: {type: Number, default: 0}
});

module.exports = mongoose.model('gameVotes', valuesSchema);
