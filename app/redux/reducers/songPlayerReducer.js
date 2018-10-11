const initialState = {
    songPlayer: null,
    tracks: [],
    selectedTrackIndex: 0,
    selectedTrackURL: 'https://aredir.nixcdn.com/dummy.mp3',
    selectedTrackImage: 'https://media.giphy.com/media/QyOI0WGW3vY2s/giphy.gif',
    totalLength: 1,
    currentPosition: 0,
    paused: false,
    repeatOn: false,
    shuffleOn: false,
    isMaximizerVisible: false
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
        case 'SetSelectedTrackInfo' :
        return {
            ...state,
            selectedTrackURL: action.selectedTrackURL,
            selectedTrackImage: action.selectedTrackImage
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
        case 'NextTrack':
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: state.selectedTrackIndex + 1
        }
        case 'BackTrack':
        return {
            ...state,
            currentPosition: 0, 
            paused: false, 
            totalLength: 1, 
            selectedTrackIndex: state.selectedTrackIndex - 1
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
        case 'ShowMinimizer':
        return {
            ...state,
            isMaximizerVisible: false,
            isMinimizerVisible: true
        }
        case 'ShowMaximizer':
        return {
            ...state,
            isMaximizerVisible: true,
            isMinimizerVisible: false
        }
        case 'HideInterface':
        return {
            ...state,
            isMaximizerVisible: false,
            isMinimizerVisible: false
        }
        default:
            return state
    }
}