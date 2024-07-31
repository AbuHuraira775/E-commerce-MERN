const express = require('express')
const router = express.Router()
const customerAuthController = require('../controllers/customer/auth-controller')
const verifyToken = require('../utils/verify-token')
const {verifyAuthToken} = require('../middleware/authVerify')

// GET METHODS 
router.route('/').get(customerAuthController.home)
router.route('/profile').get(customerAuthController.profile)
router.route('/all-orders').get(customerAuthController.allOrders)
router.route('/all-products').get(customerAuthController.allProducts)
router.route('/all-reviews').get(customerAuthController.allReviews)
router.route('/all-wishlists').get(customerAuthController.allWishlists)

// POST METHODS 
router.route('/register').post(customerAuthController.register)
// router.post('/register',customerAuthController.register)
router.route('/verify-account').post(customerAuthController.verifyAccount)
router.route('/login').post(customerAuthController.login)
router.route('/change-password').post(customerAuthController.changePassword)
router.route('/add-cart').post(customerAuthController.addCart)
router.route('/add-whishlist').post(customerAuthController.addWhishlist)
router.route('/add-review').post(customerAuthController.addReview)
router.route('/add-order').post(customerAuthController.addOrder)

// PUT METHODS 
router.route('/updateName').put(customerAuthController.updateName)
router.route('/profile').put(customerAuthController.updateProfile)
router.route('/cart').put(customerAuthController.updateCart)
router.route('/review').put(customerAuthController.updateReview)

// DELETE METHODS
router.route('/cart').delete(customerAuthController.cart)
router.route('/wishlist').delete(customerAuthController.wishlist)
router.route('/review').delete(customerAuthController.review)

// check all user 
router.route('/all-users').get(customerAuthController.getAllUsers)

module.exports = router