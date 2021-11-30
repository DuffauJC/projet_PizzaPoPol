import { LOAD_ALL_PIZZAS } from './action-type';

export const loadPizza = (pizzas) => {
    return function (dispatch) {
        dispatch({
            type: LOAD_ALL_PIZZAS,
            payload: pizzas
        })
    }
}