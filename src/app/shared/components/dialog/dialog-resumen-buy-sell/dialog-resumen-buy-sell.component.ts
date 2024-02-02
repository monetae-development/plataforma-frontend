import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { MntMemberTradingRequestDto } from '@shared/service-proxies/dto/mntMemberTrading/MntMemberTradingRequestDto';
import { AmountType } from '@shared/service-proxies/enum/MemberTrading/AmountType.enum';
import { ModeType } from '@shared/service-proxies/enum/MemberTrading/ModeType.enum';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
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
  purchasePrice: number = 0;
  amountCommision: number = 0;
  amountTotal: number = 0;
  modeType: ModeType;
  dateNow: Date = new Date();
  sending = false;

  outAccept = new EventEmitter();

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _serviceTradingProxy: ServiceTradingProxy,
  ) { 
    super(injector);
    console.log(config.data);
    this.title = config.data.title;
    this.titleAction = config.data.titleAction;
    this.resumenSend = config.data.resumenSend;
    this.purchasePrice = config.data.purchasePrice;
    this.modeType = config.data.modeType;
    this.amountCommision = config.data.amountCommision;
    this.amountTotal = this.resumenSend.amount + this.amountCommision;
  }

  ngOnInit() {
    console.log(this.resumenSend);
  }

  get dateTime() {
    const months = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    const day = this.dateNow.getDate();
    const month = months[this.dateNow.getMonth()];
    const year = this.dateNow.getFullYear();
    const hour = this.dateNow.getHours();
    const minutes = this.dateNow.getMinutes();
    const seconds = this.dateNow.getSeconds();
    const ampm = hour >= 12 ? 'pm' : 'am';
    return  `${day} ${month} ${year}`;
  }

  onCancel(){
    this.ref.close();
  }

  onRequestSend(): void {
    this.sending = true;
    const receiveBody = new MntMemberTradingRequestDto();
    receiveBody.cryptoCurrencyId = this.resumenSend.cryptoCurrencyId.value;
    receiveBody.amount = this.resumenSend.amount;
    receiveBody.amountType = AmountType.Dollar;
    receiveBody.modeType = this.modeType;
    this._serviceTradingProxy.create(receiveBody)
      .subscribe({
        next: (response) => {
          this.sending = false;
          this.outAccept.emit(this.modeType);
          this.ref.close();
        },
        error: (err) => {
          this.ref.close();
          this.sending = false;
        }
      });
  }

}
