import { bindEventListener } from "../useEventListener/EventListener";

const MethodKeys = {
    fullscreenEnabled:0,
    fullscreenElement:1,
    requestFullscreen:2,
    exitFullscreen:3,
    fullscreenchange:4,
    fullscreenerror:5
}
const WebkitMethods:string[] = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror'
]
const MozMethods:string[] = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror'
]

const MSMethods:string[] = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError'
]
const vendor:string[] =
    ('fullscreenEnabled' in document && Object.keys(MethodKeys)) ||
    (WebkitMethods[0] in document && WebkitMethods) ||
    (MozMethods[0] in document && MozMethods) ||
    (MSMethods[0] in document && MSMethods) ||
    [];
export function useFullScreen(target:Node):any{
    // @ts-ignore
    return <any>target[vendor[MethodKeys.requestFullscreen]]()
}
export function useExitFullScreen():any{
    // @ts-ignore
    return document[vendor[MethodKeys.exitFullscreen]]()
}
export function useFullScreenChange(callback:(isFullScreen:boolean,arg:IArguments)=>void):void{
    bindEventListener(document,vendor[MethodKeys.fullscreenchange].toLowerCase(),()=>{
        const isFullScreen = !!(<any>document)[vendor[MethodKeys.fullscreenElement]];
        callback.apply(null,[isFullScreen,arguments])
    })
}
