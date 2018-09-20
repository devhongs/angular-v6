import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUserState, AppStateType, selectAuthState } from './app-state';
import { Observable } from 'rxjs';
import { MemoizedSelector } from '@ngrx/store/src/selector';
import { User } from '../models/user.model';
import { LoginAction, LogoutAction } from './auth/auth.actions';

@Injectable()
export class AppStoreService {

    constructor(private store: Store<AppState>) {}

    getState(): any {
        let state: AppState;
        this.store.pipe(take(1)).subscribe(s => state = s);
        return state;
    }

    rxSelect(name: string): Observable<any> {
        const selector = this.getSelector(name);
        return this.store.select(selector);
    }

    select(name: string): any {
        return this.getState()[name];
    }

    getSelector(name: string): MemoizedSelector<object, any> {
        switch (name) {
            case AppStateType.auth: return selectAuthState;
            case AppStateType.user: return selectUserState;
            default: return selectUserState;
        }
    }

    /**
     *
     * Auth
     *
     */
    login(user: User) {
        this.store.dispatch(new LoginAction(user));
    }

    logout() {
        this.store.dispatch(new LogoutAction());
    }

    /**
     *
     * selector
     *
     */
    // selectAuth(name: string): Observable<any> {
    //     return this.store.select(selectAuthState);
    // }
    //
    // selectAuth(name: string): Observable<any> {
    //     return this.store.select(selectAuthState);
    // }
}
