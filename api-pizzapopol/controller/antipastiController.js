const Antipasti = require('../models/antipastiModel')

class antipastiController {
    // sauvegarde d'une antipasti
    static saveOneAntiPasti = async (req) => {

        let antipasti = new Antipasti()
            antipasti.title = req.body.title,
                antipasti.description = req.body.description,
                antipasti.price = req.body.price,
            antipasti.category = req.body.category

        //on retourne notre requète 
        return await antipasti.save()
    }


    // récupération des antipasti
    static getAllAntiPasti = async () => {
        return await Antipasti.find().populate('category')
    }

    //modification d'une antipasti
    static updateAntiPasti = async (req, id) => {
        //on retourne la requète  de modification 
        let antipasti = await Antipasti.findById(id)

        console.log('antipastibyid', antipasti)
            antipasti.title = req.body.title,
                antipasti.description = req.body.description,
                antipasti.price = req.body.price,
            antipasti.category = req.body.category

        return await antipasti.save()

    }

    //suppression d'une categorie
    static deleteOneAntiPasti = async (id) => {
        return await Antipasti.findByIdAndDelete(id)
    }
}
module.exports = antipastiController