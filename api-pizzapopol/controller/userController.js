const bcrypt = require('bcrypt');
const config=require('../config')

const User = require('../models/userModel')

class userController {
    // sauvegarde d'un membre
    static saveOneUser = async (req) => {
        //retourne cryptage du mot de passe
        const hash = await bcrypt.hash(req.body.password, config.SALTROUNDS);

        let user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = hash;
        user.zip = req.body.zip;
        user.address = req.body.address;
        user.city = req.body.city;
        user.phone = req.body.phone;

        return await user.save()
      
    }

    // récupération d'un utilisateur en fonction de son mail
    static getUserByEmail =async (email) => {
       return await User.findOne({ email: email })
    }


    //modification d'un user
    static updateUser =async (req, userId) => {
        // console.log('userId', userId)

        //on retourne la requète  de modification d'un utilisateur
        let user=await User.findById(userId)
        
            user.firstName = req.body.firstName
            user.lastName = req.body.lastName
            user.email = req.body.email
            user.zip = req.body.zip
            user.address = req.body.address
            user.city = req.body.city
            user.phone = req.body.phone

          return await  user.save()
        
    }
    static updatePassword=async (newPassword, id)=> {
        //on crypte le password
        const hash = await bcrypt.hash(newPassword, config.SALTROUNDS);
        //on met à jour le password 
       return await User.updateOne({ _id: id }, { password: hash })
    }

}
module.exports = userController