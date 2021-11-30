import { LOAD_ALL_DESSERTS } from './action-type';

export const loadDessert = (desserts) => {
    return function (dispatch) {
        dispatch({
            type: LOAD_ALL_DESSERTS,
            payload: desserts
        })
    }
}