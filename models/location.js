const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const locationSchema = new Schema({
    location:{
        type: String,
        required: true,
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = mongoose.model("Location", locationSchema);