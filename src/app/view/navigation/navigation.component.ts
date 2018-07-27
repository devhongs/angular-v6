import { Component } from '@angular/core';
import { NavigationBase } from './navigation-base';
import { Router } from '@angular/router';
import { Util } from '../../../sdk/utils/utils';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html'
})
export class NavigationComponent extends NavigationBase {

    constructor() {
        super();
    }
}
