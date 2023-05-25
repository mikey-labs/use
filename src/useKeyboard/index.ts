import { useEventListener } from "../useEventListener";
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
export function useKeyboard(optionsOrKey: string | KeyboardOptions, callback: (e: KeyboardEvent) => void) {
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
    useEventListener(
        document,
        type,
        (e: KeyboardEvent) => {
            checkKeyIsFire(e, options) && callback.call(null, e);
        },
        { once }
    );
}
