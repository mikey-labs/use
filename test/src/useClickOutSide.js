import { useClickOutSide, useEventListener } from "../../dist/index.esm.mjs";
useClickOutSide(document.getElementById("b1"), (event) => {
    // console.log(event)
    console.log("useClickOutside按钮1::点击外部回调");
});
useClickOutSide(document.getElementById("b2"), (events) => {
    console.log("useClickOutside按钮2::点击外部回调");
});
useEventListener(document.getElementById("b3"), "click", () => {
    const b1 = document.getElementById("b1");
    if (b1) {
        b1.parentNode.removeChild(b1);
    }
});
