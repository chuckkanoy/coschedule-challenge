'use strict';

var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments'),
    User = mongoose.model('Users');

var request = require('request');

exports.list_comments = function(req, res) {
    req.query.gifId ? (
        Comment.find({gifID: req.query.gifId}, function(err, comment) {
            if(err)
                res.send(err);
            res.json(comment);
        })
    ) :
    (
        Comment.find({}, function(err, comment) {
            if(err)
                res.send(err);
            res.json(comment);
        })
    )
};

exports.create_comment = async function(req, res) {
    var newComment = new Comment();
    let user = await User.findById(req.user.id);
    console.log(user);

    request('https://api.giphy.com/v1/gifs?ids=' + req.query.gifId + '&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
        function(err, response, body) {
            if(err)
                res.send(err);
            newComment.gif = JSON.parse(body);
            newComment.user = user;
            newComment.gifID = req.query.gifId;
            newComment.comment = req.body.comment;
            //save rating to DB if possible
            newComment.save(function(err, comment) {
                if(err)
                    res.send(err);
                res.json(comment);
            });
        });
};

exports.get_comment = function(req, res) {
    Comment.findById(req.query.commentId, function(err, comment) {
        if(err)
            res.send(err);
        res.json(comment);
    });
};

exports.update_comment = function(req, res) {
    Comment.findOneAndUpdate({_id: req.query.commentId}, req.body, {new: true}, 
        function(err, comment) {
            if(err)
                res.send(err);
            res.json(comment);
        });
};

exports.delete_comment = function(req, res) {
    Comment.remove({_id: req.query.commentId},
        function(err, comment) {
            if(err)
                res.send(err);
            res.json({message: 'Comment successfully deleted'});
        });
};