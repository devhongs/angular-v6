import { Component } from '@angular/core';
import { BaseComponent } from '../../../sdk/core/base/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { Login } from '../../store/auth/auth.actions';
import { User } from '../../portal/models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent {

    constructor(
        private store: Store<AppState>
    ) {
        super();
    }

    login() {
        const item: User = {
            id: 'Red',
            password: 'q12345',
            email: 'red@google.com',
            token: '00000',
        };
        const action = new Login(item);
        this.store.dispatch(action);
    }
}
