export const observerTargetRemove = (target: Node, callback: Function): MutationObserver | void => {
    if (!target.parentNode) return;
    let observer: MutationObserver | null = new MutationObserver((records: MutationRecord[]) => {
        const isRemoved: boolean = records.some((record) =>
            Array.from(record.removedNodes).some((node) => node === target)
        );
        if (isRemoved) {
            callback.apply(null);
            observer?.disconnect();
            observer = null;
        }
    });
    observer.observe(target.parentNode, {
        childList: true,
    });
};
