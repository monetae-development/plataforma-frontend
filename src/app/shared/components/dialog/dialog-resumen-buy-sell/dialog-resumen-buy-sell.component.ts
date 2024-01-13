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
    this.resumenSend = config.data.resumenSend;
    this.amountCommision = config.data.amountCommision;
    this.amountTotal = this.resumenSend.amount + this.amountCommision;
  }

  ngOnInit() {
    console.log(this.resumenSend);
  }

  get dateTime() { return this.dateNow.toLocaleDateString("en")}
  get hourTime() { return this.dateNow.toTimeString().slice(0, 8) }
  get shortAddress(){
    const originalAdress = this.resumenSend.address;
    const strStart = originalAdress.slice(0, 12);
    const strEnd = originalAdress.slice(-6);
    if (originalAdress.length <= 20) {
      return originalAdress;
    }
    return strStart + "...." + strEnd;
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
