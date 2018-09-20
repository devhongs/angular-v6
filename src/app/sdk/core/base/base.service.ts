import {
    ComponentFactory, ComponentFactoryResolver, ComponentRef,
    EventEmitter, Injectable, Type, ViewContainerRef, Compiler
} from '@angular/core';

import { AddComponentType, AddModuleType } from './base.type';
import { Util } from '../../utils/utils';


@Injectable()
export class BaseService {

    // private _sendmsg: EventEmitter<any> = new EventEmitter();
    private __appView__: ViewContainerRef;

    constructor(private _resolver: ComponentFactoryResolver) { }

    set appView(appView: ViewContainerRef) {
        this.__appView__ = appView;
    }

    get appView() {
        return this.__appView__;
    }

    addComponent(info: AddComponentType): Promise<ComponentRef<any>> {
        return new Promise((resolve: any, reject: any) => {
            const container: ViewContainerRef = info.container;
            const resolver: ComponentFactoryResolver = info.resolver || this._getResolver(info.container);
            const component: Type<any> = info.component;
            const factory: ComponentFactory<any> = resolver.resolveComponentFactory(component);
            const ref: ComponentRef<any> = container.createComponent(factory);
            if (info.config) {
                ref.instance['config'] = info.config;
            }
            resolve(ref);
        });
    }

    _getResolver(container: ViewContainerRef): ComponentFactoryResolver {
        const injector = container.injector;
        const resolver = injector.get(ComponentFactoryResolver);
        return resolver;
    }

    addModule(info: AddModuleType): Promise<any> {
        const compiler: Compiler = Util.Injector.getService(Compiler);
        return compiler
            .compileModuleAndAllComponentsAsync(info.module)
            .then((mod) => {
                const factory = mod.componentFactories.find((comp: any) => {
                    if ((<any>info.module).config) {
                        return comp.componentType === (<any>info.module).config.component;
                    }
                    return false;
                });
                const cmp: ComponentRef<any> = info.container.createComponent(factory);
                if (info.config) {
                    cmp.instance['config'] = info.config;
                }
                return cmp;
            });
    }

    showModal() {

    }

    showBlock() {

    }

    hideBlock() {

    }
}
