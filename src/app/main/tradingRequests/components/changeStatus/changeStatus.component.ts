import { Component, Injector, EventEmitter, ViewEncapsulation, ViewChild, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { UpdateTradingRequestStatusInput } from '@shared/service-proxies/dto/TradingRequest/UpdateTradingRequestStatusInput';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'trading-request-changeStatus',
  templateUrl: './changeStatus.component.html'
})

export class TradingRequestsChangeStatusComponent extends AppComponentBase implements OnInit {
  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('tradingChangeStatusModal', { static: true }) modal: ModalDirective;

  request: UpdateTradingRequestStatusInput;
  statusOptions: SelectItem[];
  status = RequestStatus;
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
    this.request = new UpdateTradingRequestStatusInput();
    this.statusOptions = this.getSelectOptions(this.status);
  }

  show(userId: number, requestId: number, status: RequestStatus): void {
    this.active = true;
    this.modal.show();
    this.request.userId = userId;
    this.request.id = requestId;
    this.request.status = status;
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

  getKeyEnum(enumObj: any, valor: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
    return keys.length > 0 ? keys[0] : undefined;
  }

  save(): void {
    this.saving = true;
    this._serviceMemberProxy.updateTradingStatus(this.request)
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
    this.modal.hide();
  }
}
