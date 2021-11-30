import { LOAD_ALL_ANTIPASTIS } from './action-type';

export const loadAntipasti= (antipastis) => {
    return function (dispatch) {
        dispatch({
            type: LOAD_ALL_ANTIPASTIS,
            payload: antipastis
        })
    }
}