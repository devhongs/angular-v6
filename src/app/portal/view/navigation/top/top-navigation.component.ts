import { Component } from '@angular/core';
import { NavigationBase } from '../common/navigation-base';
import { User } from '../../../../common/models/user.model';
import { AppStoreService } from '../../../../common/store/app-store.service';
import { AuthService } from '../../../../common/services/auth.service';

@Component({
    selector: 'top-navigation',
    templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent extends NavigationBase {

    user: User;

    constructor(
        private storeService: AppStoreService,
        private authService: AuthService,
    ) {
        super();
    }

    preInit() {
        this.user = this.authService.getUserInfo();
    }

    signOut() {
        this.storeService.logout();
    }
}
