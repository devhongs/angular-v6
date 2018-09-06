import { NgModule } from '@angular/core';
import { AuthGuardService } from './services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { RouterService } from './services/router.service';
import { MenuDeactivateGuardService } from './services/menu-deactivate-guard.service';
import { AuthService } from './services/auth.service';
import { routeConfig } from './router/router.config';

@NgModule({
    imports: [
        RouterModule.forRoot(routeConfig)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        RouterService,
        AuthGuardService,
        MenuDeactivateGuardService,
        AuthService
    ]
})
export class PortalModule {}

