const Vendor = require('../../models/vendor/vendor-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')
const Product = require('../../models/product/product-model')
const Order = require('../../models/order/order-model')
const Review = require('../../models/review/review-model')

// GET 
const profile = async (req, res) => {
    try {
        const { email } = req.body
        const existEmail = await Vendor.find({ email })

        if (existEmail.length >= 1) {
            res.status(200).json({
                state: true,
                msg: `Profile Page form the vendor API`,
                data: existEmail
            })
        }
        else {
            return res.status(400).json({ state: false, msg: `User not found` })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const allProducts = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id
        const existEmail = await Vendor.findOne({ email, _id: id })
        if (existEmail) {
            const allProducts = await Product.findOne({ email })
            console.log(allProducts, id)
            if (allProducts.length == 0) {
                return res.status(200).json({ state: true, msg: `You have not posted any product yet. First upload the product` })
            }
            res.status(200).json({
                state: true,
                msg: `Your all products `,
                data: allProducts
            })
        }
        else {
            return res.status(400).json({ state: false, msg: `Vendor Not Found. Register First ` })
        }
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const productDetail = async (req, res) => {
    try {
        const { email } = req.body;
        const productId = req.params.id
        const existEmail = await Vendor.findOne({ email })
        const existProduct = await Product.findById({ _id: productId })
        if (existEmail) {
            if (existProduct) {
                return res.status(400).json({ state: true, msg: `Product rendered successfully`, data: existProduct })
            }
            else {
                return res.status(400).json({ state: false, msg: `Product does not exist with this id ${productId}` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `User Not Found. Kindly register your account first` })
        }
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const allOrders = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id
        const existEmail = await Vendor.findOne({ email, _id: id })
        console.log('email: ', email)
        console.log('id: ', id)
        if (existEmail) {
            const allOrders = await Order.find({ sellerEmail: email })
            console.log(allOrders, id)
            if (allOrders.length == 0) {
                return res.status(200).json({ state: true, msg: `You have not recieved any order yet.` })
            }
            res.status(200).json({
                state: true,
                msg: `Your Orders `,
                data: allOrders
            })
        }
        else {
            return res.status(400).json({ state: false, msg: `Vendor Not Found. Register First ` })
        }
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const orderDetail = async (req, res) => {
    try {
        const { email } = req.body;
        const orderId = req.params.id
        const existEmail = await Vendor.findOne({ email })
        const existOrder = await Order.findById({ _id: orderId })
        if (existEmail) {
            if (existOrder) {
                return res.status(200).json({ state: true, msg: `Order rendered successfully`, data: existOrder })
            }
            else {
                return res.status(400).json({ state: false, msg: `Order does not exist with this id ${orderId}` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `User Not Found. Kindly register your account first` })
        }
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const allReviews = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id
        const existEmail = await Vendor.findOne({ email, _id: id })
        if (existEmail) {
            const allReview = await Review.find({ sellerEmail: email })
            console.log(allReview, id)
            if (allReview.length == 0) {
                return res.status(200).json({ state: true, msg: `Your product has no review yet.` })
            }
            res.status(200).json({
                state: true,
                msg: `Your Reviews `,
                data: allReview
            })
        }
        else {
            return res.status(400).json({ state: false, msg: `Vendor Not Found. Register First ` })
        }
    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const reviewDetail = async (req, res) => {
    try {
        const { email } = req.body;
        const reviewId = req.params.id
        const existEmail = await Vendor.findOne({ email })
        const existReview = await Review.findById({ _id: reviewId })
        if (existEmail) {
            if (existReview) {
                return res.status(200).json({ state: true, msg: `Review rendered successfully`, data: existReview })
            }
            else {
                return res.status(400).json({ state: false, msg: `Review does not exist with this id ${reviewId}` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `User Not Found. Kindly register your account first` })
        }
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

const verifyVendor = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existEmail = await Vendor.findOne({ email })

        if (existEmail) {
            if (otp == existEmail.otp) {
                if (existEmail.isVerified == true) {
                    return res.status(400).json({ state: false, msg: `You are verified already and this otp has been expired` })
                }
                else {
                    existEmail.isVerified = true

                    // update MongoDB 
                    await existEmail.save();
                    return res.status(200).json({ state: true, msg: `Vendor is verified successfully` })
                }
            }
            else {
                console.log(existEmail)
                return res.status(400).json({ state: false, msg: `OTP is not correct` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `Vendor does not exist` })
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
        const { id, title, description, price, category, image, email } = req.body;
        const existEmail = await Vendor.findOne({ email })
        const existProduct = await Product.findOne({ email, id })
        const IDregex = /^[a-z]{3,5}-[a-z]{3,5}-\d{3}$/
        const productData = { id, title, description, price, category, image, email }
        if (existEmail) {
            const isVerified = await existEmail.isVerified
            if (isVerified == false) {
                return res.status(400).json({ state: false, msg: `You are not verified. Verify Your account first than upload the product` })
            }
            else {

                if (existProduct) {
                    return res.status(400).json({
                        state: false,
                        msg: `Product existed already with id : ${id}`
                    })
                }
                else {
                    if (IDregex.test(id)) {

                        await Product.create(productData)
                        res.status(200).json({
                            state: true,
                            msg: `Product is added successfully`,
                            data: productData
                        })
                    }
                    else {
                        return res.status(400).json({ state: false, msg: `ID is not valid for this product` })
                    }
                }
            }

        }
        else {
            return res.status(200).json({
                state: false,
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
        const { email, vendorId, productId, shippingAddress, orderDate, quantity, sellerEmail } = req.body;

        const existEmail = await Vendor.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `Email Does not existed please register first`
            })
        }
        else if (email == sellerEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot order yourself`
            })
        }
        else {
            const newOrder = { email, quantity, shippingAddress, orderDate, vendorId, productId, sellerEmail }
            await Order.create(newOrder)
            return res.status(200).json({
                state: true,
                msg: `Order has been created successfully`
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const addReview = async (req, res) => {
    try {

        const { email, productId, vendorId, content, date, rating, sellerEmail } = req.body;

        const existEmail = await Vendor.find({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot reviw in this product. You have not created the account yet. Register your account first`
            })
        }
        else if (email == sellerEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot reviw yourself`
            })
        }
        else {
            await Review.create({ email, productId, vendorId, content, date, rating, sellerEmail })
            return res.status(200).json({
                state: true,
                msg: `Your reviewed this product successfully`
            })
        }
    }
    catch (error) {
        console.error('Error : ', error)
    }
}

const addShopDetail = async (req, res) => {
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
        const { email, vendorId, newShopName, newShopAddress } = req.body;
        const existEmail = await Vendor.findOne({ email, _id: vendorId })
        if (!existEmail) {
            return res.status(400).json({ state: false, msg: `Vendor does exist, register your account first` })
        }
        else {
            if (!newShopName.trim() == '' && !newShopAddress.trim() == '') {
                await existEmail.updateOne({
                    shopeName: newShopName,
                    shopeAddress: newShopAddress
                })
                return res.status(200).json({ state: true, msg: `Shop detils has been updated successfully` })

            }
        }
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
    verifyVendor,
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