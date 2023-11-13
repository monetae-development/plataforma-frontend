import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatStatesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatStateDto } from '@shared/service-proxies/dto/Catalogs/CatStates/CatStateDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatStateModalComponent } from './create-or-edit-catState-modal.component';
import { ViewCatStateModalComponent } from './view-catState-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catStates.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatStatesComponent extends AppComponentBase {

    @ViewChild('createOrEditCatStateModal', { static: true }) createOrEditCatStateModal: CreateOrEditCatStateModalComponent;
    @ViewChild('viewCatStateModalComponent', { static: true }) viewCatStateModal: ViewCatStateModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    maxOrderFilter: number;
	maxOrderFilterEmpty: number;
	minOrderFilter: number;
	minOrderFilterEmpty: number;
    publishFilter = -1;
    catCountryTitleFilter = '';

    constructor(
        injector: Injector,
        private _catStatesServiceProxy: CatStatesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatStates(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catStatesServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
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

    createCatState(): void {
        this.createOrEditCatStateModal.show();
    }

    deleteCatState(catState: CatStateDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catStatesServiceProxy.delete(catState.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catStatesServiceProxy.getCatStatesToExcel(
        this.filterText,
            this.titleFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
            this.publishFilter,
            this.catCountryTitleFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
