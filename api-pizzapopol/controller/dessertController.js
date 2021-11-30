const Dessert = require('../models/dessertModel')

class dessertController {
    // sauvegarde d'un dessert
    static saveOneDessert = async (req) => {

        let dessert = new Dessert()
        dessert.title = req.body.title,
            dessert.description = req.body.description,
            dessert.price=req.body.price,
            dessert.category = req.body.category

        //on retourne notre requète 
        return await dessert.save()
    }


    // récupération des dessert
    static getAllDessert = async () => {
        return await Dessert.find().populate('category')
    }

    //modification d'une dessert
    static updateDessert = async (req, id) => {
        //on retourne la requète  de modification 
        let dessert = await Dessert.findById(id)

        console.log('dessertbyid', dessert)
        dessert.title = req.body.title,
            dessert.description = req.body.description,
            dessert.price = req.body.price,
            dessert.category = req.body.category

        return await dessert.save()

    }

    //suppression d'une categorie
    static deleteOneDessert = async (id) => {
        return await Dessert.findByIdAndDelete(id)
    }
}
module.exports = dessertController