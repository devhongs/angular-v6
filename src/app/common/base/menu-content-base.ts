import { NavigationStart, Router } from '@angular/router';
import { BaseComponent } from '../../sdk/core/base/base.component';
import { Util } from '../../sdk/utils/utils';

export class MenuContentBase extends BaseComponent {

    router: Router;

    constructor() {
        super();
        this.router = Util.Injector.getService(Router);
    }

    preInit() {
        this._listenRouteEvent();
    }

    canDeactivate(): boolean {
        return this.checkRouting();
    }

    checkRouting(): boolean {
        return true;
    }

    _listenRouteEvent() {
        this.subscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                // console.log('MenuContentBase :: NavigationStart');
                // if (confirm('Go?')) {
                //     console.log('ok o kok ok');
                // } else {
                //     console.log(this.router);
                //     console.log(event);
                // }
            }
            // NavigationStart
            // NavigationEnd
            // NavigationCancel
            // NavigationError
            // RoutesRecognized
        });
    }
}
