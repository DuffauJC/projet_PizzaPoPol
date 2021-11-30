const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const boissonModel = new Schema({
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
const Boisson = mongoose.model("Boisson", boissonModel)
module.exports = Boisson