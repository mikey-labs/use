import { isSupportInterSectionObserver } from "../utils";

/**
 *
 * @param el 监听的dom节点
 * @param callback 回调函数
 * @param options 设置参数
 */
export function useIntersectionObserver(
    el: Element,
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit
):
    | {
          isSupported: boolean;
          stop: () => void;
      }
    | undefined {
    if (!isSupportInterSectionObserver || !el) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
    const stop = function (): void {
        observer.unobserve(el);
        observer.disconnect();
    };
    return {
        isSupported: isSupportInterSectionObserver,
        stop,
    };
}
