export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    OPTIONS = "OPTIONS",
}
export enum RequestContentType {
    json = "application/json",
}
export type HttpHeader = {
    "Content-Type"?: string;
    [propName: string]: any;
};

export interface IRequest {
    <T>(method: string, url: string, params: object, header?: HttpHeader): Promise<T>;
}
