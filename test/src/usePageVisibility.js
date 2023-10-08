import { usePageVisibility } from "../../dist/index.esm.mjs";

document.getElementById("s1").textContent = document.visibilityState;
const {stop} = usePageVisibility((state) => {
    console.log("visibilityState:", state);
    document.getElementById("s1").textContent = state;
    // stop()
});
