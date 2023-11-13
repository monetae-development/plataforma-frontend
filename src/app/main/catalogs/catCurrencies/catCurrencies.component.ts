import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatCurrenciesServiceProxy, CatCurrencyDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatCurrencyModalComponent } from './create-or-edit-catCurrency-modal.component';
import { ViewCatCurrencyModalComponent } from './view-catCurrency-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
@Component({
    templateUrl: './catCurrencies.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatCurrenciesComponent extends AppComponentBase {

    @ViewChild('createOrEditCatCurrencyModal', { static: true }) createOrEditCatCurrencyModal: CreateOrEditCatCurrencyModalComponent;
    @ViewChild('viewCatCurrencyModalComponent', { static: true }) viewCatCurrencyModal: ViewCatCurrencyModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    symbolFilter = '';
    publishFilter = -1;

    constructor(
        injector: Injector,
        private _catCurrenciesServiceProxy: CatCurrenciesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatCurrencies(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catCurrenciesServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.symbolFilter,
            this.publishFilter,
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

    createCatCurrency(): void {
        this.createOrEditCatCurrencyModal.show();
    }

    deleteCatCurrency(catCurrency: CatCurrencyDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catCurrenciesServiceProxy.delete(catCurrency.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catCurrenciesServiceProxy.getCatCurrenciesToExcel(
        this.filterText,
            this.titleFilter,
            this.symbolFilter,
            this.publishFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
