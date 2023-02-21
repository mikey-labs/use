import { HttpHeader, HttpMethod, IRequest } from "./Types";
import {isSupportFetch, object2Url} from "../utils";
export type XMLHttpRequestInit = {
    method: string;
    body?: string;
    headers?: HttpHeader;
};
export const createHttpRequest = (): XMLHttpRequest => {
    return new XMLHttpRequest();
};
async function fetchAjax<T>(url: string, options: RequestInit): Promise<T>;
async function fetchAjax<T>(url: string, options: RequestInit): Promise<T> {
    return (await fetch(url, options)).json();
}
function xmlHttpAjax<T>(url: string, options: XMLHttpRequestInit): Promise<T>;
function xmlHttpAjax<T>(url: string, options: XMLHttpRequestInit): Promise<T> {
    const { method, body, headers } = options;
    return new Promise((resolve, reject) => {
        const request = createHttpRequest();
        request.open(method, url);
        for (let key in headers) {
            request.setRequestHeader(key, headers[key]);
        }
        request.send(body);
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const {responseText} = request
                    try {
                        resolve(JSON.parse(responseText))
                    }catch (e){
                        resolve(responseText as any)
                    }
                } else {
                    reject(request.responseText);
                }
            }
        };
    });
}
const getAjax = (): Function => {
    return isSupportFetch ? fetchAjax : xmlHttpAjax;
};

export const httpCaller: IRequest = function (method, url, params = {}, header) {
    const upperCaseMethod = method.toUpperCase();
    switch (upperCaseMethod) {
        case HttpMethod.GET:
            const querystring: string = object2Url(params);
            if (querystring) {
                url += (url.includes("?") ? "&" : "?") + querystring;
            }
            return getAjax()(url, {
                method,
                headers: header,
            });
        default:
            return getAjax()(url, {
                method,
                body: JSON.stringify(params),
                headers: header,
            });
    }
};
