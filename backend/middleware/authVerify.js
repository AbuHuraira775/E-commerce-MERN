const jwt = require("jsonwebtoken");
const Customer = require("../models/customer/customer-model");
var ObjectId = require("mongodb").ObjectId;

const verifyAuthToken = async (req, res, next) => {
    try{
  const { id, token, apiType } = req.body;
  console.log(req.body);
  //  AuthModel.findById(id)
  var o_id = new ObjectId(id);
  const existId = await Customer.find({ _id: o_id });
      // const existId = await Customer.findOne(ObjectId(id))
      if (existId) {
        console.log("existId", existId);
        if (!existId[0].isVerified){
          return res
            .status(401)
            .send({
              state: "failure",
              message:
                "Currently your account is not verified, Kindly contact to service center.",
            });
        }
        else {
          jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
              return res
                .status(401)
                .send({ message: "Unauthorized person", state: "failure" });
            } else {
              if (existId[0]?.type === "customer") {
                if (apiType == "route") {
                  return res
                    .status(200)
                    .send({ message: "Authorized person", state: "success" });
                } else {
                  req.userData = existId;
                  next();
                }
              } else {
                return res
                  .status(422)
                  .send({
                    state: "failed",
                    message: "This service is only for Customers!",
                  });
              }
            }
          });
        }
      } else {
        return res
          .status(401)
          .send({ message: "unauthorized person", state: "failure" });
}
    }
catch(err){
    console.log(err)
    return res
    .status(401)
    .send({ message: "unauthorized persons", messages:err,state: "failure" });
}
};

module.exports = { verifyAuthToken };
