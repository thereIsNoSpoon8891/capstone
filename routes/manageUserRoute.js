const express = require('express')
const manageUserRouter = express.Router()
const User = require('../models/user')



manageUserRouter.route("/changeName")
.patch((req, res, next) => {
    req.body.user = req.auth._id
    const newUserName = req.body.username
    User.findByIdAndUpdate({_id: req.body.user},{username: newUserName}, {new: true})
        .then(updatedUser => res.status(201).send(`username changed to ${updatedUser.username}`))
        .catch(err => next(err))
})







module.exports = manageUserRouter