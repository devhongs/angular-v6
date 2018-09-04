import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../view/menu/home/home.component';
import { H2Component } from '../../view/menu/h2/h2.component';
import { JpaComponent } from '../../view/menu/jpa/jpa.component';
import { PostgresqlComponent } from '../../view/menu/postgresql/postgresql.component';
import { NgModule } from '@angular/core';
import { FormDemoComponent } from '../../view/menu/form/form-demo.component';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';
import { PlayComponent } from '../../view/menu/play/play.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from '../../view/login/login.component';
import { MainComponent } from '../../view/main/main.component';
import { AppRouterService } from './app-router.service';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: MainComponent,
        canActivateChild: [AuthGuardService],
        children: [
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'h2',
                component: H2Component,
            },
            {
                path: 'jpa',
                component: JpaComponent
            },
            {
                path: 'postgresql',
                component: PostgresqlComponent
            },
            {
                path: 'form',
                component: FormDemoComponent
            },
            {
                path: 'play',
                component: PlayComponent,
            },
            {
                path: ':any',
                redirectTo: '/home'
            },
        ]
    },
    // {
    //     path: ':any',
    //     redirectTo: '/home'
    // },
    // {
    //     path: '',
    //     redirectTo: '/home',
    //     pathMatch: 'full',
    //     canActivate: [AuthGuardService]
    // },
    // {
    //     path: 'home',
    //     component: HomeComponent,
    // },
    // {
    //     path: 'h2',
    //     component: H2Component,
    // },
    // {
    //     path: 'jpa',
    //     component: JpaComponent
    // },
    // {
    //     path: 'postgresql',
    //     component: PostgresqlComponent
    // },
    // {
    //     path: 'form',
    //     component: FormDemoComponent
    // },
    // {
    //     path: 'play',
    //     component: PlayComponent,
    //     // canDeactivate: [CanDeactivateGuardService]
    // },
    // {
    //     path: ':any',
    //     redirectTo: '/home'
    // },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AppRouterService,
        AuthGuardService,
        CanDeactivateGuardService
    ]
})
export class AppRoutingModule {}
