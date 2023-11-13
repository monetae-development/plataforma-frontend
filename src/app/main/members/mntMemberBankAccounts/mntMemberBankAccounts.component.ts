import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { MntMemberBankAccountDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/MntMemberBankAccountDto';
import { BankAccountStatus } from '@shared/service-proxies/enum/Members/BankAccountStatus.enum';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditMntMemberBankAccountModalComponent } from './create-or-edit-mntMemberBankAccount-modal.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { FileDownloadService } from '@shared/utils/file-download.service';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

@Component({
    templateUrl: './mntMemberBankAccounts.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [appModuleAnimation()]
})
export class MntMemberBankAccountsComponent extends AppComponentBase {
    @ViewChild('createOrEditMntMemberBankAccountModal', { static: true }) createOrEditMntMemberBankAccountModal: CreateOrEditMntMemberBankAccountModalComponent;
    @ViewChild('dataTable', { static: true }) dataTable: Table;
    @ViewChild('paginator', { static: true }) paginator: Paginator;

    advancedFiltersAreShown = false;
    filterText = '';
    holderFilter = '';
    accountFilter = '';
    swiftFilter = '';
    statusFilter = -1;
    mntMemberCommentsFilter = '';
    catBankTitleFilter = '';
    catAccountTypeTitleFilter = '';
    catCurrencyTitleFilter = '';
    accountStatus = BankAccountStatus;

    constructor(
        injector: Injector,
        private _serviceMemberProxy: ServiceMembersProxy,
        private _notifyService: NotifyService,
        private _tokenAuth: TokenAuthServiceProxy,
        private _activatedRoute: ActivatedRoute,
        private _fileDownloadService: FileDownloadService
    ) {
        super(injector);
    }

    getMntMemberBankAccounts(event?: LazyLoadEvent) {
        if (this.primengTableHelper.shouldResetPaging(event)) {
            this.paginator.changePage(0);
            if (this.primengTableHelper.records &&
                this.primengTableHelper.records.length > 0) {
                return;
            }
        }

        this.primengTableHelper.showLoadingIndicator();

        this._serviceMemberProxy.getAllBankAccountsByMemmber(
            this.filterText,
            this.holderFilter,
            this.accountFilter,
            this.swiftFilter,
            this.statusFilter,
            this.mntMemberCommentsFilter,
            this.catBankTitleFilter,
            this.catAccountTypeTitleFilter,
            this.catCurrencyTitleFilter,
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

    createMntMemberBankAccount(): void {
        this.createOrEditMntMemberBankAccountModal.show();
    }

    deleteMntMemberBankAccount(mntMemberBankAccount: MntMemberBankAccountDto): void {
        this.message.confirm(
            '',
            this.l('AreYouSure'),
            (isConfirmed) => {
                if (isConfirmed) {
                    this._serviceMemberProxy.deleteBankAccountByMember(mntMemberBankAccount.id)
                        .subscribe(() => {
                            this.reloadPage();
                            this.notify.success(this.l('SuccessfullyDeleted'));
                        });
                }
            }
        );
    }
}
