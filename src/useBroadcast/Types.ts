export interface IEventBus {
    bindEventListener(eventName: string, callback: (data?: any) => {}): string;
    broadcastState(messageObj: MessageOptions): void;
    stop(uuid: string): void;
}
export type MessageOptions = {
    _event: string;
    data?: any;
};
export interface IWindow extends Window {
    _PostMessagePolyfill: IEventBus;
}

export type EventOptions = {
    target?: IWindow;
    origin?: string;
};

export interface IListenerInit {
    eventName: string;
    callback: (data?: any) => {};
    uuid: string;
}
