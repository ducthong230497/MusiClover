const initialState = {
    paused: true,
    repeatOn: false,
    shuffleOn: false,
}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'TogglePause' :
        return {
            ...state,
            paused: !state.paused
        }
        default:
            return state
    }
}