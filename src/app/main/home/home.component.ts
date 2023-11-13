import { AppConsts } from '@shared/AppConsts';
import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { NotifyService } from 'abp-ng2-module';
import { Table } from 'primeng/table';
import { Paginator } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/api';
import { MntMemberFiatDepositComponent } from '../members/mntMemberFiat/components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from '../members/mntMemberFiat/components/withdrawal/withdrawal.component';
import * as _ from 'lodash';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'monetae-home',
  templateUrl: './home.component.html'
})
export class HomeComponent extends AppComponentBase implements OnInit {
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;

  menuItems: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;

  constructor(
    injector: Injector,
    private router: Router,
    private _notifyService: NotifyService,
    private _tokenAuth: TokenAuthServiceProxy,
    private _activatedRoute: ActivatedRoute,
    private _dateTimeService: DateTimeService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.menuItems = [
      { label: 'Proyectos', icon: 'pi pi-fw pi-file' },
      { label: 'OTC', icon: 'pi pi-fw pi-cog' }
    ];
    this.activeItem = this.menuItems[0];
  }

  createMemberFiatDeposit() {
    this.createMntMemberFiatDepositModal.show();
  }

  createMemberFiatWhitdrawal() {
    this.createMntMemberFiatWithdrawalModal.show();
  }

  goToProject(tokenId: string) {
    this.router.navigate(['/app/main/projects/project-' + tokenId]);
  }

  onActiveItemChange(event: MenuItem) {
    console.log(event);
    this.activeItem = event;
  }

}
