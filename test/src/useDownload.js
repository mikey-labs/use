import { useDownload, useEventListener, useHttpRequest } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById('b20'),'click',()=>{
    useDownload('./abao.png','baidu.png').then((res)=>{
        console.log(res)
    })
})
useEventListener(document.getElementById('b21'),'click',()=>{
    const blob = new Blob(['hello world,中文'], { type: 'text/plain;charset=utf-8' })
    useDownload(blob,'blob.txt').then((res)=>{
        console.log(res)
    })
})
const cvs = document.getElementById('c1');
const ctx = cvs.getContext('2d');
ctx.fillStyle = "rgba(0,0,0,0.2)";
ctx.fillRect(0,0,50,50);
ctx.fill()
useEventListener(document.getElementById('b22'),'click',()=>{
    cvs.toBlob(blob=>{
        useDownload(blob,'canvas.png').then((res)=>{
            console.log(res)
        })
    })
})
useEventListener(document.getElementById('b23'),'click',()=>{
    useHttpRequest().get('./abao.png',null,{responseType:'blob'}).then(blob=>{
        useDownload(blob,'异步blob.png').then((res)=>{
            console.log(res)
        })
    })
})
