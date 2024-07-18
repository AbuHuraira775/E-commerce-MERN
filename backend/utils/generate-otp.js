const generate_OPT = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000) 
    const otp = randomCode.toString().substring(0, 6)
    console.log(otp)
    return otp
}

module.exports = generate_OPT