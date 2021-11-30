import React, { useState, useEffect } from 'react';
import { deleteToPanier } from '../actions/panier/panierAction';
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { saveCommande } from '../api/panier';
import moment from 'moment'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css"
require('moment/locale/fr.js')


const Panier = () => {

    const panier = useSelector(store => store.panier)
    const user = useSelector(store => store.user)
    //console.log(user)

    const dispatch = useDispatch()

    const [state, setState] = useState({
        redirect: false,
        commandeId: null,
        horaire: moment(),
        error: null
    })
  
    useEffect(() => {
        //console.log('panier', panier.panier)
    }, [panier])



    // livraison
    const [checked, setChecked] = useState(false);
    let livraison
    checked ? livraison = 1 : livraison = 0
    let prixTotal = panier.prixTotal + livraison


   


    // chargement des produits dans le panier création du tr et td qu'on insérera dans tbody de render
    const listPanier = () => {

        return panier.panier.map((p, index) => {
            let total = parseFloat(p.price.$numberDecimal) * parseInt(p.quantityInCart)

            return <tr key={index}>
                <td>{p.quantityInCart}</td>
                <td>{p.title}</td>
                <td>{p.price.$numberDecimal}</td>
                <td >{total}</td>
                <td>
                    <button className="trash-panier"
                        onClick={() => {
                            dispatch(deleteToPanier(panier.panier, p))
                        }}>
                        <i className="fas fa-trash-alt "></i>
                    </button>
                </td>
            </tr>
        })

    }

    // au click on enregistre une commande
    const onClickSaveOrder = () => {
        let data
        if (user.isLogged === true) {
            data = {
                user_id: user.infos._id,
                panier: panier,
                livraison: checked,
                horaire: state.horaire
            }
            //console.log('data', data)
            saveCommande(data)
                .then((response) => {
                    //console.log('response', response)
                    if (response.data.status === 200) {
                        setState({
                            redirect: true,
                            commandeId: response.data.commandeId
                        })
                    }

                }).catch((err) => {
                    console.log("Echec AJAX", err)
                })

        } else {
            setState({
                ...state,
                error: "Veuillez-vous connecter, ou vous enregistrer si ce n'est pas fait."
            })
        }

    }
    if (state.redirect) {
        return <Redirect to={'/payment/' + state.commandeId} />
    }

    return (
        <div className="panier">
            <h2>Panier</h2>
            {state.error !== null && <p className="errorMsg">{state.error}</p>}

            {panier.panier.length > 0 ? <div>
                <table className="panierTable">
                    <thead>
                        <tr>
                            <th>Quantité</th>
                            <th>Nom</th>
                            <th className="desktop">Prix Unitaire</th>
                            <th>Sous Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td className="prix-total"></td>
                        </tr>
                        <tr>
                            <th className="prix-total">Prix Total</th>
                            <td></td>
                            <td></td>
                            {checked ? <td className="prix-total"><span>{prixTotal}</span> €</td>
                                : <td className="prix-total"><span>{prixTotal}</span> €</td>}

                        </tr>
                    </tfoot>
                    <tbody>
                        {listPanier()}
                    </tbody>
                </table>
                <form className="panier-form">
                    <div className="form-flex">
                        <label className="prix-total">Livraison 1 euro ?</label>
                        <input type="checkbox"
                            onChange={() => {
                                setChecked(!checked)
                            }}
                        />
                    </div>
                    <div className="form-flex">
                        <label className="panier-horaire">Horaire</label>
                        <Datetime
                            value={state.horaire}
                            onChange={(value) => {
                                // console.log(value)
                                setState({
                                    ...state,
                                    horaire: value
                                })
                            }}
                        />
                    </div>


                </form>

            </div> :
                <p>Votre panier est vide...</p>}
            {panier.panier.length > 0 &&
                <button type="submit" className="pay" onClick={(e) => {
                    e.preventDefault()
                    onClickSaveOrder()
                }}>Payer</button>
            }
        </div>
    )
}
export default Panier
