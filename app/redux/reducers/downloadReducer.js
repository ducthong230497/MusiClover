const initialState = {
    downloadSongs: [],

}
export default (state=initialState, action) => {
    switch (action.type) {
        case "SetDownloadSongs":
            return{
                ...state,
                downloadSongs: action.downloadSongs
            }
        case "AddDownloadingSong":
            return {
                ...state,
                downloadSongs: [...state.downloadSongs, action.downloadingSong]
            }
        case "UpdateProgress":
            let newDownloadSongs = [...state.downloadSongs];
            let song = newDownloadSongs.find(song=> song.URL === action.url)
            if(song) song.progress = action.progress;
            return {
                ...state,
                downloadSongs: newDownloadSongs
            }

        default:
            return state
    }
}