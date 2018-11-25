import { combineReducers, createStore } from 'redux';
import songPlayerReducer from "./reducers/songPlayerReducer";
import playlistsReducer from "./reducers/playlistsReducer";
import userReducer from "./reducers/userReducer";
import downloadReducer from "./reducers/downloadReducer"
import singerReducer from "./reducers/singerReducer"

const reducers = combineReducers({
    songPlayer: songPlayerReducer, 
    playlists: playlistsReducer, 
    user: userReducer,
    download: downloadReducer,
    singer: singerReducer
});

export default createStore(reducers);
