import { AfterContentInit, OnDestroy, OnInit } from '@angular/core';

export class ViewBase implements OnInit, AfterContentInit, OnDestroy {

    constructor() {

    }

    ngOnInit() {

    }

    ngAfterContentInit() {
        this.initComponent();
    }

    ngOnDestroy() {

    }

    initComponent() {}
}
