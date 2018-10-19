const initialState = {
    user: null,
    onlinePlaylists: [],
    onlineSongs: []
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
        default:
            return state
    }
}