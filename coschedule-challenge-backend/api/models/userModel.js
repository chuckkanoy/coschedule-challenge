'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        unique: true,
        required: 'Please enter the username of a user'
    },
    password: {
        type: String,
        required: 'Please enter the password of a user'
    }
})

module.exports = mongoose.model('Users', userSchema);