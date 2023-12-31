import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { SelectItem } from 'primeng/api';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { GetSelectDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectDto';
import { MntMemberFiatRequestsChangeStatusComponent } from './components/changeStatus/changeStatus.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mntMemberFiatRequests.component.html',
  animations: [appModuleAnimation()]
})
export class MntMemberFiatRequestsComponent extends AppComponentBase implements OnInit {
  @ViewChild('changeStatusMntMemberFiatRequestModal', { static: true }) changeStatusMntMemberFiatRequestModal: MntMemberFiatRequestsChangeStatusComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  statusOptions: SelectItem[] = [];
  typeOptions: SelectItem[] = [];

  started = false;
  typeS = FiatType;
  status = FiatStatus;
  folioFilter = '';
  typeFilter = -1;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
    private _serviceMemberProxy: ServiceMembersProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.typeOptions = this.getSelectOptions(FiatType);
    this.statusOptions = this.getSelectOptions(FiatStatus);
  }

  getAllOtcRequests(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._serviceMemberProxy.getAllFiatRequests(
      this.folioFilter,
      this.typeFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      this.primengTableHelper.hideLoadingIndicator();
      this.started = true;
    });
  }

  //TODO: Unificar en un helper
  getSelectOptions(enumObj) {
    let options = [];
    for (const status of Object.values(enumObj)) {
      if (!isNaN(Number(status))) {
        let temp = new GetSelectDto();
        temp.value = status.toString();
        temp.label = this.l(this.getKeyEnum(enumObj, Number(status)));
        options.push(temp);
      }
    }
    return options;
  }

  getKeyEnum(enumObj: any, valor: number): string | undefined {
    const keys = Object.keys(enumObj).filter(key => typeof enumObj[key] === 'number' && enumObj[key] === valor);
    return keys.length > 0 ? keys[0] : undefined;
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  cleanFilters() {
    this.folioFilter = '';
    this.typeFilter = -1;
    this.getAllOtcRequests();
  }

  //TODO:Unificar en un helper
  getDateTimeFormat(input: string, index: number): string {
    let dateTime = input.split(' ');
    return dateTime[index];
  }

  changeStatus(requestId: number) {
    this.changeStatusMntMemberFiatRequestModal.show(requestId);
  }
}
