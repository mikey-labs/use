import { IEventBus, IListenerInit, MessageOptions } from "./Types";

export class EventBus implements IEventBus {
    callbacks: IListenerInit[] = [];
    bindEventListener(eventName: string, callback: (data?: any) => {}): string {
        const uuid = Date.now().toString() + Math.random().toString();
        this.callbacks.push({
            eventName,
            callback,
            uuid,
        });
        console.log(this.callbacks);

        return uuid;
    }
    broadcastState(messageObj: MessageOptions): void {
        const { _event, data } = messageObj;
        console.log(_event);
        this.callbacks.map(({ eventName, callback }) => {
            if (_event === eventName) {
                callback.call(this, data);
            }
        });
    }

    stop(uuid: string): void {
        Promise.resolve().then(() => {
            console.log(uuid);
            const index = this.callbacks.findIndex((item) => item.uuid === uuid);
            this.callbacks.splice(index, 1);
            console.log(this.callbacks);
        });
    }
}
