import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

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

  resumenWithdraw: any;
  destinationAccount: string;
  dateNow: Date = new Date();
  saving = false;

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private _serviceMemberProxy: ServiceMembersProxy
  ) {
    super(injector);
    console.log(config.data.resumenWithdraw);
    this.resumenWithdraw = config.data.resumenWithdraw;
    this.destinationAccount = config.data.destinationAccount;
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
    return `${day} ${month} ${year}`;
  }

  onCancel() {
    this.ref.close();
  }

  onRequestSend(): void {
    this.saving = true;
    this._serviceMemberProxy.createFiatWithdrawalByMember(this.resumenWithdraw)
      .pipe(finalize(() => {
        this.saving = false;
        this.ref.close();
      }))
      .subscribe((result) => {
        this.outAccept.emit(result.folio);
      });
  }

}
