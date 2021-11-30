const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const categoryModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

const Category = mongoose.model("Category", categoryModel)
module.exports = Category