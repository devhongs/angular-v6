import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends MenuContentBase {
  title = 'main';
  checkA = true;
  checkB = true;
  checkC = true;

  radioValue = "option2";
  
  click(value) {
    console.log(value);
    value = !value;
    this.checkC = value ? true : false;
    console.log(value);
  }

  test(value) {
    console.log(value);
  }
}

// $event.preventDefault(); $event.stopPropagation();
