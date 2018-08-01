import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class CanActivateGuardService implements CanActivate, CanActivateChild {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('RouteGuardService :: canActivate', this.router);
        const url: string = state.url;
        return confirm('Go?');
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('RouteGuardService :: canActivateChild');
        return this.canActivate(route, state);
    }
}