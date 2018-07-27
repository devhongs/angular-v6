import { maxSizeDirective } from './../../sdk/directives/max-size.directive';
import {
    Component
} from '@angular/core';

@Component({
    selector: 'play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.css'],
})
export class PlayComponent {

    containerElement: HTMLElement;
    title = 'play';
    content = this._generateContent();
    html = "<p>xxx</p>";

    _generateContent() {
        const html = `
            <ul>
                <h2>inner html</h2>
                <div style="background:red">1</div>
                <div style="background:blue">2</div>
                <div>3</div>
            </ul>
        `;
        return html;
    }
}
