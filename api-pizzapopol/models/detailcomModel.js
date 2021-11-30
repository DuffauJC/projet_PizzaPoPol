const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const detailcomModel = new Schema({
    commande: {
        type: Schema.Types.ObjectId,
        ref: 'Commande'
    },
    produit:{
        type: Schema.Types.ObjectId,
        refPath:'produitType'
    },
    produitType: {
        type: String,
        enum: ['Pizza', 'Antipasti', 'Dessert', 'Boisson'],
    },
    quantity: Number,
    prixUnitaire: {
        type: mongoose.Types.Decimal128,
        required: true
    },

})
const DetailCom = mongoose.model("DetailCom", detailcomModel)
module.exports = DetailCom