const express = require('express')
const router = express.Router()
const vendorAuthController = require('../controllers/vendor/auth-controller')


// GET METHODS 
router.route('/profile').get(vendorAuthController.profile)
router.route('/products').get(vendorAuthController.allProducts)
router.route('/product/:id').get(vendorAuthController.productDetail)
router.route('/orders').get(vendorAuthController.allOrders)
router.route('/orders/:id').get(vendorAuthController.orderDetail)
router.route('/reviews').get(vendorAuthController.allReviews)
router.route('/review/:id').get(vendorAuthController.reviewDetail)

// POST METHODS 
router.route('/register').post(vendorAuthController.register)
router.route('/login').post(vendorAuthController.login)
router.route('/forgot-password').post(vendorAuthController.forgotPassword)
router.route('/reset-password').post(vendorAuthController.resetPassword)
router.route('/product').post(vendorAuthController.addProduct)
router.route('/order').post(vendorAuthController.addOrder)
router.route('/review').post(vendorAuthController.addReview)
router.route('/shop-detail').post(vendorAuthController.addShopDetail)
router.route('/product/:id').put(vendorAuthController.editProduct)
router.route('/order/:id').put(vendorAuthController.editOrder)
router.route('/review/:id').put(vendorAuthController.editreview)
router.route('/shop-detail').put(vendorAuthController.editShopDetail)

// DELETE METHODS 
router.route('/products').delete(vendorAuthController.deleteAllProducts)
router.route('/product/:id').delete(vendorAuthController.deleteOneProduct)
router.route('/orders').delete(vendorAuthController.deleteAllOrders)
router.route('/order/:id').delete(vendorAuthController.deleteOneOrder)
router.route('/reviews').delete(vendorAuthController.deleteAllReviews)
router.route('/review/:id').delete(vendorAuthController.deleteOnereview)

module.exports = router
