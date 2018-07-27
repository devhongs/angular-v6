export class DataUtil {

    static isTrueProperty(val: any): boolean {
        if (typeof val === 'string') {
            val = val.toLowerCase().trim();
            return (val === 'true' || val === 'on' || val === '');
        }
        return !!val;
    }

    static isCheckedProperty(a: any, b: any): boolean {
        if (a === undefined || a === null || a === '') {
            return (b === undefined || b === null || b === '');
        } else if (a === true || a === 'true') {
            return (b === true || b === 'true');

        } else if (a === false || a === 'false') {
            return (b === false || b === 'false');

        } else if (a === 0 || a === '0') {
            return (b === 0 || b === '0');
        }
        return (a === b);
    }

    static selectedItemByKey(data: any, key: string, value: string): any {
        let item: any = null;
        if (data === null || data.length === 0) return item;
        data.forEach((d: any, i: number): any => {
            if (d[key] === value) {
                item = d;
                return false;
            }
        });
        return _.clone(item);
    }

    static filterByKey(data: any, key: string, value: any): any {
        let items: any[] = [];
        if (data === null || data.length === 0) return items;
        items = _.filter(data, (d: any): any => {
            if (value instanceof Array) return _.indexOf(value, d[key]) > -1;
            return d[key] == value;
        });
        return _.clone(items);
    }

    static isEnoughCondition(obj: any, keys: string[]) {
        // widget 공통에서 처리 예정
        return true;
    }

    static isObject(item: any): boolean {
        return (item && typeof item === 'object' && !Array.isArray(item) && item !== null);
    }

    /**
     * Deep merge two objects.
     * @param target
     * @param source
     */
    static mergeDeep(target: any, source: any): any {
        return $.extend(true, target, source);
    }

    static getValueFromJson(name: string, json: any): any {
        let value: any = json[name];
        if (value) { return value; }

        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (key === name) {
                    value = json[key];
                    return;
                }
                else if (DataUtil.isObject(json[key])) {
                    value = DataUtil.getValueFromJson(name, json[key]);
                    return;
                }
            }
        }
        return value;
    }

    static setValueToJson(name: string, value: string, json: any) {
        for (const key in json) {
            if (json.hasOwnProperty(key)) {
                if (key === name) {
                    json[key] = value;
                    return;
                } else if (DataUtil.isObject(json[key])) {
                    DataUtil.setValueToJson(name, value, json[key]);
                }
            }
        }
    }

    static nvl(value: any, defaulValue: any = ''): any {
        if (DataUtil.isNull(value)) {
            return defaulValue;
        }
        return value;
    }

    static isNull(value: any): boolean {
        if (_.isNull(value) || _.isUndefined(value)) {
            return true;
        }
        return false;
    }

    static isNotNull(value: any): boolean {
        if (_.isNull(value) || _.isUndefined(value)) {
            return false;
        }
        return true;
    }

    static clone(o: any) {
        let newO: any, i: any;
        if (!o || typeof o !== 'object') {
            return o;
        }
        if ('[object Array]' === Object.prototype.toString.apply(o)) {
            newO = [];
            for (i = 0; i < o.length; i += 1) {
                newO[i] = this.clone(o[i]);
            }
            return newO;
        }
        newO = {};
        for (i in o) {
            if (o.hasOwnProperty(i)) {
                newO[i] = this.clone(o[i]);
            }
        }
        return newO;
    }

    static assign(target: any, varArgs: any) { // .length of function is 2
        if (!target) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }

        let to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            let nextSource = arguments[index];

            if (nextSource) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    }

    static convertUnderscoreToCamel(s: string) {
        return s.toLowerCase().replace(/_[a-z]/g, (cs) => cs[1].toUpperCase());
    }

    static filter(items: any[], _filter: any) {
        if (_filter && items && items.length > 0) {
            if (Array.isArray(_filter)) {
                items = items.filter((item:any) => {
                    let i = 0, len = _filter.length, f;
                    for (;i<len;i++) {
                        f = _filter[i];
                        if (item[f.property] === f.value) {
                            return true;
                        }
                    }
                    return false;
                });
            } else {
                items = items.filter(_filter);
            }
        }
        return items;
    }

    static search(items: any[], term: string, displayField: string = 'displayName') {
        let txt, ts:any, i=0,len:number;
        if (term) {
            ts = term.toLowerCase().trim().split(' ');
            len = ts.length;
            items = items.filter((item: any) => {
                txt = item[displayField].toLowerCase();
                i = 0;
                for (;i<len;i++) {
                    if (txt.indexOf(ts[i]) > -1) {
                        return true;
                    }
                }
                return false;
            });
        }
        return items;
    }

    static group(items: any[], groupField: string, valueField: string, displayField: string) {
        let groupItem: any, groupItems = [], groupName = '', i = 0, item, len = items.length;
        if (groupField) {
            for (;i<len;i++) {
                item = items[i];
                if (groupName !== item[groupField]) {
                    groupName = item[groupField];
                    groupItem = { isGroupHeader: true };
                    groupItem[valueField] = '_group_idx_' + i;
                    groupItem[displayField] = groupName;
                    groupItems.push(groupItem);
                }
            }
            items = groupItems;
        }
        return items;
    }

    static buildIndex(items: any, idField: string = 'id', defaultValueField: string = '', _filter: any = null) {
        let idxes: any = {};
        let idx: any;
        let item: any;
        let id: any;
        let selectedIds: any = {};
        let defaultSelectedIds = [];
        let hasSelectedId = false;
        items = this.filter(items, _filter);
        for (idx in items) {
            item = items[idx];
            id = item[idField];
            item.__idx__ = idx;
            idxes[id] = idx;
            if (defaultValueField) {
                if (item[defaultValueField]) {
                    defaultSelectedIds.push(item.id);
                }
            }
            if (item.selected) {
                selectedIds[id] = true;
                hasSelectedId = true;
            }
            items[idx] = item;
        }
        if (!hasSelectedId && defaultSelectedIds.length > 0) {
            for (let id of defaultSelectedIds) {
                selectedIds[id] = true;
                items[idxes[id]].selected = true;
            }
        }
        return {items:items,indexes:idxes,selectedIds:selectedIds};
    }

    static defaults(dest: any, ...args: any[]) {
        for (let i = arguments.length - 1; i >= 1; i--) {
            let source = arguments[i];
            if (source) {
                for (let key in source) {
                    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                        dest[key] = source[key];
                    }
                }
            }
        }
        return dest;
    }

    static isBoolean(val: any): val is boolean {
        return typeof val === 'boolean';
    }

    static isString(val: any): val is string {
        return typeof val === 'string';
    }

    static isNumber(val: any): val is number {
        return typeof val === 'number';
    }

    static isFunction(val: any): val is Function {
        return typeof val === 'function';
    }

    static isDefined(val: any): boolean {
        return typeof val !== 'undefined';
    }

    static isUndefined(val: any): val is undefined {
        return typeof val === 'undefined';
    }

    static isPresent(val: any): val is any {
        return val !== undefined && val !== null;
    }

    static isBlank(val: any): val is null {
        return val === undefined || val === null;
    }

    static isArray(val: any): val is any[] {
        return Array.isArray(val);
    }

    static isPrimitive(val: any) {
        return DataUtil.isString(val) || DataUtil.isBoolean(val) || (DataUtil.isNumber(val) && !isNaN(val));
    }

}

