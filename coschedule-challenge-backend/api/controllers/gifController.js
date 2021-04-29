'use strict';

// var mongoose = require('mongoose');

// mongoose.connect('https://api.giphy.com/v1/gifs/trending?api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H');

var request = require('request');

exports.list_gifs = function(req, res) {
    request('https://api.giphy.com/v1/gifs/trending?api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
    function(err, response, body) {
        if(err)
            res.send(err);
        res.json(JSON.parse(body));
    });
}

exports.search_gifs = function(req, res) {
    request('https://api.giphy.com/v1/gifs/search?limit=10&q=' + req.params.search + '&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
    function(err, response, body) {
        if(err)
            res.send(err);
        res.json(JSON.parse(body));
    });
}

exports.get_gif = function(req, res) {
    request('https://api.giphy.com/v1/gifs?ids=' + req.params.gifId + '&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
    function(err, response, body) {
        if(err)
            res.send(err);
        res.json(JSON.parse(body));
        console.log(res.query.gifId);
    });
}