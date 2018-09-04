import { Component, ViewChild } from '@angular/core';
import { MenuContentBase } from '../common/menu-content-base';
import { FormDemoService } from './form-demo.service';
import { FormValueChangeType } from '../../../../sdk/form/common/form.type';
import { Form } from '../../../../sdk/form/builder/form';

@Component({
    selector: 'form-demo',
    templateUrl: './form-demo.component.html',
    providers: [FormDemoService]
})
export class FormDemoComponent extends MenuContentBase {

    text: string;
    disabled: boolean = true;
    isChanged: boolean;
    modalItem: any = {
        name: 'value_name',
        email: 'value_email'
    }

    @ViewChild('form') form: Form;

    constructor(private service: FormDemoService) {
        super();
    }

    reset() {
        this.form.reset();
    }

    submit() {
        if (this.form.validate()) {
            console.log('submit success', this.form.getValues());
        }
    }

    setData() {
        this.form.setValues({
            name: 'name',
            password: 'q12345',
            email: 'jwhong@bistel.co.kr',
            sex: 'female',
            car: 'bmw',
            contries: 'data3',
            type: true,
            start: Date.now(),
            multi: ['data1', 'data2'],
            textarea: 'textarea...textarea...textarea...textarea...'
        });
    }

    valueChange(e: FormValueChangeType) {
        // console.log('form template :: valueChange', e);
        this.isChanged = true;
    }

    initComponent() {

    }
}
