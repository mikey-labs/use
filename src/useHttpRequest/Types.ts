export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    OPTIONS = "OPTIONS",
}

export enum RequestContentType {
    json = "application/json",
    html = "text/html",
    text = "text/plain",
    formData = "multipart/form-data",
    urlencoded = "application/x-www-form-urlencoded",
}
export type HttpHeader = {
    "Content-Type"?: string;
    [propName: string]: any;
};

export interface IRequest {
    <T>(method: string, url: string, params: object, config?: FetchConfig): Promise<T>;
}

export type XMLHttpRequestInit = {
    method: string;
    credentials: RequestCredentials;
    body?: string;
    responseType?: XMLHttpRequestResponseType;
    headers?: HttpHeader;
};

export type FetchConfig = {
    base?: string;
    credentials?: RequestCredentials;
    responseType?: XMLHttpRequestResponseType;
    headers?: HttpHeader;
};
