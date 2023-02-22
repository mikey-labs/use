export const bindEventListener = (function ():Function {
    return function (element: Node, event: string, handler: EventListener) {
        if (element && event && handler) {
            if (document["addEventListener"]) {
                element.addEventListener(event, handler, false);
            } else {
                (<any>element).attachEvent("on" + event, handler);
            }
        }
    };
})();

/* 解除事件绑定 */
export const unbindEventListener = (function ():Function {
    return function (element: Node, event: string, handler: EventListener) {
        if (element && event) {
            if (document["removeEventListener"]) {
                element.removeEventListener(event, handler, false);
            } else {
                (<any>element).detachEvent("on" + event, handler);
            }
        }
    };
})();

/**
 *事件执行1次就被解除
*/
export const bindOnceEventListener = function(el:Node, event:string, fn:Function) {
    const listener = function (this:Function) {
        fn?.apply(this, arguments);
        unbindEventListener(el, event, listener);
    };
    bindEventListener(el, event, listener);
};
