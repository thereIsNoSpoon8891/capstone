const express = require('express')
const manageUserRouter = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

manageUserRouter.route("/changeName")
.patch((req, res, next) => {
    req.body.user = req.auth._id
    const newUserName = req.body.username
    User.findOne({username: newUserName})
        .then(user => {
            if(!user){
                User.findByIdAndUpdate({_id: req.body.user},{username: newUserName}, {new: true})
                    .then(updatedUser => res.status(201).send(`username changed to ${updatedUser.username}`))
                    .catch(err => next(err))
            } else if (user) {
                res.status(403)
                    return next(new Error(`The User Name "${user.username}" already exists.`))
            }
        })
    
})

manageUserRouter.route("/changePassword")// must use async/await with bcrypt!/////
.patch(async (req, res, next) => {
   try {
    req.body.user = req.auth._id
        const {password} = req.body
        const hashedPassword = await bcrypt.hash(password, 10);
            User.findByIdAndUpdate({_id: req.body.user}, {password: hashedPassword}, {new: true})
                .then(updatedUser => {
                    if(updatedUser){
                        res.status(201).send(`password change successful`)
                    } else if (!updatedUser){
                        next(new Error("update failed"))
                    }
                })
                .catch(err => next(err))
            } catch (error) {
                    next(error)
    }
})


module.exports = manageUserRouter