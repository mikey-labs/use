import { inBrowser } from "../utils";
import {bindEventListener, unbindEventListener} from "../useEventListener/EventListener";
/**
 * @desc 监听视窗大小变换
 * @param callback 回调函数，返回视窗宽高及event参数
 * */
export function useWindowResize(callback: (width: number, height: number, args: IArguments) => void):{stop:()=>void} {
    const observer = (args: IArguments) => {
        callback.apply(null, [window.innerWidth, window.innerHeight, args]);
    };
    bindEventListener(window, "resize", observer);
    bindEventListener(window, "orientationchange", observer);
    return {
        stop:function (){
            unbindEventListener(window,"resize",observer)
            unbindEventListener(window,"orientationchange",observer)
        }
    }
}
