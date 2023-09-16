const express = require('express')
const manageUserRouter = express.Router()
const User = require('../models/user')



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







module.exports = manageUserRouter