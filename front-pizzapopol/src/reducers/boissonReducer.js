import { LOAD_ALL_BOISSONS } from '../actions/boisson/action-type';

const initialState = {
    boissons: []
}

export default function BoissonReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_BOISSONS:
            return {
                boissons: action.payload
            }
        default:
            return state;
    }
}