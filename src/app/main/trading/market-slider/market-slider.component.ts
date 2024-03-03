import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { GetAllTradingCryptoCurrencyForSimpleViewDto } from '@shared/service-proxies/dto/Trading/TradingCryptoCurrency/GetAllTradingCryptoCurrencyForSimpleViewDto';
import { CryptoBehaviors } from '@shared/service-proxies/enum/Trading/CryptoBehaviors.enum';
import { io, SocketOptions } from 'socket.io-client';
import { environment } from 'environments/environment';

@Component({
  selector: 'trading-market-slider',
  templateUrl: './market-slider.component.html'
})
export class TradingMarketSliderComponent extends AppComponentBase implements OnInit {
  socketOptions: SocketOptions = { auth: { token: abp.auth.getToken() } };
  socket = io(environment.socketioHost, this.socketOptions);
  responsiveOptions: any[] | undefined;
  cryptoCurrencies: GetAllTradingCryptoCurrencyForSimpleViewDto[] | undefined;
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
    this._tradingServiceProxy.getAllCryptoCurrenciesSimple().subscribe((result) => {
      this.cryptoCurrencies = result.items;
      this.loaded = true;
    });

    this.socket.on('connect', () => {
      console.log('Conected to Websocket:' + this.socket.id);
    });

    this.socket.on('OTC:COINSQUOTE', (response: any) => {
      if (this.loaded) {
        let result = this._tradingServiceProxy.getAllCryptoCurrenciesSimpleFromWebSocket(response);
        this.updateValues(result.items);
      }
    });

    this.responsiveOptions = [
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
    ];


  }

  private updateValues(items: GetAllTradingCryptoCurrencyForSimpleViewDto[]) {
    items.forEach((item: GetAllTradingCryptoCurrencyForSimpleViewDto) => {
      const criptoCurrency = this.cryptoCurrencies.find(x => x.tradingCryptoCurrency.id === item.tradingCryptoCurrency.id);
      const index = this.cryptoCurrencies.indexOf(criptoCurrency);
      this.cryptoCurrencies[index].tradingCryptoCurrency.salePrice = item.tradingCryptoCurrency.salePrice;
      this.cryptoCurrencies[index].tradingCryptoCurrency.purchasePrice = item.tradingCryptoCurrency.purchasePrice;
      this.cryptoCurrencies[index].tradingCryptoCurrency.change24h = item.tradingCryptoCurrency.change24h;
      this.cryptoCurrencies[index].tradingCryptoCurrency.behavior = item.tradingCryptoCurrency.behavior;
    });
  }
}
