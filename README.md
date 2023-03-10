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
npm/pnpm i @zhengxy/use;
```

Using `yarn`
```bash
yarn add @zhengxy/use;
```

## Quickstart

Using ESM
```js
// import all Api
import * as Tools from '@zhengxy/use';
// import some Api
import { useHttpRequest,useClickOutSide } from '@zhengxy/use';
```

Using CommonJs

```js
const Tools = require('@zhengxy/use');
Tools.useHttpRequest()
```

Using iife
```html
<script src="pathto/dist/index.browser.js"></script>
<script>
    console.log(Tools);
    Tools.useHttpRequest()
</script>
```

## Browser Support

Support all modern browsers

## Usage(example by ESM)

#### useEventListener
```typescript
//useEventListener添加元素监听事件，当元素被移除时候自动移除监听
//定义
export declare const useEventListener: (el: Node, event: string, callback: Function, options?: AddEventListenerOptions | boolean) => void;

import { useEventListener } from "@zhengxy/use";
useEventListener(HTMLElement,'click',()=>{
    console.log('监听一次')
},{once:true})
useEventListener(HTMLElement,'click',(e)=>{
    console.log('绑定事件')
})
```

#### useClickOutside
```typescript
//点击元素外部监听事件，当监听元素被移除，监听事件自动移除
//定义
export declare function useClickOutSide(target: Element | null | undefined, listener: EventListener, options?: UseClickOutSideOptions): void;

import { useClickOutside } from "@zhengxy/use";
useClickOutSide(HTMLElement,(event)=>{
    // console.log(event)
    console.log('useClickOutside按钮::点击外部回调')
})
```

#### useHttpRequest
```typescript
//简单封装Fetch 和 XMLHttpRequest 请求,如果不支持Fetch api 使用XMLHttpRequest
//提供默认支持Get，Post，Put，Delete，如有其他方式直接调用invoke方法
//定义
declare abstract class IHttpRequest {
    abstract getConfig(): FetchConfig;
    abstract get<T>(url: string, data: object, header?: HttpHeader): Promise<T>;
    abstract post<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
    abstract delete<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
    abstract put<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
}
export declare function useHttpRequest(options: FetchConfig): IHttpRequest;

import { useHttpRequest } from "@zhengxy/use";
// 默认配置：
//         {
//             base:'',//默认api host
//                 credentials:"include" | "omit" | "same-origin"('default'),
//             headers:HttpHeaders
//         }
// getConfig():获取默认配置
const request = useHttpRequest({
    credentials:'omit',//RequestCredentials 对象
    base:'https://www.17nft.com/',
})
request.get(url: string, data: object, headers?: HttpHeader): Promise
request.post(url: string, data: object, headers?: HttpHeader): Promise
request.put(url: string, data: object, headers?: HttpHeader): Promise
request.delete(url: string, data: object, headers?: HttpHeader): Promise
```

#### usePageVisibility
```typescript
//基于document.visibilityState，当前网页是否显示在前台,如果进入页面就需要显示状态，手动调用document.visibilityState获取
//定义
export declare function usePageVisibility(callback: (visibility: string) => void): void;

import { usePageVisibility } from "@zhengxy/use";
usePageVisibility((state)=>{
    console.log('visibilityState:',state)
})
```
#### useWindowResize
```typescript
//整合windowresize和移动端横竖屏切换orientationchange事件监听
//定义
export declare function useWindowResize(callback: (width: number, height: number, args: IArguments) => void): void;

import { useWindowResize } from "@zhengxy/use";
useWindowResize((width,height,e)=>{
    console.log(width,height,e)
})
```

#### useEventDispatch,useEventObserver
```typescript
//封装postMessage 发送和接受消息,如和iframe通信
//定义
export declare function useEventDispatch(eventName: string, data: any, options?: EventOptions): void;
export declare function useEventObserver(eventName: string, callback: (data: any, event: MessageEvent) => void, options?: EventOptions): void;
export declare type EventOptions = {
    target?:Window,
    origin?:string
}
// eventName发送的自定义事件名称，接收的eventName与发送的一致才能正常接受，data需要发送消息的对象
// 使用useEventDispatch时，target为你要发送消息的window对象，origin为接收者的origin，如果目标窗口的domain为origin才会收到此消息，默认值"*"，所有窗口都会收到消息，注：受同源策略的限制，target和origin必须在同一域名下
// 使用useEventObserver时，target为你要接收消息的window对象，origin为发送者的origin，如果发送者的origin为设置的origin才会收到此消息，默认值为空，接收所有为eventName的消息

import { useEventDispatch,useEventObserver } from "@zhengxy/use";
useEventDispatch('hello',{a:'hello,你好'},{
    target:iframe.contentWindow,
    origin:location.origin
})

// 其他iframe 或者当前页面其他地方
useEventObserver('hello',(data,e)=>{
    console.log('子窗口接收消息',data)
},{origin:location.origin})
```

#### useFullScreen
```typescript
//封装全屏，退出全屏方法,监听全屏
//定义
export declare function useFullScreen(target: Node): any;
export declare function useExitFullScreen(): any;
export declare function useFullScreenChange(callback: (isFullScreen: boolean, arg: IArguments) => void): void;

import { useFullScreen,useExitFullScreen,useFullScreenChange } from "@zhengxy/use";
useFullScreen(HTMLElement)
useExitFullScreen()
useFullScreenChange((isFullScreen,event)=>{
    console.log(isFullScreen)
})
```
#### useCopy
```typescript
//封装复制文本方法
//定义
export declare const useCopy: (text: string) => Promise<boolean>;

import { useCopy } from "@zhengxy/use";
useCopy('复制文本').then(res=>{
    console.log(res)
    alert(res ? '复制成功' : '复制失败')
})
```

#### useStorage
```typescript
//封装本地存储接口，优先使用localStorage,sessionStorage,不支持则用cookie
//使用方式：
import { useStorage } from "@zhengxy/use";
const Storage = useStorage({use:'cookie'});//use type = 'auto' | 'cookie' | 'storage'
Storage.setSession('session',{a:1})
Storage.getSession('session')
Storage.getLocal('session')
Storage.setLocal('session',{a:1})
Storage.removeLocal('session')
Storage.removeSession('session')
```


## LICENSE

Lib is [MIT](https://github.com/mikey-labs/use/blob/main/LICENSE) licensed.
