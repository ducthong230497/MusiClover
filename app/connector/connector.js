
export async function getTop100(url)
{
    let listSong = [];
    url = url == null ? 'https://www.nhaccuatui.com/playlist/top-100-nhac-tre-hay-nhat-va.m3liaiy6vVsF.html' : url 
    await fetch(url).then((response) => {
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

                // let xmlURL = GetXmlURL(songURL)
                // console.log(xmlURL)
                // GetXmlURL(songURL).then(xmlURL=>{
                //     //console.log(xmlURL)
                //     GetData(xmlURL).then(data => {
                //         mp3URL = data.mp3URL
                //         avatar = data.img
                //         Test(mp3URL, avatar, data.mp3URL, data.img)
                //     })
                // })

                //console.log(mp3URL)
                //console.log(avatar)
                let songInfo = { 
                    songName: songName, 
                    artist: singerName,
                    songURL: songURL
                }
                listSong.push(songInfo)
            });
            //GetData("https://www.nhaccuatui.com/flash/xml?html5=true&key1=9b8d0bd51148f40900a2f15ecb9ef6ba")
        }).catch((error) => {
            console.error(error);
        });
        //getTop100Avatar(url)
        return listSong;
}

export async function getXmlURL(url){
    let xmlURL
    //console.log("url: "+url)
    await fetch(url).then((response) => {
        let regXmlURL = /xmlURL = "(.*)"/
        //xmlURL = (response._bodyInit.toString().match(regXmlURL).toString().replace("xmlURL = \"", "").replace("\"", ""));
        xmlURL = response._bodyInit.toString().match(regXmlURL)[1].toString()
        //console.log("inside: "+xmlURL)
    }).catch(err=>console.error(err))
    //console.log("before return:"+ xmlURL)
    return xmlURL
}

//
export async function getDataFromXmlURL(xmlURL){
    let data = {}
    await fetch(xmlURL).then(response => {
        let regexLocation = /<location>([\s\S]*?)<\/location>/
        let regexAvatar = /<avatar([\s\S]*?)<\/avatar>/
        let regexCDATA = /<!\[CDATA\[([\s\S]*?)\]\]>/

        //let mp3URL = response._bodyInit.toString().match(regexLocation).toString().match(regexCDATA)[1].toString().replace("<![CDATA[", "").replace("]]>", "")
        //let avatar = response._bodyInit.toString().match(regexAvatar).toString().match(regexCDATA)[1].toString().replace("<![CDATA[", "").replace("]]>", "")
        let mp3URL = response._bodyInit.toString().match(regexLocation).toString().match(regexCDATA)[1].toString()
        let avatar = response._bodyInit.toString().match(regexAvatar).toString().match(regexCDATA)[1].toString()
        console.log("location: " +mp3URL+ " end")
        data = {URL: mp3URL, img: avatar}
    }).catch(err=>console.error(err))
    return data
}

export async function getTop100Avatar(url){
    let avatar
     await fetch(url).then(response => {
        let regexAvatar = /<link rel="image_src" href="([\s\S]*?)"/;
        
        avatar = response._bodyInit.toString().match(regexAvatar)[1].toString()
    }).catch(err=>console.error(err))
    console.log("avatar: "+avatar)
    return avatar
}