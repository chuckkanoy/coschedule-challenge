'use strict';
module.exports = function(app) {
    var comments = require('../controllers/commentController');
    var auth = require('../middleware/auth');

    //ratings Routes
    app.route('/comments')
        .get(comments.list_comments)
        .post(auth.authorize, comments.create_comment);

    app.route('/comment')
        .get(comments.get_comment)
        .put(auth.authorize, comments.update_comment)
        .delete(auth.authorize, comments.delete_comment);
}