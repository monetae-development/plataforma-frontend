import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import { MntMemberFiatDepositComponent } from './components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from './components/withdrawal/withdrawal.component';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { DialogOperationDepositWithdrawComponent } from '@app/shared/components/dialog/dialog-operation-deposit-withdraw/dialog-operation-deposit-withdraw.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { MemberType } from '@shared/service-proxies/enum/Members/MemberType.enum';
import { SessionServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mntMemberFiat.component.html',
  animations: [appModuleAnimation()],
  providers: [ DialogService ]
})
export class MntMemberFiatComponent extends AppComponentBase implements OnInit {
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  statusOptions: SelectItem[] = [];
  typeOptions: SelectItem[] = [];

  started = false;
  typeS = FiatType;
  status = FiatStatus;

  folioFilter = '';
  typeFilter = -1;
  statusMember: number;

  constructor(
    injector: Injector,
    private _router: Router,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
    private _serviceMemberProxy: ServiceMembersProxy,
    public _dialogService: DialogService,
    private _sessionServiceProxy: SessionServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.typeOptions = this.getSelectOptions(FiatType);
    this.statusOptions = this.getSelectOptions(FiatStatus);
    this.getStatusMember();
  }

  private getStatusMember(){
    this._sessionServiceProxy.getCurrentLoignIsClientRole().subscribe((result) => {
      console.log(result);
      if (result.hasClientRole) {
        this._serviceMemberProxy.getStatus().subscribe((result) => {
          console.log(result);
          this.statusMember = result.status;
        });
      } else {
        this.statusMember = MemberType.Administrador;
      }
    });
  }

  getAllOtcRequestsByMember(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._serviceMemberProxy.getAllFiatRequestsByMemmber(
      this.folioFilter,
      this.typeFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();
      this.started = true;
    });
  }

  createMemberFiatDeposit() {
    this.createMntMemberFiatDepositModal.show();
  }

  createMemberFiatWhitdrawal() {
    this.createMntMemberFiatWithdrawalModal.show();
  }

  //TODO: Unificar en un helper
  getSelectOptions(enumObj) {
    let options = [];
    for (const status of Object.values(enumObj)) {
      if (!isNaN(Number(status))) {
        let temp = new GetSelectDto();
        temp.value = status.toString();
        temp.label = this.l(this.getKeyEnum(enumObj, Number(status)));
        options.push(temp);
      }
    }
    return options;
  }

  getKeyEnum(enumObj: any, valor: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
    return keys.length > 0 ? keys[0] : undefined;
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  cleanFilters() {
    this.folioFilter = '';
    this.typeFilter = -1;
    this.getAllOtcRequestsByMember();
  }

  //TODO:Unificar en un helper
  getDateTimeFormat(input: string, index: number): string {
    let dateTime = input.split(' ');
    return dateTime[index];
  }

  showDialogDepositWithdraw(index){
    if (this.statusMember === MemberStatus.Register){
      this.openMessageDialogVerifyAccount();
    } else if (this.statusMember === MemberStatus.Pending || this.statusMember === MemberStatus.Review){
      this.openMessageDialogSuccessAccount();
    } else if (this.statusMember === MemberStatus.Refused){
      this.openMessageDialogRefusedAccount();
    } else if(this.statusMember === MemberType.Administrador) {
      this.openMessageDialogRolAdministrador();
    } else {
      const ref = this._dialogService.open(DialogOperationDepositWithdrawComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
        data: {
          activeIndex: index
        },
      });
      const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
      dialogRef?.changeDetectorRef.detectChanges();
      const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationDepositWithdrawComponent;
      instance?.outAccept.subscribe((values) => {
        console.log(values);
        ref.close();
      });
    }
  }
  private openMessageDialogVerifyAccount(): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
        data: {
            icon: 'pi pi-id-card',
            title: 'Verificar cuenta',
            subtitle: 'Completa la verificación KYC para continuar con la operación',
            titleAction: 'Empezar ahora'
        }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
      this._router.navigate(['app/main/members/mntMemberDataComplements']);
        ref.close();
    });
  }

  private openMessageDialogSuccessAccount(): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--default',
        data: {
            icon: 'pi pi-id-card',
            title: 'Gracias por completar el proceso de verificación',
            subtitle: 'Actualmente, estamos analizando tus datos con diligencia. En breve, te informaremos los resultados. ¡Gracias por tu paciencia!"',
            titleAction: this.l('Continue'),
        }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
        ref.close();
    });
  }

  private openMessageDialogRefusedAccount(): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--default ae-text-danger ae-dialog--sm',
        data: {
            icon: 'pi pi-id-card',
            title: '"¡Lo sentimos! <br> Tu verificación de identidad KYC <br> ha sido rechazada',
            subtitle: 'Para generar una nueva solicitud contacte a nuestro equipo de soporte en info@monetae.io.',
            titleAction: 'Aceptar'
        }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
        this._router.navigate(['app/main/dashboard']);
        ref.close();
    });
}

  private openMessageDialogRolAdministrador(): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--default ae-dialog--sm',
        data: {
            icon: 'pi pi-id-card',
            title: 'Las operaciones son de uso exclusivo para clientes de Monetae.',
            titleAction: 'Aceptar'
        }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
        ref.close();
    });
  }
}
