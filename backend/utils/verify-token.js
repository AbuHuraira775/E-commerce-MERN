const jwt = require('jsonwebtoken')
const Customer = require('../models/customer/customer-model')

const verifyToken = async (req, res, next) => {

    const token = req.header('Authorization')
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY3Vzc3RvbWVyIiwiZW1haWwiOiJodXJhaXJhMUBnbWFpbC5jb20iLCJpYXQiOjE3MjExMzI1NjksImV4cCI6MTcyMTk5NjU2OX0.T5wf4JPOg0jdlCPMKqPmatx3awoKyexngpAMC0dovnQ"
    if (!token) {
        return res.status(401).send({ message: 'Access denied. No token provided.' });
    }
    else {

        try {
            const decode = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decode
            next()
        }
        catch (error) {
            res.status(400).send({ message: 'Invalid token.' });
        }
    }
}

module.exports = verifyToken