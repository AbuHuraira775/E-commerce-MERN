const Vendor = require('../../models/vendor/vendor-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')

// GET 
const retriveAllUsers = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriewAllUsers Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveOneUser = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveOneUser Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveAllVendors = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveAllVendors Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveOneVendor = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveOneVendor Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveAllProducts = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveAllProducts Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveOneProduct = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveOneProduct Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveAllOrders = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveAllOrders Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveOneOrder = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveOneOrder Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveAllReviews = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveAllReviews Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const retriveOneReview = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN GET METHOD: retriveOneReview Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

// POST 

const createUser = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: createUser Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const createVendor = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: createVendor Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const createProduct = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: createProduct Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const createOrder = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: createOrder Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const createReview = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: createReview Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const userPasswordChange = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: userPasswordChange Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const userPasswordReset = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: userPasswordReset Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const vendorPasswordChange = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: vendorPasswordChange Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const vendorPasswordReset = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN POST METHOD: vendorPasswordReset Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

// PUT 

const updateUser = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateUser Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const updateVendor = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateVendor Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const updateProduct = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateProduct Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const updateOrder = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateOrder Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const updateReview = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN PUT METHOD: updateReview Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

// DELETE 

const deleteUser = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN DELETE METHOD: deleteUser Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const deleteVendor = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN DELETE METHOD: deleteVendor Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const deleteProduct = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN DELETE METHOD: deleteProduct Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const deleteOrder = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN DELETE METHOD: deleteOrder Page is rendered`
        })
    } 
    catch (error) {
        console.log(`API failed due to : ${error}`)    
    }
}

const deleteReview = async(req,res)=>{
    try {
        res.status(200).json({
            state: true,
            msg: `ADMIN DELETE METHOD: deleteReview Page is rendered`
        })
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
    createUser,
    createVendor,
    createProduct,
    createOrder,
    createReview,
    userPasswordChange,
    userPasswordReset,
    vendorPasswordChange,
    vendorPasswordReset,
    updateUser,
    updateVendor,
    updateProduct,
    updateOrder,
    updateReview,
    deleteUser,
    deleteVendor,
    deleteProduct,
    deleteOrder,
    deleteReview
}