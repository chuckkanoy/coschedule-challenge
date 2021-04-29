'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    gifID: {
        type: String,
        required: 'ID of the GIF being rated'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: [{
            type: Number,
            enum: [1, 2, 3, 4, 5]
        }],
        default: [1]
    }
});

module.exports = mongoose.model('Ratings', RatingSchema);