const express = require('express')
const router = express.Router()
const customerAuthController = require('../controllers/customer/auth-controller')

router.route('/').get(customerAuthController.home)
router.route('/register').get(customerAuthController.register)
router.route('/order').get(customerAuthController.order)
router.route('/review').get(customerAuthController.review)

module.exports = router