import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {MenuContentBase} from '../../view/menu/common/menu-content-base';

@Injectable()
export class MenuDeactivateGuardService implements CanDeactivate<MenuContentBase> {
    canDeactivate(
        component: MenuContentBase,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        // Get the Crisis Center ID
        console.log(route.paramMap.get('id'));
        // Get the current URL
        console.log(state.url);
        return component.canDeactivate();
    }
}