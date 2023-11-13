import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatActivityEconomicsServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatActivityEconomicDto } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomics/CatActivityEconomicDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatActivityEconomicModalComponent } from './create-or-edit-catActivityEconomic-modal.component';
import { ViewCatActivityEconomicModalComponent } from './view-catActivityEconomic-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catActivityEconomics.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatActivityEconomicsComponent extends AppComponentBase {
    @ViewChild('createOrEditCatActivityEconomicModal', { static: true }) createOrEditCatActivityEconomicModal: CreateOrEditCatActivityEconomicModalComponent;
    @ViewChild('viewCatActivityEconomicModalComponent', { static: true }) viewCatActivityEconomicModal: ViewCatActivityEconomicModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    publishFilter = -1;
    catActivityEconomicCategoryTitleFilter = '';

    constructor(
        injector: Injector,
        private _catActivityEconomicsServiceProxy: CatActivityEconomicsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatActivityEconomics(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catActivityEconomicsServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.publishFilter,
            this.catActivityEconomicCategoryTitleFilter,
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

    createCatActivityEconomic(): void {
        this.createOrEditCatActivityEconomicModal.show();
    }

    deleteCatActivityEconomic(catActivityEconomic: CatActivityEconomicDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catActivityEconomicsServiceProxy.delete(catActivityEconomic.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catActivityEconomicsServiceProxy.getCatActivityEconomicsToExcel(
        this.filterText,
            this.titleFilter,
            this.publishFilter,
            this.catActivityEconomicCategoryTitleFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
