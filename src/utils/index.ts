/**判断当前环境是否为浏览器环境*/
export const inBrowser = typeof window !== "undefined" && "onload" in window;
/**判断当前环境是否支持Fetch API*/
export const isSupportFetch = inBrowser && typeof window["fetch"] === "function";
/**判断当前环境是否支持FileReader API*/
export const isSupportFileReader = inBrowser && typeof window["FileReader"] !== "undefined";
/**判断当前环境是否支持是Safari*/
export const isSafari = inBrowser && /Version\/[\d.]+.*Safari/.test(navigator.userAgent);
/**判断当前环境是否支持小于IE10*/
export const isIElt10 = inBrowser && /MSIE [1-9]\./.test(navigator.userAgent);
/**判断当前环境是否支持Storage API*/
export const isSupportStorage = ((w)=>{
    try {
        return inBrowser && typeof w.localStorage !== "undefined" && typeof w.sessionStorage !== "undefined";
    } catch (e){
       return false;
    }
})(window);
/**判断当前环境是否是移动端*/
export const isMobile = inBrowser && "ontouchstart" in document.documentElement;
/**判断当前环境是否支持 IntersectionObserver*/
export const isSupportInterSectionObserver = inBrowser && "IntersectionObserver" in window;

export const isSupportPostMessage = inBrowser && typeof window.postMessage === "function";
/**判断当前环境是否是移动端*/
/**
 * @desc 将对象转换成url字符串，&连接起来
 * @param obj 需要转换的对象
 * */
export const object2Url: (obj: object) => string = (obj) => {
    const res: string[] = [];
    for (let key in obj) {
        res.push(`${key}=${(<any>obj)[key]}`);
    }
    return res.join("&");
};

/**
 * @desc 时间转换
 * @param timestamp 时间戳
 * @param format 格式化参数
 * @return {string}
 */
export const formatDate = (timestamp: string | number, format: string = "yyyy-MM-dd hh:mm:ss"): string => {
    const date = new Date(Number(timestamp));
    const o = {
        "M+": date.getMonth() + 1, // month
        "d+": date.getDate(), // day
        "h+": date.getHours(), // hour
        "m+": date.getMinutes(), // minute
        "s+": date.getSeconds(), // second
        "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds(),
    };
    let result;
    !!(result = /(y+)/.exec(format)) &&
        (format = format.replace(result[0], String(date.getFullYear()).substring(4 - result[0].length)));
    Object.keys(o).map((k) => {
        const reg = new RegExp("(" + k + ")");

        !!(result = reg.exec(format)) &&
            (format = format.replace(
                reg,
                // @ts-ignore
                result[0].length === 1 ? o[k] : ("00" + o[k]).substring(String(o[k]).length)
            ));
    });
    return format;
};

/**
 * @desc判断参数是否为数字
 * @param val
 */
export const isNumeric = (val: string | number): boolean => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);

/**
 * 是否是暗黑模式
 */
export const isDarkMode = (): boolean =>
    inBrowser && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

