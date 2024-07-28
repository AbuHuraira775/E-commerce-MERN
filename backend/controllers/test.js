const test = async(req,res)=>{

    const pass = '11223344'
    const regexPassword = new RegExp(/^(?=.*[a-z])(?=\d*[0-9])[a-z0-9]{8,}$/);
    const newPass = 'a1234567'
    const result = regexPassword.test(newPass)
    if(result){
        return res.status(200).json({state:true, msg: `password updated`})
    }
    else{
        return res.status(400).json({state:false, msg: `password is not updated`})
    }
}

module.exports = test