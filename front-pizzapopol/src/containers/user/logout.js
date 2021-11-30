import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from "../../actions/user/userAction";
import { Redirect } from "react-router-dom";


const Logout=()=> {

    const [state, setState] = useState({
        redirect: false
    })
    const dispatch = useDispatch();

    useEffect(() => {
        //on supprime le token du localStorage
        localStorage.removeItem('popol-token')
        dispatch(logoutUser())

        //on redirige
        setState({ ...state, redirect: true })
    }, [dispatch,state])

    return <Redirect to="/" />

}
export default Logout

