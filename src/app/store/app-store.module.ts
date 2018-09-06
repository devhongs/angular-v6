import { NgModule } from '@angular/core';
import { AppStoreService } from './app-store.service';
import { reducers } from './app-state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth.effects';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {}),
        EffectsModule.forRoot([
            AuthEffects
        ])
    ],
    exports: [

    ],
    providers: [
        AppStoreService
    ]
})
export class AppStoreModule {}