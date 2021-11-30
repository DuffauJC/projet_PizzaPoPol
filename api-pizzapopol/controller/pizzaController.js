const Pizza = require('../models/pizzaModel')

class pizzaController {
    // sauvegarde d'une pizza
    static saveOnePizza = async (req) => {

        let pizza = new Pizza()
            pizza.title = req.body.title,
                pizza.description = req.body.description,
                pizza.price = req.body.price,
            pizza.category = req.body.category

        //on retourne notre requète 
        return await pizza.save()
    }


    // récupération des pizza
    static getAllpizza = async () => {
        return await Pizza.find().populate('category').sort({ category: 'desc' })
    }

    //modification d'une pizza
    static updatePizza = async (req, id) => {
        //on retourne la requète  de modification 
        let pizza = await Pizza.findById(id)

        console.log('pizzabyid', pizza)
            pizza.title = req.body.title,
                pizza.description = req.body.description,
                pizza.price = req.body.price,
            pizza.category = req.body.category

        return await pizza.save()

    }

    //suppression d'une categorie
    static deleteOnePizza = async (id) => {
        return await Pizza.findByIdAndDelete(id)
    }
}
module.exports = pizzaController