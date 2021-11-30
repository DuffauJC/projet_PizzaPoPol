import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { config } from '../config';
import axios from 'axios';

//actions des reducers
import { connectUser } from '../actions/user/userAction';
import { loadAntipasti } from "../actions/antipasti/antipastiAction"
import { loadBoisson } from "../actions/boisson/boissonAction"
import { loadDessert } from "../actions/dessert/dessertAction"
import { loadPizza } from "../actions/pizza/pizzaAction"
import { loadCategory } from "../actions/category/categoryAction"

// api appelées pour remplir les reducers via les actions
import { getAllAntipasti } from '../api/antipasti';
import { getAllBoisson } from '../api/boisson';
import { getAllDessert } from '../api/dessert';
import { getAllPizza } from '../api/pizza';
import { getAllCategory } from '../api/category';

import { useSelector, useDispatch } from 'react-redux';

const Auth = (ChildComponent, withAuth = false) => {
    const RequireAuth = (props) => {
        const [redirect, setRedirect] = useState(false);

        const user = useSelector(store => store.user)
        const desserts = useSelector(store => store.desserts.desserts)
        const pizzas = useSelector(store => store.pizzas.pizzas)
        const boissons = useSelector(store => store.boissons.boissons)
        const antipastis = useSelector(store => store.antipastis.antipastis)
        const categorys = useSelector(store => store.categorys.categorys)

        const dispatch = useDispatch()

        // au chargement de chaque component
        useEffect(() => {

            // si les produits ne sont pas chargé dans redux on les charge
            if (desserts.length === 0) {
                //appel de la fonction dans l'action
                getAllDessert()
                    .then((res) => {
                        //console.log('res',res.data.result)
                        dispatch(loadDessert(res.data.result))
                    })

            }
            if (pizzas.length === 0) {
                //appel de la fonction dans l'action
                getAllPizza()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadPizza(res.data.result))
                    })

            }
            if (boissons.length === 0) {
                //appel de la fonction dans l'action
                getAllBoisson()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadBoisson(res.data.result))
                    })

            }
            if (antipastis.length === 0) {
                //appel de la fonction dans l'action
                getAllAntipasti()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadAntipasti(res.data.result))
                    })

            }
            if (categorys.length === 0) {
                //appel de la fonction dans l'action
                getAllCategory()
                    .then((res) => {
                        //console.log('res', res.data.result)
                        dispatch(loadCategory(res.data.result))
                    })

            }

            //console.log('user auth', user)

            //récupération du token dans le localstorage
            const token = window.localStorage.getItem('popol-token');
            //console.log('token', token)

            //si le token est null et que withAuth est true
            if (token === null && withAuth) {
                //on met à jour la redirection ...vers login
                setRedirect({ redirect: true })
            }

            //sinon il y'a un token mais...
            else {
                //si l'utilisateur n'est pas connecté
                if (user.isLogged === false) {

                    axios.get(config.api_url + "/api/v1/user/checkToken", { headers: { "x-access-token": token } })
                        //.then
                        .then((response) => {
                            //console.log('auth', response);
                            //si le status n'est pas 200 .... donc pas de User issu du token décrypter coté serveur
                            if (response.data.status !== 200) {
                                //si withAuth est true
                                if (withAuth === true) {
                                    //on met à jour une redirection....vers login
                                    setRedirect({ redirect: true })
                                }
                                //sinon .... user n'est pas connecté mais le token décrypté est valide
                            } else {
                                //on recup l'user que l'on stock dans une variable (la rep renvoi un objet)
                                let user = response.data.user;
                                // console.log('user',user)
                                //on ajoute une nouvelle propriété token à notre objet user
                                user.token = token;
                                //appel de la fonction connectUser et on met à jour le store user
                                dispatch(connectUser(user))

                            }
                        })
                }
            }

        }, [dispatch, user, antipastis, boissons, desserts, pizzas, categorys])

        if (redirect) {
            return <Redirect to="/login" />
        }
        return (<ChildComponent {...props} />)
    }

    return RequireAuth
}
export default Auth