'use strict';
const {check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require('../models/userModel');
const { restart } = require("nodemon");

var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.register = async function (req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //check to assure user does not yet exist
    const {username, email, password} = req.body;
    try {
        let user = await User.findOne({
            email
        });
    
        if(user) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        user = new User({username, email, password});

        // salt the password and hash it for secure DB storage
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // save the new user
        await user.save();

        // prepare user credentials
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString", {
                expiresIn: "15m"
            },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        res.status(500).send("Error in Saving");
    }
}

exports.login = async function (req, res) {
    // send errors if necessary
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //check to assure user does not yet exist
    const { email, password} = req.body;
    try {
        let user = await User.findOne({
            email
        });
        if(!user) {
            return res.status(400).json({
                msg: "A user with that email does not exist"
            });
        }

        //check validity of password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "That password is incorrect"
            })
        }

        // prepare user credentials
        const payload = {
            user: {
                id: user.id
            }
        };

        // create token for authentication
        jwt.sign(
            payload,
            "randomString", {
                expiresIn: "15m"
            },
            (err, token) => {
                if(err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        res.status(500).send("Server error");
    }
}

exports.getUser = async function (req, res) {
    try {
        // find by the user that is logged in
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (err) {
        res.send({message: "Error fetching user"});
    }
}