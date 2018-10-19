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
        case 'SetOnlineData' :
        return {
            ...state,
            onlinePlaylists: action.onlinePlaylists,
            onlineSongs: onlineSongs
        }
        default:
            return state
    }
}