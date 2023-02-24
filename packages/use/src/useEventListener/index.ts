import { bindEventListener, unbindEventListener } from "./EventListener";
import { observerTargetRemove } from "./TargetRemoveObserver";

/**
 *事件绑定
 */
export const useEventListener = function (el: Node, event: string, callback: Function,options:AddEventListenerOptions | boolean) {
    bindEventListener(el, event, callback, options);
    observerTargetRemove(el, () => {
        unbindEventListener(el, event, callback,options);
    });
};
