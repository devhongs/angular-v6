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
    private __width__: number;
    private __height__: number;
    private __visible__: boolean;
    private __disabled__: boolean;
    private __subscriptions__: Subscription[] = [];

    @Input()
    set uuid(value: string) {
        this.__uuid__ = value;
    }
    get uuid(): string {
        return this.__uuid__;
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

    protected set subscription(sub: Subscription) {
        this.__subscriptions__.push(sub);
    }

    constructor() {
        super();
        this.initUuid();
    }

    preInit() {

    }

    destroy() {
        if (this.__subscriptions__.length > 0) {
            this.__subscriptions__.forEach((sub: Subscription) => {
                sub.unsubscribe();
                sub = undefined;
            });
            this.__subscriptions__ = [];
        }
    }

    initUuid(type: string = 'p') {
        this.uuid = `${type}__${Util.UUID.new()}`;
    }
}
