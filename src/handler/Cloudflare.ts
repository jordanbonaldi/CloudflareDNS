import {get, post, put, del } from 'request-promise';
import Config from '../entities/Config';
import EntityHandler from "./EntityHandler";

export default new class Cloudflare {

    private readonly endPoint: string = 'https://api.cloudflare.com/client/v4/';

    private config !: Config;

    /**
     *
     * @param config
     */
    load(config: Config) {
        EntityHandler.addModel<Config>(config, 'config');
        this.config = config;
    }

    promiseRequest<T>(url: string, method: Function, options: {} = {}): Promise<T> {
        return new Promise((resolve, reject) => method({
            uri: this.endPoint + url,
            headers: {
                'content-type': 'application/json',
                'X-Auth-Email': this.config.email,
                'X-Auth-Key': this.config.cloudflareToken
            },
            json: true,
            ...options
        }, (err: any, res: any) => {
            if (err) reject(err);
            else resolve(res.body.result)
        }));
    }

    /**
     *
     * @param url
     * @param method
     */
    cloudSimpleRequest<T>(url: string, method: Function): Promise<T & T[]> {
        return this.promiseRequest(url, method);
    }

    /**
     *
     * @param url
     */
    cloudRequest<T>(url: string): Promise<T & T []> {
        return this.cloudSimpleRequest(url, get);
    }

    /**
     *
     * @param url
     */
    cloudDelete<T>(url: string): Promise<T & T []> {
        return this.cloudSimpleRequest(url, del);
    }

    /**
     *
     * @param url
     * @param data
     * @param method
     */
    cloudBodyRequest<T, U>(url: string, data: U, method: Function): Promise<T & T[]> {
        console.log(JSON.stringify(data));
        return this.promiseRequest(url, method, {
            body: data
        });
    }

    /**
     *
     * @param url
     * @param data
     */
    cloudPost<T, U>(url: string, data: U): Promise<T & T[]> {
        return this.cloudBodyRequest(url, data, post);
    }

    /**
     *
     * @param url
     * @param data
     */
    cloudPut<T, U>(url: string, data: U): Promise<T & T[]> {
        return this.cloudBodyRequest(url, data, put);
    }
}
