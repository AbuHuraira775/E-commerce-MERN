const jwt = require('jsonwebtoken')
const Customer = require('../models/curomer/customer-model')

const createToken = async({email,type})=>{
    return jwt.sign({
        type: type,
        email: email
    },process.env.SECRET_KEY,{expiresIn: '10d'})
}

module.exports = createToken