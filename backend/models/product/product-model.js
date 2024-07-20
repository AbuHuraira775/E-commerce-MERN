const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

const Product = new mongoose.model('Product', productSchema)
module.exports = Product