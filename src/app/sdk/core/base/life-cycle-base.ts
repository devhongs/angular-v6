import { AfterViewInit, OnChanges, OnDestroy, OnInit } from '@angular/core';

export class LifeCycleBase implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    ngOnInit() {
        this.preInit();
    }

    ngAfterViewInit() {
        this.afterInit();
    }

    ngOnChanges(changes: any) {
        this.changes(changes);
    }

    ngOnDestroy() {
        this.destroy();
    }

    preInit() {}
    afterInit() {}
    changes(changes: any): void { }
    destroy() {}
}
