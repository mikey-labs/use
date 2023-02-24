import { inBrowser } from "../utils";
import { bindEventListener } from "../useEventListener/EventListener";

export function useWindowResize(callback: (width: number, height: number) => void) {
    if (!inBrowser) return;
    const observer = () => {
        callback.call(null, window.innerWidth, window.innerHeight);
    };
    bindEventListener(window, "resize", observer);
    bindEventListener(window, "orientationchange", observer);
}
