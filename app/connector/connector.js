
export function getTop100NhacTre()
{
    let listSong = [];

    fetch('https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html').then((response) => {
            let re = /<ul class="list_song_in_album">([\s\S]*?)<\/ul>/ig;

            let result = response._bodyInit.match(re)
            //console.log(result[0])

            let regexListSong = /<li([\s\S]*?)<\/li>/ig
            let listItemSong = result[0].toString().match(regexListSong)
            //console.log(listItemSong[0])

            let regexSongItem = /<meta content="(.*?)"/ig

            listItemSong.forEach(element => {
                //let singer = element.toString().match(/titleplay="(.*?)"/ig)
                let singerName = /titleplay="(.*?)"/ig.exec(element.toString())[1].toString().split("-")[1].trim()
                //console.log(singer)

                let match = element.toString().match(regexSongItem)
                let songName = match[0].toString().replace("<meta content=\"", "").replace("\"", "")
                let songURL = match[1].toString().replace("<meta content=\"", "").replace("\"", "")
                
                GetXmlURL(songURL).then(xmlURL=>{
                    console.log(xmlURL)
                })

                let songInfo = { 
                    songName: songName, 
                    artist: singerName, 
                    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg', 
                    audioUrl: songURL 
                }
                listSong.push(songInfo)
            });
           
        }).catch((error) => {
            console.error(error);
        });

        return listSong;
}

async function GetXmlURL(url){
    let xmlURL
    //console.log("url: "+url)
    await fetch(url).then((response) => {
        let regXmlURL = /xmlURL = "(.*)"/ig
        xmlURL = (response._bodyInit.toString().match(regXmlURL).toString().replace("xmlURL = \"", "").replace("\"", ""));
        //console.log("inside: "+xmlURL)
    }).catch(err=>console.error(err))
    //console.log("before return:"+ xmlURL)
    return xmlURL
}