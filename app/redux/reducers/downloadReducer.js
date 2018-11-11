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
        case "FinishProgress":
            let newSongs = [...state.downloadSongs];
            let foundSong = newSongs.find(song=> song.URL === action.oldURL)
            if(foundSong) {
                foundSong.progress = 1;
                foundSong.URL = action.newURL;
                foundSong.img = action.imgURL;
            }
            return {
                ...state,
                downloadSongs: newSongs
            }
        default:
            return state
    }
}