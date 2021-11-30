const mongoose = require('mongoose')
const withAuth = require('../withAuth');


module.exports = (app) => {

    const antipastiController = require('../controller/antipastiController')

    // enregistrement d'une categorie
    app.post('/api/v1/antipasti/save',withAuth, async (req, res, next) => {

        //appeler la fonction 
        let antipasti = await antipastiController.saveOneAntiPasti(req)
        //si il y'a un code erreur
        if (antipasti.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "la antipasti a bien été enregistré" });


    })

    // récupération des antipasti
    app.get('/api/v1/antipasti',  async (req, res, next) => {

        //appeler la fonction 
        let antipasti = await antipastiController.getAllAntiPasti()
        //si il y'a un code erreur
        if (antipasti.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec la liste  en json
        res.json({ status: 200, result: antipasti });

    })

    //modification d'une catégorie
    app.put('/api/v1/antipasti/update/:id', withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let antipasti = await antipastiController.updateAntiPasti(req, id)
        console.log('result route', antipasti)

        if (antipasti.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la antipasti a bien été modifié !' });

    })

    //suppression d'une catégorie
    app.delete('/api/v1/antipasti/delete/:id',withAuth, async (req, res, next) => {
        let id = req.params.id
        //appel de la fonction de modification de l'user
        let antipasti = await antipastiController.deleteOneAntiPasti(id)
        console.log('result route', antipasti)

        if (antipasti.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }
        //envoi un status 200 avec un msg  en json
        res.json({ status: 200, msg: 'la antipasti a bien été supprimé !' });

    })

}