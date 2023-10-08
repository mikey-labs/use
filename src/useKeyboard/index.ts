import {bindEventListener, unbindEventListener} from "../useEventListener/EventListener";
export type PressTypes = "keydown" | "keyup";
export type KeyboardOptions = {
    key: string;
    type?: PressTypes;
    caseSensitive?: boolean;
    once?: boolean;
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    meta?: boolean;
};
const checkKeyIsFire = (e: KeyboardEvent, options: KeyboardOptions): boolean => {
    const { ctrlKey, shiftKey, altKey, metaKey, key: eventKey } = e;
    const { ctrl, shift, alt, meta, key, caseSensitive } = options;
    return (
        ctrl === ctrlKey &&
        shift === shiftKey &&
        alt === altKey &&
        meta === metaKey &&
        (caseSensitive ? key === eventKey : key.toUpperCase() === eventKey.toUpperCase())
    );
};
export function useKeyboard(optionsOrKey: string | KeyboardOptions, callback: (e: KeyboardEvent) => void):{
    stop:()=> void,
} {
    const defaultOptions: KeyboardOptions = {
        key: "",
        type: <PressTypes>"keydown",
        caseSensitive: false,
        once: false,
        ctrl: false,
        shift: false,
        alt: false,
        meta: false,
    };
    let options: KeyboardOptions = Object.assign(
        defaultOptions,
        typeof optionsOrKey === "string" ? { key: optionsOrKey } : optionsOrKey
    );
    const { type = "keydown", once } = options;
    function handler(e: KeyboardEvent) {
        checkKeyIsFire(e, options) && callback.call(null, e);
    }
    bindEventListener(document, type, handler, { once });
    return {
        stop:unbindEventListener.bind(document,document,type,handler,{ once })
    };
}
