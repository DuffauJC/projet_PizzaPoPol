import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateUser } from '../../api/user';


const Profil = () => {

    const user = useSelector(store => store.user)
    //console.log('user', user)

    // gestion de tous les states
    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        city: "",
        zip: "",
        phone: "",
        msg: null,
        error:null
    })

    // s'execute à tous les changement d'état
    useEffect(() => {
        setState({
            firstName: user.infos.firstName,
            lastName: user.infos.lastName,
            address: user.infos.address,
            city: user.infos.city,
            zip: user.infos.zip,
            phone: user.infos.phone,
            email: user.infos.email
        })
    }, [user]);


    // on envoie le formulaire d'edition vers l'api
    const onSubmitForm = () => {
        //on crée l'objet datas
        let datas = {
            firstName: state.firstName,
            lastName: state.lastName,
            address: state.address,
            city: state.city,
            zip: state.zip,
            phone: state.phone,
            email: state.email
        }

        console.log('data', datas)

        //envoi vers notre requète ajax API
        updateUser(user.infos._id,datas)
            .then((response) => {
                console.log('response profil', response)
                if (response.data.status === 200) {
                    setState({
                        ...state,
                        msg: "Le profil a bien été modifié !"
                    })
                } else {
                    setState({
                        ...state,
                        error: "Le profil n'a pas été modifié !"
                    })
                }
            }).catch((err) => {
                console.log("Echec AJAX", err)
            })

    }

    return (
        <div className="user">
            <h1>Mon Profil</h1>
            {state.msg !== null && <p className="successMsg">{state.msg}</p>}
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
            {user.isLogged &&
                <form className="user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm()
                    }} >
                    <input type='text'
                        name='lastName'
                        defaultValue={user.infos.lastName}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                lastName: e.currentTarget.value
                            })
                        }} />
                    <input type='text'
                        name="firstName"
                        defaultValue={user.infos.firstName}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                firstName: e.currentTarget.value
                            })
                        }} />
                    <input type='text'
                        name='address'
                        defaultValue={user.infos.address}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                address: e.currentTarget.value
                            })
                        }} />
                    <input type='text'
                        name='city'
                        defaultValue={user.infos.city}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                city: e.currentTarget.value
                            })
                        }} />
                    <input type='number'
                        name='zip'
                        defaultValue={user.infos.zip}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                zip: e.currentTarget.value
                            })
                        }} />
                    <input type='text'
                        name='phone'
                        defaultValue={user.infos.phone}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                phone: e.currentTarget.value
                            })
                        }} />
                    <input type='email'
                        name='email'
                        defaultValue={user.infos.email}
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                email: e.currentTarget.value
                            })
                        }} />
                    <input type='submit' name="Enregistrer" />
                </form>}
        </div>
    )
}
export default Profil

