import { NgModule, } from '@angular/core';
import { AppComponent } from './app.component';
import { AppCommonModule } from './common/common.module';
import { PortalModule } from './portal/portal.module';
import { SdkModule } from './sdk/sdk.module';

@NgModule({
    imports: [
        // App
        AppCommonModule,
        PortalModule,
        SdkModule
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
