import { useWindowResize } from "../../dist/index.esm.mjs";

useWindowResize((width, height, e) => {
    console.log(width, height, e);
    document.getElementById("s2").textContent = width + "," + height;
});
