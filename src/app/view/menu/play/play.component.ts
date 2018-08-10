import { Component } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';
import { Store } from '@ngrx/store';
import { AddProduct } from '../../../store/actions';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html'
})
export class PlayComponent extends MenuContentBase {
    title = 'main';
    count: number = 0;

    constructor(
        private store: Store<any>
    ) {
        super();
    }

    initComponent() {
        console.log(this.store);
    }

    add() {
        const item = {count: this.count++};
        const action = new AddProduct(item);
        this.store.dispatch(action);
        // this.store.dispatch(new AddProduct(product));
    }

    remove() {

    }

    test() {
        const cart: Observable<Array<any>> = this.store.select('cart');
        const cart2: Observable<Array<any>> = this.store.select('akdhawsoihdaweoidhj');
        console.log(cart);
        console.log(cart2);
    }

}
