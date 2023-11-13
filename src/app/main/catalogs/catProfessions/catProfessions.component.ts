import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatProfessionsServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatProfessionDto } from '@shared/service-proxies/dto/Catalogs/CatProfessions/CatProfessionDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatProfessionModalComponent } from './create-or-edit-catProfession-modal.component';
import { ViewCatProfessionModalComponent } from './view-catProfession-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

@Component({
    templateUrl: './catProfessions.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatProfessionsComponent extends AppComponentBase {
    @ViewChild('createOrEditCatProfessionModal', { static: true }) createOrEditCatProfessionModal: CreateOrEditCatProfessionModalComponent;
    @ViewChild('viewCatProfessionModalComponent', { static: true }) viewCatProfessionModal: ViewCatProfessionModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    maxRiskFilter: number;
	maxRiskFilterEmpty: number;
	minRiskFilter: number;
	minRiskFilterEmpty: number;
    maxOrderFilter: number;
	maxOrderFilterEmpty: number;
	minOrderFilter: number;
	minOrderFilterEmpty: number;
    publishFilter = -1;

    constructor(
        injector: Injector,
        private _catProfessionsServiceProxy: CatProfessionsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatProfessions(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catProfessionsServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.maxRiskFilter == null ? this.maxRiskFilterEmpty : this.maxRiskFilter,
            this.minRiskFilter == null ? this.minRiskFilterEmpty : this.minRiskFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
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

    createCatProfession(): void {
        this.createOrEditCatProfessionModal.show();
    }


    deleteCatProfession(catProfession: CatProfessionDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catProfessionsServiceProxy.delete(catProfession.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catProfessionsServiceProxy.getCatProfessionsToExcel(
        this.filterText,
            this.titleFilter,
            this.maxRiskFilter == null ? this.maxRiskFilterEmpty : this.maxRiskFilter,
            this.minRiskFilter == null ? this.minRiskFilterEmpty : this.minRiskFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
            this.publishFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
