import { Component } from '@angular/core';
import { MenuContentBase } from '../../../../common/base/menu-content-base';

@Component({
    selector: 'app-form-menu',
    templateUrl: './forms.component.html'
})
export class FormsComponent extends MenuContentBase {
    title = 'main';
}

