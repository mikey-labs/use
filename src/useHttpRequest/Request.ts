import { HttpMethod, IRequest, RequestContentType, XMLHttpRequestInit } from "./Types";
import { isSupportFetch, object2Url } from "../utils";

export const createHttpRequest = (): XMLHttpRequest => {
    return new XMLHttpRequest();
};
async function fetchCaller(url: string, options: RequestInit): Promise<any>;
function fetchCaller(url: string, options: RequestInit): Promise<any> {
    return fetch(url, options).then(async (response) => {
        if (response.status === 200) {
            const contentType = response.headers.get("content-type") ?? "";
            if (contentType.includes(RequestContentType.json)) return response.json();
            if (contentType.includes(RequestContentType.text) || contentType.includes(RequestContentType.html))
                return response.text();
            return response.blob();
        } else {
            throw Error(await response.text());
        }
    });
}
function xmlHttpCaller<T>(url: string, options: XMLHttpRequestInit): Promise<T>;
function xmlHttpCaller<T>(url: string, options: XMLHttpRequestInit): Promise<T> {
    const { method, body, headers, credentials, responseType } = options;
    return new Promise((resolve, reject) => {
        const request = createHttpRequest();
        request.open(method, url);
        for (let key in headers) {
            request.setRequestHeader(key, headers[key]);
        }
        request.withCredentials =
            credentials === <RequestCredentials>"same-origin" || credentials === <RequestCredentials>"include";
        request.send(body);
        request.responseType = responseType ?? "";
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    switch (request.responseType) {
                        case "":
                        case "text":
                            try {
                                const json = JSON.parse(request.responseText);
                                resolve(json);
                            } catch (e) {
                                resolve(request.responseText as any);
                            }
                            break;
                        case "document":
                            resolve(request.responseXML as any);
                            break;
                        default:
                            resolve(request.response);
                            break;
                    }
                } else {
                    reject(request.response);
                }
            }
        };
    });
}
const getAjaxInstance = (): Function => {
    return isSupportFetch ? fetchCaller : xmlHttpCaller;
};
const serializeBody = (body: any): BodyInit => {
    if (Object.prototype.toString.call(body) === "[object Object]") {
        return JSON.stringify(body);
    } else {
        return body;
    }
};
export const httpCaller: IRequest = function (method, url, params = {}, config = {}) {
    const { credentials, headers, responseType } = config;
    const upperCaseMethod = method.toUpperCase();
    switch (upperCaseMethod) {
        case HttpMethod.GET:
            const querystring: string = object2Url(params);
            if (querystring) {
                url += (url.includes("?") ? "&" : "?") + querystring;
            }
            return getAjaxInstance()(url, {
                method,
                credentials,
                responseType,
                headers,
            });
        default:
            return getAjaxInstance()(url, {
                method,
                credentials,
                responseType,
                body: serializeBody(params),
                headers,
            });
    }
};
