const express = require('express')
const router = express.Router()
const customerAuthController = require('../controllers/customer/auth-controller')
const verifyToken = require('../utils/verify-token')

router.route('/').get(customerAuthController.home)
router.route('/allUsers').get(customerAuthController.getAllUsers)
router.route('/register').post(customerAuthController.register)
router.route('/verify-account').post(customerAuthController.verifyAccount)
router.route('/login').post(customerAuthController.login)
router.route('/updateName').post(verifyToken,customerAuthController.updateName)
router.route('/change-password').post(customerAuthController.changePassword)
router.route('/profile').get(customerAuthController.profile)
router.route('/order').get(customerAuthController.order)
router.route('/order/:orderId').post(customerAuthController.checkOrder)
router.route('/review').post(customerAuthController.review)
router.route('/reviews').get(customerAuthController.checkReviews)

module.exports = router