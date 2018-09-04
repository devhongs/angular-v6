import { Directive, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';
import { FormComponentChildType } from '../common/form.type';
import { Util } from '../../utils/utils';

@Directive({
    selector: 'p-form-child-base'
})
export class FormComponentChild extends BaseComponent {
    _value: any = null;
    _name: string = null;
    _label: string = null;
    _config: FormComponentChildType;

    @Input()
    get value(): any {
        return this._value;
    }
    set value(val: any) {
        this._value = val;
    }

    @Input()
    get name(): string {
        return this._name;
    }
    set name(val: string) {
        this._name = val;
    }

    @Input()
    get label(): string {
        return this._label;
    }
    set label(val: string) {
        this._label = val;
    }

    set config(value: FormComponentChildType) {
        this._config = value;
    }
    get config() {
        return this._config;
    }

    @Output() change: EventEmitter <any> = new EventEmitter();

    constructor(protected _container: ViewContainerRef) {
        super();
    }

    initConfig(type: FormComponentChildType) {
        Util.List.applyProperty(this, type, ['component']);
    }
}
