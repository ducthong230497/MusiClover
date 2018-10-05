const initialState = {
    tracks: [],
    initialTrackIndex: 0
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetupTrackList' :
        return {
            ...state,
            tracks: action.tracks,
            initialTrackIndex: action.initialTrackIndex
        }
        default:
            return state
    }
}