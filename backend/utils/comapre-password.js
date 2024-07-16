const bcrypt = require('bcryptjs')

const comaprePassword = async(password,hashed_password) =>{
    try {
        const result = await bcrypt.compare(password,hashed_password)
        return result
    } 
    catch (error) {
        console.error(error)
    }

}

module.exports = comaprePassword