import { useEventListener, useHttpRequest } from "../../dist/index.esm.mjs";

const request = useHttpRequest({
    credentials: "omit", //RequestCredentials 对象
    base: "",
});

useEventListener(document.getElementById("b4"), "click", (event) => {
    console.log(request.getConfig());
    request.get("./mock/api/list.json?q=3", { a: 3 }).then((res) => {
        console.log("返回数据：", res);
    });
});
useEventListener(document.getElementById("b41"), "click", (event) => {
    const request1 = useHttpRequest();
    console.log(request1.getConfig());
    request1.get("./abao.png", {}, { responseType: "blob" }).then((res) => {
        console.log("返回数据：", res);
        document.getElementById("i2").src = URL.createObjectURL(res);
    });
});
useEventListener(document.getElementById("b6"), "click", (event) => {
    if (document.getElementById("file").files[0]) {
        const formdata = new FormData();
        formdata.append("file", document.getElementById("file").files[0]);
        //单个请求不会改变base默认配置
        request.post("api/xxxx", formdata, { "Content-Type": "multipart/form-data" }).then((res) => {
            console.log(request.getConfig());
            console.log("返回数据：", res);
        });
    } else {
        alert("请选择文件");
    }
});
