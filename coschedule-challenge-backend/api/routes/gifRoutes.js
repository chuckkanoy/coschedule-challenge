'use strict';
module.exports = function(app) {
    var gifs = require('../controllers/gifController');

    //gif routes
    app.route('/gifs')
        .get(gifs.list_gifs);

    app.route('/gif')
        .get(gifs.get_gif);
}