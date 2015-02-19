/**
 * Created by uanuk on 06.02.2015.
 */
var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    name: String,
    title: String
});

module.exports = mongoose.model('Group', GroupSchema);