const bcrypt = require('bcryptjs')

const hashPassword = async(password) =>{
    try {
        const saltRound = await bcrypt.genSalt(10)
        const hashed_password = bcrypt.hash(password,saltRound)
        password = hashed_password
        return password
    } catch (error) {
        console.error(error)
    }

}

module.exports = hashPassword