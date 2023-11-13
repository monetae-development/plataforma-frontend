import { Component, Injector, EventEmitter, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { SelectItem } from 'primeng/api';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { CreateMntMemberFiatDto } from '@shared/service-proxies/dto/members/mntMemberFiat/CreateMntMemberFiatDto';
import { GetMntMemberBankAccountForViewDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/GetMntMemberBankAccountForViewDto';
import { CreateOrEditMntMemberBankAccountModalComponent } from '@app/main/members/mntMemberBankAccounts/create-or-edit-mntMemberBankAccount-modal.component';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'member-fiat-deposit',
  templateUrl: './deposit.component.html'
})
export class MntMemberFiatDepositComponent extends AppComponentBase implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('memberFiatDepositModal', { static: true }) modal: ModalDirective;
  @ViewChild('createOrEditMntMemberBankAccountModal', { static: true }) createOrEditMntMemberBankAccountModal: CreateOrEditMntMemberBankAccountModalComponent;

  fiatDeposit: CreateMntMemberFiatDto;
  memberBankAccount: GetMntMemberBankAccountForViewDto;
  memberBankAccounts: SelectItem[];
  active = false;
  saving = false;
  hasBankAccounts = false;
  refreshMemberBankAccounts = false;
  loadBankAccountsComplete = false;
  loadResume = false;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
    private _serviceMemberProxy: ServiceMembersProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fiatDeposit = new CreateMntMemberFiatDto();
    this.memberBankAccount = new GetMntMemberBankAccountForViewDto();
  }

  show(): void {
    this.fiatDeposit = new CreateMntMemberFiatDto();
    this.memberBankAccount = new GetMntMemberBankAccountForViewDto();
    this.active = true;
    this.modal.show();
    this.loadBankAccounts();
  }

  onChangeMemberBankAccount(event: any) {

  }

  save(): void {
    this.saving = true;
    this._serviceMemberProxy.createFiatDepositByMember(this.fiatDeposit)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe((result) => {
        this.notify.info(this.l('SavedSuccessfully'));
        abp.message.success(this.l('OTCRequestCreatedSuccessfully'), this.l('RequestSuccessfully', result.folio));
        this.onSave.emit(null);
        this.close();
      });
  }

  loadBankAccounts() {
    this.refreshMemberBankAccounts = true;
    this.loadBankAccountsComplete = false;
    this._serviceCommonProxy.getSelectSubtitleOptions('MntMemberBankAccounts/GetAllBankAccountsForSelect', null).subscribe((result) => {
      if (result.totalCount > 0) {
        this.hasBankAccounts = true;
      } else {
        this.hasBankAccounts = false;
      }
      this.loadBankAccountsComplete = true;
      this.memberBankAccounts = result.items;
      this.refreshMemberBankAccounts = false;
    });
  }

  refreshBankAccounts() {
    this.loadBankAccounts();
  }

  onChangeMemberAccount(event: any) {
    if (event.value != null || event.value !== undefined) {
      this._serviceMemberProxy.getBankAccountByMemberForView(event.value).subscribe((result) => {
        this.memberBankAccount = result;
      });
    }
  }

  createMemberBankAccount(): void {
    this.createOrEditMntMemberBankAccountModal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
