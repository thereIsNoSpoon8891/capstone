const express = require('express')
const locationRouter = express.Router()
const Location = require('../models/location')


locationRouter.route("/")
.get((req, res, next) => {
    Location.find({user: req.auth._id})
        .then(locations => res.status(200).send(locations))
        .catch(err => next(err))
})
.post((req, res, next) => {
    req.body.user = req.auth._id
        const newLocation = new Location(req.body)
            newLocation.save()
            .then(response => res.status(201).send(response))
            .catch(error => next(error))
})

locationRouter.route("/:id")
.delete((req, res, next) => {
    Location.findByIdAndDelete({_id: req.params.id, user: req.auth._id})
        .then(response => res.status(200).send(`Successfully Deleted: ${response.location}`))
        .catch(err => next(err))
})

module.exports = locationRouter








module.exports = locationRouter