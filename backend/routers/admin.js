const express = require('express')
const router = express.Router()
const adminAuthController = require('../controllers/admin/auth-controller')


// GET METHODS 
router.route('/users').get(adminAuthController.retriveAllUsers)
router.route('/user/:id').get(adminAuthController.retriveOneUser)
router.route('/vendors').get(adminAuthController.retriveAllVendors)
router.route('/vendor/:id').get(adminAuthController.retriveOneVendor)
router.route('/products').get(adminAuthController.retriveAllProducts)
router.route('/product/:id').get(adminAuthController.retriveOneProduct)
router.route('/orders').get(adminAuthController.retriveAllOrders)
router.route('/order/:id').get(adminAuthController.retriveOneOrder)
router.route('/reviews').get(adminAuthController.retriveAllReviews)
router.route('/review/:id').get(adminAuthController.retriveOneReview)

// POST METHODS 
router.route('/user').post(adminAuthController.createUser)
router.route('/vendor').post(adminAuthController.createVendor)
router.route('/product').post(adminAuthController.createProduct)
router.route('/order').post(adminAuthController.createOrder)
router.route('/review').post(adminAuthController.createReview)
router.route('/user/:id/change-password').post(adminAuthController.userPasswordChange)
router.route('/user/:id/reset-password').post(adminAuthController.userPasswordReset)
router.route('/vendor/:id/change-password').post(adminAuthController.vendorPasswordChange)
router.route('/vendor/:id/reset-password').post(adminAuthController.vendorPasswordReset)

// PUT METHODS 
router.route('/user/:id').put(adminAuthController.updateUser)
router.route('/vendor/:id').put(adminAuthController.updateVendor)
router.route('/product/:id').put(adminAuthController.updateProduct)
router.route('/order/:id').put(adminAuthController.updateOrder)
router.route('/review/:id').put(adminAuthController.updateReview)

// DELETE METHODS 
router.route('/user/:id').delete(adminAuthController.deleteUser)
router.route('/vendor/:id').delete(adminAuthController.deleteVendor)
router.route('/product/:id').delete(adminAuthController.deleteProduct)
router.route('/order/:id').delete(adminAuthController.deleteOrder)
router.route('/review/:id').delete(adminAuthController.deleteReview)


module.exports = router
