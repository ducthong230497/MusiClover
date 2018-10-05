
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
                var mp3URL
                var avatar
                
                GetXmlURL(songURL).then(xmlURL=>{
                    //console.log(xmlURL)
                    GetData(xmlURL).then(data => {
                        mp3URL = data.mp3URL
                        avatar = data.img
                    })
                })
                console.log(mp3URL)
                console.log(avatar)
                let songInfo = { 
                    songName: songName, 
                    artist: singerName, 
                    albumArtUrl: avatar, 
                    audioUrl: mp3URL
                }
                listSong.push(songInfo)
            });
            //GetData("https://www.nhaccuatui.com/flash/xml?html5=true&key1=9b8d0bd51148f40900a2f15ecb9ef6ba")
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

async function GetData(url){
    let data = {}
    await fetch(url).then(response => {
        let regexLocation = /<location([\s\S]*?)<\/location>/ig
        let regexAvatar = /<avatar([\s\S]*?)<\/avatar>/ig
        let regexCDATA = /<!\[CDATA\[([\s\S]*?)\]\]>/ig

        let mp3URL = response._bodyInit.toString().match(regexLocation).toString().match(regexCDATA).toString().replace("<![CDATA[", "").replace("]]>", "")
        let avatar = response._bodyInit.toString().match(regexAvatar).toString().match(regexCDATA).toString().replace("<![CDATA[", "").replace("]]>", "")
        
        data = {URL: mp3URL, img: avatar}
    }).catch(err=>console.error(err))
    return data
}