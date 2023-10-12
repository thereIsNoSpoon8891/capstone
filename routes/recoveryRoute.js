const express = require('express')
const recoveryRoute = express.Router()
const jwt = require('jsonwebtoken')
const mg = require('mailgun-js')
const bcrypt = require('bcrypt')
const User = require("../models/user")


recoveryRoute.route("/forgot-password")
.post((req, res, next) => {
    const {email} = req.body

    User.findOne({email})
        .then(user => {
            if(!user){
                res.status(404)
                    return next(new Error('email not found'))
            } else if (user) {
                const token = user.createPasswordResetToken();
                const encodedToken = token.split('.').join('_')
                    const resetURL = `${req.protocol}:${req.get('host')}/password-reset/${encodedToken}`
                    const devURL = `http://localhost:5173/password-reset/${encodedToken}`//for testing
                        const mailgun = mg({
                            apiKey: process.env.MAIL_GUN_PRI_KEY,
                            domain: process.env.MAIL_GUN_DOMAIN
                        })

                        const data = {
                            from: 'Weather-or-not <admin@weather-or-not.com>',
                            to: email,
                            subject: 'password reset/DO-NOT-REPLY',
                            text: `${user.username}, Copy and past this link into your browser to reset your pasword:
                            ${resetURL}
                            Do Not reply to this E-mail, the inbox is unmonitered.
                            `
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
// Need async/await here, BECAUSE I am NOT using mongoose methods
// most mongoose methods are already asyncronous 
//bcrypt needs async/await AND async/await needs try catch block
        const {password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
        const decodedToken = jwt.verify(req.params.token, process.env.SECRET);
        await User.findByIdAndUpdate(decodedToken.id, {password: hashedPassword})
        res.status(200).json({message: 'password reset successful'})
    } catch (error){
        return next(error)
    }
})


module.exports = recoveryRoute