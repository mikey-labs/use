import { inBrowser, isIElt10, isSafari, isSupportFileReader } from "../utils";

/**
 * @desc 创建A标签
 */
const getSaveLink = ():HTMLAnchorElement =>{
    return document.createElementNS('http://www.w3.org/1999/xhtml',"a") as HTMLAnchorElement;
}
/**
 * @desc 判断是否为blob 对象并追加\ufeff，支持utf-8编码
 * @param blob
 */
const autoBom = (blob:Blob):Blob => {
    if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type))
        return new Blob(['\ufeff', blob], {type: blob.type})
    return blob
}
const getURL = ()=>{
    return window.URL || window.webkitURL;
}

const saveAsAnchor = (
    target:string | Blob,
    fileName:string,
    anchor:HTMLAnchorElement
):Promise<boolean>=>{
    return new Promise((resolve)=>{
        try {
            const objectUrl = target instanceof Blob ? getURL().createObjectURL(target) : target;
            anchor.href = objectUrl;
            anchor.rel = "noopener noreferrer";
            anchor.download = fileName;
            anchor.dispatchEvent(new MouseEvent('click'));
            target instanceof Blob && getURL().revokeObjectURL(objectUrl);
            resolve(true)
        } catch (e){
            resolve(false);
        }
    })
}
/**
 * save on ie 10+
 */
const saveInIE = (
    target:Blob,
    fileName:string,
):Promise<boolean>=>{
    return new Promise((resolve) => {
        try {
            const blob = autoBom(target);
            (<any>navigator).msSaveOrOpenBlob(blob,fileName);
            resolve(true);
        } catch (e){
            resolve(false)
        }

    })
}

interface ISaveAsUrl{
    (target:Blob):Promise<boolean>
}
const saveAsLocation:ISaveAsUrl = (target)=>{
    const objectUrl = getURL().createObjectURL(target);
    window.location.href = objectUrl;
    getURL().revokeObjectURL(objectUrl);
    return Promise.resolve(true);
}
const saveAsFileReader:ISaveAsUrl = (target)=>{
    return new Promise((resolve) => {
        try {
            const reader = new FileReader();
            reader.onloadend = function() {
                const {result:base64Data} = reader;
                if(base64Data && typeof base64Data === 'string'){
                    location.href = 'data:attachment/file' + base64Data.slice(base64Data.search(/[,;]/))
                    resolve(true)
                } else {
                    resolve(false)
                }

            }
            reader.readAsDataURL(target);
        } catch (e){
            resolve(false)
        }
    })
}
const saveAsOpenWindow:ISaveAsUrl = (target)=>{
    return new Promise((resolve) => {
        const objectUrl = getURL().createObjectURL(target);
        const tab = window.open(objectUrl,'_blank');
        getURL().revokeObjectURL(objectUrl);
        if(!tab){
            return saveAsLocation(target);
        }

        resolve(true);
    })
}
export function useDownload(
    target:string | Blob,
    fileName:string
):Promise<boolean>{
    if (!inBrowser || isIElt10)return Promise.resolve(false);

    const link:HTMLAnchorElement = getSaveLink();
    if('download' in link){
        return saveAsAnchor(target,fileName,link);
    }
    if(target instanceof Blob){
        if('msSaveOrOpenBlob' in navigator){
            return saveInIE(target,fileName)
        }
        if (isSafari && isSupportFileReader){
            return saveAsFileReader(target);
        }
        return saveAsOpenWindow(target);
    } else {
        window.location.href = target;
        return Promise.resolve(true)
    }
}
