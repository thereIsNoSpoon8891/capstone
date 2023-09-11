const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

// Pre-save hook to encrypt password on signup
userSchema.pre("save", function(next){
    const user = this
        if(!user.isModified("password"))return next()
            bcrypt.hash(user.password, 10, (err, hash) =>{
                if(err) return next(err)
                    user.password = hash
                        next()
            })
})

// method to check encrpted password on login
userSchema.methods.checkPassword = function (passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        return callback(null, isMatch)
    })
}

// method to remove user's pssword for token/sending the response
userSchema.methods.withoutPassword = function (){
    const user = this.toObject()
        delete user.password
            return user

}
/////////////////////////password reset///////////////
// function to send token for password reset
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = jwt.sign({id: this._id}, process.env.SECRET, {expiresIn: '10m'})
    return resetToken
}

module.exports = mongoose.model("User", userSchema)