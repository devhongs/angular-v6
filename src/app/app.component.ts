import { Component, Injector } from '@angular/core';
import { Util } from '../sdk/utils/utils';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    constructor(private injector: Injector) {
        // set global injector
        Util.Injector.getInstance().setInjector(injector);
    }
}
