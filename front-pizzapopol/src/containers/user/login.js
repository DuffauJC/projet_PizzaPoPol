import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { loginUser } from '../../api/user'

const Login = () => {

    //création des states email, password, redirect, error
    const [state, setState] = useState({
        email: "",
        password: "",
        redirect: false,
        error: null
    })

    const onSubmitForm = () => {
        //création de notre objet datas
        let datas = {
            email: state.email,
            password: state.password,

        }
        //console.log('datas', datas)
        
        loginUser(datas)
            .then((response) => {
                 //console.log(response)
                if (response.status === 200) {
                    localStorage.setItem('popol-token', response.data.token)
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
        <div className="user">
            {state.redirect && <Redirect to="/" />}
            <h1>Se connecter</h1>
            {state.error !== null && <p className="errorMsg">{state.error}</p>}
                <form className="user-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSubmitForm()
                    }} >

                    <input type='email'
                        placeholder="Email"
                        name='email'
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                email: e.currentTarget.value
                            })
                        }} />

                    <input type='password'
                        placeholder="Mot de passe"
                        name='password'
                        onChange={(e) => {
                            e.preventDefault()
                            setState({
                                ...state,
                                password: e.currentTarget.value
                            })
                        }} />

                    <input className="" type='submit' value="Connexion" />

                </form>

                <div className="login-forgot">
                    <Link to="/forgot"><span>Mot de passe oublié ?</span></Link>
                </div>
        </div>
    )

}


export default Login