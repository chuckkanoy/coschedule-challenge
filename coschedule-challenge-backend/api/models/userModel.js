'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Please enter the email of a user',
    },
    username: {
        type: String,
        unique: true,
        required: 'Please enter the username of a user'
    },
    password: {
        type: String,
        required: 'Please enter the password of a user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Users', UserSchema);