import { Component, Injector, EventEmitter, ViewEncapsulation, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { GetMntMemberFiatForFullViewDto } from '@shared/service-proxies/dto/members/mntMemberFiat/GetMntMemberFiatForFullViewDto';
import { UpdateMntMemberFiatRequestStatusDto } from '@shared/service-proxies/dto/members/mntMemberFiat/UpdateMntMemberFiatRequestStatusDto';
import { CreateOrEditMntMemberRequestLogDto } from '@shared/service-proxies/dto/members/mntMemberRequestLog/CreateOrEditMntMemberRequestLogDto';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'member-fiat-request-changeStatus',
  templateUrl: './changeStatus.component.html'
})

export class MntMemberFiatRequestsChangeStatusComponent extends AppComponentBase implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('memberFiatChangeStatusModal', { static: true }) modal: ModalDirective;

  fiat: GetMntMemberFiatForFullViewDto;
  request: UpdateMntMemberFiatRequestStatusDto;
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
    this.reset();
    this.statusOptions = this.getSelectOptions(this.status);
  }

  show(request: GetMntMemberFiatForFullViewDto): void {
    this.fiat = request;
    this.active = true;
    this.modal.show();
    this.request.id = this.fiat.mntMemberFiat.id;
    this.request.status = this.fiat.mntMemberFiat.status;
  }

  //TODO: Unificar en un helper
  getSelectOptions(enumObj) {
    let options = [];
    for (const status of Object.values(enumObj)) {
      if (!isNaN(Number(status))) {
        let temp = new GetSelectIntDto();
        temp.value = Number(status);
        temp.label = this.l(this.getKeyEnum(enumObj, Number(status)));
        options.push(temp);
      }
    }
    return options;
  }

  save(): void {
    this.saving = true;
    this._serviceMemberProxy.updateFiatStatus(this.request)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(result => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.onSave.emit(null);
        this.close();
      });
  }

  close(): void {
    this.active = false;
    this.reset();
    this.modal.hide();
  }

  private reset() {
    this.request = new UpdateMntMemberFiatRequestStatusDto();
    this.request.mntMemberRequestLog = new CreateOrEditMntMemberRequestLogDto();
  }

  private getKeyEnum(enumObj: any, valor: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
    return keys.length > 0 ? keys[0] : undefined;
  }
}
