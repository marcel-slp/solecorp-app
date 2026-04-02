import axios, { AxiosError, type Method } from 'axios';

export class AjaxError {
    message = '';
    payload = '';
    code: number | null = null;

    constructor(error: AxiosError<string>) {
        this.message = error.toString();
        this.payload = error?.response?.data ?? '';
        if (error.code === AxiosError.ERR_CANCELED) {
            this.code = AjaxError.CANCEL_ERROR_CODE;
        } else if (error.response?.status) {
            this.code = error.response?.status;
        }
    }

    static readonly CANCEL_ERROR_CODE = 900;
}

function handleError(error: AxiosError<string>): AjaxError {
    console.error(error);
    return new AjaxError(error);
}

type RequestConfig = {
    payload?: unknown;
};

export default {
    request<T>(
        method: Method,
        url: string,
        config: RequestConfig = {},
        params?: { [key: string]: string | number },
        timeout?: number
    ) {
        const abortController = new AbortController();
        const request = axios.request<T>({
            method,
            url,
            timeout: timeout || 5000,
            data: config.payload,
            signal: abortController.signal,
            params: params,
            headers: { 'x-api-key': import.meta.env.ENV_APP_API_KEY }
        });
        return {
            // eslint-disable-next-line no-async-promise-executor
            promise: new Promise(async (resolve, reject) => {
                try {
                    const response = await request;
                    resolve(response.data);
                } catch (error) {
                    const axiosError = error as AxiosError<string>;
                    console.error(axiosError);
                    reject(handleError(error as AxiosError<string>));
                }
            }),
            cancel: () => abortController.abort()
        };
    }
};
