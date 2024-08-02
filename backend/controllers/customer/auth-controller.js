const Customer = require('../../models/customer/customer-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')
const Product = require('../../models/product/product-model')
const Order = require('../../models/order/order-model')
const Review = require('../../models/review/review-model')
const Cart = require('../../models/cart/cart-model')
const Wishlist = require('../../models/wishlist/wishlist-model')


// GET METHODS 
const home = async (req, res) => {
    try {
        const allProducts = await Product.find()
        res.status(200).json({
            state: true,
            msg: `User home page is rendered`,
            data: allProducts
        })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const profile = async (req, res) => {
    try {
        const { email } = req.body
        const existEmail = await Customer.find({ email })

        res.status(200).json({
            state: true,
            msg: `Profile Page form the customer API`,
            data: existEmail
        })
    }
    catch (error) {
        console.error(error)
    }
}

const allOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        return res.status(200).json({
            state: true,
            msg: `All Orders fetched successfully`,
            data: allOrders
        })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const allProducts = async (req, res) => {
    try {
        const {email} = req.body;
        const existEmail = await Customer.find({email})
        if(existEmail.length>=1){
            const allProducts = await Product.find()
            res.status(200).json({
                state: true,
                msg: `User allProducts page is rendered`,
                data: allProducts
            })
        }
        else{
            return res.status(400).json({state:false, msg: `User Not Found. Register First `})
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


const allReviews = async (req, res) => {
    try {
        const allReviews = await Review.find()
        res.status(200).json({
            state: true,
            msg: `User review page is rendered`,
            data: allReviews
        })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const allWishlists = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Customer.find({ email })
        if (existEmail) {
            const allWishlist = await Wishlist.find()
            return res.status(200).json({ state: true, msg: `Your Wishlist items`, data: allWishlist })
        }
        else {
            res.status(400).json({ state: false, msg: `You are not registered yet` })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const allCarts = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Customer.find({ email })
        if (existEmail) {
            const allCarts = await Cart.find()
            return res.status(200).json({ state: true, msg: `Your Cart items`, data: allCarts })
        }
        else {
            res.status(400).json({ state: false, msg: `You are not registered yet` })
        }
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

        // create the token 
        const token = await createToken(email, type)

        const customerData = {
            name,
            email,
            password,
            phone,
            address,
            type,
            otp,
            token
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

        const existEmail = await Customer.findOne({ email })

        if (existEmail) {

            //decrypt the hashed_password 
            const result = await comaprePassword(password, existEmail.password)
            // if both are same return true
            if (result) {
                if (password == newPass) {
                    return res.status(400).json({
                        state: false,
                        msg: `Previous Password and new Password should not be same `
                    })
                }
                else {

                    if (newPass == newConfPass) {
                        // compare regex password pattern 
                        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                        if (regexPassword.test(newPass)) {
                            const hashed_password = await hashPassword(newPass)
                            existEmail.password = hashed_password;
                            existEmail.token = token;

                            // save to DB 
                            await existEmail.save()
                            return res.status(200).json({
                                state: true,
                                msg: `Password is updated successfully`

                            })
                        }
                        else {
                            res.status(400).json({
                                state: false,
                                msg: `password is not valid`
                            })
                        }
                    }
                    else {
                        return res.status(400).json({
                            state: false,
                            msg: `New Password and Confirm Password did not matched!`
                        })
                    }
                }
            }
            else {
                return res.status(400).json({
                    state: false,
                    msg: `Incorrect Password`
                })
            }
        }
        else {
            return res.status(400).json({
                state: false,
                msg: `User does not exist`
            })

        }
    } catch (error) {
        console.error(error)
    }
}

// 

const addCart = async (req, res) => {
    try {
        const { email, userId, productId, quantity } = req.body;
        const existEmail = await Customer.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot Add items in cart. You have not created the account yet. Register your account first`
            })
        }
        else {
            await Cart.create({ userId, productId, quantity })
            return res.status(200).json({
                state: true,
                msg: `Items have been added to cart succesfully`
            })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const addOrder = async (req, res) => {
    try {
        const { email, userId, productId, shippingAddress, orderDate, quantity } = req.body;

        const existEmail = await Customer.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `User Does not existed please login first`
            })
        }
        else {
            const newOrder = { quantity, shippingAddress, orderDate, email, userId, productId }
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

        const { email, productId, userId, content, date, rating } = req.body;

        const existEmail = await Customer.find({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot reviw in this product. You have not created the account yet. Register your account first`
            })
        }
        else {
            await Review.create({ email, productId, userId, content, date, rating })
            return res.status(200).json({
                state: true,
                msg: `Your review has been added successfully`
            })
        }
    }
    catch (error) {
        console.error(error)
    }
}


const addWishlist = async (req, res) => {
    try {
        const { email, productId } = req.body;
        const existEmail = await Customer.find({ email })
        if (existEmail) {
            const wishlistItem = await Wishlist.find({ email, productId })
            if (wishlistItem.length >= 1) {
                await Wishlist.deleteOne({ email, productId })
                res.status(200).json({ state: true, msg: `Item removed from the wishlist`, data: wishlistItem })
            }
            else {
                const newWishlistItem = new Wishlist({ email, productId });
                await newWishlistItem.save();
                res.status(200).json({ state: true, msg: `Item added to the wishlist`, data: wishlistItem })
            }
        }
        else {
            res.status(400).json({ state: false, msg: `You are not register. Create your account first` })
        }
    }
    catch (error) {
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
        const { newName, email, newAddress, newPhone } = req.body;

        //check user exists or not?
        const existEmail = await Customer.findOne({ email })

        if (existEmail) {
            if (!newName.trim() == '' && !newPhone.trim() == '' && !newAddress.trim() == '') {

                const updatedUser = await Customer.findOneAndUpdate({ email }, {
                    name: newName,
                    address: newAddress,
                    phone: newPhone
                })

                return res.status(200).json({
                    state: true,
                    msg: `User Data updated successfully`,
                    data: updatedUser
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

const updateCart = async (req, res) => {
    try {
        const { email, userId, productId, newQuantity } = req.body;
        const existEmail = await Customer.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You have not created the account yet. Register your account first`
            })
        }
        else {
            await Cart.findOneAndUpdate({ email, userId, productId },
                { quantity: newQuantity }
            )
            return res.status(200).json({
                state: true,
                msg: `Your cart is updated succesfully`
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const updateReview = async (req, res) => {
    try {

        const { email, productId, userId, newContent, newDate, newRating } = req.body;

        const existEmail = await Customer.find({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You have not created the account yet. Register your account first`
            })
        }
        else {
            if (!newContent.trim() == '' && !newRating < 1) {
                const updatedReview = await Review.findOneAndUpdate({ productId, userId },
                    { content: newContent, date: newDate, rating: newRating }
                )
                return res.status(200).json({
                    state: true,
                    msg: `This review has been updated successfully`,
                    date: updatedReview
                })

            }
            else {
                res.status(400).json({ state: false, msg: `Content must not be empty and rating should be at least 1` })
            }
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


// DELETE METHODS 

const deleteCart = async (req, res) => {
    try {
        const { email, userId, productId } = req.body;
        const existEmail = await Customer.findOne({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot Add items in cart. You have not created the account yet. Register your account first`
            })
        }
        else {
            const deletedItem = await Cart.findOneAndDelete({ email, productId, userId })
            if (deletedItem) {
                return res.status(200).json({
                    state: true,
                    msg: `cart has been deleted successfully`
                })
            }
            else {
                return res.status(400).json({
                    state: false,
                    msg: `cart item not found`
                })
            }
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


const deleteWishlist = (req, res) => {
    try {
        res.status(200).json({ state: true, msg: `User wishlist page is rendered` })
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}


const deleteReview = async (req, res) => {
    try {

        const { email, productId, userId } = req.body;

        const existEmail = await Customer.find({ email })
        if (!existEmail) {
            return res.status(400).json({
                state: false,
                msg: `You cannot reviw in this product. You have not created the account yet. Register your account first`
            })
        }
        else {
            const deletedReview = await Review.findOneAndDelete({ productId, userId })
            if (deletedReview) {
                return res.status(200).json({ state: true, msg: `Your review has been deleted successfully` })
            }
            else {
                return res.status(400).json({ state: false, msg: `Review not found` })
            }
        }
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
    addCart,
    addOrder,
    addReview,
    addWishlist,
    allOrders,
    allProducts,
    allReviews,
    allWishlists,
    allCarts,
    updateProfile,
    updateCart,
    updateReview,
    deleteCart,
    deleteWishlist,
    deleteReview
}