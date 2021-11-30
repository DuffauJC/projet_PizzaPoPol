import { LOAD_ALL_DESSERTS } from '../actions/dessert/action-type';

const initialState = {
    desserts: []
}

export default function DessertReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_DESSERTS:
            return {
                desserts: action.payload
            }
        default:
            return state;
    }
}