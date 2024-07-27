const Customer = require('../../models/customer/customer-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')


// GET METHODS 
const home = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User home page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const profile = async (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `Profile Page form the customer API` })
    } catch (error) {
        console.error(error)
    }
}

const orders = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User order page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const reviews = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User review page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const wishlists = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User wishlist page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

// POST METHODS 
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
                return res.status(400).json({ state: false, msg: `OTP is not correct` })
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

const changePassword = async (req, res) => {
    try {
        const { email, password,newPass,newConfPass } = req.body;

        const existEmail = await Customer.findOne({ email })

        if (existEmail) {

            //decrypt the hashed_password 
            const result = await comaprePassword(password, existEmail.password)
            // if both are same return true
            if (result) {
                if(newPass == newConfPass){
                    const hashed_password = await hashPassword(newPass)
                    existEmail.password = hashed_password
                    
                    // save to DB 
                    await existEmail.save()
                    return res.status(200).json({ state: true, msg: `Password is updated successfully`, data: hashed_password })
                }
                else{
                    return res.status(400).json({ state: false, msg: `New and Confirm Password did not matched!` })                    
                }
            }
            else {
                return res.status(400).json({ state: false, msg: `Incorrect Password` })
                // hash the new password and than save 

            }
        }
        else {
            return res.status(400).json({ state: true, msg: `User does exist` })

        }
    } catch (error) {
        console.error(error)
    }
}


// PUT METHODS 
const updateProfile = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User updateProfile page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
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

const updateCart = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User updateCart page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const updateReview = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User updateReview page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


// DELETE METHODS 

const cart = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User cart page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


const wishlist = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User wishlist page is rendered` })
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


const getAllUsers = async(req, res) => {
    try {
        const allUsers = await Customer.find()
        res.status(200).json({
            state: true, 
            msg: `All users are fetched from the DM succesfully`,
            data: allUsers
        })
    }
    catch (err) {
        res.status(400).json({ state: false, msg: `API Failed due to : ${error}` })
    }
}

module.exports = {
    getAllUsers,
    home,
    register,
    verifyAccount,
    login,
    profile,
    updateName,
    changePassword,
    orders,
    reviews,
    wishlists,
    updateProfile,
    updateCart,
    updateReview,
    cart,
    wishlist,
    review
}