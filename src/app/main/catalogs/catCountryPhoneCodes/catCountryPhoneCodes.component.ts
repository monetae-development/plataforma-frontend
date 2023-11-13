import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatCountryPhoneCodesServiceProxy, CatCountryPhoneCodeDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatCountryPhoneCodeModalComponent } from './create-or-edit-catCountryPhoneCode-modal.component';

import { ViewCatCountryPhoneCodeModalComponent } from './view-catCountryPhoneCode-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catCountryPhoneCodes.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatCountryPhoneCodesComponent extends AppComponentBase {
    @ViewChild('createOrEditCatCountryPhoneCodeModal', { static: true }) createOrEditCatCountryPhoneCodeModal: CreateOrEditCatCountryPhoneCodeModalComponent;
    @ViewChild('viewCatCountryPhoneCodeModalComponent', { static: true }) viewCatCountryPhoneCodeModal: ViewCatCountryPhoneCodeModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxCodeFilter: number;
	maxCodeFilterEmpty: number;
	minCodeFilter: number;
	minCodeFilterEmpty: number;
    publishFilter = -1;
    catCountryTitleFilter = '';

    constructor(
        injector: Injector,
        private _catCountryPhoneCodesServiceProxy: CatCountryPhoneCodesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatCountryPhoneCodes(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catCountryPhoneCodesServiceProxy.getAll(
            this.filterText,
            this.maxCodeFilter == null ? this.maxCodeFilterEmpty : this.maxCodeFilter,
            this.minCodeFilter == null ? this.minCodeFilterEmpty : this.minCodeFilter,
            this.publishFilter,
            this.catCountryTitleFilter,
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

    createCatCountryPhoneCode(): void {
        this.createOrEditCatCountryPhoneCodeModal.show();
    }


    deleteCatCountryPhoneCode(catCountryPhoneCode: CatCountryPhoneCodeDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catCountryPhoneCodesServiceProxy.delete(catCountryPhoneCode.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catCountryPhoneCodesServiceProxy.getCatCountryPhoneCodesToExcel(
        this.filterText,
            this.maxCodeFilter == null ? this.maxCodeFilterEmpty : this.maxCodeFilter,
            this.minCodeFilter == null ? this.minCodeFilterEmpty : this.minCodeFilter,
            this.publishFilter,
            this.catCountryTitleFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
