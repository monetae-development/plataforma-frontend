import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateMntMemberWalletDto, MntMemberWalletServiceProxy } from '@shared/service-proxies/service-proxies';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-buy-sell',
  templateUrl: './dialog-resumen-buy-sell.component.html',
  styleUrls: ['./dialog-resumen-buy-sell.component.css'],
  imports: [
    ButtonModule,
    AppSharedModule
  ]
})
export class DialogResumenBuySellComponent extends AppComponentBase implements OnInit {

  title: string = '';
  titleAction: string = '';
  resumenSend: any;
  amountCommision: number = 0;
  amountTotal: number = 0;
  dateNow: Date = new Date();
  sending = false;

  outAccept = new EventEmitter();

  constructor(
    injector: Injector,
    private _mntMemberWalletServiceProxy: MntMemberWalletServiceProxy,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    super(injector);
    this.title = config.data.title;
    this.titleAction = config.data.titleAction;
    this.resumenSend = config.data.resumenSend;
    this.amountCommision = config.data.amountCommision;
    this.amountTotal = this.resumenSend.amount + this.amountCommision;
  }

  ngOnInit() {
    console.log(this.resumenSend);
  }

  get dateTime() {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const day = this.dateNow.getDate();
    const month = months[this.dateNow.getMonth()];
    const year = this.dateNow.getFullYear();
    const hour = this.dateNow.getHours();
    const minutes = this.dateNow.getMinutes();
    const seconds = this.dateNow.getSeconds();
    const ampm = hour >= 12 ? 'pm' : 'am';
    return  `${day} ${month} ${year}, ${hour}:${minutes}:${seconds} ${ampm}`;
  }

  onCancel(){
    this.ref.close();
  }

  onRequestSend(): void {
    this.sending = true;
    const receiveBody = new CreateMntMemberWalletDto();
    receiveBody.cryptoAssetId = this.resumenSend.cryptoAssetId.value;
    receiveBody.address = this.resumenSend.address;
    receiveBody.blockchainNetworkId = this.resumenSend.blockchainNetworkId.value;
    receiveBody.amount = this.resumenSend.amount;
    this._mntMemberWalletServiceProxy.create(receiveBody)
      .subscribe({
        next: (response) => {
          this.sending = false;
          this.outAccept.emit(true);
          this.ref.close();
        },
        error: (err) => {
          this.ref.close();
          this.sending = false;
        }
      });
  }

}
