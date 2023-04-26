import { useEventListener, useTouch } from "../../dist/index.esm.mjs";

const touch = useTouch();
const d3 = document.getElementById('d3');
useEventListener(d3,'touchstart',(e)=>{
    touch.touchStart(e);
})
useEventListener(d3,'touchmove',(e)=>{
    touch.touchMove(e);
    const res = touch.getTouchResult();
    d3.style.left = res.deltaX + 'px';
    d3.style.top = res.deltaY + 'px';
    d3.textContent = JSON.stringify(res)
    touch.preventDefault(e);
})
useEventListener(d3,'touchend',(e)=>{
    touch.touchEnd(e)
    console.log(touch.getTouchResult())
})
useEventListener(d3,'mousedown',(e)=>{
    touch.touchStart(e);
})
useEventListener(d3,'mousemove',(e)=>{
    if(touch.isDrag){
        touch.touchMove(e);
        const res = touch.getTouchResult();
        d3.style.left = res.deltaX + 'px';
        d3.style.top = res.deltaY + 'px';
        d3.textContent = JSON.stringify(res)
        touch.preventDefault(e);
    }

})
useEventListener(d3,'mouseup',(e)=>{
    touch.touchEnd(e)
    console.log(touch.getTouchResult())
})
