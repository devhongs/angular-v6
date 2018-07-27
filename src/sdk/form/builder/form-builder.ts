import { ComponentFactoryResolver, Injectable, Type, ViewContainerRef } from '@angular/core';
import { FormComponentChildType, FormComponentType, FormItemType, FormType, FormBuilderType } from '../common/form.type';
import { Form } from './form';
import { FormItem } from './form-item';
import { FormComponent } from './form-component';
import { FormComponentChild } from './form-component-child';

@Injectable()
export class FormBuilder implements FormBuilderType {

    constructor(private compiler: ComponentFactoryResolver) {
        //
    }

    buildForm(config: FormType) {
        this._build(config);
    }

    _build(ft: FormType) {
        const form: Form = ft.form;
        let item: FormItem = null;
        let comp: FormComponent = null;
        let child: FormComponentChild = null;
        ft.children.forEach((it: FormItemType) => {
            item = this._createFormItem(ft.container, it);
            comp = this._createFormComponent(item.contentRef, it.child);
            if (it.child.children) {
                it.child.children.forEach((ct: FormComponentChildType) => {
                    child = this._createFormComponentChild(comp.contentRef, ct);
                    comp.addChild(child);
                });
            }
            form.addChild(comp);
            // item.addChild(comp);
            comp.init();
            // item.init();
        });
        form.init();
    }

    _createFormItem(container: ViewContainerRef, type: FormItemType) {
        const c: FormItem = this._createComponent(container, FormItem);
        c.initConfig(type);
        return c;
    }

    _createFormComponent(container: ViewContainerRef, type: FormComponentType) {
        const c: FormComponent = this._createComponent(container, type.component);
        c.initConfig(type);
        this._initProxy(c, type);
        return (c);
    }

    _createFormComponentChild(container: ViewContainerRef, type: FormComponentChildType) {
        const c: any = this._createComponent(container, type.component);
        c.initConfig(type);
        return (c);
    }

    _createComponent(container: ViewContainerRef, component: Type<any>) {
        const f: any = this.compiler.resolveComponentFactory(component);
        const c: any = container.createComponent(f);
        return c.instance;
    }

    _initProxy(comp: FormComponent, type: FormComponentType) {
        if (type.proxy) {
            type.proxy.then((data: any) => {
                comp.listData = data;
            });
        }
    }

    // _createFormComponent(container: ViewContainerRef, type: FormComponentType): Promise<any> {
        // const p = new Promise((resolve) => {
        //     const c: FormComponent = this._createComponent(container, type.component);
        //     c.initConfig(type);
        //     resolve(c);
        // });
        // return p;
    // }
}
