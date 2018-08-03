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
    {name: 'Home', path: '/home'},
    {name: 'H2', path: '/h2'},
    {name: 'Jpa', path: '/jpa'},
    {name: 'PostgreSql', path: '/postgreSql'},
    {name: 'Form', path: '/form'},
    {name: 'Play', path: '/play'},
];
