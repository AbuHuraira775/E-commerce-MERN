const jwt = require("jsonwebtoken");
const Customer = require('../models/customer/customer-model')
var ObjectId = require('mongodb').ObjectId; 


const verifyAuthToken =async(req,res,next)=>{
    const {email,id,tkn,userType}= req.body;
    //  AuthModel.findById(id)
    var o_id = new ObjectId(id);
    const existId = await Customer.find({ '_id':o_id })
    // const existId = await Customer.findOne(ObjectId(id))
        if(existId){
        console.log("existId",existId);
        if(!existId.isVerified)
            return res.status(401).send({state:"failure",message:"Currently your account is not verified, Kindly contact to service center."})
        else {
            jwt.verify(tkn,process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                return res.status(401).send({message:"unauthorized person 2",state:"failure"})
            }
            else{
                if(existId?.type === "customer"){
                req.userData = existId
                next();
            }else{
                return res.status(422).send({state:"failed",message:"This service is only for Users!"})
            }
            }
        })
    }
}
else{
        return res.status(401).send({message:"unauthorized person",state:"failure"})
}

};


module.exports={verifyAuthToken};