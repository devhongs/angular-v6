import { ComponentFactoryResolver, Type, ViewContainerRef } from '@angular/core';

export interface AddComponentType {
    component: Type<any>;
    container: ViewContainerRef;
    resolver?: ComponentFactoryResolver;
    type?: string; // component, drawer, modal
    config?: any;
    params?: any;
    requester?: any;
}

export interface AddModuleType {
    module: Type<any>;
    container: ViewContainerRef;
    resolver?: ComponentFactoryResolver;
    type?: string; // component, drawer, modal
    config?: any;
    params?: any;
    requester?: any;
}

export interface IPluginModuleConfig {
    component: any;
    config?: any;
}