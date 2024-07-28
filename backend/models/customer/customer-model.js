const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        properties: {
            street: "String",
            state: "String",
            city: "String"
        },
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: 'customer'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
})

const Customer = new mongoose.model('customer', customerSchema)
module.exports = Customer