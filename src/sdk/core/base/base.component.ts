import { ComponentRef, Input, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseService } from './base.service';
import { Util } from '../../utils/utils';
import { LifeCycleBase } from './life-cycle-base';

/**
 * UI Base Component
 */
// @Component({
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     encapsulation: ViewEncapsulation.None
// })
export class BaseComponent extends LifeCycleBase {

    element: HTMLElement;

    private __uuid__: string;
    private __class__: string;
    private __width__: number;
    private __height__: number;
    private __visible__: boolean;
    private __disabled__: boolean;
    private __cls__: string;
    private __service__: BaseService;
    private __subscriptions__: Subscription[] = [];
    private __cmps__: ComponentRef<any>[] = [];

    @Input()
    set uuid(value: string) {
        this.__uuid__ = value;
        this._setIdAttribute();
    }
    get uuid(): string {
        return this.__uuid__;
    }

    @Input()
    set class(value: string) {
        this.__class__ = value;
    }
    get class() {
        return this.__class__;
    }

    @Input()
    set width(value: number) {
        this.__width__ = value;
    }
    get width(): number {
        return this.__width__;
    }

    @Input()
    set height(value: number) {
        this.__height__ = value;
    }
    get height(): number {
        return this.__height__;
    }

    @Input()
    set visible(value: boolean) {
        this.__visible__ = value;
    }
    get visible(): boolean {
        return this.__visible__;
    }

    @Input()
    set disabled(value: boolean) {
        this.__disabled__ = value;
    }
    get disabled(): boolean {
        return this.__disabled__;
    }

    protected setComponent(cmp: ComponentRef<any>) {
        this.__cmps__.push(cmp);
    }

    // get service(): MIComponentService {
    //     if (!this._service) {
    //         this._service = Util.Injector.getService(MIComponentService);
    //     }
    //     return this._service;
    // }

    @Input()
    protected set cls(value: string) {
        if (!this.element) {
            console.log('You must set container (ViewContainerRef) in constructor of child class');
            return;
        }
        if (this.__cls__) {
            Util.Dom.removeCls(this.element, this.__cls__);
        }
        setTimeout((_: any) => {
            Util.Dom.addCls(this.element, value);
            this.__cls__ = value;
        }, 0);
    }

    protected get el() {
        return this.element;
    }

    protected get cls() {
        return this.__cls__;
    }

    protected set subscription(sub: Subscription) {
        this.__subscriptions__.push(sub);
    }

    protected get service(): BaseService {
        if (!this.__service__) {
            this.__service__ = Util.Injector.getService(BaseService);
        }
        return this.__service__;
    }

    constructor(protected _viewContainerRef?: ViewContainerRef) {
        super();
        if (_viewContainerRef) {
            this.element = this._viewContainerRef.element.nativeElement;
        }
        // this.dom = Util.Dom;
        this.initUuid();
    }

    destroy() {
        if (this.__subscriptions__.length > 0) {
            this.__subscriptions__.forEach((sub: Subscription) => {
                sub.unsubscribe();
                sub = undefined;
            });
            this.__subscriptions__ = [];
        }
        if (this.__cmps__.length > 0) {
            this.__cmps__.forEach((cmp: ComponentRef<any>) => {
                cmp.destroy();
                cmp = undefined;
            });
            this.__cmps__ = [];
        }
    }

    initUuid(type: string = 'p') {
        this.uuid = `${type}__${Util.UUID.new()}`;
    }

    _setIdAttribute() {
        if (!this.element.hasAttribute('id') || this.element.hasAttribute('id') === null) {
            this.element.setAttribute('id', this.uuid);
        }
    }

    getBox(el: any) {
        return Util.Dom.getSize(el);
    }

    getService(service: any) {
        return Util.Injector.getService(service);
    }

    setAppViewContainer(appView: ViewContainerRef) {
        this.service.appView = appView;
    }

    // showDrawer(drawerType: MIDrawerType) {
    //     const component: ComponentRef<MIDrawer> = this.service.showDrawer(drawerType);
    //     const drawer: MIDrawer = component.instance;
    //     drawer.config = drawerType;
    //     drawer.show();
    //     this.subscription = drawer.hided.subscribe((e: any) => {
    //         component.destroy();
    //     });
    //     return drawer;
    // }

    // showModal(modalType: MIModalType) {
    //     const component: ComponentRef<MIModal> = this.service.showModal(modalType);
    //     const modal: MIModal = component.instance;
    //     modal.config = modalType;
    //     modal.show();
    //     this.subscription = modal.hided.subscribe((e: any) => {
    //         component.destroy();
    //     });
    //     return modal;
    // }
}
