const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const locationSchema = new Schema({
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
    },
    zip:{
        type: Number
    }
});

module.exports = mongoose.model("Location", locationSchema);