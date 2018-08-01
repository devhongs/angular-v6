import { OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {Util} from '../../../../sdk/utils/utils';

export class NavigationBase implements OnInit, OnDestroy {

    urlPath: string;
    router: Router;

    constructor() {
        this.router = Util.Injector.getService(Router);
        this.listen();
    }

    listen() {
        this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationEnd ) {
                this.urlPath = this.router.url;
            }
        });
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
