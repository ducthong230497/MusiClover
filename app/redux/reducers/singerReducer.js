const initialState = {
    singer: null,
}

export default (state=initialState, action) => {
    switch (action.type) {
        case 'SetSinger' :
        return {
            ...state,
            singer: action.singer
        }
        default:
            return state
    }
}