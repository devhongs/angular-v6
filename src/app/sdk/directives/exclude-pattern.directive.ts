import { Directive, ElementRef, Input, Output, EventEmitter, Renderer, HostListener } from '@angular/core';
import { UnicodeUtil } from '../utils/unicode.util';

@Directive({
    selector: '[excludePattern]'
})
export class ExcludePatternDirective {
    pattern: any;
    isFocusin: boolean;
    oldPosition: number;

    @Input() set excludePattern(value: any) {
        if (value && value.length > 0) {
            this.pattern = new RegExp(value, 'g');
        }
    }

    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    @HostListener('focusin', ['$event']) onFocusin(event) {
        this.isFocusin = true;
    }

    @HostListener('keyup', ['$event']) onKeyup(event) {
        this._excute();
    }

    @HostListener('blur', ['$event']) onBlur(event) {
        console.log('blur -----------------------');
        console.log('blur selectionStart', this.el.nativeElement.selectionStart);
        // this._excute();
    }

    constructor(private el: ElementRef, private render: Renderer) {

    }

    _excute() {
        if (!this.pattern) return null;

        let element = this.el.nativeElement;
        let value = element.value;
        let gap = this.calcGap(value); //1;//this.isEnglish(value, this.pattern) ? 1 : 2;
        let pos = element.selectionStart - gap;
        let isMatch = this.regexpMatch(value, this.pattern);

        if (isMatch) {
            value = this.regexp(value, this.pattern);
            this.render.setElementProperty(element, 'value', value);
            this.ngModelChange.emit(value);
            element.selectionStart = pos;
            element.selectionEnd = pos;
            this.oldPosition = pos;
        }
    }

    calcGap(value: any): number {
        let gap: number = 1;
        let isEnglish: boolean = this.isEnglish(value, this.pattern);
        let pos: number = this.el.nativeElement.selectionStart;
        let posGap: number = isEnglish ? 1 : 2;
        let isDifferent: boolean = (pos - posGap) !== this.oldPosition;

        if (this.isFocusin) {
            this.isFocusin = false;
            gap = 1;
        } else if(isDifferent) {
            gap = 1;
        } else {
            gap = isEnglish ? 1 : 2;
        }
        return gap;
    }

    regexp(value: any, pattern: any) {
        pattern.lastIndex = 0;
        if (pattern.test(value)) {
            value = value.replace(pattern, '');
        }
        return value;
    }

    regexpMatch(value: any, pattern: any) {
        pattern.lastIndex = 0;
        if (pattern.test(value)) {
            return true;
        }
        return false;
    }

    isEnglish(value: any, pattern: any): boolean {
        pattern.lastIndex = 0;
        let result = pattern.exec(value);
        let data = result ? result[0] : null;
        let size = 1;
        if (data) {
            size = UnicodeUtil.chr_byte(data);
        }
        return size === 1;
    }
}
