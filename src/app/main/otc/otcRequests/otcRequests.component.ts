import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OTCServiceProxy } from '@shared/service-proxies/service-otc-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { OTCRequestDto } from '@shared/service-proxies/dto/Otc/OTCRequest/OTCRequestDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ViewOTCRequestModalComponent } from './view-otcRequest-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import { SelectItem } from 'primeng/api';
import { OTCCryptoDto } from '@shared/service-proxies/dto/Otc/OTCCryptoDto';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './otcRequests.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class OTCRequestsComponent extends AppComponentBase implements OnInit {
    @ViewChild('viewOTCRequestModalComponent', { static: true }) viewOTCRequestModal: ViewOTCRequestModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    cryptoCurrencies: SelectItem[] = [];
    statusOptions: SelectItem[] = [];
    typeOptions: SelectItem[] = [];
    cryptoKeys: OTCCryptoDto[] = [];

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
        private _otcRequestsServiceProxy: OTCServiceProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._serviceCommonProxy.getSelectOptions('OTCTrading/GetAllCryptoCoins', null).subscribe((result) => {
            this.cryptoCurrencies = result.items;
            this.cryptoKeys = [];
            for (const record of result.items) {
                let temp = new OTCCryptoDto();
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

    getOTCRequests(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._otcRequestsServiceProxy.getAllRequests(
            this.folioFilter,
            this.userNameFilter,
            this.cryptoFilter,
            this.typeFilter,
            this.statusFilter,
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
        this.getOTCRequests();
    }

    deleteOTCRequest(otcRequest: OTCRequestDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSureDeleteRequest', otcRequest.folio),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._otcRequestsServiceProxy.deleteRequest(otcRequest.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
