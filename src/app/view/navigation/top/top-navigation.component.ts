import { Component } from '@angular/core';
import { NavigationBase } from '../common/navigation-base';
import { Logout } from '../../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { AppState, AppStateType } from '../../../store/app-state';
import { User } from '../../../portal/models/user.model';
import { AppStoreService } from '../../../store/app-store.service';

@Component({
    selector: 'top-navigation',
    templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent extends NavigationBase {

    user: User;

    constructor(
        private store: Store<AppState>,
        private appStoreService: AppStoreService
    ) {
        super();
    }

    preInit() {
        const auth = this.appStoreService.select(AppStateType.auth);
        this.user = auth.user;
        console.log(this.user);
    }

    signOut() {
        const action = new Logout();
        this.store.dispatch(action);
    }
}
