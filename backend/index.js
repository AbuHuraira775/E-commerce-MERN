const express = require('express')
const app = express()
require('dotenv').config()
const customerRouters = require('./routers/customer')
const vendorRouters = require('./routers/vendor')
const adminRouters = require('./routers/admin')
const DB_Connection = require('./utils/db')
const generate_OTP = require('./utils/generate-otp')
const test = require('./controllers/test')

// middleware allow to use json 
app.use(express.json())

app.use('/api/customer', customerRouters)

app.use('/api/vendor', vendorRouters)

app.use('/api/admin', adminRouters)

app.post('/test',test)

DB_Connection().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on PORT : ${process.env.PORT}`)
    })

})

