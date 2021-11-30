import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { saveUser } from '../../api/user';

// page d'enregistrement d'un utilisateur
const Register = () => {

    const [state, setState] = useState({
        error: null,
        redirect: false
    })

    // on enregistre les données de formulaire 
    let firstName = ""
    let lastName = ""
    let email = ""
    let password = ""
    let address = ""
    let city = ""
    let zip = ""
    let phone = ""

    // on envoie le formulaire
    const onSubmitForm = () => {
        //création de notre objet datas
        let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: address,
            city: city,
            zip: zip,
            phone: phone,
        }

        // console.log('datas',datas)

        // envoie le formulaire vers l'api
        saveUser(datas)
            .then((response) => {
                console.log(response)
                setState({
                    ...state,
                    redirect: true
                })
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })

    }

    // affichage redirection vers accueil ou pas
    if (state.redirect) {
        return <Redirect to="/" />
    }

    return (
        <div className="user">
            <h1>Inscription</h1>
            <form className="user-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm()
                }} >

                <input type='text'
                    placeholder="Nom"
                    name='lastName'
                    onChange={(e) => {
                        e.preventDefault()
                        lastName = e.currentTarget.value
                    }} />

                <input type='text'
                    placeholder="Prénom"
                    name="firstName"
                    onChange={(e) => {
                        e.preventDefault()
                        firstName = e.currentTarget.value
                    }} />

                <input type='email'
                    placeholder="Email"
                    name='email'
                    onChange={(e) => {
                        e.preventDefault()
                        email = e.currentTarget.value
                    }} />

                <input type='password'
                    placeholder="Mot de passe"
                    name='password'
                    onChange={(e) => {
                        e.preventDefault()
                        password = e.currentTarget.value
                    }} />

                <input type='text'
                    placeholder="Adresse"
                    name='address'
                    onChange={(e) => {
                        e.preventDefault()
                        address = e.currentTarget.value
                    }} />

                <input type='text'
                    placeholder="Ville"
                    name='city'
                    onChange={(e) => {
                        e.preventDefault()
                        city = e.currentTarget.value
                    }} />

                <input type='number'
                    placeholder="Code postal"
                    name='zip'
                    onChange={(e) => {
                        e.preventDefault()
                        zip = e.currentTarget.value
                    }} />

                <input type='text'
                    placeholder="Téléphone"
                    name='phone'
                    onChange={(e) => {
                        e.preventDefault()
                        phone = e.currentTarget.value
                    }} />
                <input type='submit' name="Enregistrer" />

            </form>
        </div>
    )
}
export default Register
