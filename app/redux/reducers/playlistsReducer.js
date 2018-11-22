const initialState = {
    playlists: [],

}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'AddPlaylist' :
        const oldPlaylist = [...state.playlists]
        oldPlaylist.splice(state.playlists.findIndex(playlist => playlist.name === action.name), 1)
        return {
            ...state,
            playlists: oldPlaylist.concat([{name: action.name, ...action.playlist}])
        }
        default:
            return state
    }
}