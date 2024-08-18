const express = require('express')
const router = express.Router()
const vendorAuthController = require('../controllers/vendor/auth-controller')


// GET METHODS  
router.route('/profile').get(vendorAuthController.profile) //donoe
router.route('/all-products/:id').get(vendorAuthController.allProducts) //done with minor issue
router.route('/product/:id').get(vendorAuthController.productDetail) //done
router.route('/all-orders/:id').get(vendorAuthController.allOrders) //done
router.route('/order/:id').get(vendorAuthController.orderDetail) //done
router.route('/all-reviews/:id').get(vendorAuthController.allReviews) //done
router.route('/review/:id').get(vendorAuthController.reviewDetail) //done

// POST METHODS 
router.route('/register').post(vendorAuthController.register) //done
router.route('/verify-account').post(vendorAuthController.verifyVendor) //done
router.route('/login').post(vendorAuthController.login) //done
router.route('/change-password').post(vendorAuthController.changePassword) //done
router.route('/add-product').post(vendorAuthController.addProduct) //done
router.route('/add-order').post(vendorAuthController.addOrder) //done
router.route('/add-review').post(vendorAuthController.addReview) //done

// PUT METHODS
router.route('/product/:id').put(vendorAuthController.editProduct)
router.route('/order/:id').put(vendorAuthController.editOrder)
router.route('/review/:id').put(vendorAuthController.editreview)
router.route('/shop-detail/:id').put(vendorAuthController.editShopDetail) //done

// DELETE METHODS 
router.route('/products').delete(vendorAuthController.deleteAllProducts)
router.route('/product/:id').delete(vendorAuthController.deleteOneProduct)
router.route('/orders').delete(vendorAuthController.deleteAllOrders)
router.route('/order/:id').delete(vendorAuthController.deleteOneOrder)
router.route('/reviews').delete(vendorAuthController.deleteAllReviews)
router.route('/review/:id').delete(vendorAuthController.deleteOnereview)

module.exports = router
