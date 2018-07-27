import { Component, ElementRef, forwardRef, Input, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { FORM_CONTROL_VALUE_ACCESSOR, FormComponent } from '../../form/builder/form-component';

export const TEXT_INPUT_PROVIDER: any = {
    provide: FormComponent,
    useExisting: forwardRef(() => TextInput)
};

@Component({
    selector: 'p-text-input',
    template: `
        <input class="form-control"
               placeholder="{{placeholder}}"
               [type]="type"
               [value]="value"
               [(ngModel)]="value"
               (keyup)="onKeyUp($event)"
               (focus)="onFocus($event)"
               (blur)="onBlur($event)"/>
    `,
    providers: [
        TEXT_INPUT_PROVIDER,
        FORM_CONTROL_VALUE_ACCESSOR
    ],
    encapsulation: ViewEncapsulation.None,
})
export class TextInput extends FormComponent {
    _type: string = 'text';

    @Input()
    set type(value: string) {
        this._type = value;
    }
    get type() {
        return this._type;
    }

    constructor(protected _container: ViewContainerRef) {
        super(_container);
    }

    updateViewFromValue() {
        // empty
        // console.log('input updateViewFromValue', this.value);
    }
}
