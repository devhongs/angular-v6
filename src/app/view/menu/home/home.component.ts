import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends MenuContentBase {
  title = 'main';

  test(value) {
    console.log(value);
  }
}
