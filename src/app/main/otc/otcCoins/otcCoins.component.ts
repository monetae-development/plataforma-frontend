import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { OTCCoinsServiceProxy, OTCCoinDto , CryptoApis } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditOTCCoinModalComponent } from './create-or-edit-otcCoin-modal.component';
import { ViewOTCCoinModalComponent } from './view-otcCoin-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './otcCoins.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class OTCCoinsComponent extends AppComponentBase {

    @ViewChild('createOrEditOTCCoinModal', { static: true }) createOrEditOTCCoinModal: CreateOrEditOTCCoinModalComponent;
    @ViewChild('viewOTCCoinModalComponent', { static: true }) viewOTCCoinModal: ViewOTCCoinModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    nameFilter = '';
    keyFilter = '';
    maxBaseFeeFilter: number;
	maxBaseFeeFilterEmpty: number;
	minBaseFeeFilter: number;
	minBaseFeeFilterEmpty: number;
    maxTradingFeeFilter: number;
	maxTradingFeeFilterEmpty: number;
	minTradingFeeFilter: number;
	minTradingFeeFilterEmpty: number;
    publishFilter = -1;
    cryptoApis = CryptoApis;

    constructor(
        injector: Injector,
        private _otcCoinsServiceProxy: OTCCoinsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getOTCCoins(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._otcCoinsServiceProxy.getAll(
            this.filterText,
            this.nameFilter,
            this.keyFilter,
            this.maxBaseFeeFilter == null ? this.maxBaseFeeFilterEmpty : this.maxBaseFeeFilter,
            this.minBaseFeeFilter == null ? this.minBaseFeeFilterEmpty : this.minBaseFeeFilter,
            this.maxTradingFeeFilter == null ? this.maxTradingFeeFilterEmpty : this.maxTradingFeeFilter,
            this.minTradingFeeFilter == null ? this.minTradingFeeFilterEmpty : this.minTradingFeeFilter,
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

    createOTCCoin(): void {
        this.createOrEditOTCCoinModal.show();
    }

    deleteOTCCoin(otcCoin: OTCCoinDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._otcCoinsServiceProxy.delete(otcCoin.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
