import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';

@Component({
    selector: 'app-postgresql',
    templateUrl: './postgresql.component.html'
})
export class PostgresqlComponent extends MenuContentBase {
    title = 'main';
}

