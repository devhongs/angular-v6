import {Component} from '@angular/core';
import {MenuContentBase} from '../common/menu-content-base';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html'
})
export class PlayComponent extends MenuContentBase {
    title = 'main';
    model = {summary: ''};
    sample = '';

    checkRouting(): boolean {
        return confirm('PlayComponent checkRouting?');
    }

    test(): Observable<boolean> | boolean {
        console.log('test');
        return confirm('go?');
    }

}
