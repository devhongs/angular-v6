import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {MenuContentBase} from '../../view/menu/common/menu-content-base';

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<MenuContentBase> {

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
        // return component.canDeactivate();
        // // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        // if (!component.crisis || component.crisis.name === component.editName) {
        //     return true;
        // }
        // // Otherwise ask the user with the dialog service and return its
        // // observable which resolves to true or false when the user decides
        // return component.dialogService.confirm('Discard changes?');
    }
}