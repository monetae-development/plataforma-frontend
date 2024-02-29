import { Component, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TradingRequestMemberDto } from '@shared/service-proxies/dto/mntMemberTrading/TradingRequestMemberDto';
import { RequestType } from '@shared/service-proxies/enum/MemberTrading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-detail-purchase-sale',
  templateUrl: './dialog-detail-purchase-sale.component.html',
  styleUrls: ['./dialog-detail-purchase-sale.component.css'],
  imports: [
    AppSharedModule,
    ButtonModule
  ]
})
export class DialogDetailPurchaseSaleComponent extends AppComponentBase implements OnInit {
  detailHistory: TradingRequestMemberDto;
  type = 0;
  requestType = RequestType;
  requestStatus = RequestStatus;

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super(injector);
    this.detailHistory = config.data.detail;
    this.type = config.data.type;
  }

  ngOnInit() {

  }

  onCancel() {
    this.ref.close();
  }

  onContinue() {
    this.ref.close();
  }

  getDateTimeFormat(input: string): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yyyy HH:mm:ss');
  }

}
