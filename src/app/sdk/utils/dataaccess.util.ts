import { Http, RequestMethod, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

export interface RequestConfig {
    url: string;
    method?: string;
    query?: any;
    params?: any;
    header?: any;
    stubOptions?: any;
}

export class DataaccessUtil {

    static createUrl(url: string, query: any) {
        url += query ? DataaccessUtil.jsonToQueryString(query) : ''; 
        return url;
    }

    static jsonToQueryString(json: any) {
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }).join('&');
    }

    static createOptions(params: any, header: any, method: RequestMethod) {
        let headers = new Headers(
            Object.assign(
                {
                    'Content-Type': 'application/json'
                },
                header
            )
        );

        if (method === RequestMethod.Get) {
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
                body: JSON.stringify(params),
                options: new RequestOptions({
                    method,
                    headers
                })
            };
        }
    }

    static toJson(response: any) :any {
        if (response && response._body && response._body.length > 0) {
            try {
                return response.json();
            } catch(err) {
                return response._body;
            }
        }
        return {};
    }

    static handleError(error: any) :any {
        let errMsg: any = {
            success: error.success,
            errorMessage: error.errorMessage,
            username: error.username,
            stack: error.stack
        };
        console.log('> throw exception', errMsg);
        return Observable.throw(errMsg);
    }

    /**
     * for Stub API in app.config.ts
     * e.g)
     *      'playbooks.page.request.cfg': {
     *           url: '/stubs/playbooks/page-multistub.json',
     *           stublookup: ['id'],  <=== Stub Option
     *           sleep: 500           <=== Stub Option
     *       },
     */
    static jsonpathInterceptor(config: any, result: any) {
        if (!config.stubOptions) {
            return result;
        }

        if (config.stubOptions.stublookup) {
            const lookup = config.stubOptions.stublookup;
            const multistub = result;
            const up = config.params;
            let maxMatched = 0;
            let stubResult = undefined;
            for (let key in multistub) {
                if (multistub.hasOwnProperty(key) && key !== 'default') {
                    try {
                        let matched = 0;
                        let keyarray = key.split('||');
                        keyarray.forEach((value: any) => {
                            let keyStructure = JSON.parse(value);
                            for (let _i = 0, _len = lookup.length; _i < _len; _i++) {
                                let attribute = lookup[_i];
                                if (DataaccessUtil.getValueIn(up, attribute) === DataaccessUtil.getValueIn(keyStructure, attribute)) {
                                    matched++;
                                } else {
                                    break;
                                }
                            }
                            if (matched > maxMatched) {
                                maxMatched = matched;
                                stubResult = multistub[key];
                            }
                        });
                    } catch (_error) {
                        console.log(`Key is not a valid string-encoded json object ${key}; try http://www.freeformatter.com/javascript-escape.html`);
                    }
                }
            }
            if (maxMatched === 0) {
                stubResult = multistub["default"];
            }
            return stubResult;
        } else {
            return result;
        }
    }

    static getValueIn(info: any, path: any) {
        const _arrayNotationSplitter: any = /^(.*?)\[([0-9])+\]$/;
        let arr, part, parts, _ref, _ref1;
        if (!path) {
            return;
        }
        parts = path.split('.');
        while (parts.length > 1) {
            if (!info) {
                break;
            }
            part = parts.shift();
            if (arr = _arrayNotationSplitter.exec(part)) {
                info = (_ref = info[arr[1]]) != null ? _ref[arr[2]] : void 0;
            } else {
                info = info[part];
            }
        }
        if (!info) {
            return;
        }
        if (arr = _arrayNotationSplitter.exec(parts[0])) {
            return info = (_ref1 = info[arr[1]]) != null ? _ref1[arr[2]] : void 0;
        } else {
            return info = info[parts[0]];
        }
    }
}

class ErrorMessage extends Error {
    errorMessage: string;
    username: string;
    success: boolean;

    constructor(msg: any) {
        super();
        this.errorMessage = msg.errorMessage;
        this.username = msg.username;
        this.success = msg.success;
    }
}
