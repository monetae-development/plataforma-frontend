import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-withdraw',
  templateUrl: './dialog-resumen-withdraw.component.html',
  styleUrls: ['./dialog-resumen-withdraw.component.css'],
  imports: [
    ButtonModule,
    AppSharedModule
  ]
})
export class DialogResumenWithdrawComponent extends AppComponentBase implements OnInit {

  outAccept = new EventEmitter();

  resumenSend: any;
  dateNow: Date = new Date();
  sending = false;

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    super(injector);
  }

  ngOnInit() {

  }

  get dateTime() {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const day = this.dateNow.getDate();
    const month = months[this.dateNow.getMonth()];
    const year = this.dateNow.getFullYear();
    return  `${day} ${month} ${year}`;
  }

  onCancel(){
    this.ref.close();
  }

  onRequestSend(): void {
    this.sending = true;
    // const receiveBody = new CreateMntMemberWalletDto();
    // receiveBody.cryptoAssetId = this.resumenSend.cryptoAssetId.value;
    // receiveBody.address = this.resumenSend.address;
    // receiveBody.blockchainNetworkId = this.resumenSend.blockchainNetworkId.value;
    // receiveBody.amount = this.resumenSend.amount;
    // this._mntMemberWalletServiceProxy.create(receiveBody)
    //   .subscribe({
    //     next: (response) => {
    //       this.sending = false;
    //       this.outAccept.emit(true);
    //       this.ref.close();
    //     },
    //     error: (err) => {
    //       this.ref.close();
    //       this.sending = false;
    //     }
    //   });
  }

}
