import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { RouterService } from './router.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private routerService: RouterService,
        private authService: AuthService,
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // console.log('AuthGuardService :: canActivate');
        return this.checkPermission();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // console.log('AuthGuardService :: canActivateChild');
        return this.canActivate(route, state);
    }

    checkPermission(): boolean {
        // TODO :: check jwt token
        const user = this.authService.getUserInfo();
        if (user === null || user === undefined) {
            this.routerService.goLogin();
            return false;
        }
        return true;
    }
}