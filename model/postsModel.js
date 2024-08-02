const mongoose = require('mongoose');
const { Schema } = mongoose;

const postsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        validate: {
            validator: function (v) {
                return v.length >= 5;
            },
            message: 'Title must be at least 5 characters long'
        }
    },
    summary: String,
    content: {
        type: String,
        required: [true, 'Content is required'],
        validate: {
            validator: function (v) {
                return v.length >= 20;
            },
            message: 'Content must be at least 20 characters long'
        }
    },
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.every(tag => typeof tag === 'string');
            },
            message: 'Each tag must be a string'
        }
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        validate: {
            validator: function (v) {
                return v.length >= 3;
            },
            message: 'Author name must be at least 3 characters long'
        }
    },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Post', postsSchema);
