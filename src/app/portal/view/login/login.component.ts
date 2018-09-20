import { Component } from '@angular/core';
import { User } from '../../../common/models/user.model';
import { AppStoreService } from '../../../common/store/app-store.service';
import { BaseComponent } from '../../../sdk/core/base/base.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent {

    constructor(
        private storeService: AppStoreService
    ) {
        super();
    }

    login() {
        const user: User = {
            id: 'Red',
            password: 'q12345',
            email: 'red@google.com',
            token: '00000',
        };
        this.storeService.login(user);
    }
}
