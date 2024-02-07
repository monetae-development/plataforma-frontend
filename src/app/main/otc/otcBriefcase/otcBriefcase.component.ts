import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from '@shared/helpers/PrimengTableHelper';
import { RequestType } from '@shared/service-proxies/enum/MemberTrading/RequestType.enum';
import { CryptoBehaviors } from '@shared/service-proxies/enum/OTC/CryptoBehaviors.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { DateTime } from 'luxon';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';

@Component({
  selector: 'otc-otcBriefcase',
  templateUrl: './otcBriefcase.component.html',
  styleUrls: ['./otcBriefcase.component.css'],
})
export class OtcBriefcaseComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  filter: string = '';
  requestType = RequestType;
  requestStatus = RequestStatus;
  itemsMenu: any[] | undefined;
  total: number = 6;
  items: any = [];

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _serviceTradingProxy: ServiceTradingProxy
  ) {
    super(injector);
  }

  ngOnInit() {
    this.itemsMenu = [
      {
        label: 'Comprar'
      },
      {
        label: 'Vender'
      }
    ]
    this.items = [
          {
              "request": {
                  "totalPercent": 38441.28,
                  "cost": 36837.34,
                  "percent24H": -0.39,
                  "id": 1
              },
              "cryptoCurrency": {
                "name": "Bitcoin",
                "key": "BTC",
                "id": 0
              }
          },
          {
              "request": {
                  "totalPercent": 2062.82,
                  "cost": 1979.51,
                  "percent24H": -1.3,
                  "id": 2
              },
              "cryptoCurrency": {
                "name": "Ethereum",
                "key": "ETH",
                "id": 0
              }
          },
          {
              "request": {
                  "totalPercent": 1.02,
                  "cost": 0.98,
                  "percent24H": -0.01,
                  "id": 3
              },
              "cryptoCurrency": {
                "name": "Tether",
                "key": "USDT",
                "id": 0
              }
          },
          {
              "request": {
                  "totalPercent": 0.62,
                  "cost": 0.59,
                  "percent24H": -0.99,
                  "id": 4
              },
              "cryptoCurrency": {
                "name": "XRP",
                "key": "XRP",
                "id": 0
              }
          },
          {
              "request": {
                  "name": "USD Coin",
                  "key": "USDC",
                  "totalPercent": 1.02,
                  "cost": 0.98,
                  "percent24H": 0.0,
                  "id": 5
              },
              "cryptoCurrency": {
                "name": "USD Coin",
                "key": "USDC",
                "id": 0
              }
          },
          {
              "request": {
                  "totalPercent": 0.76,
                  "cost": 0.73,
                  "percent24H": -0.49,
                  "id": 6
              },
              "cryptoCurrency": {
                "name": "Polygon",
                "key": "MATIC",
                "id": 0
              }
          }
      ]
  }

  getAllMemberPortfolioRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
          return;
      }
    }
    this.primengTableHelper.showLoadingIndicator();
    this._serviceTradingProxy
    .getAllMemberPortfolioRequests(
      this.filter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    )
    .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
    .subscribe(result => {
        console.log(result);
        this.primengTableHelper.totalRecordsCount = this.total;
        this.primengTableHelper.records = this.items;
        // this.primengTableHelper.totalRecordsCount = result.totalCount;
        // this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  getDateTimeFormat(input: string,): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yy');
  }

}
