'use strict';

var mongoose = require('mongoose'),
    Rating = mongoose.model('Ratings'),
    User = mongoose.model('Users');

var request = require('request');

//method for getting all ratings
exports.list_ratings = async function(req, res) {
    let user = {};
    try {
        user = await User.findById(req.user.id);
    } catch {

    }

    Rating.find({}, function(err, rating) {
        if(err)
            res.send(err);
        res.json(rating);
    });
};

//method for creating a rating
exports.create_rating = async function(req, res) {
    var newRating = new Rating();
    let user = await User.findById(req.user.id);

    Rating.find({user: user}, function(err, rating) {
        if(err) 
            res.send(err)
        
        console.log('no ratings yet');
            request('https://api.giphy.com/v1/gifs?ids=' + req.query.gifId + '&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
                function(err, response, body) {
                    if(err)
                        res.send(err);
                    newRating.gif = JSON.parse(body);
                    newRating.user = user;
                    newRating.rating = req.query.rating;
                    //save rating to DB if possible
                    newRating.save(function(err, rating) {
                        if(err)
                            res.send(err);
                        res.json(rating);
                    });
                });
    });
};

//get a specific rating by it's ID
exports.get_rating = function(req, res) {
    req.query.ratingId ?
    (Rating.findById(req.query.ratingId, function(err, rating) {
        if(err)
            res.send(err);
        res.json(rating);
    })) :
    (res.json({msg: 'Must include ratingId'}));
};

//update a rating if possible
exports.update_rating = function(req, res) {
    Rating.findOneAndUpdate({_id: req.query.ratingId}, req.body, {new: true}, 
        function(err, rating) {
            if(err)
                res.send(err);
            res.json(rating);
        });
};

//remove rating from the DB
exports.delete_rating = function(req, res) {
    Rating.remove({_id: req.query.ratingId},
        function(err, rating) {
            if(err)
                res.send(err);
            res.json({message: 'Rating successfully deleted'});
        });
};

exports.clear_ratings = function(req, res) {
    Rating.remove({},
        function(err, rating) {
            if(err)
                res.send(err);
            res.json({message: 'Rating successfully deleted'});
        });
}