'use strict';
var request = require('request');

//proxy getting GIFs from GIPHY
exports.list_gifs = function(req, res) {
    //use search url if necessary
    req.query.search ? (
        request(`https://api.giphy.com/v1/gifs/search?limit=15&offset=${req.query.offset}&q=${req.query.search}&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H`,
        function(err, response, body) {
            if(err)
                res.send(err);
            
            res.json(JSON.parse(body));
        })
     ) : 
    (
        request(`https://api.giphy.com/v1/gifs/trending?offset=${req.query.offset}&limit=15&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H`,
        function(err, response, body) {
            if(err)
                res.send(err);
            res.json(JSON.parse(body));
        })
    )

}

//get an individual gif if the id matches
exports.get_gif = function(req, res) {
    request('https://api.giphy.com/v1/gifs?ids=' + req.query.gifId + '&api_key=zoBsDWAU8HorqZ8gpmKb0vqKNb1CsX9H',
    function(err, response, body) {
        if(err)
            res.send(err);
        res.json(JSON.parse(body));
        console.log(res.query.gifId);
    });
}