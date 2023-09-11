const express = require('express')
const recoveryRoute = express.Router()
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const mg = require('mailgun-js')
const bcrypt = require('bcrypt')
const User = require("../models/user")

// DO NOT forget to add your password 
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'weather.or.not.recovery@gmail.com',
//         pass: process.env.PASSWORD
//     }
// })

// const resetToken = user => {
//     const payload = {
//         id: user._id,
//         iat: Math.floor(Date.now() / 1000) - 30,
//         exp: Math.floor(Date.now() / 1000) + (60 * 60)
//     }
//     const signedPayload = jwt.sign(payload, process.env.SECRET)
//     return signedPayload
// }

recoveryRoute.route("/forgot-password")
.post((req, res, next) => {
    const {email} = req.body


    // const mailOptions = {
    //     from: 'weather.or.not.recovery@gmail.com',
    //     to: email,
    //     subject: 'password reset',
    //     text: `Here is your link to reset your password, if you did not make this request your may ignore this email \n
    //     https://weather-or-not.onrender.com/${token}`
    // }

    
    User.findOne({email})
        .then(user => {
            if(!user){
                res.status(404)
                    return next(new Error('email not found'))
            } else if (user) {
                const token = user.createPasswordResetToken();
                const encodedToken = token.split('.').join('%2E')
                    const resetURL = `${req.protocol}:${req.get('host')}/password-reset/${token}`
                    const devURL = `http://localhost:5173/password-reset/${encodedToken}`
                        const mailgun = mg({
                            apiKey: process.env.MAIL_GUN_PRI_KEY,
                            domain: process.env.MAIL_GUN_DOMAIN
                        })

                        const data = {
                            from: 'Weather-or-not <admin@weather-or-not.com>',
                            to: email,
                            subject: 'password reset',
                            text: `Copy and past this link into your browser to reset your pasword:
                             ${devURL}`
                        }

                        mailgun.messages().send(data, (error, body) => {
                            if(error) return next(error)
                            res.status(200).json({message: "token sent"})
                        })
            }
        })
        .catch(err => next(err))
})

recoveryRoute.patch('/password-reset/:token', async (req, res, next) => {
    try{
        const {password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const decodedToken = jwt.verify(req.params.token, process.env.SECRET);
        await User.findByIdAndUpdate(decodedToken.id, {password: hashedPassword})
        res.status(200).json({message: 'password reset successful'})
    } catch (error){
        return next(error)
    }
})


module.exports = recoveryRoute