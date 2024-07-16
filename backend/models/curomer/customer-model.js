const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: Object,
        properties:{
            street: "String",
            state:"String",
            city: "String"
        },
        required: true
    },
    phone:{
        type: String,
        required: true 
    },
    type: {
        type: String,
        required: true,
        default: 'customer'
      },
    

})
//hash the password before savind the data to MoonogDB
customerSchema.pre('save',async function(next){
    try{
        if(!this.isModified('password')){
            next()
        }
        else{
            const saltRound = await bcrypt.saltRound(10)
            const hashed_password =await bcrypt.hash(this.password,process.env.SECRET_KEY)
            this.password = hashed_password
        }
    }
    catch(err){
        next(err)
    }
})

const Customer  = new mongoose.model('customer',customerSchema)
module.exports = Customer