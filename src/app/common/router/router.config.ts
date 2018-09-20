import { Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginComponent } from '../../portal/view/login/login.component';
import { MainComponent } from '../../portal/view/main/main.component';
import { HomeComponent } from '../../portal/view/menu/home/home.component';
import { H2Component } from '../../portal/view/menu/h2/h2.component';
import { JpaComponent } from '../../portal/view/menu/jpa/jpa.component';
import { PostgresqlComponent } from '../../portal/view/menu/postgresql/postgresql.component';
import { PlayComponent } from '../../portal/view/menu/play/play.component';

export const routeConfig: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuardService],
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
                path: 'play',
                component: PlayComponent,
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: ':any',
                redirectTo: '/home'
            },
        ]
    },
];