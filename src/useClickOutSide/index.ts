import { inBrowser } from "../utils";
import { observerTargetRemove } from "../useEventListener/TargetRemoveObserver";
import { bindEventListener, unbindEventListener } from "../useEventListener/EventListener";

export type UseClickOutSideOptions = {
    eventName?: string;
};

/**
 * @desc 点击目标元素外部区域出发事件
 * @param target 目标元素
 * @param listener 监听事件
 * @param options 用户点击事件名称配置
 * */
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
