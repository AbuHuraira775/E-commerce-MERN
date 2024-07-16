const Customer = require('../../models/curomer/customer-model')
const createToken = require('../../utils/createToken')

const home = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User home page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


const register = async (req, res) => {

    try {
        //fetch data from the body
        const { name, email, password, phone, address, type } = req.body;
        const customerData = { name, email, password, phone, address, type: type, token: await createToken(email, type) }

        //cheak email exits  or not?
        const existEmail = await Customer.findOne({ email })

        //when email exists,  user cannot create the account again
        if (existEmail) {
            return res.status(400).json({ state: false, msg: `User has created the account already` })
        }
        else {


            res.status(200).send({
                state: true,
                msg: `User register page is rendered`,
                data: customerData
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const order = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User order page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const review = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User review page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

module.exports = { home, register, order, review }