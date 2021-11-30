import { LOAD_ALL_CATEGORYS } from './action-type';

export const loadCategory= (categorys) => {
    return function (dispatch) {
        dispatch({
            type: LOAD_ALL_CATEGORYS,
            payload: categorys
        })
    }
}