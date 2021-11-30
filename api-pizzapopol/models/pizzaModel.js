const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const pizzaModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    }
})
const Pizza = mongoose.model("Pizza", pizzaModel)
module.exports = Pizza