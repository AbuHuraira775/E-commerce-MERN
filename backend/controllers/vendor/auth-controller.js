const Vendor = require('../../models/vendor/vendor-model')
const createToken = require('../../utils/createToken')
const hashPassword = require('../../utils/hash-password')
const comaprePassword = require('../../utils/comapre-password')
const generate_OPT = require('../../utils/generate-otp')
const sendEmail = require('../../utils/send-mail')

// GET 
const profile = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. profile page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const allProducts = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. allProducts page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const productDetail = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. productDetail page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const allOrders = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. allOrders page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const orderDetail = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. orderDetail page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const allReviews = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. allReviews page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

const reviewDetail = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `Vendor GET METHOD. reviewDetail page is rendered`
        })
    } 
    catch (error) {
    console.error(`API failed due to : ${error}`)    
    }
}

// POST 
const register = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: regsiter page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const login = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: login page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const forgotPassword = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: forgotPassword page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const resetPassword = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: resetPassword page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const addProduct = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: addProduct page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const addOrder = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: addOrder page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const addReview = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: addReview page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const addShopDetail = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR POST METHOD: addShopDetail page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

// PUT 
const updateProfile = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT METHOD: updateProfile page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const editProduct = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT METHOD: editProduct page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const editOrder = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT METHOD: editOrder page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const editreview = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT METHOD: editreview page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const editShopDetail = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT METHOD: editShopDetail page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

// DELETE 
const deleteAllProducts = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR DELETE: deleteAllProducts page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const deleteOneProduct = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT DELETE: deleteOneProduct page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const deleteAllOrders = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT DELETE: deleteAllOrders page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const deleteOneOrder = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT DELETE: deleteOneOrder page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const deleteAllReviews = async(req,res)=>{
    try {
        res.status(200).json({state:true,
            msg: `VENDOR PUT DELETE: deleteAllReviews page is rendered`
        })
    } 
    catch (error) {
        console.error(`API failed due to : ${error}`)    
    }
}

const deleteOnereview = async(req,res)=>{
    try {
        res.status(200).json({state:true,
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
    forgotPassword,
    resetPassword,
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