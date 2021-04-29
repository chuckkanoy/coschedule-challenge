'use strict';
module.exports = function(app) {
    var ratings = require('../controllers/ratingController');

    //ratings Routes
    app.route('/ratings')
        .get(ratings.list_ratings)
        .post(ratings.create_rating);

    app.route('/rate/:gif&:rating')
        .post(ratings.create_rating);

    app.route('/ratings/:ratingId')
        .get(ratings.get_rating)
        .put(ratings.update_rating)
        .delete(ratings.delete_rating);
}