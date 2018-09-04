import { NgModule } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { reducers } from './app-state';
import { StoreModule } from '@ngrx/store';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {})
    ],
    exports: [

    ],
    providers: [
        AppStoreService
    ]
})
export class AppStoreModule {}