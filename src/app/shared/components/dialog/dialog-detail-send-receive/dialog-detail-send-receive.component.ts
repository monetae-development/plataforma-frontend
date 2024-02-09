import { Component, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { GetAllMntMemberTransactionForDetailDto } from '@shared/service-proxies/dto/mntMemberTransaction/GetAllMntMemberTransactionForDetailDto';
import { TransactionStatus } from '@shared/service-proxies/enum/MemberTransaction/TransactionStatus.enum';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-detail-send-receive',
  templateUrl: './dialog-detail-send-receive.component.html',
  styleUrls: ['./dialog-detail-send-receive.component.css'],
  imports: [
    AppSharedModule,
    ButtonModule
  ]
})
export class DialogDetailSendReceiveComponent extends AppComponentBase implements OnInit {

  detailHistory: GetAllMntMemberTransactionForDetailDto;
  type: number = 0;
  transactionStatus: TransactionStatus

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
  ) {
    super(injector);
    this.detailHistory = config.data.detail;
  }

  ngOnInit() {

  }

  onCancel(){
    this.ref.close();
  }

  onContinue(){
    this.ref.close();
  }

}
