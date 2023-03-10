import { bindEventListener } from "../useEventListener/EventListener";

export type MessageOptions = {
    _event:string,
    data?:any
}
export type EventOptions = {
    target?:Window,
    origin?:string
}
export function useEventDispatch(eventName:string,data:any,options?:EventOptions){
    const {target = window,origin = "*"} = options || {};
    const eventObj:MessageOptions = {
        _event:eventName,
        data
    }
    target.postMessage(eventObj,origin)
}
export function useEventObserver(eventName:string,callback:(data:any,event:MessageEvent)=>void,options?:EventOptions) {
    const {target = window,origin} = options || {};
    bindEventListener(target, 'message', (event: MessageEvent) => {
        const {data:eventData = {}, origin:eventOrigin} = event;
        const { _event, data } = eventData
        if(eventName === _event && ((origin && origin === eventOrigin) || !origin)){
            callback.call(null,data,event)
        }
    })
}
