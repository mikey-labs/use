<h1 align="center">
    JavaScript Composition API
</h1>

## Features

- 🚀 1KB Component average size
- 🚀 Native script
- 🚀 Zero third-party dependencies
- 💪 Written in TypeScript
- 📖 Extensive documentation and demos
- 🍭 Support all project
- 🍭 Support Tree Shaking

## Install

Using `npm` or `pnpm` to install

```bash
# install latest
npm/pnpm i @SPHTech-CQ/toolkit;
```

Using `yarn`

```bash
yarn add @SPHTech-CQ/toolkit;
```

## Quickstart

Using ESM

```js
// import all Api
import * as Tools from '@SPHTech-CQ/toolkit';
// import some Api
import { useHttpRequest, useClickOutSide } from '@SPHTech-CQ/toolkit';
```

Using CommonJs

```js
const Tools = require('@SPHTech-CQ/toolkit');
Tools.useHttpRequest();
```

Using iife

```html
<script src="pathto/dist/index.browser.js"></script>
<script>
  console.log(Tools);
  Tools.useHttpRequest();
</script>
```

## Usage(example by ESM)

#### useEventListener

useEventListener 添加元素监听事件，当元素被移除时候自动移除监听

```typescript
//定义
export declare const useEventListener: (
  el: Node | Window,
  event: string,
  callback: Function,
  options?: AddEventListenerOptions | boolean
) => { stop: Function };

import { useEventListener } from '@SPHTech-CQ/toolkit';
useEventListener(
  HTMLElement,
  'click',
  () => {
    console.log('监听一次');
  },
  { once: true }
);
const { stop } = useEventListener(HTMLElement, 'click', (e) => {
  console.log('绑定事件');
  stop();
});
```

#### useClickOutside

点击元素外部监听事件，当监听元素被移除，监听事件自动移除

```typescript
//定义
export interface UseClickOutSideOptions {
  eventName?: string;
  //可配置是否冒泡捕获等参数
  listenerOption?: AddEventListenerOptions | boolean;
}
export declare function useClickOutSide(
  target: Element | null | undefined,
  listener: EventListener,
  options?: UseClickOutSideOptions
): void;

import { useClickOutside } from '@SPHTech-CQ/toolkit';
useClickOutSide(
  HTMLElement,
  (event) => {
    // console.log(event)
    console.log('useClickOutside按钮::点击外部回调');
  },
  true
);
```

#### useHttpRequest

简单封装 Fetch 和 XMLHttpRequest 请求,如果不支持 Fetch api 使用 XMLHttpRequest
提供默认支持 Get，Post，Put，Delete，如有其他方式直接调用 invoke 方法

```typescript
//定义
declare abstract class IHttpRequest {
    abstract getConfig(): FetchConfig;
    abstract get<T>(url: string, data: object, options?: FetchConfig): Promise<T>;
    abstract post<T>(url: string, data: object, options?: FetchConfig): Promise<T>;
    abstract delete<T>(url: string, data: object, options?: FetchConfig): Promise<T>;
    abstract put<T>(url: string, data: object, options?: FetchConfig): Promise<T>;
}
export declare function useHttpRequest(options: FetchConfig): IHttpRequest;

import { useHttpRequest } from "@SPHTech-CQ/toolkit";
FetchConfig = {
    base:'',//默认api host
    credentials:"include" | "omit" | "same-origin", // 'default',
    responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text", //指定返回类型，仅当使用xmlhttprequest请求方式的时候使用,fetch方式无需指定，也就是说如果您在做图片，文件等资源请求的时候请指定为“blob” 或者 “arraybuffer”
    headers:HttpHeaders
}
// getConfig():获取默认配置
const request = useHttpRequest({
    credentials:'omit',//RequestCredentials 对象
    base:'https://www.17nft.com/',
})
request.get(url: string, data: object, config?: FetchConfig): Promise
request.post(url: string, data: object, config?: FetchConfig): Promise
request.put(url: string, data: object, config?: FetchConfig): Promise
request.delete(url: string, data: object, config?: FetchConfig): Promise
```

#### usePageVisibility

基于 document.visibilityState，当前网页是否显示在前台,如果进入页面就需要显示状态，手动调用 document.visibilityState 获取

```typescript
//定义
export declare function usePageVisibility(callback: (visibility: string) => void): { stop: () => void };

import { usePageVisibility } from '@SPHTech-CQ/toolkit';
const { stop } = usePageVisibility((state) => {
  console.log('visibilityState:', state);
  //stop()停止监听
});
```

