/*判断当前环境是否为浏览器环境*/
export const inBrowser =  typeof window !== 'undefined' && 'onload' in window
/*判断当前环境是否支持Fetch API*/
export const isSupportFetch = inBrowser && typeof window['fetch'] === 'function'
/*判断当前环境是否支持FileReader API*/
export const isSupportFileReader = inBrowser && typeof window['FileReader'] !== 'undefined'
/*判断当前环境是否支持是Safari*/
export const isSafari = inBrowser && /Version\/[\d.]+.*Safari/.test(navigator.userAgent)
/*判断当前环境是否支持小于IE10*/
export const isIElt10 = inBrowser && /MSIE [1-9]\./.test(navigator.userAgent)
/*判断当前环境是否支持Storage API*/
export const isSupportStorage = inBrowser && typeof window.localStorage !== 'undefined' && typeof window.sessionStorage !== 'undefined'
/*判断当前环境是否是移动端*/
export const isMobile = inBrowser && ('ontouchstart' in document.documentElement);
/**
 * @desc 将对象转换成url字符串，&连接起来
 * @param obj 需要转换的对象
 * */
export const object2Url:(obj:object)=>string = (obj)=>{
    const res:string[] = []
    for(let key in obj){
        res.push(`${key}=${(<any>obj)[key]}`)
    }
    return res.join('&')
}
