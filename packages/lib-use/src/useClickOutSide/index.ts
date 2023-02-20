import { inBrowser } from "../utils";
import { bindEventListener, unbindEventListener } from "../useEventListener";

export type UseClickOutSideOptions = {
    eventName?: string;
};

export const useClickOutSide = (
    target: Element,
    listener: EventListener,
    options: UseClickOutSideOptions = {}
): void => {
    if (!inBrowser) {
        return;
    }
    const { eventName = "click" } = options;
    const eventListener = (event: Event) => {
        if (target && !target.contains(event.target as HTMLElement)) {
            listener(event);
        }
    };
    let observer: MutationObserver | null = new MutationObserver((records: MutationRecord[]) => {
        const isRemoved: boolean = records.some((record) =>
            Array.from(record.removedNodes).some((node) => node === target)
        );
        if (isRemoved) {
            unbindEventListener(document, eventName, eventListener);
            observer?.disconnect();
            observer = null;
        }
    });
    observer.observe((target as any).parentNode, {
        childList: true,
    });
    bindEventListener(document, eventName, eventListener);
};
