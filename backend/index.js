const express = require('express')
const app = express()
require('dotenv').config()
const router = require('./routers/routes')
const DB_Connection = require('./utils/db')

// middleware allow to use json 
app.use(express.json())
app.use('/api/customer', router)

DB_Connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on PORT : ${process.env.PORT}`)
    })

})

