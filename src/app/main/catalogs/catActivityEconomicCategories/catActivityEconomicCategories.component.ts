import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatActivityEconomicCategoriesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatActivityEconomicCategoryDto  } from '@shared/service-proxies/dto/Catalogs/CatActivityEconomicCategories/CatActivityEconomicCategoryDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatActivityEconomicCategoryModalComponent } from './create-or-edit-catActivityEconomicCategory-modal.component';
import { ViewCatActivityEconomicCategoryModalComponent } from './view-catActivityEconomicCategory-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catActivityEconomicCategories.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatActivityEconomicCategoriesComponent extends AppComponentBase {
    @ViewChild('createOrEditCatActivityEconomicCategoryModal', { static: true }) createOrEditCatActivityEconomicCategoryModal: CreateOrEditCatActivityEconomicCategoryModalComponent;
    @ViewChild('viewCatActivityEconomicCategoryModalComponent', { static: true }) viewCatActivityEconomicCategoryModal: ViewCatActivityEconomicCategoryModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    publishFilter = -1;

    constructor(
        injector: Injector,
        private _catActivityEconomicCategoriesServiceProxy: CatActivityEconomicCategoriesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatActivityEconomicCategories(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catActivityEconomicCategoriesServiceProxy.getAll(
            this.filterText,
            this.titleFilter,
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

    createCatActivityEconomicCategory(): void {
        this.createOrEditCatActivityEconomicCategoryModal.show();
    }


    deleteCatActivityEconomicCategory(catActivityEconomicCategory: CatActivityEconomicCategoryDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catActivityEconomicCategoriesServiceProxy.delete(catActivityEconomicCategory.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catActivityEconomicCategoriesServiceProxy.getCatActivityEconomicCategoriesToExcel(
        this.filterText,
            this.titleFilter,
            this.publishFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
