const express = require('express')
const router = express.Router()
const adminAuthController = require('../controllers/admin/auth-controller')


// GET METHODS 
router.route('/users').get(adminAuthController.retriveAllUsers) //done
router.route('/user/:id').get(adminAuthController.retriveOneUser) //done
router.route('/vendors').get(adminAuthController.retriveAllVendors) //done
router.route('/vendor/:id').get(adminAuthController.retriveOneVendor) 
router.route('/products').get(adminAuthController.retriveAllProducts) //done
router.route('/product/:id').get(adminAuthController.retriveOneProduct) //done with minor error (when id is wrong it is not showing result of else in POSTMAN when id is wrong CATCH block is executing instead of TRY)
router.route('/orders').get(adminAuthController.retriveAllOrders) //done
router.route('/order/:id').get(adminAuthController.retriveOneOrder) //done
router.route('/reviews').get(adminAuthController.retriveAllReviews) //done
router.route('/review/:id').get(adminAuthController.retriveOneReview) //done
router.route('/vendor/:id/products').get(adminAuthController.retriveVendorProducts) //done
router.route('/vendor/:id/orders').get(adminAuthController.retriveVendorOrders) //done
router.route('/user/:id/orders').get(adminAuthController.retriveUserOrders) //done
router.route('/user/:id/reviews').get(adminAuthController.retriveUserReview) //done
router.route('/product/:id/reviews').get(adminAuthController.retriveProductReview) //done

// POST METHODS 
router.route('/register').post(adminAuthController.registerAdmin) //done
router.route('/login').post(adminAuthController.loginAdmin) //done
router.route('/verify-account').post(adminAuthController.verifyAdmin) //done
router.route('/change-password').post(adminAuthController.changePasswordAdmin) //done
router.route('/create-user').post(adminAuthController.createUser) //done
router.route('/create-vendor').post(adminAuthController.createVendor) //done
router.route('/create-product').post(adminAuthController.createProduct) //done
router.route('/add-order').post(adminAuthController.createOrder) //done
router.route('/add-review').post(adminAuthController.createReview) //done
router.route('/user/:id/change-password').post(adminAuthController.userPasswordChange) //done
router.route('/vendor/:id/change-password').post(adminAuthController.vendorPasswordChange) //done
router.route('/user/:id/verify').post(adminAuthController.toVerifyUser) //done
router.route('/vendor/:id/verify').post(adminAuthController.toVerifyVendor) //done

// PUT METHODS 
router.route('/user/:id').put(adminAuthController.updateUser)
router.route('/vendor/:id').put(adminAuthController.updateVendor)
router.route('/product/:id').put(adminAuthController.updateProduct)
router.route('/order/:id').put(adminAuthController.updateOrder)
router.route('/review/:id').put(adminAuthController.updateReview)

// DELETE METHODS 
router.route('/user/:id').delete(adminAuthController.deleteUser) //done  

router.route('/vendor/:id').delete(adminAuthController.deleteVendor) //done
router.route('/product/:id').delete(adminAuthController.deleteProduct) //done
router.route('/order/:id').delete(adminAuthController.deleteOrder) //done
router.route('/review/:id').delete(adminAuthController.deleteReview) //done


module.exports = router
