const Vendor = require('../../models/vendor/vendor-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')
const Product = require('../../models/product/product-model')

// GET 
const profile = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. profile page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const allProducts = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. allProducts page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const productDetail = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. productDetail page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const allOrders = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. allOrders page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const orderDetail = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. orderDetail page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const allReviews = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. allReviews page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const reviewDetail = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `Vendor GET METHOD. reviewDetail page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

// POST 
const register = async (req, res) => {

    try {
        //fetch data from the body
        const { name, email, password, phone, address, type, shopeName, shopeAddress } = req.body;

        //generate OTP 
        const otp = generate_OPT()

        // create the token 
        const token = await createToken(email, type)

        const vendorData = {
            name,
            email,
            password,
            phone,
            address,
            type,
            shopeName,
            shopeAddress,
            otp,
            token
        }

        //check email exits  or not?
        const existEmail = await Vendor.findOne({ email })

        // when email exists,  user cannot create the account again
        if (existEmail) {
            return res.status(400).json({ state: false, msg: `This Vandor has created the account already` })
        }
        else {
            // hash the password first 
            vendorData.password = await hashPassword(password)

            // save to MongoDB 
            const vendorCreated = await Vendor.create(vendorData)

            sendEmail(vendorCreated.email, vendorCreated.otp)
            res.status(200).send({
                state: true,
                msg: `Vendor registered successfully`,
                data: vendorCreated,
                vendorId: vendorCreated._id.toString()
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
        // check vendor has the acoount?
        const existEmail = await Vendor.findOne({ email })
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

                // save token to the DB
                await existEmail.save()

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
        const { email, password, newPass, newConfPass, token } = req.body;

        const existEmail = await Vendor.findOne({ email })

        if (existEmail) {

            //decrypt the hashed_password 
            const result = await comaprePassword(password, existEmail.password)
            // if both are same return true
            if (result) {
                if (password !== newPass && newPass == newConfPass) {
                    // compare regex password pattern 
                    const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                    if (regexPassword.test(newPass)) {
                        const hashed_password = await hashPassword(newPass)
                        existEmail.password = hashed_password;
                        existEmail.token = token;

                        // save to DB 
                        await existEmail.save()
                        return res.status(200).json({ state: true, msg: `Password is updated successfully` })
                    }
                    else {
                        console.log('Else Regex : ', regexPassword.test(newPass))

                        res.status(400).json({ state: false, msg: `password is not valid` })
                    }
                }
                else {
                    return res.status(400).json({ state: false, msg: `Old and New Password should not be same, Also New Password and Confirm Password did not matched!` })
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


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, dateAdded, email, id } = req.body;
        const existEmail = await Vendor.findOne({ email })
        const existProduct = await Product.findOne({ id })
        const productData = {
            id,
            name,
            description,
            price,
            category,
            dateAdded
        }
        if (existEmail) {
            if (existProduct) {
                return res.status(400).json({
                    state:false,
                    msg: `Product existed already with id : ${id}`
                })
            }
            else {
                await Product.create(productData)
                res.status(200).json({
                    state: true,
                    msg: `VENDOR POST METHOD: Product is added successfully`
                })
            }

        }
        else {
            return res.status(200).json({
                state: fasle,
                msg: `VENDOR does not existed`
            })
        }

    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const addOrder = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR POST METHOD: addOrder page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const addReview = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR POST METHOD: addReview page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const addShopDetail = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR POST METHOD: addShopDetail page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

// PUT 
const updateProfile = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT METHOD: updateProfile page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const editProduct = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT METHOD: editProduct page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const editOrder = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT METHOD: editOrder page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const editreview = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT METHOD: editreview page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const editShopDetail = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT METHOD: editShopDetail page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

// DELETE 
const deleteAllProducts = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR DELETE: deleteAllProducts page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const deleteOneProduct = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT DELETE: deleteOneProduct page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const deleteAllOrders = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT DELETE: deleteAllOrders page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const deleteOneOrder = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT DELETE: deleteOneOrder page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const deleteAllReviews = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT DELETE: deleteAllReviews page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const deleteOnereview = async (req, res) => {
    try {
        res.status(200).json({
            state: true,
            msg: `VENDOR PUT DELETE: deleteOnereview page is rendered`
        })
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

module.exports = {
    profile,
    allProducts,
    productDetail,
    allOrders,
    orderDetail,
    allReviews,
    reviewDetail,
    register,
    login,
    addProduct,
    addOrder,
    addReview,
    addShopDetail,
    changePassword,
    updateProfile,
    editProduct,
    editOrder,
    editreview,
    editShopDetail,
    deleteAllProducts,
    deleteOneProduct,
    deleteAllOrders,
    deleteOneOrder,
    deleteAllReviews,
    deleteOnereview
}