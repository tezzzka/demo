import { createStore } from 'redux';
import { InitFilmsReducer } from './reducers';

const initialState = {
    films: [
        {}
    ]
};

const store = createStore(
    InitFilmsReducer,
    initialState
);

export { store };