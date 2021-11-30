import React, { useState } from 'react';
import { forgotPassword } from '../../api/user'
import ChangePassword from '../../components/changePassword'

const Forgot = () => {

    //création des states email, password, redirect, error
    const [state, setState] = useState({
        id: null,
        email: "",
        error: null
    })

    const onSubmitForm = () => {
        //création de notre objet datas
        let datas = {
            id: state.id,
            email: state.email,
        }
        //console.log('datas', datas)

        forgotPassword(datas)
            .then((response) => {
                console.log('response forgot', response)
                if (response.status === 200) {

                    setState({
                        ...state,
                        id: response.data.user._id
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
            {state.id !== null ? <ChangePassword user={state} />

                :
                <div>
                    <h1>Mot de passe oublié</h1>
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

                        <input className="" type='submit' value="Envoyer" />

                    </form>
                </div>
            }


        </div>
    )

}


export default Forgot