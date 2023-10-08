import { useEventListener, useKeyboard } from "../../dist/index.esm.mjs";

useEventListener(document.getElementById("b24"), "click", () => {
    const {stop} = useKeyboard("q", (event) => {
        console.log(event);
        //stop()
    });
});
useEventListener(document.getElementById("b25"), "click", () => {
    useKeyboard({ key: "c", ctrl: true }, (event) => {
        console.log(event);
    });
});
