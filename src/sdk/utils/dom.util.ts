export class DomUtil {

    static hasCls(dom: HTMLElement, className: string) {
        //This will be deprecated because we can use dom.classList.contains(className);
        //when click chart, cls is object e.g) SVGAnimatedString {animalVal, baseVal}
        return dom.classList.contains(className);
    }

    static addCls(dom: HTMLElement, className: string) {
        //This will be deprecated because we can use dom.classList.add(className);
        dom.classList.add(className);
    }

    static removeCls(dom: any, className: string) {
        //This will be deprecated because we can use dom.classList.remove(className);
        if (!dom.nodeName) {
            //HTMLCollection
            if (dom.length > 0) {
                dom = Array.prototype.slice.call(dom);
                Array.prototype.forEach.call(dom, (_dom: any) => _dom.classList.remove(className));
            }
        } else {
            dom.classList.remove(className);
        }
    }

    static toggleCls(dom: HTMLElement, className: string) {
        //This will be deprecated because we can use dom.classList.toggle(className);
        dom.classList.toggle(className);
    }

    static replaceCls(dom: HTMLElement, oldClassName: string, newClassName: string) {
        //dom.classList.replace(oldClassName,newClassName);
        this.removeCls(dom, oldClassName);
        this.addCls(dom, newClassName);
    }

    static _parseCls(className: string, separator: string) {
        let arr = className.split(separator);
        if (arr.length > 1) {
            return arr[1].split(' ')[0];
        }
        return '';
    }

    static parseCls(dom: any, separator: string) {
        const className: string = typeof dom === 'string' ? dom : dom.className;
        return this._parseCls(className, separator);
    }

    static parseClsInt(dom: any, separator: string) {
        let val = this.parseCls(dom, separator);
        return val ? parseInt(val) : -1;
    }

    // selector: class name(.class-name) or tag name (tm-componentname)
    static findParent(dom: any, selector: string, depth: number = 10) {
        let cls = '';
        let resultDom: any;
        if (!dom || !dom.nodeName) {
            return null;
        }
        if (selector[0] === '.') {
            cls = selector.split('.')[1];
        }

        while (depth--) {
            if (!dom || dom.nodeName === 'BODY') {
                resultDom = null;
                break;
            }
            if (cls) {
                if (this.hasCls(dom, cls)) {
                    resultDom = dom;
                    break;
                }
            } else {
                if (dom.nodeName.toLowerCase() === selector.toLowerCase()) {
                    resultDom = dom;
                    break;
                }
            }
            dom = dom.parentNode;
        }
        return resultDom;
    }

    /**
     * for className and Id
     */
    static getEl(parentEl: HTMLElement, selector: string, firstOnly: boolean = true) {
        let cls = '';
        let els: any;
        if (selector[0] === '.') {
            cls = selector.split('.')[1];
        }
        if (cls) {
            els = parentEl.getElementsByClassName(cls);
            if (els && els.length > 0) {
                return firstOnly ? els[0] : els;
            }
        } else {
            return document.getElementById(selector);
        }
        return false;
    }

    static getSize(dom: HTMLElement) {
        let size = this.getBox(dom);
        let style = dom.style;
        if (style.display === 'none') {
            style.visibility = 'hidden';
            style.display = '';
            size = this.getBox(dom);
            style.visibility = '';
            style.display = 'none';
        } else if (style.height === '0' || style.height === '0px') {
            style.visibility = 'hidden';
            let position = style.position || '';
            style.position = 'absolute';
            style.height = '';
            size = this.getBox(dom);
            style.visibility = '';
            style.height = '0px';
            style.position = position;
        }
        return size;
    }

    //deprecated? Element.getBoundingClientRect()
    static getBox(el: any) {
        let x = 0,
            y = 0,
            checkFirst = false,
            cX = 0,
            cY = 0,
            box = {
                width: el.offsetWidth,
                height: el.offsetHeight,
                top: 0,
                left: 0,
                bodyWidth: window.document.body.offsetWidth,
                bodyHeight: window.document.body.offsetHeight,
                childTop: 0,
                childLeft: 0
            };
        while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            x += el.offsetLeft - el.scrollLeft;
            y += el.offsetTop - el.scrollTop;
            if (!checkFirst) {
                cX = x;
                cY = y;
                checkFirst = true;
            }
            el = el.offsetParent;
        }
        box.top = y;
        box.left = x;
        box.childTop = cY;
        box.childLeft = cX;
        return box;
    }

    static setSize(el: any, w: number, h: number) {
        el.style.width = w + 'px';
        el.style.height = h + 'px';
    }

    static removeDom(dom: HTMLElement) {
        dom.parentElement.removeChild(dom);
        dom = null;
    }

    static stringToElement(html: string) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.children[0];
    }

    static getViewportSize() {
        const bodyEl = document.documentElement;
        return { width: bodyEl.clientWidth, height: bodyEl.clientHeight };
    }
}
