import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { saveCategory } from '../../../api/category'
import { Link } from 'react-router-dom';

const AddCategory = () => {
    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)

    const category = useSelector(store => store.categorys.categorys)

    const [state, setState] = useState({
        title: "",
        description: "",
        error: null,
        redirect: false
    })

    useEffect(() => {

    }, [category, user])

    const saveCompleteProduit = () => {

        //création de notre objet datas
        let datas = {
            title: state.title.toUpperCase(),
            description: state.description,
        }
        console.log('data', datas)

        saveCategory(datas)
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
                        error: "Echec d'ajout du produit."
                    })
                }

            }).catch((err) => {
                console.log("Echec AJAX", err)
            })

    }

    // Envoie du formulaire
    const onSubmitForm = () => {

        if (state.title === "" || state.description === "") {
            setState({ ...state, error: "Tous les champs ne sont pas encore remplis !" });
        } else {
            saveCompleteProduit()
        }

    }

    // affichage
    if (state.redirect) {
        return <Redirect to="/admin/category" />
    }

    return (
        <div className="produit-list">
            {user === "admin" ? <div>
                <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
                </div>
                <h2>Ajoutez une Categorie</h2>
                {state.error !== null && <p className="errorMsg">{state.error}</p>}

                <form className="user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm()
                    }} >
                    <label>Category</label>
                    <input type='text'
                        placeholder="Titre du produit"
                        name='title'
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
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                description: e.currentTarget.value
                            })
                        }} />

                    <input type='submit' name="Enregistrer" />

                </form>
            </div> : <p>Vous n'êtes pas administrateur.</p>}
        </div>
    )
}
export default AddCategory