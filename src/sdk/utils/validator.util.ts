import { FormComponent } from '../form/builder/form-component';

export class ValidatorUtil {

    static validate(form: FormComponent, component: any) {
    // static validate(form: FormComponent) {
        let result: any = null;
        if (form.required && !result) {
            result = ValidatorUtil.required(form);
        }
        if (!isNaN(form.minSize) && !result) {
            result = ValidatorUtil.minSize(form);
        }
        if (!isNaN(form.maxSize) && !result) {
            result = ValidatorUtil.maxSize(form);
        }
        if (form.patten && !result) {
            result = ValidatorUtil.patten(form);
        }
        if (form.customValidation && !result) {
            result = ValidatorUtil.customValidation(form, component);
        }
        return result;
    }

    static required(form: FormComponent): any {
        let msg = form.requiredMessage || form.name + ' is required';
        const value = form.value;
        return !value || value === '' ? msg : null;
    }

    static minSize(form: FormComponent): any {
        let minLength = form.minSize;
        let msg = form.minSizeMessage || 'min length is ' + minLength;
        const value = form.value;
        return !value || value.length < minLength ? msg : null;
    }

    static maxSize(form: FormComponent): any {
        let maxLength = form.maxSize;
        let msg = form.maxSizeMessage || 'max length is ' + maxLength;
        const value = form.value;
        return !value || value.length > maxLength ? msg : null;
    }

    static patten(form: FormComponent): any {
        let patten: RegExp = form.patten;
        let msg = form.pattenMessage || `This is not an patten format.`;
        const value = form.value;
        return !value || !patten.test(value) ? msg : null;
    }

    static customValidation(form: FormComponent, component: any): any {
        // let fn: Function;
        // if (component) {
        //     fn = form.customValidation.call(component, form);
        // } else {
        //     fn = form.customValidation.call(this, form);
        // }
        const fn: Function = form.customValidation.call(component, form);
        let msg = form.customMessage || 'Custom Validation is failed..';
        const value = form.value;
        return !value || !fn ? msg : null;
    }

    /*
    static required(value: any, form: FormComponent): any {
        let msg = form.requiredMassage || form.name + ' is required';
        return !value || value == '' ? {'error': msg } : null;
    }

    static minSize(value: string, form: FormComponent): any {
        let minLength = Number(form.minSize);
        let msg = form.minSizeMassage || 'min length is ' + minLength;
        return !value || value.length < minLength ? {'error': msg } : null;
    }

    static maxSize(value: string, form: FormComponent): any {
        let msg = form.minSizeMassage;
        let minLength = Number(form.minSize);
        return value.length < minLength ? {'requiredLength': minLength, 'actualLength': value.length, 'error': msg } : null;
    }

    static minLength(value: string, config: any) {
        let msg = config.errorMessage;
        let minLength = config.minLength;
        //Angular2: {'minlength': {'requiredLength': minLength, 'actualLength': v.length}} : null;
        return value.length < minLength ? {'requiredLength': minLength, 'actualLength': value.length, 'error': msg } : null;
    }
    static maxLength(value: string, config: any) {
        let msg = config.errorMessage;
        let maxLength = config.maxLength;
        return value.length > maxLength ? {'requiredLength': maxLength, 'actualLength': value.length, 'error': msg } : null;
    }
    static pattern(value: string, config: any) {
        let msg = config.errorMessage;
        let pattern = config.pattern;
        let regex = new RegExp(pattern);
        return regex.test(value) ? null : {'requiredPattern': `pattern`, 'actualValue': value, 'error': msg };
    }
    static email(value: string, config: any) {
        let msg = config.errorMessage;
        // tslint:disable-next-line:max-line-length
        let result = Validator.pattern(value, {pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/});
        return result ? {'actualValue': value, 'error': msg } : null;
    }
    static equal(value: string, config: any) {
        let msg = config.errorMessage;
        let targetValue = config.frm.getValue(config.field);
        let fieldName = config.field + ' value';
        return targetValue !== value ? {fieldName: targetValue, 'value': value, 'error': msg } : null;
    }
    static validate(value: any, validators: any, frm: any = null) {
        let result: any = null;
        if (validators) {
            let me: any = Validator;
            let cfg: any = null;
            Object.keys(validators).forEach(key => {
                if (!result) {
                    cfg = validators[key];
                    cfg.frm = frm;
                    result = me[key].call(this, value, cfg);
                }
            });
        }
        return result;
    }
    */
}

export class PattenType {
    // tslint:disable-next-line:max-line-length
    public static readonly EMAIL: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // public static getRegExp(type: string) {
    //     switch (type) {
    //         case 'email':
    //             return this.EMAIL;
    //         default:
    //             return null;
    //     }
    // }
}
