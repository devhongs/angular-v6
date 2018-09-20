import { NgModule } from '@angular/core';
import { LoginComponent } from './view/login/login.component';
import { TopNavigationComponent } from './view/navigation/top/top-navigation.component';
import { LeftNavigationComponent } from './view/navigation/left/left-navigation.component';
import { MainComponent } from './view/main/main.component';
import { HomeComponent } from './view/menu/home/home.component';
import { H2Component } from './view/menu/h2/h2.component';
import { JpaComponent } from './view/menu/jpa/jpa.component';
import { PostgresqlComponent } from './view/menu/postgresql/postgresql.component';
import { PlayComponent } from './view/menu/play/play.component';
import { AppCommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        //
        AppCommonModule
    ],
    declarations: [
        // Login
        LoginComponent,
        // Nav
        TopNavigationComponent,
        LeftNavigationComponent,
        // Main
        MainComponent,
        // Menu
        HomeComponent,
        H2Component,
        JpaComponent,
        PostgresqlComponent,
        PlayComponent,
    ],
    exports: [
        // Login
        LoginComponent,
        // Nav
        TopNavigationComponent,
        LeftNavigationComponent,
        // Main
        MainComponent,
        // Menu
        HomeComponent,
        H2Component,
        JpaComponent,
        PostgresqlComponent,
        PlayComponent,
    ],
    providers: []
})
export class PortalModule {}

