import { Component, Injector, ViewEncapsulation, OnInit, ViewChild, AfterViewInit, Input, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'abp-ng2-module';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { SelectItem } from 'primeng/api';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { OTCServiceProxy } from '@shared/service-proxies/service-otc-proxies';
import { OTCTradingForViewDto } from '@shared/service-proxies/dto/Otc/OTCTrading/OTCTradingForViewDto';
import { CryptoBehaviors } from '@shared/service-proxies/enum/OTC/CryptoBehaviors.enum';
import { io, SocketOptions } from 'socket.io-client';
import { environment } from 'environments/environment';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { OTCRequestsByMemberComponent } from '../components/requestsByMember/requestsByMember.component';
import { OTCCryptoPurchaseComponent } from '../components/purchase/purchase.component';
import { OTCCryptoSaleComponent } from '../components/sale/sale.component';

@Component({
  selector: 'otc-wrapper',
  templateUrl: './otcWrapper.component.html'
})
export class OtcWrapperComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('detalleVentaModal', { static: true }) modal: ModalDirective;
  @ViewChild('quoteModal', { static: true }) modalQuote: ModalDirective;
  @ViewChild('cryptoRequests') cryptoRequests: OTCRequestsByMemberComponent;
  @ViewChild('cryptoPurchase') cryptoPurchase: OTCCryptoPurchaseComponent;
  @ViewChild('cryptoSale') cryptoSale: OTCCryptoSaleComponent;


  currencies: SelectItem[];
  selectedCurrency!: OTCTradingForViewDto;
  socketOptions: SocketOptions = { auth: { token: abp.auth.getToken() } };
  socket = io(environment.socketioHost, this.socketOptions);
  indexTab = 0;

  constructor(
    injector: Injector,
    private _serviceCommonProxy: ServiceCommonProxy,
    private _otcServiceProxy: OTCServiceProxy,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
  ) {
    super(injector);
    this.selectedCurrency = new OTCTradingForViewDto();
  }

  ngOnInit(): void {
    this.socket.on('connect', () => {
      console.log('Conected to Websocket:' + this.socket.id);
    });

    this.socket.on('OTC:COINSQUOTE', (mensaje) => {
      let result = this._otcServiceProxy.getAllTradingSocket(mensaje);
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.cryptoPurchase.onUpdateRecords(result.items);
      this.cryptoPurchase.onUpdatePrice();
      this.cryptoSale.onUpdateRecords(result.items);
      this.cryptoSale.onUpdatePrice();
    });

    this._serviceCommonProxy.getSelectOptions('OTCTrading/GetAllCryptoCoins', null).subscribe((result) => {
      this.currencies = result.items;
    });

  }

  getAllOtc(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._otcServiceProxy.getAllTrading().subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();

      // this.cryptoPurchase.onStart(result.items);
      // this.cryptoSale.onStart(result.items);
    });
  }

  getBehavior() {
    return CryptoBehaviors;
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  onRowSelect(event: any) {
    if (this.indexTab === 0) {
      this.cryptoPurchase.onUpdateCurrency(event.data.id);
      this.cryptoPurchase.onUpdatePrice();
    } else {
      this.cryptoSale.onUpdateCurrency(event.data.id);
      this.cryptoSale.onUpdatePrice();
    }
  }

  onSelectRow(otcCoin: OTCTradingForViewDto) {
    if (this.selectedCurrency.key === undefined) {
      this.selectedCurrency = otcCoin;
      if (this.indexTab === 0) {
        this.cryptoPurchase.onUpdateCurrency(otcCoin.id);
        this.cryptoPurchase.onUpdatePrice();
      } else {
        this.cryptoSale.onUpdateCurrency(otcCoin.id);
        this.cryptoSale.onUpdatePrice();
      }
    } else {
      this.onResetCurrency(null);
      if (this.indexTab === 0) {
        this.cryptoPurchase.onReset();
      } else {
        this.cryptoSale.onReset();
      }
    }
  }

  onChangeRequest(event: OTCTradingForViewDto) {
    if (event !== undefined) {
      this.selectedCurrency = event;
    } else {
      this.onResetCurrency(null);
    }
  }

  onResetCurrency(event: any) {
    this.selectedCurrency = new OTCTradingForViewDto();
    if (this.indexTab === 0) {
      this.cryptoPurchase.onReset();
    } else {
      this.cryptoSale.onReset();
    }
  }

  onChangeTab(event: any) {
    this.indexTab = event.index;
    if (this.indexTab === 0) {
      this.selectedCurrency = this.cryptoPurchase.selectedCurrency;
    } else {
      this.selectedCurrency = this.cryptoSale.selectedCurrency;
    }
  }

  reloadRequests() {
    this.cryptoRequests.getAllOtcRequestsByMember();
  }

  show() {
    this.modal.show();
  }

  close() {
    this.modal.hide();
  }

  showQuote() {
    this.modalQuote.show();
  }

  closeQuote() {
    this.modalQuote.hide();
  }

}
