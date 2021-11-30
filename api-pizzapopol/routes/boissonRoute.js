const mongoose = require('mongoose')
const withAuth = require('../withAuth');


module.exports = (app) => {

    const boissonController = require('../controller/boissonController')

    // enregistrement d'une categorie
    app.post('/api/v1/boisson/save',withAuth,  async (req, res, next) => {

        //appeler la fonction 
        let boisson = await boissonController.saveOneBoisson(req)
        //si il y'a un code erreur
        if (boisson.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "la boisson a bien été enregistré" });


    })

    // récupération des boisson
    app.get('/api/v1/boisson', async (req, res, next) => {

        //appeler la fonction 
        let boisson = await boissonController.getAllBoisson()
        //si il y'a un code erreur
        if (boisson.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec la liste  en json
        res.json({ status: 200, result: boisson });

    })

    //modification d'une catégorie
    app.put('/api/v1/boisson/update/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let boisson = await boissonController.updateBoisson(req, id)
        console.log('result route', boisson)

        if (boisson.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la boisson a bien été modifié !' });

    })

    //suppression d'une catégorie
    app.delete('/api/v1/boisson/delete/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let boisson = await boissonController.deleteOneBoisson(id)
        console.log('result route', boisson)

        if (boisson.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la boisson a bien été supprimé !' });

    })

}