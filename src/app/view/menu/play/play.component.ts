import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';
import { Store } from '@ngrx/store';
import { User } from '../../../store/user/user.model';
import { Login, Logout } from '../../../store/user/user.actions';
import { AppState, stateType } from '../../../store/app-state';
import { Observable } from 'rxjs';
import { AppStoreService } from '../../../store/app-store.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html'
})
export class PlayComponent extends MenuContentBase {
    title = 'main';
    count: number = 0;
    userState: Observable<any>;

    constructor(
        private store: Store<AppState>,
        private storeService: AppStoreService
    ) {
        super();
    }

    preInit() {
        super.preInit();
        this.userState = this.storeService.rxSelect(stateType.user);
        this.subscribe();
    }

    subscribe() {
        this.subscription = this.userState.subscribe(d => {
            console.log(d);
        });
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
            email: 'xx',
            token: 'xx',
        };
        const action = new Login(item);
        this.store.dispatch(action);
    }

    test() {
        const s = this.storeService.select(stateType.user);
        console.log(s)
    }

}
