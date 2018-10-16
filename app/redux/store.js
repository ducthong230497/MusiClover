import { combineReducers, createStore } from 'redux';
import songPlayerReducer from "./reducers/songPlayerReducer";
import playlistsReducer from "./reducers/playlistsReducer";
import userReducer from "./reducers/userReducer";


const reducers = combineReducers({songPlayer: songPlayerReducer, playlists: playlistsReducer, user: userReducer});

export default createStore(reducers);
