import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { SessionServiceProxy, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { MenuItem, SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { MntMemberFiatDepositComponent } from '../members/mntMemberFiat/components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from '../members/mntMemberFiat/components/withdrawal/withdrawal.component';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { OTCRequestsByMemberComponent } from '../otc/components/requestsByMember/requestsByMember.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogOperationDepositWithdrawComponent } from '@app/shared/components/dialog/dialog-operation-deposit-withdraw/dialog-operation-deposit-withdraw.component';
import { DialogOperationBuySellComponent } from '@app/shared/components/dialog/dialog-operation-buy-sell/dialog-operation-buy-sell.component';
import { DialogOperationSendReceiveComponent } from '@app/shared/components/dialog/dialog-operation-send-receive/dialog-operation-send-receive.component';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { MemberStatus } from '@shared/service-proxies/enum/Members/MemberStatus.enum';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';
import { MemberType } from '@shared/service-proxies/enum/Members/MemberType.enum';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'monetae-home',
  templateUrl: './home.component.html',
  providers: [DialogService]
})
export class HomeComponent extends AppComponentBase implements OnInit, AfterViewInit {
  @ViewChild('inversionesContainer') inversionesContainer: ElementRef;
  @ViewChild('wrapperBalance') wrapperBalance: ElementRef;
  @ViewChild('wrapperMobile') wrapperMobile: ElementRef;
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('cryptoRequests') cryptoRequests: OTCRequestsByMemberComponent;

  menuItems: MenuItem[] | undefined;
  menuItemsHistory: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  activeItemHistory: MenuItem | undefined;
  products: any[] | undefined;
  responsiveOptions: any[] | undefined;
  isInversionesCarousel: Boolean = true;
  filterInversiones: SelectItem[];
  amount: number;
  currency: string;
  statusMember: number;
  showFadeDialogOperations: Boolean = false;
  pageWidth: number;
  pageHeight: number;
  wrapperWidth: number;
  diffCenter = 0;
  wrapperHeight = 0;
  wrapperMobileTopPosition: string;
  runInterval = false;

  constructor(
    injector: Injector,
    private _router: Router,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
    private _serviceMembersProxy: ServiceMembersProxy,
    private _dialogService: DialogService,
    private _sessionServiceProxy: SessionServiceProxy,
  ) {
    super(injector);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    this.runInterval = false;
    this.wrapperResize();
  }

  ngAfterViewInit() {
    this.pageWidth = window.innerWidth;
    this.pageHeight = window.innerHeight;
    setTimeout(() => {
      this.wrapperResize();
    });
    this.doAction();
  }

  wrapperResize() {
    this.wrapperHeight = this.wrapperBalance.nativeElement.clientHeight - 20;

    let menuW = 249 / 2;
    if (this.appSession.isOnlyClientRole) {
      menuW = 0;
    }

    this.wrapperWidth = this.inversionesContainer.nativeElement.clientWidth;
    if (this.pageWidth < 992) {
      menuW = 0;
      this.wrapperWidth = this.pageWidth;
    }

    if (!this.runInterval) {
      let interval: any;
      interval = setInterval(() => {
        this.wrapperResize();
        clearInterval(interval);
      }, 500);
    }
    this.runInterval = true;

    if (this.pageWidth > this.wrapperWidth) {
      this.diffCenter = (this.pageWidth - this.wrapperWidth) / 2 + menuW;
    } else {
      this.diffCenter = 0;
    }
  }

  wrapperMobilePosition() {
    if (!this.showFadeDialogOperations) {
      this.wrapperMobileTopPosition = this.pageHeight - (this.wrapperMobile.nativeElement.clientHeight / 2) + 'px';
    } else {
      this.wrapperMobileTopPosition = '100%';
    }
  }

