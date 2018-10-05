import { NgModule } from '@angular/core';
import { LoginComponent } from './view/login/login.component';
import { TopNavigationComponent } from './view/navigation/top/top-navigation.component';
import { LeftNavigationComponent } from './view/navigation/left/left-navigation.component';
import { MainComponent } from './view/main/main.component';
import { HomeComponent } from './view/menu/home/home.component';
import { PlayComponent } from './view/menu/play/play.component';
import { AppCommonModule } from '../common/common.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { SdkModule } from '../sdk/sdk.module';
import { PortalComponent } from './portal.component';
import { ComponentsComponent } from './view/menu/components/components.component';
import { FormsComponent } from './view/menu/forms/forms.component';
import { ContentContainerComponent } from './view/container/content-container/content-container.component';

@NgModule({
    imports: [
        // Angular
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        // App
        AppCommonModule,
        SdkModule,
    ],
    declarations: [
        // Portal
        PortalComponent,
        // Login
        LoginComponent,
        // Nav
        TopNavigationComponent,
        LeftNavigationComponent,
        // Main
        MainComponent,
        // Container
        ContentContainerComponent,
        // Menu
        HomeComponent,
        ComponentsComponent,
        FormsComponent,
        PlayComponent,
    ],
    exports: [
        PortalComponent
    ],
    providers: []
})
export class PortalModule {}

