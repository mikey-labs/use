import { useCopy, useEventListener } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById('b12'),'click',()=>{
    useCopy(document.getElementById('d2').textContent).then(res=>{
        console.log(res)
        alert(res ? '复制成功' : '复制失败')
    })
})
