const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

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
    sellerEmail:{
        type: String,
        required: true
    }
},
    { timestamps: true }

)

const Order = new mongoose.model('Order', orderSchema)
module.exports = Order