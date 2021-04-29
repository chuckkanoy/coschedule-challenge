'use strict';
module.exports = function(app) {
    var gifs = require('../controllers/gifController');

    //gif routes
    app.route('/gifs')
        .get(gifs.list_gifs);

    app.route('/gifs/:search')
        .get(gifs.search_gifs);

    app.route('/gif/:gifId')
        .get(gifs.get_gif);
}