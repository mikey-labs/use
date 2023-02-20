import { request as FetchRequest } from "./FetchRequest";
import { inBrowser, isSupportFetch } from "../utils";
import { HttpHeader, HttpMethod } from "./Types";

export type FetchOptions = {
    [propName: string]: string;
};
export type FetchConfig = {
    base: string;
    config: FetchOptions;
};
interface HttpRequestInterface {
    getConfig(): FetchConfig;
    get(url: string, data: object, options?: HttpHeader): Promise<Function>;
}

class HttpRequest implements HttpRequestInterface {
    #config: FetchOptions = {};
    #base: string = "";
    get #request() {
        if (inBrowser) {
            if (isSupportFetch) {
                return FetchRequest;
            } else {
                return FetchRequest;
            }
        } else {
            throw new Error("HttpRequest only browsers are supported.");
        }
    }
    constructor(base: string, options: FetchOptions) {
        this.#base = base;
        this.#config = options;
    }

    get(url: string, data: object = {}, options?: HttpHeader): Promise<Function> {
        return this.#request(HttpMethod.GET, this.#base + url, data, options);
    }

    getConfig(): FetchConfig {
        return {
            base: this.#base,
            config: this.#config,
        };
    }
}
export const useFetch = (base: string = "", options: FetchOptions = {}): HttpRequestInterface => {
    return new HttpRequest(base, options);
};
