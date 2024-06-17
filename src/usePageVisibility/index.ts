import {bindEventListener, unbindEventListener} from "../useEventListener/EventListener";
/**
 * @desc 监听当前页面是否在前/后台
 * @param callback 回调函数，返回当前的visibilityState
 * */
export function usePageVisibility(callback: (visibility: DocumentVisibilityState) => void): {stop:()=>void} {
    function visibilitychangeHandler(this: Function) {
        callback?.call(this, document.visibilityState);
    }
    bindEventListener(document, "visibilitychange", visibilitychangeHandler);
    return {
        stop:unbindEventListener.bind(document,document,"visibilitychange",visibilitychangeHandler)
    }
}
