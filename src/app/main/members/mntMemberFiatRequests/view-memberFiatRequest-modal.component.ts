import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MntMemberFiatFullDto } from '@shared/service-proxies/dto/members/mntMemberFiat/MntMemberFiatFullDto';
import { MntMemberBankAccountDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/MntMemberBankAccountDto';
import { PlatformBankAccountForViewMemberDto } from '@shared/service-proxies/dto/Platform/PlatformBankAccount/PlatformBankAccountForViewMemberDto';
import { UserInfoDto } from '@shared/service-proxies/dto/Authorization/Users/UserInfoDto';
import { MntMemberFileDto } from '@shared/service-proxies/dto/members/mntMemberFile/MntMemberFileDto';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';
import { DateTime } from 'luxon';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';

@Component({
  selector: 'member-fiat-request-modal',
  templateUrl: './view-memberFiatRequest-modal.component.html',
})
export class ViewMemberFiatRequestModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('viewRequestModal', { static: true }) modal: ModalDirective;

  active = false;
  record: MntMemberFiatFullDto;
  typeRequest = FiatType;
  fileType = FileType;

  constructor(
    injector: Injector,
    private _mntMembersProxy: ServiceMembersProxy,
  ) {
    super(injector);

  }
  ngOnInit() {
    this.record = new MntMemberFiatFullDto();
    this.record.mntMemberBankAccountFk = new MntMemberBankAccountDto();
    this.record.platformBankAccountFk = new PlatformBankAccountForViewMemberDto();
    this.record.userFk = new UserInfoDto();
    this.record.mntMemberFileFk = new MntMemberFileDto();
  }

  show(record: MntMemberFiatFullDto): void {
    this.record = record;
    this.active = true;
    this.modal.show();
  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

  downloadFile(fileId: number): void {
    this._mntMembersProxy.downloadDepositFile(this.record.userFk.id, fileId);
  }
}
