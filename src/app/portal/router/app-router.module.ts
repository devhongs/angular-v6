import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../view/menu/home/home.component';
import { H2Component } from '../../view/menu/h2/h2.component';
import { JpaComponent } from '../../view/menu/jpa/jpa.component';
import { PostgresqlComponent } from '../../view/menu/postgresql/postgresql.component';
import { NgModule } from '@angular/core';
import { FormDemoComponent } from '../../view/menu/form/form-demo.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/form',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'h2',
        component: H2Component
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
        path: ':any',
        redirectTo: '/home'
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
