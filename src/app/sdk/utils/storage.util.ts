export class StorageUtil {
    static storage: any = localStorage;

    static useLocalStorage() {
        StorageUtil.storage = localStorage;
    }

    static useSessionStorage() {
        StorageUtil.storage = sessionStorage;
    }

    static setItem(key: string, value: any) {
        StorageUtil.storage.setItem('__mip__' + key, JSON.stringify(value));
    }

    static getItem(key: string) {
        const value = StorageUtil.storage.getItem('__mip__' + key);
        return value ? JSON.parse(value) : null;
    }

    static removeItem(key: string) {
        StorageUtil.storage.removeItem('__mip__' + key);
    }

    static clearAll() {
        StorageUtil.storage.clear();
    }

    static setCookie(key: string, value: string, exdays: number = 1) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = 'expires=' + d.toUTCString();
        document.cookie = key + '=' + value + ';' + expires + ';path=/';
    }

    static getCookie(key: string) {
        const name = key + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    }

    static removeCookie(key: string) {
        document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

}
