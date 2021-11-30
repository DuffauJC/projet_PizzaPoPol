const mongoose = require('mongoose')
const withAuth = require('../withAuth');


module.exports = (app) => {

    const dessertController = require('../controller/dessertController')

    // enregistrement d'un dessert
    app.post('/api/v1/dessert/save',withAuth,  async (req, res, next) => {
        console.log(req.body)
        
        //appeler la fonction 
        let dessert = await dessertController.saveOneDessert(req)
        //si il y'a un code erreur
        if (dessert.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "la dessert a bien été enregistré" });


    })

    // récupération des dessert
    app.get('/api/v1/dessert',  async (req, res, next) => {

        //appeler la fonction 
        let dessert = await dessertController.getAllDessert()
        //si il y'a un code erreur
        if (dessert.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec la liste  en json
        res.json({ status: 200, result: dessert });

    })

    //modification d'un dessert
    app.put('/api/v1/dessert/update/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let dessert = await dessertController.updateDessert(req, id)
        console.log('result route', dessert)

        if (dessert.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la dessert a bien été modifié !' });

    })

    //suppression d'un dessert
    app.delete('/api/v1/dessert/delete/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let dessert = await dessertController.deleteOneDessert(id)
        console.log('result route', dessert)

        if (dessert.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la dessert a bien été supprimé !' });

    })

}