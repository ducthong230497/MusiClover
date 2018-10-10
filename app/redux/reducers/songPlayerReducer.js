const initialState = {
    songPlayer: null,
    tracks: [],
    selectedTrackIndex: 0,
    selectedTrackURL: 'https://aredir.nixcdn.com/dummy.mp3',
    totalLength: 1,
    currentPosition: 0,
    paused: false,
    repeatOn: false,
    shuffleOn: false,
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetSongPlayer' :
        return {
            ...state,
            songPlayer: action.songPlayer,
        }
        case 'SetTrackList' :
        return {
            ...state,
            tracks: action.tracks,
        }
        case 'SetSelectedTrackIndex' :
        return {
            ...state,
            selectedTrackIndex: action.selectedTrackIndex
        }
        case 'SetSelectedTrackURL' :
        return {
            ...state,
            selectedTrackURL: action.selectedTrackURL
        }
        case 'Pause':
        return {
            ...state,
            paused : true
        }
        case 'Resume':
        return {
            ...state,
            paused : false
        }
        case 'SetTotalLength':
        return {
            ...state,
            totalLength: action.totalLength
        }
        case 'SetCurrentPosition':
        return {
            ...state,
            currentPosition: action.currentPosition
        }
        case 'ToggleRepeat':
        return {
            ...state,
            repeatOn: !state.repeatOn
        }
        case 'ToggleShuffle':
        return {
            ...state,
            shuffleOn: !state.shuffleOn
        }
        default:
            return state
    }
}