import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
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

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'monetae-home',
  templateUrl: './home.component.html',
  providers: [ DialogService ]
})
export class HomeComponent extends AppComponentBase implements OnInit {
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('cryptoRequests') cryptoRequests: OTCRequestsByMemberComponent;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  products: any[] | undefined;
  cryptos: any[] | undefined;
  responsiveOptions: any[] | undefined;
  responsiveOptionsCryptos: any[] | undefined;

  constructor(
    injector: Injector,
    private router: Router,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
    public dialogService: DialogService,
  ) {
    super(injector);
  }

  ngOnInit() {
    console.log(this.cryptoRequests);
    this.menuItems = [
      { label: 'Inversiones' },
      { label: 'Portafolio' },
      { label: 'Historial' }
    ];
    this.activeItem = this.menuItems[0];
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
      }
    ]
    this.cryptos = [
      {
        name: 'Bitcoin',
        coin: 'BTC'
      },
      {
        name: 'Litecoin',
        coin: 'ITC'
      },
      {
        name: 'Ethereum',
        coin: 'ETH'
      },
      {
        name: 'Solana',
        coin: 'SOL'
      },
      {
        name: 'Bitcoin',
        coin: 'BTC'
      },
    ]
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
    this.responsiveOptionsCryptos = [
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 1
      },
      {
          breakpoint: '640px',
          numVisible: 2,
          numScroll: 1
      },
      {
        breakpoint: '420px',
        numVisible: 1,
        numScroll: 1
      }
    ]
  }

  createMemberFiatDeposit() {
    this.createMntMemberFiatDepositModal.show();
  }

  createMemberFiatWhitdrawal() {
    this.createMntMemberFiatWithdrawalModal.show();
  }

  showDialogBuySell(index){
    console.log(index);
    const ref = this.dialogService.open(DialogOperationBuySellComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
      data: {
        activeIndex: index
      },
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationBuySellComponent;
    instance?.outAccept.subscribe((values) => {
      console.log(values);
      ref.close();
    });
  }

  showDialogSendReceive(index){
    console.log(index);
    const ref = this.dialogService.open(DialogOperationSendReceiveComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
      data: {
        activeIndex: index
      },
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationSendReceiveComponent;
    instance?.outAccept.subscribe((values) => {
      console.log(values);
      ref.close();
    });
  }

  showDialogDepositWithdraw(index){
    console.log(index);
    const ref = this.dialogService.open(DialogOperationDepositWithdrawComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--operations ae-dialog--sm',
      data: {
        activeIndex: index
      },
    });
    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();
    const instance = dialogRef?.instance?.componentRef?.instance as DialogOperationDepositWithdrawComponent;
    instance?.outAccept.subscribe((values) => {
      console.log(values);
      ref.close();
    });
  }

  goToProject(tokenId: string) {
    this.router.navigate(['/app/main/projects/project-' + tokenId]);
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }

  reloadRequests() {
    this.cryptoRequests.getAllOtcRequestsByMember();
  }

}
