import { Component } from '@angular/core';
import { MenuContentBase } from '../../../../common/base/menu-content-base';
import { Store } from '@ngrx/store';
import { AppState, AppStateType } from '../../../../common/store/app-state';
import { Observable } from 'rxjs';
import { AppStoreService } from '../../../../common/store/app-store.service';

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
        this.userState = this.storeService.rxSelect(AppStateType.auth);
        this.subscribe();
    }

    subscribe() {
        this.subscription = this.userState.subscribe(d => {
            console.log(d);
        });
    }

    test() {
        const s = this.storeService.select(AppStateType.auth);
        console.log(s)
    }

}
