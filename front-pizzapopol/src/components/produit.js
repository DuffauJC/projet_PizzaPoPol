import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToPanier } from '../actions/panier/panierAction';


const Produit = (props) => {
    // console.log('props-produit', props)
    //console.log('user', user)
    const panier = useSelector(store => store.panier)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        quantity: 0,
        error: null,
    })

    let produit = props.produit

    // au click il y a l'ajout d'un article au panier
    const onClickAddPanier = () => {
        dispatch(addToPanier(panier.panier, produit,state.quantity))
    }

    const onClickChangeState = () => {
        // si la quantité est > à 0
        if (state.quantity > 0) {
            setState({
                ...state,
                quantity: state.quantity - 1
            })
        }

    }

    return (
        <div className="produit box-shadow">
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
            <div>
                <h3>{produit.title}</h3>
                <p className="description">{produit.description}</p>
                <p className="price">{produit.price.$numberDecimal} €</p>
            </div>
            <form >
                <i className="fas fa-minus-square"
                    onClick={() => {
                        onClickChangeState()
                    }}
                ></i>
                <input
                    type="text"
                    value={state.quantity}
                    onChange={(e) => {
                        setState({
                            ...state,
                            quantity: e.target.value
                        })
                    }}
                />
                <i className="fas fa-plus-square"
                    onClick={() => {
                        setState({
                            ...state,
                            quantity: state.quantity + 1
                        })
                    }}
                ></i>
                <div
                    className="add-panier"
                    onClick={(e) => {
                        e.preventDefault()
                        onClickAddPanier()
                    }} >
                    <button className="ajout-panier">Ajoutez au panier</button>
                </div>
            </form>
        </div>
    )
}

export default Produit
