import {ModuleWithProviders, NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Form} from "./builder/form";
import {FormBuilder} from "./builder/form-builder";
import {FormComponent} from "./builder/form-component";
import {FormComponentChild} from "./builder/form-component-child";
import {FormItem} from "./builder/form-item";

@NgModule({
    imports: [
        CommonModule,
        // BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        // BrowserAnimationsModule
    ],
    declarations: [
        Form,
        FormItem,
        FormComponent,
        FormComponentChild,
    ],
    exports: [
        Form,
        FormItem,
        FormComponent,
        FormComponentChild,
    ],
    // providers: [
    //     FormBuilder
    // ]
})
export class FormModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: FormModule,
            providers: [
                FormBuilder
            ]
        };
    }
}
