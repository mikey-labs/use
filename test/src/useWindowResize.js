import { useWindowResize } from "../../dist/index.esm.mjs";

const { stop} = useWindowResize((width, height, e) => {
    console.log(width, height, e);
    document.getElementById("s2").textContent = width + "," + height;
    // stop() //停止监听
});
