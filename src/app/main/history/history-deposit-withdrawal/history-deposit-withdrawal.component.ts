import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { AppComponentBase } from '@shared/common/app-component-base';
import { PrimengTableHelper } from 'shared/helpers/PrimengTableHelper';
import { LazyLoadEvent } from 'primeng/api';
import { finalize } from 'rxjs';
import { DateTime } from 'luxon';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { MntMemberFiatRequestDto } from '@shared/service-proxies/dto/members/mntMemberFiat/MntMemberFiatRequestDto';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { DialogDetailDepositWithdrawComponent } from '@app/shared/components/dialog/dialog-detail-deposit-withdraw/dialog-detail-deposit-withdraw.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'history-deposit-withdrawal',
  templateUrl: './history-deposit-withdrawal.component.html'
})
export class HistoryDepositWithdrawalComponent extends AppComponentBase implements OnInit {

  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  folioFilter: string;
  typeFilter: number = undefined;
  requestType = FiatType;
  fiatStatus = FiatStatus;
  selectRecordId: number;
  openDialog: boolean;

  primengTableHelper = new PrimengTableHelper();

  constructor(
    injector: Injector,
    private _serviceMembersProxy: ServiceMembersProxy,
    public _dialogService: DialogService,
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

  getDateFormat(input: string): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('dd/MM/yyyy');
  }

  getTimeFormat(input: string): string {
    const parsedDate = DateTime.fromISO(input);
    return parsedDate.toFormat('HH:mm:ss');
  }

  selectRow(data) {
    this.selectRecordId = data.id;
    this.getMemberDetailRequest(data);
  }

  private getMemberDetailRequest(data) {
    if (!this.openDialog) {
      this.openDialog = true;
      this._serviceMembersProxy.getMemberDetailRequest(data.id).subscribe(result => {
        this.openDialogDetailDepositWithdraw(result, data.type);
        this.openDialog = false;
        this.selectRecordId = -1;
      });
    }
  }

  private openDialogDetailDepositWithdraw(dataDetail, type): void {
    const ref = this._dialogService.open(DialogDetailDepositWithdrawComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        detail: dataDetail,
        type: type
      }
    });
  }

}
