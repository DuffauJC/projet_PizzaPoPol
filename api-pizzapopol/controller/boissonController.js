const Boisson = require('../models/boissonModel')

class boissonController {
    // sauvegarde d'une boisson
    static saveOneBoisson = async (req) => {

        let boisson = new Boisson()
        boisson.title = req.body.title,
            boisson.description = req.body.description,
            boisson.price = req.body.price,
            boisson.category = req.body.category

        //on retourne notre requète 
        return await boisson.save()
    }


    // récupération des boisson
    static getAllBoisson = async () => {
        return await Boisson.find().populate('category').sort({category:'desc'})
    }

    //modification d'une boisson
    static updateBoisson = async (req, id) => {
        //on retourne la requète  de modification 
        let boisson = await Boisson.findById(id)

        console.log('boissonbyid', boisson)
        boisson.title = req.body.title,
            boisson.description = req.body.description,
            boisson.price = req.body.price,
            boisson.category = req.body.category

        return await boisson.save()

    }

    //suppression d'une categorie
    static deleteOneBoisson = async (id) => {
        return await Boisson.findByIdAndDelete(id)
    }
}
module.exports = boissonController