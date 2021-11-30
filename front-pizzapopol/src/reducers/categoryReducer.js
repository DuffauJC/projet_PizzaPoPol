import { LOAD_ALL_CATEGORYS } from '../actions/category/action-type';

const initialState = {
    categorys: []
}

export default function CategoryReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_CATEGORYS:
            return {
                categorys: action.payload
            }
        default:
            return state;
    }
}