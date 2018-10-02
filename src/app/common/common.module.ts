import { NgModule } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { RouterService } from './services/router.service';
import { MenuDeactivateGuardService } from './services/menu-deactivate-guard.service';
import { AuthService } from './services/auth.service';
import { routeConfig } from './router/router.config';
import { AppStoreModule } from './store/app-store.module';
import { CookieService } from 'ngx-cookie-service';
import { CookiesService } from './services/cookies.service';

@NgModule({
    imports: [
        AppStoreModule,
        RouterModule.forRoot(routeConfig)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RouterService,
        AuthGuardService,
        MenuDeactivateGuardService,
        AuthService,
        CookieService,
        CookiesService
    ]
})
export class AppCommonModule {}

