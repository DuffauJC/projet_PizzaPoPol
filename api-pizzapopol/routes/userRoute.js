const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const withAuth = require('../withAuth');
const config = require('../config')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

module.exports = (app) => {

    const userController = require('../controller/userController')

    // enregistrement d'un membre
    app.post('/api/v1/user/save', async (req, res, next) => {
        console.log("body", req.body);

        // verif si l'email existe déjà
        let check = await userController.getUserByEmail(req.body.email)

        if (check !== null) {
            console.log('email déjà utilise')
            return res.json({ status: 500, msg: 'email déjà utilise' })
        }

        //appeler la fonction 
        let user = await userController.saveOneUser(req)

        //si il y'a un code erreur
        if (user.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }

        sgMail
            .send({
                to: req.body.email,
                from: config.EMAIL,
                subject: 'Inscription PizzaPopol',
                text: `Confirmation d'inscription`,
                html: '<strong>Votre inscription chez PizzaPopol a bien été enregistré.</strong>',
            })
            .then(() => { }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });
        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "l'utilisateur a bien été enregistré" });

    })


    // gestion de la connexion des membres
    app.post('/api/v1/user/login', async (req, res, next) => {
        console.log('login', req.body)
        //on appel la fonction de récup par mail
        let user = await userController.getUserByEmail(req.body.email)
        console.log('user', user)
        if (user === null) {
            //on renvoi une rep 404 Mail non trouvé
            res.json({ status: 404, msg: "Pas d'utilisateur avec ce mail" })
        }
        // on teste les mot de passe avec compare de bcrypt
        let same = await bcrypt.compare(req.body.password, user.password)

        //si les mdp sont les mm
        if (same === true) {
            //création d'une const infos avec nos infos dans un objet
            const infos = { email: req.body.email, id: user.id };
            //création d'une const token qui va créer le token avec la fonction sign de jwt 
            const token = jwt.sign(infos, config.SECRET);
            //on renvoi la réponse json status 200 avec le token compris et quelques infos de l'utilisateur
            console.log('token', token);
            res.json({ status: 200, msg: "connecté", token: token, user: user })
            //sinon
        } else {
            //reponse d'erreur 401 en json mdp incorrect
            res.json({
                status: 401,
                error: 'Votre mot de passe est incorrect'
            })
        }

    })

    //modification du profil utilisateur .......withAuth
    app.put('/api/v1/user/update/:id', withAuth, async (req, res, next) => {
        let userId = req.params.id
        //appel de la fonction de modification de l'user
        let user = await userController.updateUser(req, userId)

        //si il y'a un code erreur
        if (user.code) {
            //envoi d'une reponse erreur 500 en json
            res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
        }

        //envoi un status 200 avec un msg de réussite en json
        res.json({ status: 200, msg: "l'utilisateur a bien été modifié" });

    })

    //route pour le password oublié verif email
    app.post('/api/v1/user/forgot', async (req, res, next) => {
        //on appel la fonction de récup par mail
        let user = await userController.getUserByEmail(req.body.email)

        if (user === null || user.email !== req.body.email) {
            //on renvoi une rep 404 Mail non trouvé
            res.json({ status: 404, msg: "Pas d'utilisateur avec ce mail" })
        }
        res.json({ status: 200, msg: "email correct", user: user })

    })

    //route d'envoi du nouveau password
    app.post('/api/v1/user/changePassword/:id', async (req, res, next) => {
        let id = req.params.id
        // + le req.body.email
        if (req.body.password1 !== req.body.password2) {
            res.json({ status: 404, msg: "Vos deux mots de passe ne sont pas identique !" })
        } else {

            let user = await userController.updatePassword(req.body.password1, id)
            //si il y'a un code erreur
            if (user.code) {
                //envoi d'une reponse erreur 500 en json
                res.json({ status: 500, msg: 'il y a eu un problème !', result: err });
            }
            sgMail
                .send({
                    to: req.body.email,
                    from: config.EMAIL,
                    subject: 'Modification du mot de passe',
                    text: `Confirmation de modification`,
                    html: '<strong>Votre mot de passe a bien été modifié.</strong>',
                })
                .then(() => { }, error => {
                    console.error(error);

                    if (error.response) {
                        console.error(error.response.body)
                    }
                });
            res.json({ status: 200, msg: "le mot de passe bien modifié !" })

        }
    })


}