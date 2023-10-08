import { inBrowser } from "../utils";
import {bindEventListener, unbindEventListener} from "../useEventListener/EventListener";
/**
 * @desc 监听当前页面是否在前/后台
 * @param callback 回调函数，返回当前的visibilityState
 * */
export function usePageVisibility(callback: (visibility: string) => void): {stop:()=>void} {
    function visibilitychangeHandler(this: Function) {
        callback?.call(this, document.visibilityState);
    }
    bindEventListener(window, "visibilitychange", visibilitychangeHandler);
    return {
        stop:unbindEventListener.bind(window,window,"visibilitychange",visibilitychangeHandler)
    }
}
