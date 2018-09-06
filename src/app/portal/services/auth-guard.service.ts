import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { RouterService } from './router.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private appRouter: RouterService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('AuthGuardService :: canActivate');
        return this.checkPermission();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('AuthGuardService :: canActivateChild');
        return this.canActivate(route, state);
    }

    checkPermission(): boolean {
        // TODO :: check jwt token
        const token = localStorage.getItem('token');
        console.log(token)
        if (token === null || token === undefined || token === 'undefined') {
            this.appRouter.goLogin();
            return false;
        }
        return true;
    }
}