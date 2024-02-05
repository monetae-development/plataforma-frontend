import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TradingRequestsServiceProxy } from '@shared/service-proxies/service-trading-requests-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { TradingRequestDto } from '@shared/service-proxies/dto/tradingRequest/TradingRequestDto';
import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ViewTradingRequestModalComponent } from './view-tradingRequest-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { SelectItem } from 'primeng/api';
import { TradingCryptoCurrencyForRequestDto } from '@shared/service-proxies/dto/Trading/TradingCryptoCurrency/TradingCryptoCurrencyForRequestDto';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './tradingRequests.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class TradingRequestsComponent extends AppComponentBase implements OnInit {
    @ViewChild('viewTradingRequestModalComponent', { static: true }) viewTradingRequestModal: ViewTradingRequestModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    cryptoCurrencies: SelectItem[] = [];
    statusOptions: SelectItem[] = [];
    typeOptions: SelectItem[] = [];
    cryptoKeys: TradingCryptoCurrencyForRequestDto[] = [];

    advancedFiltersAreShown = false;
    started = false;

    folioFilter = '';
    userNameFilter = '';
    cryptoFilter: number;
    typeFilter = -1;
    statusFilter = -1;
    requestType = RequestType;
    requestStatus = RequestStatus;

    constructor(
        injector: Injector,
        private _tradingRequestsServiceProxy: TradingRequestsServiceProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._serviceCommonProxy.getSelectOptions('TradingRequests/GetCryptoCurrenciesForSelect', null).subscribe((result) => {
            this.cryptoCurrencies = result.items;
            this.cryptoKeys = [];
            for (const record of result.items) {
                let temp = new TradingCryptoCurrencyForRequestDto();
                temp.id = record.value;
                temp.name = record.label;
                temp.key = record.subtitle;
                this.cryptoKeys.push(temp);
            }
            this.started = true;
        });
        this.statusOptions = this.getSelectOptions(RequestStatus);
        this.typeOptions = this.getSelectOptions(RequestType);
    }

    //TODO: Unificar en un helper
    getSelectOptions(enumObj) {
        let options = [];
        for (const status of Object.values(enumObj)) {
            if (!isNaN(Number(status))) {
                let temp = new GetSelectDto();
                temp.value = status.toString();
                temp.label = this.l(this.getKeyEnum(enumObj, Number(status)));
                options.push(temp);
            }
        }
        return options;
    }

    getKeyEnum(enumObj: any, valor: number): string | undefined {
        const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
        return keys.length > 0 ? keys[0] : undefined;
    }

    getRequests(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._tradingRequestsServiceProxy.getAllRequests(
            this.folioFilter,
            this.userNameFilter,
            this.cryptoFilter,
            this.typeFilter,
            this.statusFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            console.log(result);
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    //TODO:Unificar en un helper
    getDateTimeFormat(input: string, index: number): string {
        let dateTime = input.split(' ');
        return dateTime[index];
    }

    cleanFilters() {
        this.folioFilter = '';
        this.userNameFilter = '';
        this.cryptoFilter = undefined;
        this.typeFilter = -1;
        this.statusFilter = -1;
        this.getRequests();
    }

    deleteRequest(TradingRequest: TradingRequestDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSureDeleteRequest', TradingRequest.folio),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._tradingRequestsServiceProxy.deleteRequest(TradingRequest.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
