/* 事件绑定 */
export const bindEventListener = (function (): Function {
    return function (
        element: Node,
        event: string,
        handler: EventListener,
        options: AddEventListenerOptions | boolean = false
    ) {
        if (element && event && handler) {
            if (document["addEventListener"]) {
                element.addEventListener(event, handler, options);
            } else {
                (element as any).attachEvent("on" + event, handler);
            }
        }
    };
})();

/* 解除事件绑定 */
export const unbindEventListener = (function (): Function {
    return function (
        element: Node,
        event: string,
        handler: EventListener,
        options: AddEventListenerOptions | boolean = false
    ) {
        if (element && event) {
            if (document["removeEventListener"]) {
                element.removeEventListener(event, handler, options);
            } else {
                (<any>element).detachEvent("on" + event, handler);
            }
        }
    };
})();
