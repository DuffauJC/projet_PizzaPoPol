
import { CONNECT_USER, LOGOUT_USER } from '../actions/user/action-type';

const initialState = {
    infos: {},
    isLogged: false
}


//fonction UserReducer qui va mettre à jour notre store 
export default function UserReducer(state = initialState, action) {
    // console.log('action dans basketReducer', action)
    switch (action.type) {
        case CONNECT_USER:
            // console.log(action.payload)
            return {
                infos: action.payload,
                isLogged: true
            }
        case LOGOUT_USER:
            //console.log(action.payload)
            return initialState

        default:
            return state;
    }
}