import { combineReducers, createStore } from 'redux';
import songPlayerReducer from "./reducers/songPlayerReducer";


const reducers = combineReducers({songPlayer: songPlayerReducer});

export default createStore(reducers);
