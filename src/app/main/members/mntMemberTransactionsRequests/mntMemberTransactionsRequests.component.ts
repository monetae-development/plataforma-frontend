import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'abp-ng2-module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import * as _ from 'lodash';
import { DateTime } from 'luxon';

@Component({
  templateUrl: './mntMemberTransactionsRequests.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: [appModuleAnimation()]
})
export class MntMemberTransactionsRequestsComponent extends AppComponentBase implements OnInit {
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  advancedFiltersAreShown = false;

  folioFilter: string;
  userEmailFilter: string;
  userNameFilter: string;
  userSurnamesFilter: string;
  destinationAddressFilter: string;
  vaultNameFilter: string;
  assetIdFilter: string;

  constructor(
    injector: Injector,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _serviceMemberProxy: ServiceMembersProxy,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllTransactionRequests(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      if (this.primengTableHelper.records &&
        this.primengTableHelper.records.length > 0) {
        return;
      }
    }

    this.primengTableHelper.showLoadingIndicator();

    this._serviceMemberProxy.getAllTransactionRequests(
      this.folioFilter,
      this.userEmailFilter,
      this.userNameFilter,
      this.userSurnamesFilter,
      this.destinationAddressFilter,
      this.vaultNameFilter,
      this.assetIdFilter,
      this.primengTableHelper.getSorting(this.dataTable),
      this.primengTableHelper.getSkipCount(this.paginator, event),
      this.primengTableHelper.getMaxResultCount(this.paginator, event)
    ).subscribe(result => {
      this.primengTableHelper.totalRecordsCount = result.totalCount;
      this.primengTableHelper.records = result.items;
      console.log(result.items);
      this.primengTableHelper.hideLoadingIndicator();
    });
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
  }

  cleanFilters() {
    this.folioFilter = '';
    this.userEmailFilter = '';
    this.userNameFilter = '';
    this.userSurnamesFilter = '';
    this.destinationAddressFilter = '';
    this.vaultNameFilter = '';
    this.assetIdFilter = '';
    this.getAllTransactionRequests();
  }

  //TODO:Unificar en un helper
  getDateTimeFormat(input: string, index: number): string {
    let dateTime = input.split(' ');
    return dateTime[index];
  }
}
