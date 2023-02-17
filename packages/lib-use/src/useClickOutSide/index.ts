import { inBrowser } from "../utils";

type UseClickOutSideOptions = {
    eventName:string
}

export const useClickOutSide = (
    target:Element,
    listener: EventListener,
    options:UseClickOutSideOptions = {
        eventName:'click'
    }
) :void =>{
    if(!inBrowser){
        return;
    }
    const { eventName } = options;
    const eventListener = (event:Event)=>{
        if(target && !target.contains(event.target as Node)){
            listener(event);
        }
    }
    document.addEventListener(eventName,eventListener);
}
