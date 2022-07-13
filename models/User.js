const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: [true, 'Please provide name!'],
        minLength: 1,
        maxLength: 25
    },
    balance: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("User", UserSchema);