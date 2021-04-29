'use strict';
module.exports = function(app) {
    var users = require('../controllers/userController');

    app.route('/register')
        .post(users.register);

}