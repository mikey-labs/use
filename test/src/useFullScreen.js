import { useEventListener, useExitFullScreen, useFullScreen, useFullScreenChange } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById('b10'),'click',()=>{
    useFullScreen(document.getElementById('d1'))
})
useEventListener(document.getElementById('b11'),'click',()=>{
    useExitFullScreen()
})
useFullScreenChange((isFullScreen,event)=>{
    document.getElementById('s3').textContent = isFullScreen;
})
