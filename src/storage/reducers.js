import { INITFILMS } from './actions';

export const InitFilmsReducer = (state = [], action) => {
    // console.log(action)
    switch (action.type) {
        case INITFILMS: {
            return {
                films: action.payload
            }
        }
        default:
            return state
    }
};