import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ViewBase } from '../../core/ViewBase';

@Component({
    selector: 'prime-grid-table',
    template: `
        <p-dataTable [value]="gridData"
                     [scrollable]="true"
                     scrollWidth="800px"
                     scrollHeight="300px"
                     [rows]="20"
                     [lazy]="true"
                     [loading]="loading"
                     [totalRecords]="totalRecords"
                     virtualScroll="virtualScroll"
                     (onLazyLoad)="loadCarsLazy($event)">
            <p-column field="ID" header="ID" [style]="{'width':'100px'}"></p-column>
            <p-column field="NAME" header="NAME" [style]="{'width':'100px'}"></p-column>
            <p-column *ngFor="let col of dynamicColumns" [field]="col.field" [header]="col.header" [style]="{'width':'100px'}">
                <ng-template let-row="rowData" pTemplate="body">
                    <div [style.background]="row['COLOR']">{{row[col.field]}}</div>
                </ng-template>
            </p-column>
        </p-dataTable>
    `
})
export class PrimeGridTableComponent extends ViewBase {
    // primeng
    colSize: number = 40;
    rowSize: number = 100;
    response: any = this.makeData();
    gridData: any = [];
    dynamicRows: number = 20;
    dynamicColumns: any = [];
    loading: boolean;
    totalRecords: number = 100;

    initComponent() {
        this.dynamicColumns = this.getDynamicColumns();
    }

    makeData(): Array<any> {
        const v = [];
        const colors = ['lightblue','lightcoral','lightgray'];
        const columns = this.getColumns().concat(['ID', 'NAME']);
        const rowSize = this.rowSize;
        for (let i=1; i<=rowSize; i++) {
            const row = {};
            row['COLOR'] = colors[Math.floor(Math.random() * 3)];
            columns.forEach((key:any) => {
                row[key] = i;
            });
            v.push(row);
        }
        return v;
    }

    getColumns() {
        const v = [];
        const colSize = this.colSize;
        for (let i=1; i<=colSize; i++) {
            v.push('COL'+i);
        }
        return v;
    }

    getDynamicColumns() {
        const v = [];
        const columns = this.getColumns();
        columns.forEach((key:any) => {
            v.push({
                field: key,
                header: key
            });
        });
        return v;
    }

    loadCarsLazy(event: LazyLoadEvent) {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.gridData = this.response.slice(event.first, this.dynamicRows);
        }, 2000);
    }
}

