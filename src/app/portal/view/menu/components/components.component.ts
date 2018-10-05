import { Component } from '@angular/core';
import { MenuContentBase } from '../../../../common/base/menu-content-base';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html'
})
export class ComponentsComponent extends MenuContentBase {
  title = 'main';
}
