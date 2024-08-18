const mongoose = require('mongoose')

const whishlistSchema = new mongoose.Schema({
    email:{type: String, required:true},
    productId:{type:String, required:true}
})

const Wishlist = new mongoose.model('Wishlist',whishlistSchema)
module.exports = Wishlist