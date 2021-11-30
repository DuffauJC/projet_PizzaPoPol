import { LOAD_ALL_PIZZAS } from '../actions/pizza/action-type';

const initialState = {
    pizzas: []
}

export default function PizzaReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_PIZZAS:
            return {
                pizzas: action.payload
            }
        default:
            return state;
    }
}