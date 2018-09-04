import { Component } from '@angular/core';
import { User } from '../../store/user/user.model';
import { Login } from '../../store/user/user.actions';
import { BaseComponent } from '../../../sdk/core/base/base.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app-state';
import { AppRouterService } from '../../portal/router/app-router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends BaseComponent {

    constructor(
        private store: Store<AppState>,
        private appRouter: AppRouterService
    ) {
        super();
    }

    login() {
        const item: User = {
            id: 'red',
            password: 'q12345',
            email: 'red@google.com',
            token: '00000',
        };
        const action = new Login(item);
        this.store.dispatch(action);

        // TODO :: login
        localStorage.setItem('token', 'xxx');
        this.appRouter.goMain();
    }
}
