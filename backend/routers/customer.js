const express = require('express')
const router = express.Router()
const customerAuthController = require('../controllers/customer/auth-controller')
const verifyToken = require('../utils/verify-token')
const { verifyAuthToken } = require('../middleware/authVerify')

// GET METHODS 
router.route('/').get(customerAuthController.home) //done 
router.route('/profile').get(customerAuthController.profile)  //done
router.route('/all-orders').get(customerAuthController.allOrders)  //done
router.route('/all-products').get(customerAuthController.allProducts)  //done
router.route('/all-reviews').get(customerAuthController.allReviews) //done
router.route('/all-wishlists').get(customerAuthController.allWishlists) //done
router.route('/all-carts').get(customerAuthController.allCarts) //done

// POST METHODS 
router.route('/register').post(customerAuthController.register)  //done
router.route('/verify-account').post(customerAuthController.verifyAccount)  //done
router.route('/login').post(customerAuthController.login)  //done
router.route('/change-password').post(customerAuthController.changePassword)  //done
router.route('/add-cart').post(customerAuthController.addCart) //----------error
router.route('/add-wishlist').post(customerAuthController.addWishlist) //done
router.route('/add-review').post(customerAuthController.addReview) //done
router.route('/add-order').post(customerAuthController.addOrder) //done

// PUT METHODS 
router.route('/update-name').put(customerAuthController.updateName) //done
// router.route('/update-profile').put(customerAuthController.updateProfile) --------------//
router.route('/update-cart').put(customerAuthController.updateCart) // ----------------error
router.route('/update-review').put(customerAuthController.updateReview) //done

// DELETE METHODS
router.route('/delete-cart').delete(customerAuthController.deleteCart) //done
router.route('/delete-wishlist').delete(customerAuthController.deleteWishlist)
router.route('/delete-review').delete(customerAuthController.deleteReview) //done

// check all user 
router.route('/all-users').get(customerAuthController.getAllUsers)

module.exports = router