#### useWindowResize

整合 windowresize 和移动端横竖屏切换 orientationchange 事件监听

```typescript
//定义
export declare function useWindowResize(callback: (width: number, height: number, args: IArguments) => void): {
  stop: () => void;
};
import { useWindowResize } from '@SPHTech-CQ/toolkit';
const { stop } = useWindowResize((width, height, e) => {
  console.log(width, height, e);
  //stop()停止监听
});
```

#### useEventDispatch,useEventObserver

封装 postMessage 发送和接受消息,如和 iframe 通信

```typescript
//定义
export declare function useEventDispatch(eventName: string, data: any, options?: EventOptions): void;
export declare function useEventObserver(
  eventName: string,
  callback: (data: any, event: MessageEvent) => void,
  options?: EventOptions
): { stop: () => void };
export declare type EventOptions = {
  target?: Window;
  origin?: string;
};
// eventName发送的自定义事件名称，接收的eventName与发送的一致才能正常接受，data需要发送消息的对象
// 使用useEventDispatch时，target为你要发送消息的window对象，origin为接收者的origin，如果目标窗口的domain为origin才会收到此消息，默认值"*"，所有窗口都会收到消息，注：受同源策略的限制，target和origin必须在同一域名下
// 使用useEventObserver时，target为你要接收消息的window对象，origin为发送者的origin，如果发送者的origin为设置的origin才会收到此消息，默认值为空，接收所有为eventName的消息，返回stop方法用于停止监听

import { useEventDispatch, useEventObserver } from '@SPHTech-CQ/toolkit';
useEventDispatch(
  'hello',
  { a: 'hello,你好' },
  {
    target: iframe.contentWindow,
    origin: location.origin
  }
);

// 其他iframe 或者当前页面其他地方 stop方法停止监听
const { stop } = useEventObserver(
  'hello',
  (data, e) => {
    console.log('子窗口接收消息', data);
  },
  { origin: location.origin }
);
```

#### useFullScreen

封装全屏，退出全屏方法,监听全屏

```typescript
//定义
export declare function useFullScreen(target: Node): any;
export declare function useExitFullScreen(): any;
export declare function useFullScreenChange(callback: (isFullScreen: boolean, arg: IArguments) => void): {
  stop: () => void;
};

import { useFullScreen, useExitFullScreen, useFullScreenChange } from '@SPHTech-CQ/toolkit';
useFullScreen(HTMLElement);
useExitFullScreen();
const { stop } = useFullScreenChange((isFullScreen, event) => {
  console.log(isFullScreen);
  //停止监听
  //stop()
});
```

#### useCopy

封装复制文本方法

```typescript
//定义
export declare const useCopy: (text: string) => Promise<boolean>;

import { useCopy } from '@SPHTech-CQ/toolkit';
useCopy('复制文本').then((res) => {
  console.log(res);
  alert(res ? '复制成功' : '复制失败');
});
```

#### useStorage

封装本地存储接口，优先使用 localStorage,sessionStorage,不支持则用 cookie

```typescript
//使用方式：
import { useStorage } from '@SPHTech-CQ/toolkit';
const Storage = useStorage({ use: 'cookie' }); //use type = 'auto' | 'cookie' | 'storage'
Storage.setSession('session', { a: 1 });
Storage.getSession('session');
Storage.getLocal('session');
Storage.setLocal('session', { a: 1 });
Storage.removeLocal('session');
Storage.removeSession('session');
```

#### useDownload

封装下载方法，支持传 url 和 Blob

```typescript
//定义

export declare function useDownload(target: string | Blob, fileName: string): Promise<boolean>;

import { useDownload } from '@SPHTech-CQ/toolkit';
//保存普通链接
useDownload('https://www.baidu.com/img/flexible/logo/pc/result.png', 'blob.txt').then((res) => {
  console.log(res);
});
//canvas
canvas.toBlob((blob) => {
  useDownload(blob, 'canvas.png').then((res) => {
    console.log(res);
  });
});
//结合异步,注意跨域问题
useHttpRequest()
  .get('https://www.baidu.com/img/flexible/logo/pc/result.png', null, { responseType: 'blob' })
  .then((blob) => {
    console.log(blob);
    useDownload(blob, '异步blob.png').then((res) => {
      console.log(res);
    });
  });

//保存Blob
const blob = new Blob(['hello world,中文'], { type: 'text/plain;charset=utf-8' });
useDownload(blob, 'blob.txt').then((res) => {
  console.log(res);
});
```

