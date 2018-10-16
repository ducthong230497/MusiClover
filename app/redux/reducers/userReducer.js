const initialState = {
    user: [],

}
export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetUser' :
        return {
            ...state,
            user: action.user
        }
        default:
            return state
    }
}