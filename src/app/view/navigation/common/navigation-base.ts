import { OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {Util} from '../../../../sdk/utils/utils';
import { LifeCycleBase } from '../../../../sdk/core/base/life-cycle-base';

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
