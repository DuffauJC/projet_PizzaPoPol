const withAuth = require('../withAuth');
const moment = require('moment');
const config = require('../config')
const stripe = require('stripe')(config.STIPE_KEY)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SENDGRID_API_KEY);

moment.locale('fr')

module.exports = (app) => {

    const commandeController = require('../controller/commandeController')

    // enregistrement d'une commande
    app.post('/api/v1/commande/save', withAuth, async (req, res, next) => {
        console.log('commande save', req.body)
        let prixTotal = 0
        let panier = req.body.panier.panier
        console.log('panier', panier)
        if (req.body.livraison === true) {
            prixTotal = 1
        }

        //appeler la fonction 
        let commande = await commandeController.saveOneCommande(req, prixTotal)
        console.log('commande_id', commande._id)
        let id = commande._id

        panier.map(async (pan, index) => {

            let detail = await commandeController.saveOneCommandeDetail(id, pan._id, pan.quantityInCart, pan.price.$numberDecimal)

            prixTotal += parseFloat(pan.price.$numberDecimal) * pan.quantityInCart
            //mise à jour de notre commande avec le nouveau prix total
            let udpate = await commandeController.updateCommandePrixTotal(id, prixTotal);

        })
        res.json({ status: 200, commandeId: id });

    })

    // gestion du paiement
    app.post('/api/v1/commande/payment', withAuth, async (req, res, next) => {
        //getOneCommande
        let result = await commandeController.getOneCommande(req.body.commandeId);
        // console.log('commande', result.commande.prixTotal)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: result.commande.prixTotal * 100,
            currency: 'eur',
            // Verify your integration in this guide by including this parameter
            metadata: { integration_check: 'accept_a_payment' },
            receipt_email: req.body.email
        });

        res.json({ client_secret: paymentIntent['client_secret'] })

    })

    // validation du paiement envoie mail de confirmation
    app.post('/api/v1/commande/validation',withAuth, async (req, res, next) => {
        //getOneCommande  (detail)
        //console.log(req.body)

        let validate = await commandeController.getOneCommande(req.body.commandeId)
        //console.log('validatecommande', validate.commande)
        //console.log('validatedetail', validate.detail)

        let commande = validate.commande
        let detail = validate.detail
        let user = validate.commande.user


        let livraison = ""
        let adresse = ""
        if (commande.livraison === true) {
            livraison = "Mode choisi : En livraison supplément 1 €"
            adresse = `<p>Adresse de livraison : ${user.zip} ${user.city} ${user.address}</p></br>`
        }
        else {
            livraison = "Mode choisi : A emporter"
        }

        let div = detail.map((det, index) => {
            return `<div>
           <h3>${det.produit.title}</h3>
           <p>Prix unitaire : ${det.produit.price} €</p>
           <p>Quantité : ${det.quantity}</p>
           <p>Sous-total : ${det.prixUnitaire} €</p>
           </div>`
        })

        sgMail
            .send({
                to: req.body.email,
                from: config.EMAIL,
                subject: 'Commande PizzaPopol',
                text: `Confirmation de votre commande`,
                html: `
                <h1>Commande PizzaPopol</h1>
                <p>Client : ${user.firstName} ${user.lastName}</p>
                <h2>Détail</h2>
                <p>Numéro de commande : ${commande._id}</p>
                <div>${div}</div></br>
                <p>----------------------------------------------</p>
                <p>${livraison}</p>
                <p>${adresse}</p>
                <p>Horaire choisi le ${moment(commande.horaire).format('L')} à ${moment(commande.horaire).format('LT')}</p>
                <p>Total de la commande : ${commande.prixTotal} €</p>
                <strong>Cet email fais office de facture, à conserver sans limite de temps.</strong>
                `
            })
            .then(() => { }, error => {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body)
                }
            });

        res.json({ status: 200, msg: "mail de confirmation envoyé" })

    })

}