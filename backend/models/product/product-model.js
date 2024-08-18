const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true // provide by the vendor
    },
    email: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
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
    }
},
    { timestamps: true }
)

const Product = new mongoose.model('Product', productSchema)
module.exports = Product