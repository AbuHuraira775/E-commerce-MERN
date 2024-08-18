const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
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
const Admin = new mongoose.model('Admin', adminSchema)
module.exports = Admin