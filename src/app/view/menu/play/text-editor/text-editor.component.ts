import { Component, OnInit, Output, Input, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'nxc-text-editor',
    templateUrl: './text-editor.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextEditorComponent),
            multi: true
        }
    ]
})
export class TextEditorComponent implements OnInit {
    @Input() tl;
    @Input() placeholder: string;
    @Input('disabled') disabled;

    @Input() tw;
    @Input() uid;
    @Input() id;
    @Input() maxLength: number;
    @Input() notPushEnterFlg: boolean;
    @Input() editResId: boolean;
    @Output('nxcPushEnter') nxcPushEnter: EventEmitter<any> = new EventEmitter();
    @Output() nxcChange: EventEmitter<any> = new EventEmitter();
    onChange: any = () => { };
    onTouched: any = () => { };
    @Input('nxcModel') _nxcModel = '';
    @Input('type') _type;

    private _isDisabled;
    @Input('isDisabled')
    set isDiabled(val) {
        this._isDisabled = val;
        this.disabled = val;
    }
    get isDisabled() {
        return this._isDisabled;
    }

    get nxcModel() {
        return this._nxcModel;
    }

    set nxcModel(val) {
        console.log('set', val);
        this._nxcModel = val;
        this.onChange(val);
        this.onTouched();
    }

    get type() {
        return this._type;
    }

    set type(val) {
        this._type = val;
    }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    writeValue(value) {
        // console.log('writeValue', value);
        if (value) {
            this._nxcModel = value;
        }
    }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    textInput(e) {
        this.nxcModel = e.target.value;
        this.nxcChange.emit(e.target.value);
    }

    constructor() {
        // console.log('this.type', this.type);
    }

    ngOnInit() {
        this.placeholder = this.placeholder ? this.placeholder : '';
    }

}
