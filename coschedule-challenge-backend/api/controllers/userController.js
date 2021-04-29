'use strict';

const userModel = require('../models/userModel');

var mongoose = require('mongoose'),
    users = mongoose.model('Users');

exports.register = function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;

    var newuser = new userModel();
    newUser.name = name;
    newUser.username = username;
    newUser.password = password;
    newUser.save(function(err, savedUser) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        }

        return res.status(200).send();
    })
}