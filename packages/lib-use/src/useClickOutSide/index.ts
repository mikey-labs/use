import {inBrowser} from "../utils";

type UseClickOutSideOptions = {
    eventName:string
}

export const useClickOutSide = (
    target:any,
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
        if(target && !target.contains(event.target as HTMLElement)){
            listener(event);
        }
    }
    const observer:MutationObserver = new MutationObserver((records:MutationRecord[])=>{
        const isRemoved:boolean = records.some(
            (record)=>Array.from(record.removedNodes).some(node=>node === target)
        )
        if(isRemoved){
            document.removeEventListener(eventName,eventListener)
            observer.disconnect();
        }
    });
    observer.observe(
        target.parentNode,
        {
            childList:true
        }
    )
    document.addEventListener(eventName,eventListener);

}
