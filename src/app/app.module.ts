import { ExcludePatternDirective } from './../sdk/directives/exclude-pattern.directive';
import { maxSizeDirective } from './../sdk/directives/max-size.directive';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopNavigationComponent } from './view/navigation/top/top-navigation.component';
import { H2Component } from './view/menu/h2/h2.component';
import { LoginComponent } from './view/login/login.component';
import { MainComponent } from './view/main/main.component';
import { HomeComponent } from './view/menu/home/home.component';
import { JpaComponent } from './view/menu/jpa/jpa.component';
import { PostgresqlComponent } from './view/menu/postgresql/postgresql.component';
import { AppRoutingModule } from './portal/router/app-router.module';
import { RestFulService } from '../sdk/service/restful.service';
import { RestfulModelService } from '../sdk/service/restful-model.service';
import { SessionStoreService } from '../sdk/service/session-store.service';
import { FormDemoComponent } from './view/menu/form/form-demo.component';
import { FormModule } from '../sdk/form/form.module';
import { TextInput } from '../sdk/components/input/text-input';
import { LeftNavigationComponent } from './view/navigation/left/left-navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { PlayComponent } from './view/menu/play/play.component';
import { TextEditorComponent } from './view/menu/play/text-editor/text-editor.component';
import { BaseComponent } from "../sdk/core/base/base.component";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        AppRoutingModule,
        // SDK
        HttpClientModule,
        // form,
        FormModule.forRoot()
    ],
    declarations: [
        // App
        AppComponent,
        // View
        TopNavigationComponent,
        LeftNavigationComponent,
        LoginComponent,
        MainComponent,
        // Menu
        HomeComponent,
        H2Component,
        JpaComponent,
        PostgresqlComponent,
        FormDemoComponent,
        PlayComponent,
        // SDK > Directive
        maxSizeDirective,
        ExcludePatternDirective,
        //
        TextInput,
        // test
        TextEditorComponent
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