#### useKeyboard

监听键盘事件，支持组合键，如 ctrl+c,指定 ctrl 为 true，注意：特殊符号比如“?”需要开启 shift，因为打出"?"需要按 shift 按键

```typescript
//
//定义
export type PressTypes = 'keydown' | 'keyup';
export type KeyboardOptions = {
  key: string; // 监听的字符，如ESC，Tab这些按键，值与KeyboardEvent返回的key值一致
  type?: PressTypes; // 'keydown' | 'keyup' 监听按下还是抬起
  caseSensitive?: boolean; //支持大小写敏感？默认不支持，大小写都能监听
  once?: boolean; // 监听一次
  ctrl?: boolean; // 监听 组合键 ctrl
  shift?: boolean; // 监听 组合键 shift
  alt?: boolean; // 监听 组合键 alt
  meta?: boolean; // 监听 组合键 meta
};
export declare function useKeyboard(
  optionsOrKey: string | KeyboardOptions,
  callback: (e: KeyboardEvent) => void
): { stop: () => void };

//使用方式：
import { useKeyboard } from '@SPHTech-CQ/toolkit';
const { stop } = useKeyboard('q', (event) => {
  console.log(event);
  // stop() 停止监听
});
const { stop: sp } = useKeyboard({ key: 'c', ctrl: true }, (event) => {
  console.log(event);
});
```

#### Util

封装一些常用工具

```typescript
//定义
//是否是浏览器环境
/**判断当前环境是否为浏览器环境*/
export declare const inBrowser: boolean;
/**判断当前环境是否支持Fetch API*/
export declare const isSupportFetch: boolean;
/**判断当前环境是否支持FileReader API*/
export declare const isSupportFileReader: boolean;
/**判断当前环境是否支持是Safari*/
export declare const isSafari: boolean;
/**判断当前环境是否支持小于IE10*/
export declare const isIElt10: boolean;
/**判断当前环境是否支持Storage API*/
export declare const isSupportStorage: boolean;
/**判断当前环境是否是移动端*/
export declare const isMobile: boolean;
/**判断当前环境是否支持 IntersectionObserver*/
export declare const isSupportInterSectionObserver: boolean;
/**
 * @desc 将对象转换成url字符串，&连接起来
 * @param obj 需要转换的对象
 * */
export declare const object2Url: (obj: object) => string;
/**
 * @desc 时间转换
 * @param timestamp 时间戳
 * @param format 格式化参数
 * @return {string}
 */
export declare const formatDate: (timestamp: string | number, format?: string) => string;
/**
 * @desc判断参数是否为数字
 * @param val
 */
export declare const isNumeric: (val: string | number) => boolean;
/**
 * 是否是暗黑模式
 */
export declare const isDarkMode: () => boolean;
```

#### useTouch

封装手势方向控制

```typescript
//使用方式：
const touch = useTouch();
const d3 = document.getElementById('d3');
useEventListener(d3, 'touchstart', (e) => {
  touch.touchStart(e);
});
useEventListener(d3, 'touchmove', (e) => {
  touch.touchMove(e);
  const res = touch.getTouchResult();
  d3.style.left = res.deltaX + 'px';
  d3.style.top = res.deltaY + 'px';
  console.log(res);
  touch.preventDefault(e);
});
useEventListener(d3, 'touchend', (e) => {
  touch.touchEnd(e);
  console.log(touch.getTouchResult());
});
```

#### useIntersectionObserver

监听元素是否进入可视区域，用于实现懒加载，无线滚动，上拉加载更多 等场景

```typescript
//定义
export declare function useIntersectionObserver(
  el: Element,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit
):
  | {
      isSupported: boolean;
      stop: () => void;
    }
  | undefined;

//使用方式：
//例子：图片懒加载
const { isSupported, stop } = useIntersectionObserver(
  HTMLImageElement,
  ([{ isIntersecting }]) => {
    console.log('是否与options root参数视口相交：', isIntersecting);
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
    threshold: 1
  }
);
```

## Browser Support

Support all modern browsers

## LICENSE

Lib is [MIT](https://github.com/mikey-labs/use/blob/main/LICENSE) licensed.

