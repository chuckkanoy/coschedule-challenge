'use strict';

var mongoose = require('mongoose'),
    Rating = mongoose.model('Ratings');

exports.list_ratings = function(req, res) {
    Rating.find({}, function(err, rating) {
        if(err)
            res.send(err);
        res.json(rating);
    });
};

exports.create_rating = function(req, res) {
    var newRating = new Rating();
    newRating.gifID = req.params.gif;
    newRating.rating = req.params.rating;

    newRating.save(function(err, rating) {
        if(err)
            res.send(err);
        res.json(rating);
    });
};

exports.get_rating = function(req, res) {
    Rating.findById(req.params.ratingId, function(err, rating) {
        if(err)
            res.send(err);
        res.json(rating);
    });
};

exports.update_rating = function(req, res) {
    Rating.findOneAndUpdate({_id: req.params.ratingId}, req.body, {new: true}, 
        function(err, rating) {
            if(err)
                res.send(err);
            res.json(rating);
        });
};

exports.delete_rating = function(req, res) {
    Rating.remove({_id: req.params.ratingId},
        function(err, rating) {
            if(err)
                res.send(err);
            res.json({message: 'Rating successfully deleted'});
        });
};