import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AppRouterService } from './app-router.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
    constructor(
        private appRouter: AppRouterService
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
        if (!localStorage.getItem('token')) {
            this.appRouter.goLogin();
            return false;
        }
        return true;
    }
}