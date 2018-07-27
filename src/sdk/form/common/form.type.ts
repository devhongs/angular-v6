import { ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';
import { Form } from '../builder/form';
// import { MITextInput } from '../form/input/text-input';
// import { MITextArea } from '../form/input/text-area';
// import { MIFormItem } from '../form/builder/form-item';
// import { MISelect } from '../form/select/select';
// import { MIText } from '../form/text/text';
// import { MIRadioButton } from '../form/radio/radio-button';
// import { MIRadioGroup } from '../form/radio/radio-group';
// import { MIToggleButton } from '../form/toggle/toggle-button';
// import { MIToggleGroup } from '../form/toggle/toggle-group';
// import { MIIcon } from '../component/icon/icon';
// import { MICheckbox } from '../form/checkbox/checkbox';
// import { MIButton } from '../component/button/button';
// import { MIDatetime } from '../form/datetime/datetime';
// import { MIMultiSelect } from '../form/multi-select/multi-select';
// import { MIFromto } from '../form/datetime/datetime-fromto';

export interface FormType {
    form: Form;
    container: ViewContainerRef;
    children: FormItemType[];
    labelWidth?: number;
    contentWidth?: number;
    enableLabel?: boolean;
    rowDirection?: boolean;
}

export interface FormItemType {
    label: string;
    name: string;
    child: FormComponentType;
    labelWidth?: number;
    contentWidth?: number;
    enableLabel?: boolean;
    rowDirection?: boolean;
}

export interface FormComponentType {
    component: any;
    name?: string;
    children?: FormComponentChildType[];
    type?: string;
    placeholder?: string;
    listData?: any;
    proxy?: any;
    initLabel?: string;
    initValue?: any;
    labelField?: string;
    dataField?: string;
    label?: string;
    disabledSelectedBox?: boolean;
    validate?: FormValidateType;
}

export interface FormComponentChildType {
    component: any;
    label?: string;
    value?: any;
}

export interface FormValidateType {
    required?: boolean;
    requiredMessage?: string;
    minSize?: number;
    minSizeMessage?: string;
    maxSize?: number;
    maxSizeMessage?: string;
    customValidation?: any;
    customMessage?: string;
    patten?: RegExp;
    pattenMessage?: string;
    isRealTimeValid?: boolean;
}

export interface FormValueChangeType {
    readonly _valid: any;
    value: any;
    valueItem?: any;
    values?: any;
    valueItems?: any;
    target?: any;
    newValue?: any;
    oldValue?: any;
    relationId?: string;
    relationTarget?: string;
}

export interface AddModuleTyoe {
    module: Type<any>;
    container: ViewContainerRef;
    resolver?: ComponentFactoryResolver;
    config?: any;
    params?: any;
    requester?: any;
}

export interface FormBuilderType {
    buildForm(config: FormType);
}

export class ComponentListType {
    // static get FormItem() { return FormItem; }
    // static get TextInput() { return TextInput; }
    // static get TextArea() { return TextArea; }
    // static get Button() { return Button; }
    // static get Checkbox() { return Checkbox; }
    // static get Icon() { return Icon; }
    // static get RadioGroup() { return RadioGroup; }
    // static get RadioButton() { return RadioButton; }
    // static get ToggleGroup() { return ToggleGroup; }
    // static get ToggleButton() { return ToggleButton; }
    // static get Text() { return Text; }
    // static get Select() { return Select; }
    // static get MultiSelect() { return MultiSelect; }
    // static get Datetime() { return Datetime; }
    // static get DatetimeFromTo() { return Fromto; }
}
