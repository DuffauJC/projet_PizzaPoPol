import { CONNECT_USER, LOGOUT_USER } from "./action-type"

// action de connexion des users
export const connectUser = (user) => {
    //console.log('user', user)
    return function (dispatch) {
        //on dispatch nos infos
        dispatch({
            type: CONNECT_USER,
            payload: user
        })
    }
}

// action de deconnexion des users
export const logoutUser = () => {
    return function (dispatch) {
        //on dispatch nos infos avec un payload null ici
        dispatch({
            type: LOGOUT_USER,
            payload: null
        })
    }
}
