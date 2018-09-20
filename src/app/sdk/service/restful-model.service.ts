import { Injectable } from '@angular/core';
import { Headers, Http, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Util } from '../utils/utils';
import { RestfulOptions, RestfulParamsOptions } from '../../../type';
import { InjectorUtil } from '../utils/injector.util';
import { SessionStoreService } from './session-store.service';

export interface IApiStubConfig {
    isStubs(): boolean;
    getApi(uriPath: string): string;
}

@Injectable()
export class RestfulModelService { 

    private _apiAddress: string;
    private sessionStore: SessionStoreService;
    private _apiStubsConfig: IApiStubConfig;

    set apiStubsConfig(value: IApiStubConfig) {
        this._apiStubsConfig = value;
    }

    get apiStubsConfig() {
        return this._apiStubsConfig;
    }

    constructor(
        private http: Http
    ) {
        this._apiAddress = Util.Restful.getAPIAddress();
        this.sessionStore = InjectorUtil.getService(SessionStoreService);
    }

    GET(option: RestfulOptions) {
        const opt = this._createOptions(option.params, {}, RequestMethod.Get);
        return this.http.get(this._createUrl(option), opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }

    POST(option: RestfulParamsOptions) {
        const opt = this._createOptions(option.params, option.header, RequestMethod.Post);
        return this.http.post(this._createUrl(option), opt.body, opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError),
        );
    }

    PUT(option: RestfulParamsOptions) {
        const opt = this._createOptions(option.params, option.header, RequestMethod.Put);
        return this.http.put(this._createUrl(option), opt.body, opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError),
        );
    }

    DELETE(option: RestfulOptions) {
        const opt = this._createOptions(option.params, {}, RequestMethod.Delete);
        return this.http.delete(this._createUrl(option), opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError),
        );
    }

    rxGET(option: RestfulOptions) {
        const opt = this._createOptions(option.params, {}, RequestMethod.Get);
        return this.http.get(this._createUrl(option), opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }

    rxPOST(option: RestfulParamsOptions) {
        const opt = this._createOptions(option.params, option.header, RequestMethod.Post);
        return this.http.post(this._createUrl(option), opt.body, opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }

    rxPUT(option: RestfulParamsOptions) {
        const opt = this._createOptions(option.params, option.header, RequestMethod.Put);
        return this.http.put(this._createUrl(option), opt.body, opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }


    rxDELETE(option: RestfulOptions) {
        const opt = this._createOptions(option.params, {}, RequestMethod.Delete);
        return this.http.delete(this._createUrl(option), opt.options).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }


    /******************** */
    /* New Authority code */
    /******************** */
    rxPOSTLogin(url: string, body: any, header: any) {
        return this.http.post(url, body, { headers: header }).pipe(
            map((response: any) => this._toJson(response)),
            catchError(this._handleError)
        );
    }

    /**
     * Create Url
     */
    private _createUrl(option: RestfulOptions | RestfulParamsOptions): string {
        let url: string = '';
        url += this._apiAddress;
        url += option.uriPath;
        url += option.querystring ? Util.Restful.jsonToQueryString(option.querystring) : '';
        return url;
    }

    private _createUrlForStubs(option: RestfulOptions | RestfulParamsOptions): string {
        let url: string = '';
        if (this.apiStubsConfig.isStubs()) {
            // get stubs file
            url += this.apiStubsConfig.getApi(option.uriPath);
        } else {
            url += this._apiAddress;
            url += option.isRemoveServicePath ? '' : 'service/';
            url += option.uriPath;
            url += option.querystring ? Util.Restful.jsonToQueryString(option.querystring) : '';
        }
        return url;
    }

    /**
     * Set Auth Token
     */
    private _createOptions(params: any, header: any, method: RequestMethod) {
        let accessToken: string = '';
        if (this.sessionStore.getToken()) {
            accessToken = this.sessionStore.getToken().access_token;
        }

        // 'Accept-Encoding': 'deflate',
        // Accept-Encoding: gzip
        // Accept-Encoding: compress
        // Accept-Encoding: deflate
        // Accept-Encoding: br
        // Accept-Encoding: identity
        // Accept-Encoding: *

        const headers: any = new Headers(
            Object.assign(
                {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer ' + accessToken
                },
                header
            )
        );

        if (method === RequestMethod.Get) {
            if (params) {
                return {
                    body: '',
                    options: new RequestOptions({
                        body: '',
                        search: params,
                        method,
                        headers
                    })
                };
            } else {
                return {
                    body: '',
                    options: new RequestOptions({
                        body: '',
                        method,
                        headers
                    })
                };
            }
        } else if (method === RequestMethod.Delete) {
            let body = '';
            if (typeof (params) === 'object') {
                body = JSON.stringify(params);
            } else if (params !== undefined) {
                body = params;
            }
            return {
                body: '',
                options: new RequestOptions({
                    body: body,
                    method,
                    headers
                })
            };
        } else {
            return {
                body: JSON.stringify(params),
                options: new RequestOptions({
                    method,
                    headers
                })
            };
        }
    }

    /**
     * toJson for response data
     */
    private _toJson(response: any): any {
        if (response && response._body && response._body.length > 0) {
            return response.json();
        }
        return {};
    }

    /**
     * error
     */
    private _handleError(error: any) {
        const errMsg: any = {
            url: error.url,
            status: error.status,
            statusText: error.statusText,
            message: error._body
        };
        // console.error('>> AJAX error', errMsg);
        return Observable.throw(errMsg);
    }
}
