const withAuth = require('../withAuth');


// routes permettant la gestion de la connexion par token
module.exports = function (app) {
    const userController = require('../controller/userController')
    // test des tokens
    app.get('/api/v1/user/checkToken', withAuth, async (req, res, next) => {
        //console.log('req checktoken', req)
        let user = await userController.getUserByEmail(req.email)
        //console.log('usertoken', user)
        res.json({ status: 200, msg: "token valide ", user: user })
    })
}