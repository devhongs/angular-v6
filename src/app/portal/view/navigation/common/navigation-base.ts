import { NavigationEnd, Router } from '@angular/router';
import { LifeCycleBase } from '../../../../sdk/core/base/life-cycle-base';
import { Util } from '../../../../sdk/utils/utils';

export class NavigationBase extends LifeCycleBase {

    urlPath: string;
    router: Router;

    constructor() {
        super();
        this.router = Util.Injector.getService(Router);
        this.listen();
    }

    listen() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd) {
                this.urlPath = this.router.url;
            }
        });
    }
}
