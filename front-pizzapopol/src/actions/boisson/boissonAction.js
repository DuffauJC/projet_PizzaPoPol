import { LOAD_ALL_BOISSONS } from './action-type';

export const loadBoisson = (boissons) => {
    return function (dispatch) {
        dispatch({
            type: LOAD_ALL_BOISSONS,
            payload: boissons
        })
    }
}