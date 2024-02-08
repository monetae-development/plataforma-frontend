import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { DateTime } from 'luxon';
import { ServiceTransactionProxy } from '@shared/service-proxies/service-transaction-proxies';
import { TransactionRequestForMemberDetailDto } from '@shared/service-proxies/dto/mntMemberTransaction/TransactionRequestForMemberDetailDto';

@Component({
  selector: 'history-send-receive',
  templateUrl: './history-send-receive.component.html',
  styleUrls: ['./history-send-receive.component.css']
})
export class HistorySendReceiveComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  filter: string = '';
  requestType = RequestType;
  requestStatus = RequestStatus;

  detailHistory: TransactionRequestForMemberDetailDto;

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _serviceTransactionProxy: ServiceTransactionProxy
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  private getMemberDetailRequest(requestId){
    this._serviceTransactionProxy
    .getMemberDetailRequest(
      requestId
    )
    .subscribe(result => {
        this.detailHistory = result.request;
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
    this._serviceTransactionProxy
    .getAllMemberRequests()
    .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
    .subscribe((result) => {
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

  onRowSelect(event){
    console.log(event);
    this.getMemberDetailRequest(event.data.request.id);
  }

}
