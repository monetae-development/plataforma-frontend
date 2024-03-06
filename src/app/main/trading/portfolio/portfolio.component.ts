import { Component, Injector, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';
import { DialogOperationBuySellComponent } from '@app/shared/components/dialog/dialog-operation-buy-sell/dialog-operation-buy-sell.component';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { RequestType } from '@shared/service-proxies/enum/MemberTrading/RequestType.enum';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { MemberType } from '@shared/service-proxies/enum/Members/MemberType.enum';
import { CryptoBehaviors } from '@shared/service-proxies/enum/OTC/CryptoBehaviors.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { SessionServiceProxy } from '@shared/service-proxies/service-proxies';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { DateTime } from 'luxon';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';


@Component({
  selector: 'trading-portfolio',
  templateUrl: './portfolio.component.html'
})
export class TradingPortfolioComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  filter = '';
  requestType = RequestType;
  requestStatus = RequestStatus;
  itemsMenu: any[] | undefined;
  total = 6;
  items: any = [];
  statusMember: number;
  selectedRecord: number;

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _router: Router,
    private _serviceTradingProxy: ServiceTradingProxy,
    private _serviceMembersProxy: ServiceMembersProxy,
    private _dialogService: DialogService,
    private _sessionServiceProxy: SessionServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.paginator.rows = 25;
    this.getStatusMember();
    this.itemsMenu = [
      {
        label: this.l('PurchaseAction'),
        command: () => {
          this.showDialogBuySell(0, this.selectedRecord);
        }
      },
      {
        label: this.l('SellAction'),
        command: () => {
          this.showDialogBuySell(1, this.selectedRecord);
        }
      }
    ];
    this.getAllMemberPortfolioRequests();
  }

  getAllMemberPortfolioRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
        return;
      }
    }
    this.primengTableHelper.showLoadingIndicator();
    this._serviceTradingProxy.getAllMemberPortfolioRequests(
      this.filter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    )
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe(result => {
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }

  getDateTimeFormat(input: string): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yy');
  }

  showDialogBuySell(index: number, cryptoCurrencyId?: number) {
    if (this.statusMember === MemberStatus.Register) {
      this.openMessageDialogVerifyAccount();
    } else if (this.statusMember === MemberStatus.Pending || this.statusMember === MemberStatus.Review) {
      this.openMessageDialogSuccessAccount();
    } else if (this.statusMember === MemberStatus.Refused) {
      this.openMessageDialogRefusedAccount();
    } else if (this.statusMember === MemberType.Administrador) {
      this.openMessageDialogRolAdministrador();
    } else {
      const ref = this._dialogService.open(DialogOperationBuySellComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
        data: {
          activeIndex: index,
          activeCryptoCurrencyId: cryptoCurrencyId
        },
      });
      const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
      dialogRef?.changeDetectorRef.detectChanges();
      const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationBuySellComponent;
      instance?.outAccept.subscribe((values) => {
        if (values) {
          ref.close();
        }
      });
    }
  }

  private getStatusMember() {
    this._sessionServiceProxy.getCurrentLoignIsClientRole().subscribe((result) => {
      if (result.hasClientRole) {
        this._serviceMembersProxy.getStatus().subscribe((result) => {
          this.statusMember = result.status;
        });
      } else {
        this.statusMember = MemberType.Administrador;
      }
    });
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
