import { httpCaller } from "./Request";
import { inBrowser } from "../utils";
import { HttpHeader, HttpMethod, RequestContentType } from "./Types";

export type FetchConfig = {
    base?: string;
    headers?: HttpHeader;
};
const defaultFetchConfig: FetchConfig = {
    base: "",
    headers: {
        "Content-Type": RequestContentType.json,
    },
};
const mergeConfig = (config: FetchConfig): FetchConfig => {
    if (!config) {
        return defaultFetchConfig;
    } else {
        const {headers} = config;
        config.headers = Object.assign(defaultFetchConfig.headers || {},headers);
        return Object.assign(defaultFetchConfig,config)
    }
}
const mergeHeader = (target:HttpHeader = {},source:HttpHeader | undefined): HttpHeader => {
    return Object.assign( target,source);
}
const urlSplice = (url:string,base:string | undefined):string=>{
    return url.startsWith('http') ? url : base + url;
}
abstract class IHttpRequest {
    public abstract getConfig(): FetchConfig;
    public abstract get<T>(url: string, data: object, header?: HttpHeader): Promise<T>;
    public abstract post<T>(url: string, data: object, header?: HttpHeader): Promise<T>;
}

class HttpRequest implements IHttpRequest {
    readonly #config: FetchConfig;
    get #request() {
        if (inBrowser) {
            return httpCaller;
        } else {
            throw new Error("HttpRequest only browsers are supported.");
        }
    }
    constructor(config: FetchConfig) {
        this.#config = mergeConfig(config);
    }
    public invoke<T>(method:string,url: string, data: object, headers?: HttpHeader): Promise<T>{
       return this.#request(method, urlSplice(url,this.#config.base) , data, mergeHeader(this.#config.headers,headers));
    }
    public get<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.GET,url,data,headers);
    }
    public post<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.POST,url,data,headers);
    }
    public delete<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.DELETE,url,data,headers);
    }
    public put<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.PUT,url,data,headers);
    }
    public getConfig(): FetchConfig {
        return this.#config;
    }
}
export function useHttpRequest(options: FetchConfig): IHttpRequest {
    return new HttpRequest(options);
}
