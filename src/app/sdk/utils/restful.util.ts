export class RestfulUtil {

    static jsonToQueryString(json: any) {
        return '?' +
            Object.keys(json).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            }).join('&');
    }

    static parseQueryString(querystring: any) {
        const params: any = {};
        const d = decodeURIComponent;
        let pair: any;
        if (!querystring) { return undefined; }
        // remove any preceding url and split
        querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
        // march and parse
        for (let i = querystring.length - 1; i >= 0; i--) {
            pair = querystring[i].split('=');
            params[d(pair[0])] = d(pair[1] || '');
        }
        return params;
    }

    /**
     * API Address는 REStful API 호출을 위한 구분 주소 context
     * @see tools/env/config.json, tools/utils/template_local.ts
     */
    static getAPIAddress() { 
        if (CONFIG.PROJECT.MODE === 'DEV') {
            return CONFIG.REST.DEV.API_URL + CONFIG.REST.DEV.API_CONTEXT;
        } else if (CONFIG.PROJECT.MODE === 'PROD') {
            return CONFIG.REST.PROD.API_URL + CONFIG.REST.PROD.API_CONTEXT;
        } else {
            return '/';
        }
    }

    /**
     * App Base는 물리적인 파일이 위치한 경로
     * @see index.html의 <base href="<%= APP_BASE %>"> 설정과 같다
     */
    static getAppBase() {
        if (CONFIG.PROJECT.MODE === 'DEV') {
            return CONFIG.REST.DEV.APP_BASE;
        } else if (CONFIG.PROJECT.MODE === 'PROD') {
            return CONFIG.PROD.DEV.APP_BASE;
        } else {
            return '/';
        }
    }

    /**
     * not refresh browser and then add url
     * ex) uri is /login or /2324
     */
    static notRefreshAndAddUri(uri: string, isPushState: boolean = true) {
        const appBase = this.getAppBase().replace(/\/$/, '');
        const newUrl = `${window.location.protocol}//${window.location.host}${appBase}${uri}`;
        if (history.pushState && isPushState) {
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
        return newUrl;
    }

}
