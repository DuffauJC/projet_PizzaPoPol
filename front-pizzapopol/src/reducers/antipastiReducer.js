import { LOAD_ALL_ANTIPASTIS } from '../actions/antipasti/action-type';

const initialState = {
    antipastis: []
}

export default function AntipastiReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_ALL_ANTIPASTIS:
            return {
                antipastis: action.payload
            }
        default:
            return state;
    }
}