const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userModel = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: { type: String, default: "client" },
    creatAt: { type: Date, default: Date.now }
})
const User = mongoose.model("User", userModel)
module.exports = User