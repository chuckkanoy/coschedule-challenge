'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    gif: {
        type: Object,
        required: 'GIF being commented'
    },
    user: {
        type: Object,
        require: 'user commenting GIF'
    },
    gifID: {
        type: String,
        required: 'ID of GIF being commented'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: 'Comment for the GIF being commented'
    }
});

module.exports = mongoose.model('Comments', CommentSchema);