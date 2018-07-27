import { Injectable } from '@angular/core';
import { Util } from '../utils/utils';

@Injectable()
export class SessionStoreService {

    LOGIN_KEY: string = 'bistel_mip_login';
    TOKEN_KEY: string = 'bistel_mip_key';

    set(key: any, value: any) {
        Util.Storage.setItem(key, value);
    }

    get(key: any): any {
        return Util.Storage.getItem(key);
    }

    remove(key: any) {
        Util.Storage.removeItem(key);
    }

    clearAll() {
        Util.Storage.clearAll();
    }

    /**
     * Biz Call
     */
    setSignin(value: any) {
        this.set(this.LOGIN_KEY, value);
    }

    isSignined() {
        if(this.get(this.LOGIN_KEY)) {
            return true;
        } else {
            return false;
        }
    }

    getSignInfo() {
        return this.get(this.LOGIN_KEY);
    }

    clearSignin() {
        this.remove(this.LOGIN_KEY);
    }

    setToken(token: any) {
        this.set(this.TOKEN_KEY, token);
    }

    getToken() {
        return this.get(this.TOKEN_KEY);
    }

    removeToken() {
        this.remove(this.TOKEN_KEY);
    }

    getTokenString() {
        let token = this.get(this.TOKEN_KEY);
        return token ? token.token_type + ' ' + token.access_token : '';
    }
}
