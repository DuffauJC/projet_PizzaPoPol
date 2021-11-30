import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { updateCategory } from '../../../api/category'
import { Link } from 'react-router-dom';

const Editcategory = (props) => {

    const user = useSelector(store => store.user.infos.role)
    //console.log('user', user)

    const category = useSelector(store => store.categorys.categorys)
    //console.log('category', category)

    let id = props.match.params.id
    let index = category.findIndex(category => category._id === id)
    //console.log('index',index)

    const [state, setState] = useState({
        title: category[index].title,
        description: category[index].description,
        error: null,
        redirect: false
    })

    useEffect(() => {

    }, [category, user,state])

    const saveCompleteProduit = () => {

        //création de notre objet datas
        let datas = {
            title: state.title.toUpperCase(),
            description: state.description,
            price: state.price,
        }
        //console.log('data', datas)
        updateCategory(id,datas)
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
            {user === "admin" ?  <div>   
            <div className="admin-retour"><Link to='/admin'><i className="fas fa-arrow-circle-left backProduit "> Retour Admin</i></Link>
            </div>
            <h2>Modifiez une Categorie</h2>
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
                <form className="user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm()
                    }} >
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
                    <input type='submit' name="Enregistrer" />

                </form>
            </div> : <p>Vous n'êtes pas administrateur.</p>}
        </div>
    )
}
export default Editcategory