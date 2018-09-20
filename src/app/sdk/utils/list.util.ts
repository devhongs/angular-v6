import { QueryList } from '@angular/core';
export class ListUtil {
    static findIndex(data: any, field: string, value: any): number {
        let index: number = -1;
        if (!data) return index;
        data.forEach((d: any, i: number) => {
            if (d[field] === value) index =  i;
        });
        return index;
    }

    static findItem(data: any, field: string, value: any): any {
        let result: any = null;
        if (!data) return result;
        data.forEach((d: any, i: number) => {
            if (d[field] === value) result = d;
        });
        return result;
    }

    static getChildren(children: any, query:QueryList<any>): any {
        if (children && children.length > 0) {
            return children;
        } else if (query) {
            return query.toArray();
        }
        return [];
    }

    static applyProperty(from: any, to: any, exclude: any = []) {
        for (let p in to) {
            if (exclude.indexOf(p) === -1) {
                from[p] = to[p];
            }
        }
    }
}
