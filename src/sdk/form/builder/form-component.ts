import { Directive, EventEmitter, forwardRef, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormComponentChild } from './form-component-child';
import { FormComponentType, FormValueChangeType } from '../common/form.type';
import { BaseComponent } from '../../core/base/base.component';
import { Util } from '../../utils/utils';

export const FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormComponent),
    multi: true
};

@Directive({
    selector: 'p-form-base, [p-form-base]',
    providers: [FORM_CONTROL_VALUE_ACCESSOR]
})
export class FormComponent extends BaseComponent implements ControlValueAccessor {
    _valid: boolean = true;
    _listData: any;
    _children: any[] = [];
    _focused: boolean;
    _value: any;
    _config: FormComponentType;

    @ViewChild('content', { read: ViewContainerRef }) contentRef: ViewContainerRef;

    @Input() form: any;
    @Input() type: string = 'text';
    @Input() name: string;
    @Input() placeholder: string;
    @Input() errorMessage: string;
    // select
    @Input() initLabel: string;
    @Input() initValue: any;
    @Input() labelField: string = 'label';
    @Input() dataField: string = 'data';
    @Input() rowCount: number = 5;
    // multiselect
    @Input() disableSelectedBox: boolean;
    // checkbox
    @Input() label: string;
    // datetime
    @Input() format: any;
    @Input() enableInput: boolean;
    // validation
    @Input() required: boolean;
    @Input() requiredMessage: string;
    @Input() minSize: number;
    @Input() minSizeMessage: string;
    @Input() maxSize: number;
    @Input() maxSizeMessage: string;
    @Input() customValidation: Function;
    @Input() customMessage: string;
    @Input() patten: RegExp;
    @Input() pattenMessage: string;
    @Input() isRealTimeValid: boolean = true;

    @Input()
    set listData(value: any) {
        this._listData = value;
    }
    get listData() {
        return this._listData;
    }

    @Input()
    set value(value: any) {
        if (!this.disabled && this._value !== value) {
            this._value = value;
            if (!this._valid) {
                this._validate();
            }
            this.onChangeCallback(value);
            this.updateViewFromValue();
            this.emitValueChange();
        }
    }
    get value() {
        return this._value;
    }

    get valid() {
        return this.disabled ? true : this._valid;
    }

    set config(value: FormComponentType) {
        this._config = value;
    }
    get config() {
        return this._config;
    }


    @Output() valueChange: EventEmitter<FormValueChangeType> = new EventEmitter<FormValueChangeType>();
    @Output() keyUp: EventEmitter<any> = new EventEmitter<any>();

    constructor(protected _container: ViewContainerRef) {
        super(_container);
    }

    validate(): boolean {
        if (!this.disabled) {
            return this._validate();
        }
        return true;
    }

    _validate(): boolean {
        const component = (<any>this._container)._view.component;
        const message =  Util.Validator.validate(this, component);
        const isValid = message ? false : true;
        this._valid = isValid;
        this.errorMessage = isValid ? null : message;
        return isValid;
    }

    init() {
        // override
    }

    updateViewFromValue() {
        // override
    }

    emitValueChange() {
        const data = this._getChangeValue();
        this.valueChange.emit(data);
    }

    _getChangeValue(): any {
        const valueItem = Util.List.findItem(this.listData, this.dataField, this.value);
        const data = {
            target: this,
            value: this.value,
            valueItem: valueItem,
        };
        return data;
    }

    /**
     * Event
     */
    onValueChange(e: any) {
        this.value = e.value;
    }

    onFocus(e: any) {
        this._focused = true;
    }

    onBlur(e: any) {
        this._focused = false;
    }

    onKeyUp(e: any) {
        this.value = (<HTMLInputElement>event.target).value;
        this.keyUp.emit(e);
    }

    /**
     * for of ControlValueAccessor
     */
    onChangeCallback: (v: any) => void = () => { };

    writeValue(value: any) {
        if (value !== this._value) {
            this.value = value;
            // this._value = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        // empty
    }

    setDisabledState?(isDisabled: boolean) {
        // empty
    }

    addChild(value: FormComponentChild) {
        this._children.push(value);
    }

    getChildren(): any[] {
        return this._children;
    }

    initConfig(type: FormComponentType) {
        Util.List.applyProperty(this, type, ['component', 'children', 'validate']);
        Util.List.applyProperty(this, type.validate);
    }
}
