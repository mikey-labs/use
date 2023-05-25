import { useEventDispatch, useEventListener, useEventObserver } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById("b9"), "click", () => {
    useEventDispatch(
        "hello",
        { a: "hello,你好" },
        {
            // target:document.getElementById('i1').contentWindow,
            // origin:location.origin
        }
    );
});
const { stop } = useEventObserver("hello", (data) => {
    console.log("接收子窗口消息1", data);
    stop();
});
const { stop: sp } = useEventObserver("hello", (data) => {
    console.log("接收子窗口消息2", data);
    // stop()
});
const { stop: s } = useEventObserver("custom", (data) => {
    console.log("接收子窗口消息", data);
    // stop()
});
