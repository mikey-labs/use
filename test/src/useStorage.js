import { useEventListener, useStorage } from "../../dist/index.esm.mjs";

const Storage = useStorage({ use: "cookie" });
useEventListener(document.getElementById("b14"), "click", () => {
    console.log(Storage.setSession("session", ""));
});
useEventListener(document.getElementById("b15"), "click", () => {
    console.log(useStorage().getSession("session"));
    console.log(Storage.getSession("session"));
});
useEventListener(document.getElementById("b16"), "click", () => {
    console.log(Storage.removeSession("session"));
});

useEventListener(document.getElementById("b17"), "click", () => {
    console.log(Storage.setLocal("local", { key: "local" }));
});
useEventListener(document.getElementById("b18"), "click", () => {
    console.log(Storage.getLocal("local"));
});
useEventListener(document.getElementById("b19"), "click", () => {
    console.log(Storage.removeLocal("local"));
});
