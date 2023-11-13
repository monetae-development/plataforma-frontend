import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { CatIdentityTypesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatIdentityTypeDto } from '@shared/service-proxies/dto/Catalogs/CatIdentityType/CatIdentityTypeDto';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditCatIdentityTypeModalComponent } from './create-or-edit-catIdentityType-modal.component';
import { ViewCatIdentityTypeModalComponent } from './view-catIdentityType-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';


@Component({
    templateUrl: './catIdentityTypes.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class CatIdentityTypesComponent extends AppComponentBase {
    @ViewChild('createOrEditCatIdentityTypeModal', { static: true }) createOrEditCatIdentityTypeModal: CreateOrEditCatIdentityTypeModalComponent;
    @ViewChild('viewCatIdentityTypeModalComponent', { static: true }) viewCatIdentityTypeModal: ViewCatIdentityTypeModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;
    advancedFiltersAreShown = false;
    filterText = '';
    titleFilter = '';
    publishFilter = -1;

    constructor(
        injector: Injector,
        private _catIdentityTypesServiceProxy: CatIdentityTypesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getCatIdentityTypes(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._catIdentityTypesServiceProxy.getAll(
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

    createCatIdentityType(): void {
        this.createOrEditCatIdentityTypeModal.show();
    }


    deleteCatIdentityType(catIdentityType: CatIdentityTypeDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._catIdentityTypesServiceProxy.delete(catIdentityType.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._catIdentityTypesServiceProxy.getCatIdentityTypesToExcel(
        this.filterText,
            this.titleFilter,
            this.publishFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
