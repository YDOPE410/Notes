var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    password: String,
    token : String,
    notes: [{id: String, title: String, description: String, x: Number, y: Number}]
});

module.exports = mongoose.model('User', UserSchema);