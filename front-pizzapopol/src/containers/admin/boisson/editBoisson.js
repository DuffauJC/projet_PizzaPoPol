import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { updateBoisson } from '../../../api/boisson'
import { Link } from 'react-router-dom';

const EditBoisson = (props) => {

    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)

    const boisson = useSelector(store => store.boissons.boissons)
    //console.log('boisson', boisson)

    let id = props.match.params.id
    let index = boisson.findIndex(boisson => boisson._id === id)
    //console.log('index',index)

    const category = useSelector(store => store.categorys.categorys)
  

    const [state, setState] = useState({
        category: boisson[index].category._id,
        title: boisson[index].title,
        description: boisson[index].description,
        price: boisson[index].price.$numberDecimal,
        error: null,
        redirect: false
    })

    useEffect(() => {

    }, [boisson, user,state])

    const saveCompleteProduit = () => {

        //création de notre objet datas
        let datas = {
            category: state.category,
            title: state.title,
            description: state.description,
            price: state.price,
        }
        //console.log('data', datas)
        updateBoisson(id,datas)
            .then((response) => {
                //console.log(response)
                if (response.data.status === 200) {
                    setState({
                        ...state,
                        redirect: true
                    })
                }
                else {
                    setState({
                        ...state,
                        error: "Echec de modifiaction du produit."
                    })
                }

            }).catch((err) => {
                console.log("Echec AJAX", err)
            })

    }

    // Envoie du formulaire
    const onSubmitForm = () => {
        if (state.title === "" || state.description === "" || state.price === "") {
            setState({ ...state, error: "Tous les champs ne sont pas encore remplis !" });
        } else if (isNaN(state.price)) {
            setState({ ...state, error: "Le champ Prix  doit être des chiffres ! " });
        } else {
            saveCompleteProduit()
        }
    }

    // affichage
    if (state.redirect) {
        return <Redirect to="/admin/boisson" />
    }

    return (
        <div className="produit-list">
             {user === "admin" ?<div>
            <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
            </div>
            <h2>Modifiez une Boisson</h2>
            {state.error !== null && <p className="errorMsg">{state.error}</p>}

           
                <form className="user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm()
                    }} >
                    <select  value={state.category} onChange={(e) => {
                    e.preventDefault()
                    setState({
                        ...state,
                        category: e.target.value
                    })
                }}>
                    {category.map((cat, index) => {
                        return <option key={cat._id} value={cat._id}>{cat.title}</option>
                    })}
                </select>
                    <input type='text'
                        placeholder="Titre du produit"
                        name='title'
                        value={state.title}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                title: e.currentTarget.value
                            })

                        }} />

                    <textarea type='text'
                        placeholder="Description"
                        name="description"
                        value={state.description}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                description: e.currentTarget.value
                            })
                        }} />

                    <input type='text'
                        placeholder="Prix de vente"
                        name='price'
                        value={state.price}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                price: e.currentTarget.value
                            })
                        }} />
                    <input type='submit' name="Enregistrer" />

                </form>
            </div> : <p>Vous n'êtes pas administrateur.</p>}
        </div>
    )
}
export default EditBoisson