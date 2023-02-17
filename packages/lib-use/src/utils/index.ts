export const getDataType = (o : any) : string => {
    return Object.prototype.toString.call(o).match(/\[object\s(\w+.*?)\]/)[1];
}
export const inBrowser =  typeof window !== 'undefined' && 'onload' in window
