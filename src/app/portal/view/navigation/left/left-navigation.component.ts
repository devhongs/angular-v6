import { Component } from '@angular/core';
import { NavigationBase } from '../common/navigation-base';

@Component({
    selector: 'left-navigation',
    templateUrl: './left-navigation.component.html'
})
export class LeftNavigationComponent extends NavigationBase {
    menus: any;

    constructor() {
        super();
    }

    preInit() {
        this.menus = MENU_LIST;
    }

    menuClick(menu: any) {

    }
}

const MENU_LIST = [
    {name: 'Home', path: '/home', desc: 'home description'},
    {name: 'Forms', path: '/forms', desc: 'forms description'},
    {name: 'Components', path: '/components', desc: 'components description'},
    {name: 'Play', path: '/play', desc: 'play description'},
];
