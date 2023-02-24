import { inBrowser } from "../utils";
import { bindEventListener } from "../useEventListener/EventListener";

export function usePageVisibility(callback: (visibility: string) => void): void {
    if (!inBrowser) return;
    function visibilitychangeHandler(this: Function) {
        callback?.call(this, document.visibilityState);
    }
    bindEventListener(window, "visibilitychange", visibilitychangeHandler);
}
