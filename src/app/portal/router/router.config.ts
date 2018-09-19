import { Routes } from '@angular/router';
import { HomeComponent } from '../../view/menu/home/home.component';
import { H2Component } from '../../view/menu/h2/h2.component';
import { JpaComponent } from '../../view/menu/jpa/jpa.component';
import { PostgresqlComponent } from '../../view/menu/postgresql/postgresql.component';
import { FormDemoComponent } from '../../view/menu/form/form-demo.component';
import { PlayComponent } from '../../view/menu/play/play.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginComponent } from '../../view/login/login.component';
import { MainComponent } from '../../view/main/main.component';

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
                path: 'form',
                component: FormDemoComponent
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