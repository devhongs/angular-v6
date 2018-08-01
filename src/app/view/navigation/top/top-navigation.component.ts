import { Component } from '@angular/core';
import {NavigationBase} from '../common/navigation-base';

@Component({
    selector: 'top-navigation',
    templateUrl: './top-navigation.component.html'
})
export class TopNavigationComponent extends NavigationBase {

    constructor() {
        super();
    }
}
