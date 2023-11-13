import { Component, Injector, EventEmitter, OnInit, Input, Output, ViewEncapsulation, ViewChild} from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { finalize } from 'rxjs/operators';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { NotifyService } from 'abp-ng2-module';
import { OTCRequestCryptoPayComponent } from '../requestCryptoPay/requestCryptoPay.component';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { OTCServiceProxy } from '@shared/service-proxies/service-otc-proxies';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  selector: 'otc-requests-crypto',
  templateUrl: './requestsByMember.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class OTCRequestsByMemberComponent extends AppComponentBase implements OnInit {
  @ViewChild('requestCryptoPayModal', { static: true }) requestCryptoPayModal: OTCRequestCryptoPayComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;


  requestType = RequestType;
  requestStatus = RequestStatus;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _otcServiceProxy: OTCServiceProxy,
    private _dateTimeService: DateTimeService,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllOtcRequestsByMember(event?: LazyLoadEvent){
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
          this.primengTableHelper.records.length > 0) {
          return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._otcServiceProxy.getAllOTCRequestByMember(
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  reloadRecords(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  //TODO:Unificar en un helper
  getDateTimeFormat(input: string, index: number): string{
    let dateTime = input.split(' ');
    return dateTime[index];
  }
}
