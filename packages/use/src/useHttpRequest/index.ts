import { httpCaller } from "./Request";
import { inBrowser } from "../utils";
import { FetchConfig, HttpHeader, HttpMethod, RequestContentType } from "./Types";
/*默认配置*/
const defaultFetchConfig: FetchConfig = {
    base: "",
    credentials: <RequestCredentials>"same-origin",
    headers: {
        "Content-Type": RequestContentType.json,
    },
};
/**
 * @desc 将传入的配置与默认的配置合并
 * @param config 需要合并的配置
 * */
const mergeConfig = (config: FetchConfig): FetchConfig => {
    if (!config) {
        return defaultFetchConfig;
    } else {
        const { headers } = config;
        config.headers = Object.assign(defaultFetchConfig.headers || {}, headers);
        return Object.assign(defaultFetchConfig, config);
    }
};
/**
 * @desc 将两个传入的Header合并
 * @param target 需要合并的配置
 * @param source 需要合并的源配置，覆盖target
 * */
const mergeHeader = (target: HttpHeader = {}, source: HttpHeader | undefined): HttpHeader => {
    return Object.assign(target, source);
};

/**
 * @desc 将获取请求的真是url
 * @param url 请求的url
 * @param base 默认base配置
 * @return string
 * */
const urlSplice = (url: string, base: string | undefined): string => {
    if (base && !isAbsolutePath(url)) {
        return url ? base.replace(/\/+$/, "") + "/" + url.replace(/^\/+/, "") : base;
    }
    return url;
};
/**
 * @desc 检出url是否为绝对路径
 * @param url 请求的url
 * @return boolean
 * */
const isAbsolutePath = (url: string): boolean => {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
abstract class IHttpRequest {
    public abstract getConfig(): FetchConfig;
    public abstract get<T>(url: string, data: object, header?: HttpHeader): Promise<T>;
    public abstract post<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
    public abstract delete<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
    public abstract put<T>(url: string, data: object, headers?: HttpHeader): Promise<T>;
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
    public invoke<T>(method: string, url: string, data: object, headers?: HttpHeader): Promise<T> {
        return this.#request(method, urlSplice(url, this.#config.base), data, {
            ...this.#config,
            headers: mergeHeader({ ...this.#config.headers }, headers),
        });
    }
    public get<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.GET, url, data, headers);
    }
    public post<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.POST, url, data, headers);
    }
    public delete<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.DELETE, url, data, headers);
    }
    public put<T>(url: string, data: object = {}, headers?: HttpHeader): Promise<T> {
        return this.invoke(HttpMethod.PUT, url, data, headers);
    }
    public getConfig(): FetchConfig {
        return this.#config;
    }
}
export function useHttpRequest(options: FetchConfig): IHttpRequest {
    return new HttpRequest(options);
}
