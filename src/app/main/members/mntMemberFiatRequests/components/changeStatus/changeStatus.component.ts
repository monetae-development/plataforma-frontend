import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { UpdateMntMemberFiatRequestStatusInput } from '@shared/service-proxies/dto/members/mntMemberFiat/UpdateMntMemberFiatRequestStatusInput';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'member-fiat-request-changeStatus',
  templateUrl: './changeStatus.component.html'
})

export class MntMemberFiatRequestsChangeStatusComponent extends AppComponentBase implements OnInit {
  @ViewChild('memberFiatChangeStatusModal', { static: true }) modal: ModalDirective;

  fiatRequest: UpdateMntMemberFiatRequestStatusInput;
  statusOptions: SelectItem[];
  status = FiatStatus;

  active = false;
  saving = false;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _serviceMemberProxy: ServiceMembersProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.fiatRequest = new UpdateMntMemberFiatRequestStatusInput();
  }

  show(requestId: number): void {
    this.active = true;
    this.modal.show();
  }

  //TODO: Unificar en un helper
  getSelectOptions(enumObj) {
    let options = [];
    for (const status of Object.values(enumObj)) {
      if (!isNaN(Number(status))) {
        let temp = new GetSelectDto();
        temp.value = status.toString();
        temp.label = this.l(this.getKeyEnum(enumObj, Number(status)));
        options.push(temp);
      }
    }
    return options;
  }

  getKeyEnum(enumObj: any, valor: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
    return keys.length > 0 ? keys[0] : undefined;
  }

  save(): void {

  }

  close(): void {
    this.active = false;
    this.modal.hide();
  }

}
