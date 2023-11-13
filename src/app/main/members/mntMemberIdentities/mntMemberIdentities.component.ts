import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { MntMemberIdentitiesServiceProxy, MntMemberIdentityDto  } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntMemberIdentityModalComponent } from './create-or-edit-mntMemberIdentity-modal.component';
import { ViewMntMemberIdentityModalComponent } from './view-mntMemberIdentity-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';


@Component({
    templateUrl: './mntMemberIdentities.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MntMemberIdentitiesComponent extends AppComponentBase {

    @ViewChild('createOrEditMntMemberIdentityModal', { static: true }) createOrEditMntMemberIdentityModal: CreateOrEditMntMemberIdentityModalComponent;
    @ViewChild('viewMntMemberIdentityModalComponent', { static: true }) viewMntMemberIdentityModal: ViewMntMemberIdentityModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    identityIdFilter = '';
    maxExpirationFilter: DateTime;
	minExpirationFilter: DateTime;
    frontPictureFilter = '';
    backPictureFilter = '';
    selfieFilter = '';
    catIdentityTypeTitleFilter = '';
    mntMemberCommentsFilter = '';



    constructor(
        injector: Injector,
        private _mntMemberIdentitiesServiceProxy: MntMemberIdentitiesServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService,
    ) {
        super(injector);
    }

    getMntMemberIdentities(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._mntMemberIdentitiesServiceProxy.getAll(
            this.filterText,
            this.identityIdFilter,
            this.maxExpirationFilter === undefined ? this.maxExpirationFilter : this._dateTimeService.getEndOfDayForDate(this.maxExpirationFilter),
            this.minExpirationFilter === undefined ? this.minExpirationFilter : this._dateTimeService.getStartOfDayForDate(this.minExpirationFilter),
            this.frontPictureFilter,
            this.backPictureFilter,
            this.selfieFilter,
            this.catIdentityTypeTitleFilter,
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

    createMntMemberIdentity(): void {
        this.createOrEditMntMemberIdentityModal.show();
    }

    deleteMntMemberIdentity(mntMemberIdentity: MntMemberIdentityDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._mntMemberIdentitiesServiceProxy.delete(mntMemberIdentity.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._mntMemberIdentitiesServiceProxy.getMntMemberIdentitiesToExcel(
        this.filterText,
            this.identityIdFilter,
            this.maxExpirationFilter === undefined ? this.maxExpirationFilter : this._dateTimeService.getEndOfDayForDate(this.maxExpirationFilter),
            this.minExpirationFilter === undefined ? this.minExpirationFilter : this._dateTimeService.getStartOfDayForDate(this.minExpirationFilter),
            this.frontPictureFilter,
            this.backPictureFilter,
            this.selfieFilter,
            this.catIdentityTypeTitleFilter,
            this.mntMemberCommentsFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
