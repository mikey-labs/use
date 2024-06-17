import { bindEventListener, unbindEventListener } from "./EventListener";
import { observerTargetRemove } from "./TargetRemoveObserver";

/**
 *@desc 事件绑定,目标元素移除则自动移除
 * @param el 目标元素
 * @param event 事件名称
 * @param callback 回调函数
 * @param options 事件配置项
 */
export const useEventListener = function (
    el: Node | Window,
    event: string,
    callback: Function,
    options?: AddEventListenerOptions | boolean
):{
    stop:Function
} {
    bindEventListener(el, event, callback, options);
    observerTargetRemove(el, () => {
        unbindEventListener(el, event, callback, options);
    });
    return {
        stop:unbindEventListener.bind(null,el, event, callback, options)
    }
};
