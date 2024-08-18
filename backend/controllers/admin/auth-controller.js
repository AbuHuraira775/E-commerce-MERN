const Vendor = require('../../models/vendor/vendor-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')
const Admin = require('../../models/admin/admin-model')
const Customer = require('../../models/customer/customer-model')
const Product = require('../../models/product/product-model')
const Order = require('../../models/order/order-model')
const Review = require('../../models/review/review-model')
const { allReviews } = require('../customer/auth-controller')

// GET 
const retriveAllUsers = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Admin.findOne({ email })
        if (existEmail) {
            const allUsers = await Customer.find()
            const users = allUsers.length
            return res.status(200).json({ state: true, users: users, msg: `All Users are fetched successfully`, data: allUsers })
        }
        else {
            return res.status(400).json({ state: false, msg: `This Admin account does not exist` })

        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveOneUser = async (req, res) => {
    try {
        const { adminEmail, userEmail } = req.body;
        const id = req.params.id;

        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.findOne({ email: adminEmail })

        if (isAdmin) {
            if (existEmail) {
                res.status(200).json({ state: true, msg: `User data is fetched successfully`, data: existEmail })
            }
            else {
                res.status(400).json({ state: false, msg: `This account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch user data. This admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveAllVendors = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Admin.findOne({ email })
        if (existEmail) {
            const allVendors = await Vendor.find()
            const vendors = allVendors.length
            return res.status(200).json({ state: true, vendors: vendors, msg: `All Vendors are fetched successfully`, data: allVendors })
        }
        else {
            return res.status(400).json({ state: false, msg: `This Admin account does not exist` })

        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveOneVendor = async (req, res) => {
    try {
        const { adminEmail, vendorEmail } = req.body;
        const id = req.params.id;

        const existEmail = await Vendor.findOne({ email: vendorEmail, _id: id })
        const isAdmin = await Admin.findOne({ email: adminEmail })

        if (isAdmin) {
            if (existEmail) {
                res.status(200).json({ state: true, msg: `Vendor data is fetched successfully`, data: vendor })
            }
            else {
                res.status(400).json({ state: false, msg: `This account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch vendor data. This admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveAllProducts = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Admin.findOne({ email })
        if (existEmail) {
            const allProducts = await Product.find()
            const products = allProducts.length
            return res.status(200).json({ state: true, products: products, msg: `All products are fetched successfully`, data: allProducts })
        }
        else {
            return res.status(400).json({ state: false, msg: `This Admin account does not exist` })

        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveOneProduct = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;

        const existProduct = await Product.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })

        if (isAdmin) {
            if (existProduct) {
                res.status(200).json({ state: true, msg: `Product data is fetched successfully`, data: existProduct })
            }
            else {
                res.status(400).json({ state: false, msg: `This Product does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch product data. This admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveAllOrders = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Admin.findOne({ email })
        if (existEmail) {
            const allOrders = await Order.find()
            const orders = allOrders.length
            return res.status(200).json({ state: true, orders: orders, msg: `All orders are fetched successfully`, data: allOrders })
        }
        else {
            return res.status(400).json({ state: false, msg: `This Admin account does not exist` })

        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveOneOrder = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;

        const existOrder = await Order.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })

        if (isAdmin) {
            if (existOrder) {
                res.status(200).json({ state: true, msg: `Order data is fetched successfully`, data: existOrder })
            }
            else {
                res.status(400).json({ state: false, msg: `This Order does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch order data. This admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveAllReviews = async (req, res) => {
    try {
        const { email } = req.body;
        const existEmail = await Admin.findOne({ email })
        if (existEmail) {
            const allReviews = await Review.find()
            const reviews = allReviews.length
            return res.status(200).json({ state: true, reviews: reviews, msg: `All reviews are fetched successfully`, data: allReviews })
        }
        else {
            return res.status(400).json({ state: false, msg: `This Admin account does not exist` })

        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveOneReview = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;

        const existReview = await Review.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })

        if (isAdmin) {
            if (existReview) {
                res.status(200).json({ state: true, msg: `Review is fetched successfully`, data: existReview })
            }
            else {
                res.status(400).json({ state: false, msg: `This Reviwe does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch review data. This admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }

}

const retriveVendorProducts = async (req, res) => {
    try {
        const { adminEmail, vendorEmail } = req.body;
        const id = req.params.id
        const existEmail = await Vendor.findOne({ email: vendorEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        console.log(isAdmin)
        if (isAdmin.length == 1) {
            if (existEmail) {
                const vendorProducts = await Product.find({ email: vendorEmail })
                const products = vendorProducts.length
                if (products == 0) {
                    return res.status(200).json({ state: true, msg: `This vendor has no product yet` })
                }
                else {
                    return res.status(200).json({ state: true, msg: `Vendor all products are fetched successfully`, products: products, data: vendorProducts })
                }

            }
            else {
                return res.status(400).json({ state: false, msg: `Vendor account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch vendor products. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveVendorOrders = async (req, res) => {
    try {
        const { adminEmail, vendorEmail } = req.body;
        const id = req.params.id
        const existEmail = await Vendor.findOne({ email: vendorEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        if (isAdmin.length == 1) {
            if (existEmail) {
                const vendorOrders = await Order.find({ sellerEmail: vendorEmail })
                const orders = vendorOrders.length
                if (orders == 0) {
                    return res.status(200).json({ state: true, msg: `This vendor has no order yet` })
                }
                else {
                    return res.status(200).json({ state: true, msg: `Vendor all orders are fetched successfully`, orders: orders, data: vendorOrders })
                }

            }
            else {
                return res.status(400).json({ state: false, msg: `Vendor account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch vendor's orders. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveUserOrders = async (req, res) => {
    try {
        const { adminEmail, userEmail } = req.body;
        const id = req.params.id
        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        if (isAdmin.length == 1) {
            if (existEmail) {
                const userOrders = await Order.find({ userId: id })
                const orders = userOrders.length
                if (orders == 0) {
                    return res.status(200).json({ state: true, msg: `User did not order any product yet` })

                }
                return res.status(200).json({ state: true, msg: `User all orders are fetched successfully`, orders: orders, data: userOrders })

            }
            else {
                return res.status(400).json({ state: false, msg: `User account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch user's orders. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveUserReview = async (req, res) => {
    try {
        const { adminEmail, userEmail } = req.body;
        const id = req.params.id
        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        if (isAdmin.length == 1) {
            if (existEmail) {
                const userReviews = await Review.find({ userId: id })
                const reviews = userReviews.length
                if (reviews == 0) {
                    return res.status(200).json({ state: true, msg: `User did not review any product yet` })
                }
                else {
                    return res.status(200).json({ state: true, msg: `User all reviews are fetched successfully`, reviews: reviews, data: userReviews })
                }

            }
            else {
                return res.status(400).json({ state: false, msg: `User account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to fetch user's reviews. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const retriveProductReview = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;
        const existProduct = await Product.find({ _id: id })
        const isAdmin = await Admin.find({ email })
        if (isAdmin.length == 1) {
            if (existProduct) {
                const productReviews = await Review.find({ productId: id })
                const reviews = productReviews.length
                if (reviews == 0) {
                    return res.status(200).json({ state: true, msg: `This product has no review` })
                }
                else {
                    return res.status(200).json({ state: true, msg: `All reviews are fetched successfully`, review: reviews, data: productReviews })
                }
            }
            else {
                return res.status(400).json({ state: false, msg: `This product does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: true, msg: `You are not authorized to fetch product reviews. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

// POST 

const registerAdmin = async (req, res) => {

    try {
        //fetch data from the body
        const { name, email, password, phone, address, type } = req.body;

        //generate OTP 
        const otp = generate_OPT()

        // create the token 
        const token = await createToken(email, type)

        const adminData = { name, email, password, phone, address, type, otp, token }

        //check email exits  or not?
        const existEmail = await Admin.findOne({ email })

        // when email exists,  user cannot create the account again
        if (existEmail) {
            return res.status(400).json({ state: false, msg: `Admin exists with this account` })
        }
        else {
            // hash the password first 
            adminData.password = await hashPassword(password)

            // save to MongoDB 
            const adminCreated = await Admin.create(adminData)

            sendEmail(adminCreated.email, adminCreated.otp)
            res.status(200).send({
                state: true,
                msg: `Your account has been created successfully.`,
                data: adminCreated,
            })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }

}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user has the acoount?
        const existEmail = await Admin.findOne({ email })
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
                msg: `Your are not registered. Create the account first than login`
            })
        }

    } catch (error) {
        console.error(error)
    }
}
const verifyAdmin = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const existEmail = await Admin.findOne({ email })

        if (existEmail) {
            if (otp == existEmail.otp) {
                existEmail.isVerified = true

                // update MongoDB 
                await existEmail.save();
                return res.status(200).json({ state: true, msg: `You are verified successfully` })
            }
            else {
                console.log(existEmail)
                return res.status(400).json({ state: false, msg: `OTP is not correct` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `This account does not exist` })
        }

    }
    catch (error) {
        console.error(error)
    }
}

const changePasswordAdmin = async (req, res) => {
    try {
        const { email, password, newPass, newConfPass, token } = req.body;

        const existEmail = await Admin.findOne({ email })

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
                msg: `This account does not exist`
            })

        }
    } catch (error) {
        console.error(error)
    }
}

const createUser = async (req, res) => {
    try {
        const { adminEmail, userName, userEmail, userPassword, userPhone, userAddress, type } = req.body;

        //generate OTP 
        const otp = generate_OPT()

        // create the token 
        const token = await createToken(userEmail, type)

        const userData = { userName, userEmail, userPassword, userPhone, userAddress, type, otp, token }

        const isAdmin = await Admin.findOne({ email: adminEmail })

        //check email exits  or not?
        const existEmail = await Customer.findOne({ email: userEmail })

        if (isAdmin) {

            // when email exists,  user cannot create the account again
            if (existEmail) {
                return res.status(400).json({ state: false, msg: `User exists with this account` })
            }
            else {
                // hash the password first 
                userData.password = await hashPassword(userPassword)

                // save to MongoDB 
                const userCreated = await Customer.create({
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    otp,
                    phone: userPhone,
                    address: userAddress,
                    type,
                    token
                })

                sendEmail(userCreated.email, userCreated.otp)
                res.status(200).send({
                    state: true,
                    msg: `User has been created successfully.`,
                    data: userCreated,
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to create a user. This Admin account does not exist` })
        }
    }

    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const createVendor = async (req, res) => {
    try {
        const { adminEmail, vendorName, vendorEmail, vendorPassword, vendorPhone, vendorAddress, type, shopeName, shopeAddress } = req.body;

        //generate OTP 
        const otp = generate_OPT()

        // create the token 
        const token = await createToken(vendorEmail, type)

        const vendorData = { vendorName, vendorEmail, vendorPassword, vendorPhone, vendorAddress, type, otp, token, shopeName, shopeAddress }

        const isAdmin = await Admin.findOne({ email: adminEmail })

        //check email exits  or not?
        const existEmail = await Vendor.findOne({ email: vendorEmail })

        if (isAdmin) {

            // when email exists,  user cannot create the account again
            if (existEmail) {
                return res.status(400).json({ state: false, msg: `Vendor exists with this account` })
            }
            else {
                // hash the password first 
                vendorData.password = await hashPassword(vendorPassword)

                // save to MongoDB 
                const vendorCreated = await Vendor.create({
                    name: vendorName,
                    email: vendorEmail,
                    password: vendorPassword,
                    otp,
                    phone: vendorPhone,
                    address: vendorAddress,
                    type,
                    token,
                    shopeName,
                    shopeAddress
                })

                sendEmail(vendorCreated.email, vendorCreated.otp)
                res.status(200).send({
                    state: true,
                    msg: `vendor has been created successfully.`,
                    data: vendorCreated,
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to create a vendor. This Admin account does not exist` })
        }
    }

    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const createProduct = async (req, res) => {
    try {
        const { adminEmail, id, title, description, price, category, image, vendorEmail } = req.body;
        const existEmail = await Vendor.findOne({ email: vendorEmail })
        const existProduct = await Product.findOne({ email: vendorEmail, id })
        const IDregex = /^[a-z]{3,5}-[a-z]{3,5}-\d{3}$/
        const productData = { id, title, description, price, category, image, vendorEmail }
        const isAdmin = await Admin.findOne({ email: adminEmail })

        if (isAdmin) {

            if (existEmail) {
                const isVerified = await existEmail.isVerified
                if (isVerified == false) {
                    return res.status(400).json({ state: false, msg: `This account is not verified. Verify this account first than upload the product` })
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
                    msg: `VENDOR does not existed. Register his account first`
                })
            }
        }

        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to create this product. This Admin account does not exist` })
        }

    }
    catch (error) {
        console.error(`API failed due to : ${error}`)
    }
}

const createOrder = async (req, res) => {
    try {
        const { adminEmail, userEmail, userId, productId, shippingAddress, orderDate, quantity, sellerEmail } = req.body;

        const existEmail = await Customer.findOne({ email: userEmail })
        const isAdmin = await Customer.findOne({ email: adminEmail })
        if (isAdmin) {

            if (!existEmail) {
                return res.status(400).json({
                    state: false,
                    msg: `User Does not existed please signup first`
                })
            }
            else if (userEmail == sellerEmail) {
                return res.status(400).json({
                    state: false,
                    msg: `You cannot order yourself`
                })
            }
            else {
                const newOrder = { quantity, shippingAddress, orderDate, userId, productId, sellerEmail }
                await Order.create(newOrder)
                return res.status(200).json({
                    state: true,
                    msg: `Order has been created successfully`
                })
            }
        }
        else {
            return res.status(400).json({ state: true, msg: `You are not authorized to create the order. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error(`Error : ${error}`)
    }
}

const createReview = async (req, res) => {
    try {

        const { adminEmail, userEmail, productId, userId, content, date, rating, sellerEmail } = req.body;

        const existEmail = await Customer.find({ email: userEmail })
        const isAdmin = await Admin.find({ email: adminEmail })

        if (isAdmin) {

            if (!existEmail) {
                return res.status(400).json({
                    state: false,
                    msg: `You cannot reviw in this product. This user has no account yet. Register the account first`
                })
            }
            else if (userEmail == sellerEmail) {
                return res.status(400).json({
                    state: false,
                    msg: `User cannot review in his own product`
                })
            }
            else {
                await Review.create({ email: userEmail, productId, userId, content, date, rating, sellerEmail })
                return res.status(200).json({
                    state: true,
                    msg: `User review has been added successfully`
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to review this product. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error('Error : ', error)
    }
}

const userPasswordChange = async (req, res) => {
    try {
        const { adminEmail, userEmail, newPassword } = req.body;

        const existEmail = await Customer.findOne({ email: userEmail })
        const isAdmin = await Admin.findOne({ email: adminEmail })

        if (isAdmin) {

            if (existEmail) {
                // compare regex password pattern 
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (regexPassword.test(newPassword)) {
                    const hashed_password = await hashPassword(newPassword)
                    existEmail.password = hashed_password;

                    // save to DB 
                    await existEmail.save()
                    return res.status(200).json({
                        state: true,
                        msg: `User Password has been updated successfully`

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
                    msg: `User does not exist`
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to change the user password. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const vendorPasswordChange = async (req, res) => {
    try {
        const { adminEmail, vendorEmail, newPassword } = req.body;

        const existEmail = await Vendor.findOne({ email: vendorEmail })
        const isAdmin = await Admin.findOne({ email: adminEmail })
        console.log('vendor : ', existEmail)
        console.log('admin : ', isAdmin)
        if (isAdmin) {

            if (existEmail) {
                // compare regex password pattern 
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (regexPassword.test(newPassword)) {
                    const hashed_password = await hashPassword(newPassword)
                    existEmail.password = hashed_password;

                    // save to DB 
                    await existEmail.save()
                    return res.status(200).json({
                        state: true,
                        msg: `Vendor Password has been updated successfully`

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
                    msg: `Vendor has not created the account yet.`
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to change the user password. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const toVerifyUser = async (req, res) => {
    try {
        const { adminEmail, userEmail } = req.body;
        const id = req.params.id;

        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.findOne({ email: adminEmail })
        console.log('admin : ', isAdmin)
        if (isAdmin.length == 1) {
            if (existEmail) {
                const status = await existEmail.isVerified
                console.log(status)
            }
            else {
                return res.status(400).json({ state: false, msg: `User account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to verify the user account. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error(error)
    }
}

const toVerifyVendor = async (req, res) => {
    try {
        const { adminEmail, vendorEmail, newPassword } = req.body;

        const existEmail = await Vendor.findOne({ email: vendorEmail })
        const isAdmin = await Admin.findOne({ email: adminEmail })
        console.log('vendor : ', existEmail)
        console.log('admin : ', isAdmin)
        if (isAdmin) {

            if (existEmail) {
                // compare regex password pattern 
                const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
                if (regexPassword.test(newPassword)) {
                    const hashed_password = await hashPassword(newPassword)
                    existEmail.password = hashed_password;

                    // save to DB 
                    await existEmail.save()
                    return res.status(200).json({
                        state: true,
                        msg: `Vendor Password has been updated successfully`

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
                    msg: `Vendor has not created the account yet.`
                })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to change the user password. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.error(error)
    }
}


// PUT 

const updateUser = async (req, res) => {
    try {
        const { adminEmail, userEmail, name, phone, address } = req.body;
        const id = req.params.id;
        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        if (isAdmin.length == 1) {
            if (existEmail) {
                const userUpdate = { name, phone, address }
                await existEmail.updateOne(userUpdate)
                return res.status(200).json({ state: true, msg: `User updated successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `User does not exist. Register First` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to update user data. This Admin account does not exist` })
        }

        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateUser Page is rendered`
        })
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const updateVendor = async (req, res) => {
    try {
        const { adminEmail, vendorEmail, name, phone, address, shopeName, shopeAddress } = req.body;
        const id = req.params.id;
        const existEmail = await Vendor.findOne({ email: vendorEmail, _id: id })
        const isAdmin = await Admin.find({ email: adminEmail })
        if (isAdmin.length == 1) {
            if (existEmail) {
                const vendorUpdate = { name, phone, address, shopeName, shopeAddress }
                await existEmail.updateOne(vendorUpdate)
                return res.status(200).json({ state: true, msg: `Vendor is updated successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `Vendor does not exist. Register First` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to update vendor data. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const updateProduct = async (req, res) => {
    try {
        const { email, title, image, description, category, price } = req.body;
        const id = req.params.id;
        const existProduct = await Product.findOne({ _id: id })
        const isAdmin = await Admin.find({ email })
        if (isAdmin.length == 1) {
            if (isAdmin.length == 1) {
                const productUpdate = { title, image, description, category, price }
                await existProduct.updateOne(productUpdate)
                return res.status(200).json({ state: true, msg: `Product is updated successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `Product does not exist.` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to update product data. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const updateOrder = async (req, res) => {
    try {
        const { email, shippingAddress, quantity } = req.body;
        const id = req.params.id;
        const existOrder = await Order.findOne({ _id: id })
        const isAdmin = await Admin.find({ email })
        console.log(existOrder)
        if (isAdmin.length == 1) {
            if (existOrder) {
                const orderDate = new Date()
                const orderUpdate = { orderDate, shippingAddress, quantity }
                await existOrder.updateOne(orderUpdate)
                return res.status(200).json({ state: true, msg: `Order is updated successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `Order does not exist.` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to update order. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const updateReview = async (req, res) => {
    try {
        const { email, content, rating } = req.body;
        const id = req.params.id;
        const existReview = await Review.findOne({ _id: id })
        const isAdmin = await Admin.find({ email })
        console.log(isAdmin)
        if (isAdmin.length == 1) {
            if (existReview) {
                const date = new Date()
                const reviewUpdate = { content, rating, date }
                await existReview.updateOne(reviewUpdate)
                return res.status(200).json({ state: true, msg: `Review is updated successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `Review does not exist.` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to update review. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

// DELETE 

const deleteUser = async (req, res) => {
    try {
        const { adminEmail, userEmail } = req.body;
        const id = req.params.id;
        const existEmail = await Customer.findOne({ email: userEmail, _id: id })
        const isAdmin = await Admin.findOne({ email: adminEmail })
        if (isAdmin) {
            if (existEmail) {
                await existEmail.deleteOne()
                return res.status(200).json({ state: true, msg: `User Deleted successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `This User account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to delete the user. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const deleteVendor = async (req, res) => {
    try {
        const { adminEmail, vendorEmail } = req.body;
        const id = req.params.id;
        const existEmail = await Vendor.findOne({ email: vendorEmail, _id: id })
        const isAdmin = await Admin.findOne({ email: adminEmail })
        if (isAdmin) {
            if (existEmail) {
                await existEmail.deleteOne()
                return res.status(200).json({ state: true, msg: `Vendor Deleted successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `This Vendor account does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to delete the vendor. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;
        const existProduct = await Product.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })
        if (isAdmin) {
            if (existProduct) {
                await existProduct.deleteOne()
                return res.status(200).json({ state: true, msg: `Product Deleted successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `This Product does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to delete the product. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;
        const existOrder = await Order.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })
        if (isAdmin) {
            if (existOrder) {
                await existOrder.deleteOne()
                return res.status(200).json({ state: true, msg: `Order Deleted successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `This Order does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to delete the order. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

const deleteReview = async (req, res) => {
    try {
        const { email } = req.body;
        const id = req.params.id;
        const existReview = await Review.findOne({ _id: id })
        const isAdmin = await Admin.findOne({ email })
        if (isAdmin) {
            if (existReview) {
                await existReview.deleteOne()
                return res.status(200).json({ state: true, msg: `Review Deleted successfully` })

            }
            else {
                return res.status(400).json({ state: false, msg: `This Review does not exist` })
            }
        }
        else {
            return res.status(400).json({ state: false, msg: `You are not authorized to delete the review. This Admin account does not exist` })
        }
    }
    catch (error) {
        console.log(`API failed due to : ${error}`)
    }
}

module.exports = {
    retriveAllUsers,
    retriveOneUser,
    retriveAllVendors,
    retriveOneVendor,
    retriveAllProducts,
    retriveOneProduct,
    retriveAllOrders,
    retriveOneOrder,
    retriveAllReviews,
    retriveOneReview,
    retriveVendorProducts,
    retriveVendorOrders,
    retriveUserOrders,
    retriveUserReview,
    retriveProductReview,
    registerAdmin,
    loginAdmin,
    verifyAdmin,
    changePasswordAdmin,
    createUser,
    createVendor,
    createProduct,
    createOrder,
    createReview,
    userPasswordChange,
    vendorPasswordChange,
    updateUser,
    updateVendor,
    updateProduct,
    updateOrder,
    updateReview,
    toVerifyUser,
    toVerifyVendor,
    deleteUser,
    deleteVendor,
    deleteProduct,
    deleteOrder,
    deleteReview
}