import { Component } from '@angular/core';
import {NavigationBase} from '../common/navigation-base';

@Component({
    selector: 'left-navigation',
    templateUrl: './left-navigation.component.html'
})
export class LeftNavigationComponent extends NavigationBase {
    constructor() {
        super();
    }
}
