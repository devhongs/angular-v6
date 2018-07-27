import { ExcludePatternDirective } from './../sdk/directives/exclude-pattern.directive';
import { maxSizeDirective } from './../sdk/directives/max-size.directive';
import { PlayComponent } from './play/play.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationComponent } from './view/navigation/navigation.component';
import { H2Component } from './view/menu/h2/h2.component';
import { LoginComponent } from './view/login/login.component';
import { MainComponent } from './view/main/main.component';
import { HomeComponent } from './view/menu/home/home.component';
import { JpaComponent } from './view/menu/jpa/jpa.component';
import { PostgresqlComponent } from './view/menu/postgresql/postgresql.component';
import { AppRoutingModule } from './portal/router/app-router.module';
import { RestFulService } from '../sdk/service/restful.service';
import { RestfulModelService } from '../sdk/service/restful-model.service';
import { HttpModule } from '@angular/http';
import { SessionStoreService } from '../sdk/service/session-store.service';
import { FormDemoComponent } from './view/menu/form/form-demo.component';
import { FormModule } from '../sdk/form/form.module';
import { TextInput } from "../sdk/components/input/text-input";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        AppRoutingModule,
        // SDK
        HttpModule,
        // form,
        FormModule.forRoot()
    ],
    declarations: [
        // App
        AppComponent,
        PlayComponent,
        // View
        NavigationComponent,
        LoginComponent,
        MainComponent,
        // Menu
        HomeComponent,
        H2Component,
        JpaComponent,
        PostgresqlComponent,
        FormDemoComponent,
        // SDK > Directive
        maxSizeDirective,
        ExcludePatternDirective,
        //
        TextInput,
    ],
    // providers: [],
    providers: [
        // angular
        NgModel,
        // sdk
        RestFulService,
        RestfulModelService,
        SessionStoreService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
