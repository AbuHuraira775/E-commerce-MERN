const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shippingAddress: {
        type: Object,
        properties: {
            street: "String",
            state: "String",
            city: "String"
        }
    },
})

const Order = new mongoose.model('Order', orderSchema)
module.exports = Order