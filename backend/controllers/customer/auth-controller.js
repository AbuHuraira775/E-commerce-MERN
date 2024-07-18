const Customer = require('../../models/curomer/customer-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')

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

        //generate OTP 
        const otp = generate_OPT()
        const customerData = {
            name,
            email,
            password,
            phone,
            address,
            type,
            otp
        }

        //check email exits  or not?
        const existEmail = await Customer.findOne({ email })

        // when email exists,  user cannot create the account again
        if (existEmail) {
            return res.status(400).json({ state: false, msg: `User has created the account already` })
        }
        else {
            // hash the password first 
            customerData.password = await hashPassword(password)

            // save to MongoDB 
            const customerCreated = await Customer.create(customerData)

            sendEmail(customerCreated.email, customerCreated.otp)
            res.status(200).send({
                state: true,
                msg: `User registered successfully`,
                data: customerCreated,
                customerId: customerCreated._id.toString()
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const verifyAccount = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existEmail = await Customer.findOne({ email })

        if (existEmail) {
            if (otp == existEmail.otp) {
                existEmail.isVerified = true

                // update MongoDB 
                await existEmail.save();
                return res.status(200).json({ state: true, msg: `User is verified successfully` })
            }
            else {
                console.log(existEmail)
                return res.status(400).json({ state: false, msg: `OTP is not correct`, data: existEmail })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `User does not exist` })
        }

    }
    catch (error) {
        console.error(error)
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
                const token = await createToken(email, type)

                // save token to the local storage 
                // const userToken = localStorage.setItem('userTokens',token)

                return res.status(200).json({
                    state: true,
                    msg: `Login Successfully`,
                    data: existEmail,
                    token: token
                    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiY3Vzc3RvbWVyIiwiZW1haWwiOiJodXJhaXJhMUBnbWFpbC5jb20iLCJpYXQiOjE3MjExMzI1NjksImV4cCI6MTcyMTk5NjU2OX0.T5wf4JPOg0jdlCPMKqPmatx3awoKyexngpAMC0dovnQ"
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
        // get user updated data from the body
        const { name, email, address, phone } = req.body;
        const userData = { name, email, address, phone }

        //check user exists or not?
        const existEmail = await Customer.findOne({ email })

        if (existEmail) {
            if (!name.trim() == '' && !email.trim() == '' && !phone.trim() == '' && !address.trim() == '') {


                // save to MongoDB  
                await existEmail.save()

                return res.status(200).json({
                    state: true,
                    msg: `User Data updated successfully`,
                    data: userUpdatedData
                })
            }
            else {
                return res.status(400).json({
                    state: false,
                    msg: `Field must not be empty`
                })
            }
        }

        else {
            return res.status(400).json({ state: false, msg: `User does not exist` })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existEmail = await Customer.findOne({ email })

        if (existEmail) {

            //decrypt the hashed_password 
            const result = await comaprePassword(password,existEmail.password)
            // if both are same return true
            if (result) { 
                return res.status(400).json({ state: false, msg: `Password should not be same` })
            }
            else {
                // hash the new password and than save 
                const hashed_password = await hashPassword(password)
                existEmail.password = hashed_password

                // save to DB 
                await existEmail.save()
                return res.status(200).json({ state: true, msg: `Password is updated successfully`,data:hashed_password })

            }
        }
        else {
            return res.status(400).json({ state: true, msg: `User does exist` })

        }
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
    verifyAccount,
    login,
    profile,
    updateName,
    changePassword,
    checkOrder,
    order,
    review,
    checkReviews
}