const initialState = {
    tracks: [],
    selectedTrackIndex: 0,
    selectedTrackURL: 'https://aredir.nixcdn.com/dummy.mp3',
    totalLength: 1,
    currentPosition: 0,
    paused: false,
    repeatOn: false,
    shuffleOn: false,
    isMaximizerVisible: false
}
export default (state=initialState, action) => {
    switch (action.type) {
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