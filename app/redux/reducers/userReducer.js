const initialState = {
    user: null,
    onlinePlaylists: [],
    onlineSongs: [],
    offlinePlaylists: [],
    offlineSongs: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetUser' :
        return {
            ...state,
            user: action.user
        }
        case 'SetOnlinePlaylists' :
        return {
            ...state,
            onlinePlaylists: action.onlinePlaylists,
        }
        case 'SetOnlineSongs' :
        return {
            ...state,
            onlineSongs: action.onlineSongs
        }
        case 'SetOfflinePlaylists' :
        return {
            ...state,
            offlinePlaylists: action.offlinePlaylists
        }
        case 'SetOfflineSongs' :
        return {
            ...state,
            offlineSongs: action.offlineSongs
        }
        default:
            return state
    }
}