  ngOnInit() {
    this.getBalance();
    this.getStatusMember();
    this.amount = 0;
    this.currency = '';
    this.menuItems = [
      { label: this.l('Investments') },
      { label: this.l('Market') },
      { label: this.l('Portfolio') },
      { label: this.l('Historic') }
    ];
    this.menuItemsHistory = [
      { label: this.l('Sale/Purchase') },
      { label: this.l('Deposit/Withdrawal') },
      { label: this.l('Send/Receiving') }
    ];
    this.filterInversiones = [
      {
        label: 'Todos',
        value: 0
      }
    ];
    this.activeItem = this.menuItems[0];
    this.activeItemHistory = this.menuItemsHistory[0];

    this.products = [
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador'
      },
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador',
      },
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador',
      },
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador',
      },
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador',
      },
      {
        category: 'Inmobiliario',
        title: 'Proyecto El Salvador',
      }
    ];
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '640px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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

  showDialogSendReceive(index) {
    if (this.statusMember === MemberStatus.Register) {
      this.openMessageDialogVerifyAccount();
    } else if (this.statusMember === MemberStatus.Pending || this.statusMember === MemberStatus.Review) {
      this.openMessageDialogSuccessAccount();
    } else if (this.statusMember === MemberStatus.Refused) {
      this.openMessageDialogRefusedAccount();
    } else if (this.statusMember === MemberType.Administrador) {
      this.openMessageDialogRolAdministrador();
    } else {
      const ref = this._dialogService.open(DialogOperationSendReceiveComponent, {
        showHeader: false,
        styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
        data: {
          activeIndex: index
        },
      });
      const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
      dialogRef?.changeDetectorRef.detectChanges();
      const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationSendReceiveComponent;
      instance?.outAccept.subscribe((values) => {
        console.log(values);
        ref.close();
      });
    }
  }

  showDialogDepositWithdraw(index) {
    if (this.statusMember === MemberStatus.Register) {
      this.openMessageDialogVerifyAccount();
    } else if (this.statusMember === MemberStatus.Pending || this.statusMember === MemberStatus.Review) {
      this.openMessageDialogSuccessAccount();
    } else if (this.statusMember === MemberStatus.Refused) {
      this.openMessageDialogRefusedAccount();
    } else if (this.statusMember === MemberType.Administrador) {
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

  goToProject(tokenId: string) {
    //this._router.navigate(['/app/main/projects/project-' + tokenId]);
  }

  onActiveMenuItem(index: number) {
    this.activeItem = this.menuItems[index];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  onActiveItemHistoryChange(event: MenuItem) {
    this.activeItemHistory = event;
  }

  reloadRequests() {
    this.cryptoRequests.getAllOtcRequestsByMember();
  }

  goToInversionesCards() {
    this.isInversionesCarousel = false;
  }

  showDialogOperations() {
    this.wrapperMobilePosition();
    this.showFadeDialogOperations = !this.showFadeDialogOperations;
  }

  private doAction() {
    this._activatedRoute.params.subscribe(params => {
      let action = params['action'];
      switch (action) {
        case 'fiat-deposit':
          this.showDialogDepositWithdraw(0);
          break;
        case 'history-fiat':
          this.activeItem = this.menuItems[3];
          this.activeItemHistory = this.menuItemsHistory[1];
          break;
      }
    });
  }

  private getBalance() {
    this._serviceMembersProxy.getBalance().subscribe((result) => {
      this.amount = result.amount;
      this.currency = result.currency;
    });
  }

  private getStatusMember() {
    if (this.appSession.hasClientRole) {
      this._serviceMembersProxy.getStatus().subscribe((result) => {
        this.statusMember = result.status;
      });
    } else {
      this.statusMember = MemberType.Administrador;
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
      this.showFadeDialogOperations = false;
    });
  }

  private openMessageDialogRefusedAccount(): void {
    const ref = this._dialogService.open(DialogDefaultComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--default ae-text-danger ae-dialog--sm',
      data: {
        icon: 'pi pi-id-card',
        title: this.l('KycRequestRefusedDialogTitle'),
        subtitle: this.l('KycRequestRefusedDialogMessage'),
        titleAction: 'Aceptar'
      }
    });
    const dialogRef = this._dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
    instance?.outAccept.subscribe(() => {
      this.showFadeDialogOperations = false;
      this._router.navigate(['app/main/members/mntMemberDataComplements']);
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
      this.showFadeDialogOperations = false;
    });
  }
}
