﻿import { Component, ViewChild, Injector, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CatActivityEconomicsServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatActivityEconomicCatActivityEconomicCategoryLookupTableDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomics/CatActivityEconomicCatActivityEconomicCategoryLookupTableDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';

@Component({
    selector: 'catActivityEconomicCatActivityEconomicCategoryLookupTableModal',
    styleUrls: ['./catActivityEconomic-catActivityEconomicCategory-lookup-table-modal.component.less'],
    encapsulation: ViewEncapsulation.None,
    templateUrl: './catActivityEconomic-catActivityEconomicCategory-lookup-table-modal.component.html'
})
export class CatActivityEconomicCatActivityEconomicCategoryLookupTableModalComponent extends AppComponentBase {

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    filterText = '';
    id: number;
    displayName: string;
    active = false;
    saving = false;

    constructor(
        injector: Injector,
        private _catActivityEconomicsServiceProxy: CatActivityEconomicsServiceProxy
    ) {
        super(injector);
    }

    show(): void {
        this.active = true;
        this.paginator.rows = 5;
        this.getAll();
        this.modal.show();
    }

    getAll(event?: LazyLoadEvent) {
        if (!this.active) {
            return;
        }

        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catActivityEconomicsServiceProxy.getAllCatActivityEconomicCategoryForLookupTable(
            this.filterText,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    setAndSave(catActivityEconomicCategory: CatActivityEconomicCatActivityEconomicCategoryLookupTableDto) {
        this.id = catActivityEconomicCategory.id;
        this.displayName = catActivityEconomicCategory.displayName;
        this.active = false;
        this.modal.hide();
        this.modalSave.emit(null);
    }

    close(): void {
        this.active = false;
        this.modal.hide();
        this.modalSave.emit(null);
    }
}
