import { AfterContentInit, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from '../../../../sdk/utils/utils';

export class MenuContentBase implements OnInit, AfterContentInit, OnDestroy {

    constructor() {

    }

    initComponent() {}

    ngOnInit() {
        // console.log('MenuContentBase :: ngOnInit');
    }

    ngAfterContentInit() {
        this.initComponent();
    }

    ngOnDestroy() {
        // console.log('MenuContentBase :: ngOnDestroy');
    }
}
