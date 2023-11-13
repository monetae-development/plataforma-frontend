import { Component, OnInit, ViewChild, Injector, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetOTCRequestByMemberDto } from '@shared/service-proxies/dto/Otc/OTCRequest/GetOTCRequestByMemberDto';
import { OTCRequestForMemberDto } from '@shared/service-proxies/dto/Otc/OTCRequest/OTCRequestForMemberDto';
import { OTCCoinForMemberDto } from '@shared/service-proxies/dto/Otc/OTCCoins/OTCCoinForMemberDto';

@Component({
  selector: 'otc-request-crypto-pay',
  templateUrl: './requestCryptoPay.component.html',
})
export class OTCRequestCryptoPayComponent extends AppComponentBase implements OnInit {

  @ViewChild('payModal', { static: true }) modal: ModalDirective;
  record: GetOTCRequestByMemberDto;

  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.record = new GetOTCRequestByMemberDto();
    this.record.otcRequest = new OTCRequestForMemberDto();
    this.record.otcCoinFk = new OTCCoinForMemberDto();
  }

  show(record: GetOTCRequestByMemberDto): void {
    this.record = record;
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
}
