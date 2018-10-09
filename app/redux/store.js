import { combineReducers, createStore } from 'redux';
import songPlayerReducer from "./reducers/songPlayerReducer";
import playlistsReducer from "./reducers/playlistsReducer";


const reducers = combineReducers({songPlayer: songPlayerReducer, playlists: playlistsReducer});

export default createStore(reducers);
