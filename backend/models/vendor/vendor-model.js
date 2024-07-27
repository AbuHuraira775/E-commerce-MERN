const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
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
        required: true,
        properties: {
            street: "String",
            state: "String",
            city: "String"
        }
    },
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    shopeName: {
        type: String,
        required: true
    },
    shopeAddress: {
        type: Object,
        properties: {
            street: "String",
            state: "String",
            city: "String"
        },
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "vendor"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
})
const Vendor = new mongoose.model('Vendor', vendorSchema)
module.exports = Vendor