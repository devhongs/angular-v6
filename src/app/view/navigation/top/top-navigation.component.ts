import { Component } from '@angular/core';
import {NavigationBase} from '../common/navigation-base';
import { AppRouterService } from '../../../portal/router/app-router.service';

@Component({
    selector: 'top-navigation',
    templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent extends NavigationBase {

    constructor(
        private appRouter: AppRouterService
    ) {
        super();
    }

    signOut() {
        // TODO :: login
        localStorage.setItem('token', null);
        this.appRouter.goLogin();
    }
}
