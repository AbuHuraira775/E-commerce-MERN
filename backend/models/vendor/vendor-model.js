const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
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
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
    },
    shopeName: {
        type: String,
        required: true
    },
    shopeAddress: {
        type: String,
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