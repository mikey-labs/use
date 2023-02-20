export const object2Url:(obj:object)=>string = (obj)=>{
    const res:string[] = []
    for(let key in obj){
        res.push(`${key}=${(<any>obj)[key]}`)
    }
    return res.join('&')
}
