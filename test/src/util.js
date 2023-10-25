import {
    formatDate,
    inBrowser,
    isSupportFetch,
    isSupportFileReader,
    isSafari,
    isIElt10,
    isSupportStorage,
    isMobile,
    isSupportInterSectionObserver,
    object2Url,
    isNumeric,
    isDarkMode,
    detectMobileBrowser
} from "../../dist/index.esm.mjs";
console.log("日期时间戳格式化:" + formatDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss S"));
console.log("当前是否为浏览器环境:" + inBrowser);
console.log("是否支持 Fetch API:" + isSupportFetch);
console.log("是否支持 FileReader API:" + isSupportFileReader);
console.log("当前是否为Safari UA标识浏览器:" + isSafari);
console.log("当前浏览器是否小于ie10:" + isIElt10);
console.log("是否支持 Local/Session Storage API:" + isSupportStorage);
console.log("是否为移动端:" + isMobile);
console.log("是否支持InterSectionObserver API:" + isSupportInterSectionObserver);
console.log("将简单对象转换成url，不支持嵌套:" + object2Url({ a: 1, b: 2 }));
console.log("是否为数字:" + isNumeric(1e4));
console.log("是否为暗黑模式:" + isDarkMode());
console.log("检测是否为移动端:" + detectMobileBrowser());
