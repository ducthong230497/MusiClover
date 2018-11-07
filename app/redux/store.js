import { combineReducers, createStore } from 'redux';
import songPlayerReducer from "./reducers/songPlayerReducer";
import playlistsReducer from "./reducers/playlistsReducer";
import userReducer from "./reducers/userReducer";
import downloadReducer from "./reducers/downloadReducer"

const reducers = combineReducers({
    songPlayer: songPlayerReducer, 
    playlists: playlistsReducer, 
    user: userReducer,
    download: downloadReducer
});

export default createStore(reducers);
