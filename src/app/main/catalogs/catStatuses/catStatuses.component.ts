import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatStatusesServiceProxy, CatStatusDto , StatusType } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatStatusModalComponent } from './create-or-edit-catStatus-modal.component';
import { ViewCatStatusModalComponent } from './view-catStatus-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

@Component({
    templateUrl: './catStatuses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatStatusesComponent extends AppComponentBase {

    @ViewChild('createOrEditCatStatusModal', { static: true }) createOrEditCatStatusModal: CreateOrEditCatStatusModalComponent;
    @ViewChild('viewCatStatusModalComponent', { static: true }) viewCatStatusModal: ViewCatStatusModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    statusFilter = -1;
    publishFilter = -1;
    statusType = StatusType;

    constructor(
        injector: Injector,
        private _catStatusesServiceProxy: CatStatusesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatStatuses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catStatusesServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.statusFilter,
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

    createCatStatus(): void {
        this.createOrEditCatStatusModal.show();
    }

    deleteCatStatus(catStatus: CatStatusDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catStatusesServiceProxy.delete(catStatus.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catStatusesServiceProxy.getCatStatusesToExcel(
        this.filterText,
            this.titleFilter,
            this.statusFilter,
            this.publishFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
