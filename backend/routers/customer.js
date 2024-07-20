const express = require('express')
const router = express.Router()
const customerAuthController = require('../controllers/customer/auth-controller')
const verifyToken = require('../utils/verify-token')


// GET METHODS 
router.route('/').get(customerAuthController.home)
router.route('/profile').get(customerAuthController.profile)
router.route('/orders').get(customerAuthController.orders)
router.route('/reviews').get(customerAuthController.reviews)
router.route('/wishlists').get(customerAuthController.wishlists)

// POST METHODS 
router.route('/register').post(customerAuthController.register)
router.route('/verify-account').post(customerAuthController.verifyAccount)
router.route('/login').post(customerAuthController.login)
router.route('/change-password').post(customerAuthController.changePassword)

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