import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { MntMemberWalletServiceProxy } from '@shared/service-proxies/service-proxies';
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
  dateNow: Date = new Date();
  // dateConvert: any;

  outAccept = new EventEmitter();

  constructor(
    injector: Injector,
    private _mntMemberWalletServiceProxy: MntMemberWalletServiceProxy,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { 
    super(injector);
    this.resumenSend = config.data;
  }

  ngOnInit() {
    console.log(this.resumenSend);
    // this.dateConvert = "2023-12-05T21:58:06.076319";
    // console.log(this.dateConvert);
  }

  get dateTime() { return this.dateNow.toLocaleDateString("en")}
  get hourTime() { return this.dateNow.toTimeString().slice(0, 8) }

  onCancel(){
    this.ref.close();
    // console.log(this.date);
  }

  onRequestSend(): void {
    this._mntMemberWalletServiceProxy.getBlockchainNetwortksForSelect()
      .subscribe((result) => {
        console.log(result);
      });
  }

}
