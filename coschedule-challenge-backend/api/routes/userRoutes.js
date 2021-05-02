'use strict';

const {body, check} = require("express-validator/check");

module.exports = function(app) {
    var users = require('../controllers/userController');
    var auth = require('../middleware/auth');

    app.route('/register')
        .post(
            [
                check('email').isEmail().withMessage("Please enter a valid email"),
                check('password').isLength({min: 8}).withMessage("Please enter a valid password"),
                check('username').not().isEmpty().withMessage("Please enter a valid username")
            ],
            users.register
        );

    app.route('/login')
        .post(
            [
                check('email').isEmail().withMessage("Please enter a valid email"),
                check('password').isLength({min: 8}).withMessage("Please enter a valid password")
            ],
            users.login
        );
    
    app.route('/user')
        .get(auth.authorize, users.getUser);
    
}