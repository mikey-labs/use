import { useEventListener, useKeyboard } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById('b24'),'click',()=>{
    useKeyboard('q',(event)=>{
        console.log(event)
    })
})
useEventListener(document.getElementById('b25'),'click',()=>{
    useKeyboard({key: 'c',ctrl:true},(event)=>{
        console.log(event)
    })
})
