import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookiesService {
    constructor(
        private cookieService: CookieService
    ) {}

    check(name: string): boolean {
        return this.cookieService.check(name);
    }

    set(name: string, value: string, expires?: number | Date, path?: string, domain?: string, secure?: boolean) {
        this.cookieService.set(name, value, expires, path, domain, secure);
    }

    get(name: string): string {
        return this.cookieService.get(name);
    }

    getAll(): any {
        return this.cookieService.getAll();
    }

    delete(name: string, path?: string, domain?: string) {
        this.cookieService.delete(name, path, domain);
    }

    deleteAll(path?: string, domain?: string) {
        this.cookieService.deleteAll(path, domain);
    }
}
