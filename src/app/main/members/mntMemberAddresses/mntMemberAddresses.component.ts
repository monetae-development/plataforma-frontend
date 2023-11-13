import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MntMemberAddressesServiceProxy, MntMemberAddressDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntMemberAddressModalComponent } from './create-or-edit-mntMemberAddress-modal.component';
import { ViewMntMemberAddressModalComponent } from './view-mntMemberAddress-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './mntMemberAddresses.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MntMemberAddressesComponent extends AppComponentBase {
    @ViewChild('createOrEditMntMemberAddressModal', { static: true }) createOrEditMntMemberAddressModal: CreateOrEditMntMemberAddressModalComponent;
    @ViewChild('viewMntMemberAddressModalComponent', { static: true }) viewMntMemberAddressModal: ViewMntMemberAddressModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    streetFilter = '';
    exteriorNoFilter = '';
    interiorNoFilter = '';
    zipCodeFilter = '';
    cityFilter = '';
    proofFilter = '';
    mntMemberCommentsFilter = '';
    catStateTitleFilter = '';

    constructor(
        injector: Injector,
        private _mntMemberAddressesServiceProxy: MntMemberAddressesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getMntMemberAddresses(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._mntMemberAddressesServiceProxy.getAll(
            this.filterText,
            this.streetFilter,
            this.exteriorNoFilter,
            this.interiorNoFilter,
            this.zipCodeFilter,
            this.cityFilter,
            this.proofFilter,
            this.mntMemberCommentsFilter,
            this.catStateTitleFilter,
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

    createMntMemberAddress(): void {
        this.createOrEditMntMemberAddressModal.show();
    }

    deleteMntMemberAddress(mntMemberAddress: MntMemberAddressDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._mntMemberAddressesServiceProxy.delete(mntMemberAddress.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._mntMemberAddressesServiceProxy.getMntMemberAddressesToExcel(
        this.filterText,
            this.streetFilter,
            this.exteriorNoFilter,
            this.interiorNoFilter,
            this.zipCodeFilter,
            this.cityFilter,
            this.proofFilter,
            this.mntMemberCommentsFilter,
            this.catStateTitleFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
