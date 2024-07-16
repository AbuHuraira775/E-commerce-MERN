const Customer = require('../../models/curomer/customer-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')

const home = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User home page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await Customer.find()
        res.status(200).json({
            state: true,
            msg: `All Users are fetched successfully`,
            data: allUsers
        })
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

        //check email exits  or not?
        const existEmail = await Customer.findOne({ email })

        //when email exists,  user cannot create the account again
        if (existEmail) {
            return res.status(400).json({ state: false, msg: `User has created the account already` })
        }
        else {
            // hash the password first 
            customerData.password = await hashPassword(password)
            // console.log('password: ',customerData.password)

            // save to MongoDB 
            const customerCreated = await Customer.create(customerData)

            res.status(200).send({
                state: true,
                msg: `User registered successfully`,
                data: customerData,
                customerId: customerCreated._id.toString()
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginData = { email, password }
        // check user has the acoount?
        const existEmail = await Customer.findOne({ email })
        console.log(existEmail)
        // if yes 
        if (existEmail) {
            const hashed_password = await existEmail.password

            // decrypt the password and compare 
            const result = await comaprePassword(password, hashed_password) // return true of false
            if (result) {

                // create the token 
                const type = await existEmail.type
                // const token = await createToken(email, type)
                // console.log(token)
                return res.status(200).json({
                    state: true,
                    msg: `Login Successfully`,
                    data: existEmail,
                    // token: token
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY3Vzc3RvbWVyIiwiZW1haWwiOiJodXJhaXJhMUBnbWFpbC5jb20iLCJpYXQiOjE3MjExMzI1NjksImV4cCI6MTcyMTk5NjU2OX0.T5wf4JPOg0jdlCPMKqPmatx3awoKyexngpAMC0dovnQ"
                })
            }
            else {
                return res.status(400).json({
                    state: false,
                    msg: `Password is not correct`
                })

            }

        }
        else {
            return res.status(400).json({
                state: false,
                msg: `User is not registered. Create the account first than login`
            })
        }

    } catch (error) {
        console.error(error)
    }
}

const updateName = async (req, res) => {
    try {
        const { name, email, address, phone } = req.body;
        const userData = { name, email, address, phone }
        
        if(existEmail){
            
        }
    } catch (error) {
        console.error(error)
    }
}


const changePassword = async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
    }
}


const profile = async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
    }
}


const checkOrder = async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
    }
}


const checkReviews = async (req, res) => {
    try {

    } catch (error) {
        console.error(error)
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

module.exports = {
    home,
    getAllUsers,
    register,
    login,
    profile,
    updateName,
    changePassword,
    checkOrder,
    order,
    review,
    checkReviews
}