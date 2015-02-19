/**
 * Created by uanuk on 06.02.2015.
 */
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
});

module.exports = mongoose.model('User', UserSchema);