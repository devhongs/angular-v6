import { Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { LoginComponent } from '../../portal/view/login/login.component';
import { MainComponent } from '../../portal/view/main/main.component';
import { HomeComponent } from '../../portal/view/menu/home/home.component';
import { PlayComponent } from '../../portal/view/menu/play/play.component';
import { ComponentsComponent } from '../../portal/view/menu/components/components.component';
import { FormsComponent } from '../../portal/view/menu/forms/forms.component';

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
                path: 'components',
                component: ComponentsComponent,
                data: {title: 'components title'}
            },
            {
                path: 'forms',
                component: FormsComponent
            },
            {
                path: 'play',
                component: PlayComponent,
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: ':any',
                redirectTo: 'home'
            },
        ]
    },
];