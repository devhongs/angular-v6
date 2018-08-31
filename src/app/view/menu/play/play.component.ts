import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';
import { createSelector, Store } from '@ngrx/store';
import { User } from '../../../store/user/user.model';
import { Login, Logout } from '../../../store/user/user.actions';
import { AppState, selectUserState } from '../../../store/app-state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html'
})
export class PlayComponent extends MenuContentBase {
    title = 'main';
    count: number = 0;

    constructor(
        private store: Store<AppState>
    ) {
        super();
    }

    initComponent() {
        console.log(this.store);
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
    }

    logout() {
        const action = new Logout();
        this.store.dispatch(action);
    }

    modify() {
        const item = {
            email: '',
            token: '',
        };
        const action = new Login(item);
        this.store.dispatch(action);
    }

    test() {
        const user: Observable<any> = this.store.select(selectUserState);
        console.log(user);
    }

    getState() {
        // @see https://github.com/ngrx/store/blob/master/README.md
        // return this.store.getState(); <- depericated
        // let state: AppState;
        // this.store.take(1).subscribe(s => state = s);
        // return state;
        // createSelector(this.store, fromTest.getData)
    }

}
