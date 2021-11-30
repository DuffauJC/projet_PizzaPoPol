const Commande = require('../models/commandeModel')
const DetailCom = require('../models/detailcomModel')

// pour rechercher le produit dans les différentes tables (renvoyer le detail par mail)
const Pizza = require('../models/pizzaModel')
const Dessert = require('../models/dessertModel')
const Boisson = require('../models/boissonModel')
const Antipasti = require('../models/antipastiModel')

class commandeController {
    // sauvegarde d'une commande
    static saveOneCommande = async (req, prixTotal) => {

        let commande = new Commande()
        commande.user = req.body.user_id,
            commande.livraison = req.body.livraison,
            commande.horaire = req.body.horaire,
            commande.prixTotal = prixTotal

        //on retourne notre requète 
        return await commande.save()
    }

    //sauvegarde detail commande
    static saveOneCommandeDetail = async (id, prod, quant, total) => {

        let model

        // en effet le produit sauvegarder aura pour model....celui correspondant à son id...
        // ce qui permet dans le getOneCommande(id) de recup la commande avec le user et le detail

        let pizza = await Pizza.findById(prod)
        if (pizza !== null) {
            model = "Pizza"
        }

        let boisson = await Boisson.findById(prod)
        if (boisson !== null) {
            model = 'Boisson'
        }
        let dessert = await Dessert.findById(prod)
        if (dessert !== null) {
            model = "Dessert"
        }
        let antipasti = await Antipasti.findById(prod)
        if (antipasti !== null) {
            model = 'Antipasti'
        }

        console.log('model', model)
        // voir detailComModel.js

        let detail = new DetailCom()
        detail.commande = id,
            detail.produit = prod,
            detail.produitType = model,
            detail.quantity = quant,
            detail.prixUnitaire = total

        //on retourne notre requète 
        return await detail.save()
    }

    //modification du total de la commande
    static updateCommandePrixTotal = async (id, prixTotal) => {

        //on retourne la requète  de modification 
        let commande = await Commande.findById(id)

        commande.prixTotal = prixTotal
        return await commande.save()

    }



    // récupération d'une commande
    static getOneCommande = async (id) => {
        //récupération d'une commande et du détail pour envoi mail récapitulatif (office de facture)
        let commande = await Commande.findById(id).populate('user')
        // console.log('commande', commande)

        let detail = await DetailCom.find({ commande: commande._id }).populate('produit')
        // console.log('detail', detail)

        let data = {
            commande: commande,
            detail: detail
        }
        return data
    }




}
module.exports = commandeController