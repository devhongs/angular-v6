import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {

    constructor(
        private router: Router
    ) {}

    goLogin() {
        this.router.navigateByUrl('login');
    }

    goMain() {
        this.router.navigateByUrl('home');
    }
}
