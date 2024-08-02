const express = require('express')
const router = express.Router()
const vendorAuthController = require('../controllers/vendor/auth-controller')


// GET METHODS  
router.route('/profile').get(vendorAuthController.profile) //donoe
router.route('/all-products/:id').get(vendorAuthController.allProducts) //done with minor issue
router.route('/product/:id').get(vendorAuthController.productDetail)
router.route('/all-orders/:id').get(vendorAuthController.allOrders)
router.route('/orders/:id').get(vendorAuthController.orderDetail)
router.route('/all-reviews/:id').get(vendorAuthController.allReviews)
router.route('/review/:id').get(vendorAuthController.reviewDetail)

// POST METHODS 
router.route('/register').post(vendorAuthController.register) //done
router.route('/verify-account').post(vendorAuthController.verifyVendor) //done
router.route('/login').post(vendorAuthController.login) //done
router.route('/change-password').post(vendorAuthController.changePassword) //done
router.route('/add-product').post(vendorAuthController.addProduct) //done
router.route('/add-order').post(vendorAuthController.addOrder)
router.route('/add-review').post(vendorAuthController.addReview)
router.route('/shop-detail').post(vendorAuthController.addShopDetail)

// PUT METHODS
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
