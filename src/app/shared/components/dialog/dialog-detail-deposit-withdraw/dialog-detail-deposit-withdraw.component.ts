import { Component, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetMemberDetailRequestDto } from '@shared/service-proxies/dto/members/mntMemberFiat/GetMemberDetailRequestDto';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { DateTime } from 'luxon';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-detail-deposit-withdraw',
  templateUrl: './dialog-detail-deposit-withdraw.component.html',
  styleUrls: ['./dialog-detail-deposit-withdraw.component.css'],
  imports: [
    AppSharedModule,
    ButtonModule
  ]
})
export class DialogDetailDepositWithdrawComponent extends AppComponentBase implements OnInit {

  detailHistory: GetMemberDetailRequestDto;
  type: number = 0;
  requestType = FiatType;
  fiatStatus = FiatStatus;

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

  onCancel(){
    this.ref.close();
  }

  onContinue(){
    this.ref.close();
  }

  getDateTimeFormat(input: string,): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yy');
  }

}
