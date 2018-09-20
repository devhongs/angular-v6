import { Directive, ElementRef, Input, Output, EventEmitter, Renderer, HostListener } from '@angular/core';
import { UnicodeUtil } from '../utils/unicode.util';

@Directive({
    selector: '[maxSize]'
})
export class MaxSizeDirective {
    limit: number;

    @Input() set maxSize(value: any) {
        if (value && value.length > 0) {
            this.limit = Number(value);
        }
    }

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    @HostListener('keyup', ['$event']) onInputChange(event) {
        this._excute();
    }

    @HostListener('blur', ['$event']) onBlurChange(event) {
        this._excute();
    }

    constructor(private el: ElementRef, private render: Renderer) {

    }

    _excute() {
        if (!this.limit) return null;

        let element = this.el.nativeElement;
        let pos = element.selectionStart;
        let value = element.value;
        let size = UnicodeUtil.unicode_length(value);

        if (size > this.limit) {
            console.log('asis', value.length);
            value = UnicodeUtil.unicode_substring(value, this.limit);
            this.render.setElementProperty(element, 'value', value);
            this.ngModelChange.emit(value);
            element.selectionStart = pos;
            element.selectionEnd = pos;
            console.log('tobe', value.length);
        }
    }
}
