import {AppConsts} from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute , Router} from '@angular/router';
import { DcSendGridWebHooksServiceProxy, DcSendGridWebHookDto , SendGridEvents } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditDcSendGridWebHookModalComponent } from './create-or-edit-dcSendGridWebHook-modal.component';
import { ViewDcSendGridWebHookModalComponent } from './view-dcSendGridWebHook-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';


@Component({
    templateUrl: './dcSendGridWebHooks.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class DcSendGridWebHooksComponent extends AppComponentBase {

    @ViewChild('createOrEditDcSendGridWebHookModal', { static: true }) createOrEditDcSendGridWebHookModal: CreateOrEditDcSendGridWebHookModalComponent;
    @ViewChild('viewDcSendGridWebHookModalComponent', { static: true }) viewDcSendGridWebHookModal: ViewDcSendGridWebHookModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    emailFilter = '';
    eventFilter = -1;
    maxTimeEventFilter: DateTime;
	minTimeEventFilter: DateTime;
    messageIdFilter = '';
    subjectFilter = '';
    statusFilter = '';
    sendGridEvents = SendGridEvents;

    constructor(
        injector: Injector,
        private _dcSendGridWebHooksServiceProxy: DcSendGridWebHooksServiceProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    getDcSendGridWebHooks(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._dcSendGridWebHooksServiceProxy.getAll(
            this.filterText,
            this.emailFilter,
            this.eventFilter,
            this.maxTimeEventFilter === undefined ? this.maxTimeEventFilter : this._dateTimeService.getEndOfDayForDate(this.maxTimeEventFilter),
            this.minTimeEventFilter === undefined ? this.minTimeEventFilter : this._dateTimeService.getStartOfDayForDate(this.maxTimeEventFilter),
            this.messageIdFilter,
            this.subjectFilter,
            this.statusFilter,
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

    createDcSendGridWebHook(): void {
        this.createOrEditDcSendGridWebHookModal.show();
    }


    deleteDcSendGridWebHook(dcSendGridWebHook: DcSendGridWebHookDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._dcSendGridWebHooksServiceProxy.delete(dcSendGridWebHook.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }

    exportToExcel(): void {
        this._dcSendGridWebHooksServiceProxy.getDcSendGridWebHooksToExcel(
        this.filterText,
            this.emailFilter,
            this.eventFilter,
            this.maxTimeEventFilter === undefined ? this.maxTimeEventFilter : this._dateTimeService.getEndOfDayForDate(this.maxTimeEventFilter),
            this.minTimeEventFilter === undefined ? this.minTimeEventFilter : this._dateTimeService.getStartOfDayForDate(this.minTimeEventFilter),
            this.messageIdFilter,
            this.subjectFilter,
            this.statusFilter,
        )
        .subscribe(result => {
            this._fileDownloadService.downloadTempFile(result);
        });
    }
}
