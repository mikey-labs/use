import { bindEventListener, unbindEventListener } from "../useEventListener/EventListener";
import { isSupportPostMessage } from "../utils";
interface IWindow extends Window {
    _PostMessagePolyfill: ProxyHandler<{
        [propName: string]: MessageOptions;
    }>;
}
export type MessageOptions = {
    _event: string;
    data?: any;
};
export type EventOptions = {
    target?: IWindow;
    origin?: string;
};

export function useEventDispatch(eventName: string, data: any, options?: EventOptions) {
    const { target = window, origin = "*" } = options || {};
    const eventObj: MessageOptions = {
        _event: eventName,
        data,
    };
    if (isSupportPostMessage) {
        target.postMessage(eventObj, origin);
    } else {
        const polyfillTarget = window as any;
        if (!polyfillTarget._PostMessagePolyfill) {
            throw Error("if you want to dispatch event,you must call useEventObserver first");
        }
        polyfillTarget._PostMessagePolyfill[eventName] = data;
    }
}
export function useEventObserver(
    eventName: string,
    callback: (data: any, event?: MessageEvent) => void,
    options?: EventOptions
): {
    stop: Function;
} {
    const { target = window, origin } = options || {};
    if (isSupportPostMessage) {
        function handler(event: MessageEvent) {
            const { data: eventData = {}, origin: eventOrigin } = event;
            const { _event, data } = eventData;
            if (eventName === _event && ((origin && origin === eventOrigin) || !origin)) {
                callback.call(target, data, event);
            }
        }
        bindEventListener(target, "message", handler);
        return {
            stop: function () {
                unbindEventListener(target, "message", handler);
            },
        };
    } else {
        const polyfillTarget = window as any;
        if (!polyfillTarget._PostMessagePolyfill) {
            polyfillTarget._PostMessagePolyfill = new Proxy(
                {
                    _cbs_: [],
                },
                {
                    set(
                        target: { _cbs_: { eventName: string; callback: Function; uuid: string }[] },
                        p: string | symbol,
                        newValue: any
                    ): boolean {
                        target._cbs_.map(({ eventName, callback }) => {
                            if (eventName === p) {
                                callback.call(target, newValue);
                            }
                        });
                        return Reflect.set(target, p, newValue);
                    },
                }
            );
        }
        const uuid = Date.now().toString() + Math.random().toString();
        polyfillTarget._PostMessagePolyfill._cbs_.push({
            eventName,
            callback,
            uuid,
        });
        return {
            stop: function () {
                setTimeout(() => {
                    if (polyfillTarget._PostMessagePolyfill[eventName]) {
                        if (
                            polyfillTarget._PostMessagePolyfill._cbs_.filter(
                                (item: { eventName: string }) => item.eventName === eventName
                            ).length === 1
                        ) {
                            delete polyfillTarget._PostMessagePolyfill[eventName];
                        }
                    }
                    const index = polyfillTarget._PostMessagePolyfill._cbs_.findIndex(
                        (item: { uuid: string }) => item.uuid === uuid
                    );
                    polyfillTarget._PostMessagePolyfill._cbs_.splice(index, 1);
                });
            },
        };
    }
}
