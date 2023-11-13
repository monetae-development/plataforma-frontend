import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MntMemberPepsServiceProxy, MntMemberPepDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntMemberPepModalComponent } from './create-or-edit-mntMemberPep-modal.component';
import { ViewMntMemberPepModalComponent } from './view-mntMemberPep-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

@Component({
    templateUrl: './mntMemberPeps.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MntMemberPepsComponent extends AppComponentBase {
    @ViewChild('createOrEditMntMemberPepModal', { static: true }) createOrEditMntMemberPepModal: CreateOrEditMntMemberPepModalComponent;
    @ViewChild('viewMntMemberPepModalComponent', { static: true }) viewMntMemberPepModal: ViewMntMemberPepModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    answer1Filter = -1;
    answer2Filter = -1;
    answer3Filter = -1;
    mntMemberCommentsFilter = '';

    constructor(
        injector: Injector,
        private _mntMemberPepsServiceProxy: MntMemberPepsServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getMntMemberPeps(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._mntMemberPepsServiceProxy.getAll(
            this.filterText,
            this.answer1Filter,
            this.answer2Filter,
            this.answer3Filter,
            this.mntMemberCommentsFilter,
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

    createMntMemberPep(): void {
        this.createOrEditMntMemberPepModal.show();
    }


    deleteMntMemberPep(mntMemberPep: MntMemberPepDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._mntMemberPepsServiceProxy.delete(mntMemberPep.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._mntMemberPepsServiceProxy.getMntMemberPepsToExcel(
        this.filterText,
            this.answer1Filter,
            this.answer2Filter,
            this.answer3Filter,
            this.mntMemberCommentsFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
         });
    }
}
