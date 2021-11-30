import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { changePassword } from '../api/user'

const ChangePassword = (props) => {
    //console.log('props', props.user)

    //création des states email, password, redirect, error
    const [state, setState] = useState({
        email: props.user.email,
        password1: "",
        password2: "",
        redirect: false,
        error: null
    })

    const onSubmitForm = () => {
        //création de notre objet datas
        let datas = {
            email: state.email,
            password1: state.password1,
            password2: state.password2,

        }
        //console.log('datas', datas)

        changePassword(props.user.id,datas)
            .then((response) => {
                //console.log('response change',response)
                if (response.status === 200) {
                    setState({
                        ...state,
                        redirect: true
                    })

                } else {
                    setState({
                        ...state,
                        error: response.msg
                    })
                }
            })
    }

    return (
        <div>
            {state.redirect && <Redirect to="/login" />}
            <h1>Changement de mot de passe</h1>
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
            <form className="user-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmitForm()
                }} >

                <input type='email'
                    placeholder="Email"
                    name='email'
                    value={state.email}
                    disabled
                   />

                <input type='password'
                    placeholder="Nouveau mot de passe"
                    name='password1'
                    onChange={(e) => {
                        e.preventDefault()
                        setState({
                            ...state,
                            password1: e.currentTarget.value
                        })
                    }} />
                <input type='password'
                    placeholder="Confirmez mot de passe"
                    name='password2'
                    onChange={(e) => {
                        e.preventDefault()
                        setState({
                            ...state,
                            password2: e.currentTarget.value
                        })
                    }} />

                <input className="" type='submit' value="Envoyer" />

            </form>
        </div>
    )

}


export default ChangePassword