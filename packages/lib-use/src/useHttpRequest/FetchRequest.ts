import {object2Url} from "./util";
import {HttpMethod, RequestContentType, RequestInterface} from "./Types";

const ajax = async (url: string, options: RequestInit) => {
    return (await fetch(url, options)).json();
};

export const request: RequestInterface = function (
    method,
    url,
    params = {},
    header = {
        "Content-Type": RequestContentType.json,
    }
) {
    if(!header["Content-Type"]){
        header["Content-Type"] = RequestContentType.json
    }
    const upperCaseMethod = method.toUpperCase();
    switch (upperCaseMethod) {
        case HttpMethod.GET:
            const querystring: string = object2Url(params);
            if (querystring) {
                url += (url.includes("?") ? "&" : "?") + querystring;
            }
            return ajax(url, {
                method,
                headers: header,
            });
        default:
            return ajax(url, {
                method,
                body: JSON.stringify(params),
                headers: header,
            });
    }
};
