const mongoose = require('mongoose')

const DB_Connection =  async()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION)
        console.log(`Database is connected successfully`)

    } 
    catch (error) {
        console.error(`DB Connection failed due to : ${error}`)
    }
}

module.exports = DB_Connection