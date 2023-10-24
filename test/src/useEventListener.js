import { useEventListener } from "../../dist/index.esm.mjs";

useEventListener(
    document.getElementById("b7"),
    "click",
    () => {
        console.log("监听一次");
    },
    { once: true }
);
useEventListener(document.getElementById("b8"), "click", (e) => {
    e.stopPropagation();
    console.log("绑定事件");
});

useEventListener(window,'load',()=>{
    console.log("window.onload")
})
