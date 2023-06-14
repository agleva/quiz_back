export interface IHttpResponse<T> {
    message: string;
    data: T;
}

export const httpResponse = <T>(message: string, data: T = undefined) => ({
    message,
    data,
})