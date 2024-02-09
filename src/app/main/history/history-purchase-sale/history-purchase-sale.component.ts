import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ServiceTradingProxy } from '@shared/service-proxies/service-trading-proxies';
import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { DateTime } from 'luxon';
import { TradingRequestMemberDto } from '@shared/service-proxies/dto/mntMemberTrading/TradingRequestMemberDto';
import { DialogDetailPurchaseSaleComponent } from '@app/shared/components/dialog/dialog-detail-purchase-sale/dialog-detail-purchase-sale.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'history-purchase-sale',
  templateUrl: './history-purchase-sale.component.html',
  styleUrls: ['./history-purchase-sale.component.css']
})
export class HistoryPurchaseSaleComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  filter: string = '';
  requestType = RequestType;
  requestStatus = RequestStatus;

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _serviceTradingProxy: ServiceTradingProxy,
    public _dialogService: DialogService,
  ) {
    super(injector);
  }

  ngOnInit() {

  }

  private getMemberDetailRequest(data){
    this._serviceTradingProxy
    .getMemberDetailRequest(
      data.id
    )
    .subscribe(result => {
        this.openDialogDetailPurchaseSale(result.tradingRequestMemberDto, data.type);
    });
  }

  private openDialogDetailPurchaseSale(dataDetail, type): void {
    const ref = this._dialogService.open(DialogDetailPurchaseSaleComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        detail: dataDetail,
        type: type
      }
    });
  }

  getAllMemberRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
          return;
      }
    }
    this.primengTableHelper.showLoadingIndicator();
    this._serviceTradingProxy
    .getAllMemberRequests(
      this.filter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    )
    .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
    .subscribe(result => {
        console.log(result);
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
    });
  }

  getDateTimeFormat(input: string,): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yy');
  }

  selectRow(data){
    this.getMemberDetailRequest(data);
  }

}
