import {
    Input,
    OnInit,
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

export type TableColumnDefinition = {
    field: string,
    width?: number,
    filter?: boolean,
    rowGroup?: boolean,
    sortable?: boolean,
    editable?: boolean,
    checkboxSelection?: boolean,
    valueSetter?: (params: any) => any,
    valueGetter?: (params: any) => boolean
};

export type TableOptions = {
    editType?: string;
    pagination?: boolean,
    singleClickEdit?: boolean,
    paginationPageSize?: number,
    defaultColDef?: TableColumnDefinition
    // add other needed options from https://www.ag-grid.com/javascript-grid-properties/
};

export const DEFAULT_TABLE_OPTIONS = {
    // default options
};

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {

    @Input() data: any[];
    @Input() options: TableOptions;
    @Input() columns: TableColumnDefinition[];
    @Output() updated: EventEmitter<any>;
    public constructor() {
        this.updated = new EventEmitter();
    }
    public ngOnInit(): void {
        if (!this.options) {
            this.options = DEFAULT_TABLE_OPTIONS;
        }
    }
}
