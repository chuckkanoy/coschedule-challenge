'use strict';
module.exports = function(app) {
    var ratings = require('../controllers/ratingController');
    var auth = require('../middleware/auth');

    //ratings Routes
    app.route('/ratings')
        .get(ratings.list_ratings)
        .post(auth.authorize, ratings.create_rating);

    app.route('/rating')
        .get(ratings.get_rating)
        .put(auth.authorize, ratings.update_rating)
        .delete(auth.authorize, ratings.delete_rating);

    app.route('/emergency')
        .delete(auth.authorize, ratings.clear_ratings);
}