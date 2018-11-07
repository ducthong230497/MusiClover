const initialState = {
    downloadingSongs: [],

}
export default (state=initialState, action) => {
    switch (action.type) {
        case "AddDownloadingSong":
            return {
                ...state,
                downloadingSongs: [...state.downloadingSongs, action.downloadingSong]
            }
        case "UpdateProgress":
            let newDownloadingSongs = [...state.downloadingSongs];
            let song = newDownloadingSongs.find(song=> song.URL === action.url)
            if(song) song.progress = action.progress;
            return {
                ...state,
                downloadingSongs: newDownloadingSongs
            }

        default:
            return state
    }
}