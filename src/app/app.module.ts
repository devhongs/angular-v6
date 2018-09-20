import { NgModule, } from '@angular/core';
import { AppComponent } from './app.component';
import { PortalModule } from './portal/portal.module';

@NgModule({
    imports: [
        PortalModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
