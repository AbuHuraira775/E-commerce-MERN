const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    reting: {
        type: Number,
        min: 1,
        max: 5,
        default: 3,
        required: true
    }
})

const Review = new mongoose.model('Review', reviewSchema)
module.exports = Review