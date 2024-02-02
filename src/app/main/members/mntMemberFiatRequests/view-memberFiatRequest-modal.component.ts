import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { MntMemberFiatFullDto } from '@shared/service-proxies/dto/members/mntMemberFiat/MntMemberFiatFullDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'member-fiat-request-modal',
  templateUrl: './view-memberFiatRequest-modal.component.html',
})
export class ViewMemberFiatRequestModalComponent extends AppComponentBase implements OnInit {
  @ViewChild('viewRequestModal', { static: true }) modal: ModalDirective;

  active = false;

  constructor(
    injector: Injector
  ) {
    super(injector);

  }
  ngOnInit() {
  }
  show(record: MntMemberFiatFullDto): void {
    console.log(record);
    this.active = true;
    this.modal.show();

  }
}
