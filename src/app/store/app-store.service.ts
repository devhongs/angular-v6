import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState, selectUserState, stateType } from './app-state';
import { Observable } from 'rxjs';
import { MemoizedSelector } from '@ngrx/store/src/selector';

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
            case stateType.user: return selectUserState;
            default: return selectUserState;
        }
    }
}
