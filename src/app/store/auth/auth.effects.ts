import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../portal/services/auth.service';
import { AuthActionTypes, Login, LogInFailure, LogInSuccess } from './auth.actions';
import { RouterService } from '../../portal/services/router.service';
import { User } from '../../portal/models/user.model';


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
        .map((action: Login) => action.payload)
        .switchMap(payload => {
            return this.authService.logIn(payload.id, payload.password)
                .map((user: User) => {
                    return new LogInSuccess(user);
                })
                .catch((error) => {
                    return Observable.of(new LogInFailure({ error: error }));
                });
        });


    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap(action => {
            this.authService.setToken(action.payload.token);
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
