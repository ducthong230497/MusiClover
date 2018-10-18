const initialState = {
    user: null,
    onlinePlaylists: []
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
            onlinePlaylists: action.onlinePlaylists
        }
        default:
            return state
    }
}