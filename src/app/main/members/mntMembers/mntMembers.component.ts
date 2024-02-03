import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MntMembersServiceProxy, MntMemberDto, UpdateStatusDto } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntMemberModalComponent } from './create-or-edit-mntMember-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogChangeStatusComponent } from '@app/shared/components/dialog/dialog-change-status/dialog-change-status.component';

@Component({
    templateUrl: './mntMembers.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()],
    providers: [DialogService]
})
export class MntMembersComponent extends AppComponentBase {
    @ViewChild('createOrEditMntMemberModal', { static: true }) createOrEditMntMemberModal: CreateOrEditMntMemberModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    maxDayOfBirthFilter: DateTime;
    minDayOfBirthFilter: DateTime;
    cityFilter = '';
    commentsFilter = '';
    userNameFilter = '';
    catStateTitleFilter = '';
    catNationalityTitleFilter = '';
    memberStatus = MemberStatus;

    constructor(
        injector: Injector,
        private _mntMembersServiceProxy: MntMembersServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService,
        public dialogService: DialogService,
    ) {
        super(injector);
    }

    getMntMembers(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._mntMembersServiceProxy.getAll(
            this.filterText,
            this.maxDayOfBirthFilter === undefined ? this.maxDayOfBirthFilter : this._dateTimeService.getEndOfDayForDate(this.maxDayOfBirthFilter),
            this.minDayOfBirthFilter === undefined ? this.minDayOfBirthFilter : this._dateTimeService.getStartOfDayForDate(this.minDayOfBirthFilter),
            this.commentsFilter,
            this.userNameFilter,
            this.catNationalityTitleFilter,
            this.primengTableHelper.getSorting(this.dataTable),
            this.primengTableHelper.getSkipCount(this.paginator, event),
            this.primengTableHelper.getMaxResultCount(this.paginator, event)
        ).subscribe(result => {
            this.primengTableHelper.totalRecordsCount = result.totalCount;
            this.primengTableHelper.records = result.items;
            this.primengTableHelper.hideLoadingIndicator();
            console.log(result.items);
        });
    }

    reloadPage(): void {
        this.paginator.changePage(this.paginator.getPage());
    }

    createMntMember(): void {
        this.createOrEditMntMemberModal.show();
    }

    showDialogChangeStatus(mntMember: MntMemberDto): void {
        const ref = this.dialogService.open(DialogChangeStatusComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--sm',
            data: {
                transfer: {

                },
            },
        });

        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();

        const instance = dialogRef?.instance?.componentRef?.instance as DialogChangeStatusComponent;
        instance?.outAccept.subscribe((values) => {
            const statusBody = new UpdateStatusDto();
            statusBody.id = mntMember.id;
            statusBody.status = values;
            if (values) {
                this._mntMembersServiceProxy.updateStatus(statusBody)
                    .subscribe(() => {
                        this.reloadPage();
                        ref.close();
                    },
                        (err) => {
                            ref.close();
                        });
            }
        });
    }

    deleteMntMember(mntMember: MntMemberDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._mntMembersServiceProxy.delete(mntMember.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._mntMembersServiceProxy.getMntMembersToExcel(
            this.filterText,
            this.maxDayOfBirthFilter === undefined ? this.maxDayOfBirthFilter : this._dateTimeService.getEndOfDayForDate(this.maxDayOfBirthFilter),
            this.minDayOfBirthFilter === undefined ? this.minDayOfBirthFilter : this._dateTimeService.getStartOfDayForDate(this.minDayOfBirthFilter),
            this.commentsFilter,
            this.userNameFilter,
            this.catNationalityTitleFilter,
        )
            .subscribe(result => {
                this._fileDownloadService.downloadTempFile(result);
            });
    }
}
