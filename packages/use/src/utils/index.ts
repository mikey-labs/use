/*判断当前环境是否为浏览器环境*/
export const inBrowser =  typeof window !== 'undefined' && 'onload' in window
/*判断当前环境是否支持Fetch API*/
export const isSupportFetch = inBrowser && typeof window['fetch'] === 'function'
/*判断当前环境是否支持Storage API*/
export const isSupportStorage = inBrowser && typeof window.localStorage !== 'undefined' && typeof window.sessionStorage !== 'undefined'
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
