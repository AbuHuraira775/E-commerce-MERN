const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            // product: {
            //     id: { type: String, required: true },
            //     title: { type: String, required: true },
            //     price: { type: Number, requred: true },
            //     description: { type: String, required: true },
            //     category: { type: String, required: true }
            // }

            productId: {type:String, required: true}
        }
    ],

    quantity: { type: Number, required: true }
})

const Cart = new mongoose.model('Cart', cartSchema)
module.exports = Cart