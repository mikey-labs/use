import { useEventDispatch, useEventListener, useEventObserver } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById('b9'),'click',()=>{
    useEventDispatch('hello',{a:'hello,你好'},{
        target:document.getElementById('i1').contentWindow,
        origin:location.origin
    })
})
useEventObserver('custom',(data)=>{
    console.log('接收子窗口消息',data)
})
