const Category = require('../models/categoryModel')

class categoryController {
    // sauvegarde d'une category
    static saveOneCategory = async (req) => {

        let category = new Category()
        category.title = req.body.title,
            category.description = req.body.description

        //on retourne notre requète 
        return await category.save()
    }


    // récupération des category
    static getAllCategory = async () => {
        return await Category.find().sort({ title: 'desc' })
    }

    //modification d'une category
    static updateCategory = async (req, id) => {
        //on retourne la requète  de modification 
        let category = await Category.findById(id)

        console.log('categorybyid', category)
        category.title = req.body.title,
            category.description = req.body.description

        return await category.save()

    }

}
module.exports = categoryController