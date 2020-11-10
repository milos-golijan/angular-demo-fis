import { Component, Input, OnInit } from '@angular/core';

export type TableColumnDefinition = {
    field: string,
    width?: number,
    filter?: boolean,
    rowGroup?: boolean,
    sortable?: boolean,
    editable?: boolean,
    checkboxSelection?: boolean
};

export type TableOptions = {
    pagination?: boolean,
    singleClickEdit?: boolean,
    paginationPageSize?: number,
    defaultColDef?: TableColumnDefinition
    // add other needed options from https://www.ag-grid.com/javascript-grid-properties/
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    @Input() data: any[];
    @Input() options: TableOptions;
    @Input() columns: TableColumnDefinition[];
    public constructor() { }
    public ngOnInit(): void {
        if (!this.options) {
            this.options = {
                // default options
            };
        }
    }
}
