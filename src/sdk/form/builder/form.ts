import {
    Component,
    ContentChild,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from "@angular/core";
import { FormItem } from "./form-item";
import { Subject } from "rxjs";
import { FormItemType, FormType, FormValueChangeType } from "../common/form.type";
import { BaseComponent } from "../../core/base/base.component";
import { Util } from "../../utils/utils";
import { FormBuilder } from "./form-builder";
import { FormComponent } from "./form-component";

@Component({
    selector: 'p-form',
    moduleId: module.id,
    template: `
        <div>
            <ng-template #content></ng-template>
            <ng-content></ng-content>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class Form extends BaseComponent {
    _valid: boolean = true;
    _values: any;
    _children: FormComponent[] = [];
    _subject: Subject<any> = new Subject();

    @Input() labelWidth: number;
    @Input() contentWidth: number;
    @Input() enableLabel: boolean;
    @Input() rowDirection: boolean;

    @Output() valueChange: EventEmitter<FormValueChangeType> = new EventEmitter<FormValueChangeType>();
    @ViewChild('content', { read: ViewContainerRef }) contentRef: ViewContainerRef;
    @ContentChildren(FormItem) formItems: QueryList<FormItem>;
    @ContentChildren(FormComponent) formComponents: QueryList<FormComponent>;
    // @ContentChild(FormComponent) formComponents: FormComponent;

    constructor(protected _container: ViewContainerRef, private builder: FormBuilder) {
        super(_container);
    }

    init() {
        // console.log('formItems', this.formItems);
        // console.log('formComponents', this.formComponents, this.formComponents.length);
        // this._children = Util.List.getChildren(this._children, this.formItems);
        this._children = Util.List.getChildren(this._children, this.formComponents);
        this._bindEvents();
    }

    _bindEvents() {
        this._children.forEach((item: FormComponent) => {
            item.form = this;
            item.valueChange.subscribe((e: FormValueChangeType) => {
                this.valueChange.emit(e);
            });
        });
    }

    getValue(field: string) {
        this._values = this._values || {};
        let value: any = null;
        this._children.forEach(item => {
            if (field === item.name) {
                value = item.value;
                this._values[item.name] = value;
            }
        });
        return value;
    }

    getValues() {
        this._values = {};
        this._children.forEach((item: FormComponent) => {
            this._values[item.name] = item.value;
        });
        return this._values;
    }

    setValues(values: any) {
        if (values) {
            this._setValues(values);
        }
    }

    _setValues(values: any) {
        this._children.forEach((item: FormComponent) => {
            item.value = values[item.name];
        });
    }

    validate(): boolean {
        let valid: boolean = true;
        this._children.forEach(item => {
            if (!item.validate()) {
                valid = false;
            }
        });
        return valid;
    }

    isValid(): boolean {
        let valid: boolean = true;
        this._children.forEach(item => {
            if (valid) {
                valid = item.valid;
            }
        });
        this._valid = valid;
        return this._valid;
    }

    reset() {
        this._children.forEach(item => {
            item.value = null;
        });
    }

    addChild(c: FormComponent) {
        this._children.push(c);
    }

    build(children: FormItemType[]) {
        const config: FormType = {
            form: this,
            container: this.contentRef,
            children: children
        };
        this.builder.buildForm(config);
    }

    bindCustomValidation(childrens: FormItemType[], component: any, functionList: any[]) {
        childrens.forEach((formItem: FormItemType) => {
            const isValidate = formItem.child.validate;
            if (isValidate) {
                if (isValidate.customValidation) {
                    const targetFunction = functionList.find((item: any) => {
                        return isValidate.customValidation === item.key;
                    });
                    if (targetFunction) {
                        isValidate.customValidation = targetFunction.function.bind(component);
                    }
                }
            }
        });
    }
}
