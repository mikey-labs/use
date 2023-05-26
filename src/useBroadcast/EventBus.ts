import { IEventBus, IListenerInit, MessageOptions } from "./Types";

/**
 * 基于window对象实现类似于postMessage方法，但不支持iframe级别通信
 * 用于兼容不支持postMessage
 */
export class EventBus implements IEventBus {
    callbacks: IListenerInit[] = [];

    /**
     * 使用Observer监听的时候绑定事件和毁掉函数
     * @param eventName
     * @param callback
     */
    bindEventListener(eventName: string, callback: (data?: any) => {}): string {
        const uuid = Date.now().toString() + Math.random().toString();
        this.callbacks.push({
            eventName,
            callback,
            uuid,
        });
        return uuid;
    }

    /**
     * 使用dispatch的时候发送消息
     * @param messageObj
     */
    broadcastState(messageObj: MessageOptions): void {
        const { _event, data } = messageObj;
        this.callbacks.map(({ eventName, callback }) => {
            if (_event === eventName) {
                callback.call(this, data);
            }
        });
    }

    /**
     * 停止监听
     * @param uuid
     */
    stop(uuid: string): void {
        Promise.resolve().then(() => {
            const index = this.callbacks.findIndex((item) => item.uuid === uuid);
            this.callbacks.splice(index, 1);
        });
    }
}
