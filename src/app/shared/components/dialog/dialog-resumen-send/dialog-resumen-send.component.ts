import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceTransactionProxy } from '@shared/service-proxies/service-transaction-proxies';
import { GetEstimateNetworkFeeRequestInput } from '@shared/service-proxies/dto/Transactions/GetEstimateNetworkFeeRequestInput';
import { CreateMntMemberTransaction } from '@shared/service-proxies/dto/mntMemberTransaction/CreateMntMemberTransaction';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  standalone: true,
  selector: 'app-dialog-resumen-send',
  templateUrl: './dialog-resumen-send.component.html',
  styleUrls: ['./dialog-resumen-send.component.css'],
  imports: [
    ButtonModule,
    AppSharedModule
  ]
})
export class DialogResumenSendComponent extends AppComponentBase implements OnInit {

  resumenSend: any;
  amountTransactionSendFee = 0;
  amountTotal = 0;
  dateNow: Date = new Date();
  sending = false;
  outAccept = new EventEmitter();
  networkFeeLoaded: boolean;
  isLoadedNetworkFee: boolean;
  networkFee: number;

  networkFeeRequest: GetEstimateNetworkFeeRequestInput;

  constructor(
    injector: Injector,
    private _serviceTransactionProxy: ServiceTransactionProxy,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(injector);
    this.resumenSend = config.data.resumenSend;
    this.amountTransactionSendFee = config.data.amountTransactionSendFee;
    this.amountTotal = this.resumenSend.amount + this.amountTransactionSendFee;
    this.networkFeeRequest = new GetEstimateNetworkFeeRequestInput();
    this.networkFeeRequest.assetId = this.resumenSend.cryptoAssetId.assetId;
    this.networkFeeRequest.address = this.resumenSend.address;
    this.networkFeeRequest.amount = this.amountTotal;
    this.networkFeeLoaded = false;
  }

  get dateTime() {
    this.dateNow = new Date();
    return this.dateNow;
  }
  get shortAddress() {
    const originalAdress = this.resumenSend.address;
    const strStart = originalAdress.slice(0, 12);
    const strEnd = originalAdress.slice(-6);
    if (originalAdress.length <= 20) {
      return originalAdress;
    }
    return strStart + '....' + strEnd;
  }


  ngOnInit() {
    //console.log(this.resumenSend);
    this.socketio.getTransactionSendFee(this.appSession.user.userHash).subscribe((data: any) => {
      this.networkFeeLoaded = true;
      this.isLoadedNetworkFee = data.isLoadedFee;
      this.networkFee = data.fee;
      if (this.isLoadedNetworkFee) {
        this.amountTotal = this.amountTotal + this.networkFee;
      }
    });

    this._serviceTransactionProxy.getNetworkFeeRequest(
      this.networkFeeRequest.assetId,
      this.networkFeeRequest.amount,
      this.networkFeeRequest.address,
      this.networkFeeRequest.tag
    ).subscribe((data: any) => {

    });
  }

  onCancel() {
    this.ref.close();
  }

  onRequestSend(): void {
    this.sending = true;
    const request = new CreateMntMemberTransaction();
    request.address = this.resumenSend.address;
    request.tag = this.resumenSend.tag;
    request.web3CryptoCurrencyId = this.resumenSend.cryptoAssetId.value;
    request.blockchainNetworkId = this.resumenSend.blockchainNetworkId.value;
    request.networkFee = this.networkFee;
    request.amount = this.resumenSend.amount;
    this._serviceTransactionProxy.create(request).subscribe({
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
