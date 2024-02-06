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
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';

@Component({
  selector: 'history-deposit-withdrawal',
  templateUrl: './history-deposit-withdrawal.component.html',
  styleUrls: ['./history-deposit-withdrawal.component.css']
})
export class HistoryDepositWithdrawalComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  folioFilter: string = '';
  typeFilter: number = 0;
  requestType = RequestType;
  requestStatus = RequestStatus;

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _serviceMembersProxy: ServiceMembersProxy
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllMemberRequests(event?: LazyLoadEvent): void {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);

      if (this.primengTableHelper.records && this.primengTableHelper.records.length > 0) {
          return;
      }
    }
    this.primengTableHelper.showLoadingIndicator();
    this._serviceMembersProxy
    .getAllFiatRequestsByMemmber(
      this.folioFilter,
      this.typeFilter,
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

}
