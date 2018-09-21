const initialState = {
    paused: true,
    repeatOn: false,
    shuffleOn: false,
    selectedTrack: 0
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'TogglePause' :
        return {
            ...state,
            paused: !state.paused
        }
        case 'GoNextTrack' :
        return {
            ...state,
            selectedTrack: state.selectedTrack + 1
        }
        case 'GoPreviousTrack' :
        return {
            ...state,
            selectedTrack: state.selectedTrack - 1
        }
        default:
            return state
    }
}