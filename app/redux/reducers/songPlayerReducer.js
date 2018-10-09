const initialState = {
    tracks: [],
    initialTrackIndex: 0,
    currentSongLists: []
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetupTrackList' :
        return {
            ...state,
            tracks: action.tracks,
            initialTrackIndex: action.initialTrackIndex
        }
        case 'SetupCurrentSongLists' :
        return {
            ...state,
            currentSongLists: action.currentSongLists
        }
        default:
            return state
    }
}