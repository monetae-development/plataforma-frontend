import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MntEconomicInfosServiceProxy, MntEconomicInfoDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntEconomicInfoModalComponent } from './create-or-edit-mntEconomicInfo-modal.component';
import { ViewMntEconomicInfoModalComponent } from './view-mntEconomicInfo-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './mntEconomicInfos.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MntEconomicInfosComponent extends AppComponentBase {
    @ViewChild('createOrEditMntEconomicInfoModal', { static: true }) createOrEditMntEconomicInfoModal: CreateOrEditMntEconomicInfoModalComponent;
    @ViewChild('viewMntEconomicInfoModalComponent', { static: true }) viewMntEconomicInfoModal: ViewMntEconomicInfoModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxIncomeFilter: number;
	maxIncomeFilterEmpty: number;
	minIncomeFilter: number;
	minIncomeFilterEmpty: number;
    maxExpectedTransactionsFilter: number;
	maxExpectedTransactionsFilterEmpty: number;
	minExpectedTransactionsFilter: number;
	minExpectedTransactionsFilterEmpty: number;
    proofIncomeFilter = '';
    taxReturnFilter = '';
    catProfessionTitleFilter = '';
    catSourceFoundsTitleFilter = '';
    mntMemberCommentsFilter = '';

    constructor(
        injector: Injector,
        private _mntEconomicInfosServiceProxy: MntEconomicInfosServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getMntEconomicInfos(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._mntEconomicInfosServiceProxy.getAll(
            this.filterText,
            this.maxIncomeFilter == null ? this.maxIncomeFilterEmpty : this.maxIncomeFilter,
            this.minIncomeFilter == null ? this.minIncomeFilterEmpty : this.minIncomeFilter,
            this.maxExpectedTransactionsFilter == null ? this.maxExpectedTransactionsFilterEmpty : this.maxExpectedTransactionsFilter,
            this.minExpectedTransactionsFilter == null ? this.minExpectedTransactionsFilterEmpty : this.minExpectedTransactionsFilter,
            this.proofIncomeFilter,
            this.taxReturnFilter,
            this.catProfessionTitleFilter,
            this.catSourceFoundsTitleFilter,
            this.mntMemberCommentsFilter,
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

    createMntEconomicInfo(): void {
        this.createOrEditMntEconomicInfoModal.show();
    }


    deleteMntEconomicInfo(mntEconomicInfo: MntEconomicInfoDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._mntEconomicInfosServiceProxy.delete(mntEconomicInfo.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._mntEconomicInfosServiceProxy.getMntEconomicInfosToExcel(
        this.filterText,
            this.maxIncomeFilter == null ? this.maxIncomeFilterEmpty : this.maxIncomeFilter,
            this.minIncomeFilter == null ? this.minIncomeFilterEmpty : this.minIncomeFilter,
            this.maxExpectedTransactionsFilter == null ? this.maxExpectedTransactionsFilterEmpty : this.maxExpectedTransactionsFilter,
            this.minExpectedTransactionsFilter == null ? this.minExpectedTransactionsFilterEmpty : this.minExpectedTransactionsFilter,
            this.proofIncomeFilter,
            this.taxReturnFilter,
            this.catProfessionTitleFilter,
            this.catSourceFoundsTitleFilter,
            this.mntMemberCommentsFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
