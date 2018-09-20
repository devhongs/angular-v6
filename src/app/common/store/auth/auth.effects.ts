import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { RouterService } from '../../services/router.service';
import { User } from '../../models/user.model';
import { AuthActionTypes, LoginAction, LogInFailureAction, LogInSuccessAction } from './auth.actions';


@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private routerService: RouterService
    ) {}

    @Effect()
    LogIn: Observable<any> = this.actions
        .ofType(AuthActionTypes.LOGIN)
        .map((action: LoginAction) => action.payload)
        .switchMap(payload => {
            return this.authService.logIn(payload.id, payload.password)
                .map((user: User) => {
                    return new LogInSuccessAction(user);
                })
                .catch((error) => {
                    return Observable.of(new LogInFailureAction({ error: error }));
                });
        });


    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap(action => {
            // TODO : token 정보를 넘겨야 되는데 user 정보를 넘기고 있음
            const token = JSON.stringify(action.payload);
            this.authService.setToken(token);
            this.routerService.goMain();
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    public LogOut: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap((user) => {
            this.authService.removeToken();
            this.routerService.goLogin();
        })
    );

}
