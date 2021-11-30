const mongoose = require('mongoose')
const withAuth = require('../withAuth');


module.exports = (app) => {

    const categoryController = require('../controller/categoryController')

    // enregistrement d'une categorie
    app.post('/api/v1/category/save', withAuth, async (req, res, next) => {

        //appeler la fonction 
        let category = await categoryController.saveOneCategory(req)
        //si il y'a un code erreur
        if (category.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "la categorie a bien été enregistré" });


    })

    // récupération des catégories
    app.get('/api/v1/category', async (req, res, next) => {

        //appeler la fonction 
        let category = await categoryController.getAllCategory()
        //si il y'a un code erreur
        if (category.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec la liste  en json
        res.json({ status: 200, result: category });

    })

    //modification d'une catégorie
    app.put('/api/v1/category/update/:id',withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let category = await categoryController.updateCategory(req, id)
        console.log('result route', category)

        if (category.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la category a bien été modifié !' });

    })

}