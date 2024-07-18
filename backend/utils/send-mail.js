const nodemailer = require('nodemailer')
require('dotenv').config();

const sendEmail = async (userEmail, message) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    })

    const mailOption = {
        from: process.env.AUTH_EMAIL,
        to: userEmail,
        subject: "Verification Code",
        text: 'Hello world!',
        html: `<p>This is the verification code of the E-commerce Application</p>
                <h1 style="color: blue">${message}</h1>`
    }

    try {
        await transporter.sendMail(mailOption)
        console.log("Verifaication email sent")
    }
    catch (error) {
        console.log("Email sending failed with an error " + error)

    }
}


module.exports = sendEmail