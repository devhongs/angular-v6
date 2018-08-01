import { AfterContentInit, OnDestroy, OnInit } from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import { Util } from '../../../../sdk/utils/utils';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

export class MenuContentBase implements OnInit, AfterContentInit, OnDestroy {

    private _subscription: Subscription;
    router: Router;

    constructor() {
        this.router = Util.Injector.getService(Router);
    }

    initComponent() {}

    ngOnInit() {
        this._listenRouteEvent();
    }

    ngAfterContentInit() {
        this.initComponent();
    }

    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }

    canDeactivate(): boolean {
        return this.checkRouting();
    }

    checkRouting(): boolean {
        return true;
    }



    _listenRouteEvent() {
        this._subscription = this.router.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                console.log('MenuContentBase :: NavigationStart');
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
