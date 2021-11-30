import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { cleanPanier } from '../actions/panier/panierAction';
import { Link, Redirect } from 'react-router-dom';


const Success = () => {
    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        //on supprime le token panier du localStorage
        localStorage.removeItem('popol-panier')
        // on clean le store panier (panier)
        dispatch(cleanPanier())

        setTimeout(() => {
            setRedirect(true)
        }, 5000);
    }, [dispatch])


    if (redirect) {
        return <Redirect to="/" />
    }
    return (
        <div className="success">
            <h1>Paiment réussi</h1>
            <p>Un mail de confirmation va vous être envoyé.</p>
            <p>Si vous n'êtes redirigez automatiquement cliquez sur le lien suivant.</p>
            <Link to='/'>Retour à l'accueil</Link>
        </div>
    )
}

export default Success
