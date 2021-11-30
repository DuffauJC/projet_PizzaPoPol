import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { CardElement } from '@stripe/react-stripe-js';

import { paymentCommande, validationCommande } from '../api/panier';

const CheckoutForm = (props) => {

    // console.log(props.stripe)
    const stripe = props.stripe

    const [state, setState] = useState({ redirect: false, error: null })
    const user = useSelector(store => store.user)
    const CARD_OPTIONS = {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#FF5302',
                color: '#fff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {
                    color: '#fce883',
                },
                '::placeholder': {
                    color: '#FF5302',
                },
            },
            invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
            },
        },
    };

    const handleSubmit = async (event) => {
        // Bloquer la soumission de formulaire natif.
        event.preventDefault();

        let data = {
            email: user.infos.email,
            commandeId: props.commandeId
        }

        // Obtient une référence à un CardElement monté. Elements sait comment
        // pour trouver votre CardElement car il ne peut y en avoir qu'un
        // chaque type d'élément.

        const paymentAuth = await paymentCommande(data)

         //console.log('paymentAuth', paymentAuth);

        const secret = paymentAuth.data.client_secret
        // console.log("payment", secret);

        // Utilisez votre élément de carte avec d'autres API Stripe.js
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: props.elements.getElement(CardElement),
                billing_details: {
                    email: user.infos.email
                },
            },
        });

        if (payment.error) {
            console.log('[error]', payment.error);
        }
        else {
            // console.log('[payment]', payment.paymentIntent.status);
            if (payment.paymentIntent.status === 'succeeded') {
                console.log('Money is in the bank!');
                let data = {
                    commandeId: props.commandeId,
                    email: user.infos.email
                }
                // on enregistre en bdd le status payed 
                validationCommande(data)
                    .then((response) => {
                        //console.log(response);
                        //changement de state de redirect
                        setState({ ...state, redirect: true })
                    })

            } else {
                console.log('echec')
                setState({ ...state, error: "Echec du payment" })
            }
        }
    };
    if (state.redirect) {
        return <Redirect to="/success" />
    }
    return (
        <div className="paymentPart">
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement options={CARD_OPTIONS} />
                <button className="pay" type="submit" disabled={!stripe}> Pay </button>
            </form>
        </div>

    );
};



export default CheckoutForm