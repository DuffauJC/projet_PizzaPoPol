const mongoose = require('mongoose')
const withAuth = require('../withAuth');


module.exports = (app) => {

    const pizzaController = require('../controller/pizzaController')

    // enregistrement d'une categorie
    app.post('/api/v1/pizza/save',withAuth, async (req, res, next) => {

        //appeler la fonction 
        let pizza = await pizzaController.saveOnePizza(req)
        //si il y'a un code erreur
        if (pizza.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "la pizza a bien été enregistré" });


    })

    // récupération des pizza
    app.get('/api/v1/pizza',  async (req, res, next) => {

        //appeler la fonction 
        let pizza = await pizzaController.getAllpizza()
        //si il y'a un code erreur
        if (pizza.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec la liste  en json
        res.json({ status: 200, result: pizza });

    })

    //modification d'une catégorie
    app.put('/api/v1/pizza/update/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let pizza = await pizzaController.updatePizza(req, id)
        console.log('result route', pizza)

        if (pizza.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la pizza a bien été modifié !' });

    })

    //suppression d'une catégorie
    app.delete('/api/v1/pizza/delete/:id',withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let pizza = await pizzaController.deleteOnePizza(id)
        console.log('result route', pizza)

        if (pizza.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la pizza a bien été supprimé !' });

    })

}