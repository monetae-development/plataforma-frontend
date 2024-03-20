import { Component, Injector, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { GetAllTradingCryptoCurrencyForFullViewDto } from '@shared/service-proxies/dto/Trading/TradingCryptoCurrency/GetAllTradingCryptoCurrencyForFullViewDto';
import { CryptoBehaviors } from '@shared/service-proxies/enum/Trading/CryptoBehaviors.enum';
import { io, SocketOptions } from 'socket.io-client';
import { environment } from 'environments/environment';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'trading-market-grid',
  templateUrl: './market-grid.component.html',
})
export class TradingMarketGridComponent extends AppComponentBase implements OnInit {
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @Output() selectRecord: EventEmitter<any> = new EventEmitter<any>();

  socketOptions: SocketOptions = { auth: { token: abp.auth.getToken() } };
  socket = io(environment.socketioHost, this.socketOptions);
  responsiveOptions: any[] | undefined;
  cryptoCurrencies: GetAllTradingCryptoCurrencyForFullViewDto[] | undefined;
  behavior = CryptoBehaviors;
  loaded = false;

  constructor(
    injector: Injector,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _tradingServiceProxy: ServiceTradingProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._tradingServiceProxy.getAllCryptoCurrenciesFull().subscribe((result) => {
      this.cryptoCurrencies = result.items;
      this.loaded = true;
    });

    this.socket.on('connect', () => {
      //console.log('Conected to Websocket:' + this.socket.id);
    });

    this.socket.on('OTC:COINSQUOTE', (response: any) => {
      if (this.loaded) {
        let result = this._tradingServiceProxy.getAllCryptoCurrenciesFullFromWebSocket(response);
        this.updateValues(result.items);
      }
    });
  }

  getAll(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._tradingServiceProxy.getAllCryptoCurrenciesFull().subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.cryptoCurrencies = result.items;
      this.primengTableHelper.records = this.cryptoCurrencies;
      this.primengTableHelper.hideLoadingIndicator();
      this.loaded = true;
    });
  }

  onSelectRecord(currencyId: number) {
    this.selectRecord.emit(currencyId);
  }

  private updateValues(items: GetAllTradingCryptoCurrencyForFullViewDto[]) {
    items.forEach((item: GetAllTradingCryptoCurrencyForFullViewDto) => {
      const criptoCurrency = this.cryptoCurrencies.find(x => x.tradingCryptoCurrency.id === item.tradingCryptoCurrency.id);
      const index = this.cryptoCurrencies.indexOf(criptoCurrency);
      this.cryptoCurrencies[index].tradingCryptoCurrency.salePrice = item.tradingCryptoCurrency.salePrice;
      this.cryptoCurrencies[index].tradingCryptoCurrency.purchasePrice = item.tradingCryptoCurrency.purchasePrice;
      this.cryptoCurrencies[index].tradingCryptoCurrency.change24h = item.tradingCryptoCurrency.change24h;
      this.cryptoCurrencies[index].tradingCryptoCurrency.behavior = item.tradingCryptoCurrency.behavior;
    });
  }
}
