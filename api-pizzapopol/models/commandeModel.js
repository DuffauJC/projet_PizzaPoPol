const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commandeModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    livraison: {
        type: Boolean,
        required:true
    },
    horaire: {
        type: Date,
        required:true
    },
    prixTotal: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    creatAt: { type: Date, default: Date.now }
})
const Commande = mongoose.model("Commande", commandeModel)
module.exports = Commande