//import des librairies
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


// serveur express
const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// import des fichiers
const config = require('./config')


// import des routes
const userRoute = require('./routes/userRoute')
const categoryRoute = require('./routes/categoryRoute')
const pizzaRoute = require('./routes/pizzaRoute')
const antipastiRoute = require('./routes/antipastiRoute')
const dessertRoute = require('./routes/dessertRoute')
const boissonRoute = require('./routes/boissonRoute')
const commandeRoute = require('./routes/commandeRoute')
const authRoute = require('./routes/authRoute')


// connexion bdd
mongoose.connect(config.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log('connecté a la db')

        app.get('/', (req, res, next) => {
            res.json({ status: 200, msg: "Welcome sur API PIzza !!" })
        })

        // les routes sont dans la réponse de connexion à la bdd
        userRoute(app)
        categoryRoute(app)
        pizzaRoute(app)
        antipastiRoute(app)
        dessertRoute(app)
        boissonRoute(app)
        commandeRoute(app)
        authRoute(app)



    }).catch((error) => {
        console.log('Bdd non connectée', error)
    })

app.listen(port, () => {
    console.log(`API PIzza sur le port : ${port}`)
})



