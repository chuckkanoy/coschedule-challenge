'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RatingSchema = new Schema({
    gif: {
        type: Object,
        required: 'GIF being rated'
    },
    user: {
        type: Object,
        required: 'user rating GIF'
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