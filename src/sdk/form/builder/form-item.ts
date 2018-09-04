import { Component, ContentChild, EventEmitter, Input, Output, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormComponent } from './form-component';
import { FormItemType, FormValueChangeType } from '../common/form.type';
import { Form } from './form';
import { BaseComponent } from '../../core/base/base.component';
import { Util } from '../../utils/utils';

@Component({
    selector: 'p-form-item',
    moduleId: module.id,
    template: `
        <div class="form-group" [ngClass]="{'row': rowDirection, 'has-danger': component && component.errorMessage}">
            <label *ngIf="enableLabel" [ngClass]="labelStyle()">{{label}}</label>
            <div [ngClass]="contentStyle()">
                <ng-template #content></ng-template>
                <ng-content></ng-content>
            </div>
            <div class="form-control-feedback">{{component ? component.errorMessage : ''}}</div>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})

export class FormItem extends BaseComponent {
    _valid: boolean = true;
    _form: Form;

    @Input() label: string;
    @Input() name: string;
    @Input() labelWidth: number;
    @Input() contentWidth: number;
    @Input() enableLabel: boolean;
    @Input() rowDirection: boolean;
    @Output() valueChange: EventEmitter<FormValueChangeType> = new EventEmitter<FormValueChangeType>();
    @ViewChild('content', { read: ViewContainerRef }) contentRef: ViewContainerRef;
    @ContentChild(FormComponent) component: FormComponent;

    @Input()
    set form(value: Form) {
        this._form = value;
        this._applyFormStyle();
    }

    set value(value: any) {
        this.component.value = value;
    }
    get value(): any {
        return this.component.value;
    }

    get valid(): boolean {
        return this.component.valid;
    }

    constructor(protected _container: ViewContainerRef) {
        super();
    }

    init() {
        if (this.component) {
            this._listenEvent();
        }
    }

    _listenEvent() {
        this.component.form = this.form;
        this.component.name = this.name;
        this.component.valueChange.subscribe((e: FormValueChangeType) => {
            console.log('FormItem :: valueChange.subscribe', e, this.form);
            /**
             * valueChange 이 발생될 때마다, validate 체크해주는 로직.
             * isRealTimeValid : 기본으로 true
             * e.target.value : 값이 존재할 때, check
             */
            // if (e.target.isRealTimeValid && e.target._valid && e.target.value) {
            if (e.target.isRealTimeValid && e.target.value) {
                this.component.validate();
            }
            this.valueChange.emit(e);
        });
    }

    validate(): boolean {
        this.component.label = this.label;
        // const valid: boolean = this.component.validate();
        return this.component.validate();
    }

    isValid(): boolean {
        return this._valid = this.component.valid;
    }

    reset() {
        this.component.value = null;
    }

    addChild(c: FormComponent) {
        this.component = c;
    }

    initConfig(value: FormItemType) {
        Util.List.applyProperty(this, value, ['child']);
    }

    labelStyle() {
        const style: any = [];
        const size: number = this._calcLabelSize();
        if (this.rowDirection) {
            style.push(`col-${size}`);
            style.push(`col-form-label`);
        }
        return style.join(' ');
    }

    _calcLabelSize(): number {
        const formLabel: number = this.form ? this.form.labelWidth : 0;
        const label: number = this.labelWidth > 0 ? this.labelWidth : 2;
        let size: number;
        if (formLabel > 0) {
            size = formLabel;
        } else {
            size = label;
        }
        return size;
    }

    contentStyle() {
        const style: any = [];
        const size: number = this._calcContentSize();
        if (this.enableLabel && this.rowDirection) {
            style.push(`col-${size}`);
        } else if (!this.enableLabel) {
            style.push(`col-12`);
        }
        return style.join(' ');
    }

    _calcContentSize(): number {
        const formLabel: number = this.form ? this.form.labelWidth : 0;
        const formContent: number = this.form ? this.form.contentWidth : 0;
        const label: number = this.labelWidth > 0 ? this.labelWidth : 2;
        const content: number = this.contentWidth > 0 ? this.contentWidth : 12 - label;
        let size: number;
        if (formContent > 0) {
            size = formContent;
        } else if (formLabel > 0) {
            size = 12 - formLabel;
        } else {
            size = content;
        }
        return size;
    }

    _applyFormStyle() {
        // TODO : 뭔가 방법이 이상...
        // form에 layout관련된 변수를 formItem에 적용
        this.labelWidth = Util.Data.isNumber(this.labelWidth) ? this.labelWidth : (Util.Data.isNumber(this._form.labelWidth) ? this._form.labelWidth : 0);
        this.contentWidth = Util.Data.isNumber(this.contentWidth) ? this.contentWidth : (Util.Data.isNumber(this._form.contentWidth) ? this._form.contentWidth : 0);
        this.enableLabel = Util.Data.isBoolean(this.enableLabel) ? this.enableLabel : (Util.Data.isBoolean(this._form.enableLabel) ? this._form.enableLabel : true);
        this.rowDirection = Util.Data.isBoolean(this.rowDirection) ? this.rowDirection : (Util.Data.isBoolean(this._form.rowDirection) ? this._form.rowDirection : true);
    }

}


