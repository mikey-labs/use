import { useIntersectionObserver } from "../../dist/index.esm.mjs";

const img = document.getElementById("i3");
const { isSupported, stop, observer } = useIntersectionObserver(
    img,
    ([{ isIntersecting }]) => {
        console.log("是否与options root参数视口相交：", isIntersecting);
        if (isIntersecting) {
            setTimeout(() => {
                //模拟加载延时时间
                img.src = img.dataset.src;
                stop();
            }, 2000);
        }
    },
    {
        //参考IntersectionObserverInit对象
        root: document,
        threshold: 1,
    }
);
