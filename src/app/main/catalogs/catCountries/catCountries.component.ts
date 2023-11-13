import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatCountriesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatCountryDto  } from '@shared/service-proxies/dto/Catalogs/CatCountries/CatCountryDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatCountryModalComponent } from './create-or-edit-catCountry-modal.component';
import { ViewCatCountryModalComponent } from './view-catCountry-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catCountries.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatCountriesComponent extends AppComponentBase {

    @ViewChild('createOrEditCatCountryModal', { static: true }) createOrEditCatCountryModal: CreateOrEditCatCountryModalComponent;
    @ViewChild('viewCatCountryModalComponent', { static: true }) viewCatCountryModal: ViewCatCountryModalComponent;
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
    restrictedFilter = -1;

    constructor(
        injector: Injector,
        private _catCountriesServiceProxy: CatCountriesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatCountries(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catCountriesServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
            this.publishFilter,
            this.restrictedFilter,
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

    createCatCountry(): void {
        this.createOrEditCatCountryModal.show();
    }

    deleteCatCountry(catCountry: CatCountryDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catCountriesServiceProxy.delete(catCountry.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catCountriesServiceProxy.getCatCountriesToExcel(
        this.filterText,
            this.titleFilter,
            this.maxOrderFilter == null ? this.maxOrderFilterEmpty : this.maxOrderFilter,
            this.minOrderFilter == null ? this.minOrderFilterEmpty : this.minOrderFilter,
            this.publishFilter,
            this.restrictedFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
