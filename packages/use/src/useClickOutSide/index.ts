import { inBrowser } from "../utils";
import { observerTargetRemove } from "../useEventListener/TargetRemoveObserver";
import { bindEventListener, unbindEventListener } from "../useEventListener/EventListener";

export type UseClickOutSideOptions = {
    eventName?: string;
};

export function useClickOutSide(
    target: Element | null | undefined,
    listener: EventListener,
    options: UseClickOutSideOptions = {}
): void {
    if (!inBrowser) return;
    if (!target) return;
    const { eventName = "click" } = options;
    const eventListener = (event: Event) => {
        if (target && !target.contains(event.target as HTMLElement)) {
            listener(event);
        }
    };
    observerTargetRemove(target, () => {
        unbindEventListener(document, eventName, eventListener);
    });
    bindEventListener(document, eventName, eventListener);
}
