export function HexStringToByteArray(hexString) {
    let result = []
    let str = ''
    for (let i = 0; i < HexString.length; i += 2) {
        let charCode = hexString.charCodeAt(i)
        //result[i / 2] = Convert.ToByte(hexString.Substring(i, 2), 16);
        str += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
    }
    console.log(str)
    return str;
}