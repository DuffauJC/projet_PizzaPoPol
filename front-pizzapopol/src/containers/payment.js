import React from 'react';
import CheckoutForm from '../components/checkout-form'
import {loadStripe} from '@stripe/stripe-js';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import { config } from '../config';



const stripe = loadStripe(config.stripe_key);
//console.log('promesse',stripe)

const Payment = (props) => {
//console.log(props)
   const InjectedCheckoutForm = ()=>{
		// chargement du formulaire de carte bleue
		return (
			<ElementsConsumer>
			    {({stripe,elements}) => (
			      <CheckoutForm commandeId={props.match.params.commandeId} stripe={stripe} elements={elements} />
			    )}
			</ElementsConsumer>

		)
	}
    return (
        <div>
            <h1>Paiement</h1>
            <Elements stripe={stripe}>
				    {InjectedCheckoutForm()}
				</Elements>
        </div>
    )
}


export default Payment









