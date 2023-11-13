import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { MntMemberFiatDepositComponent } from '@app/main/members/mntMemberFiat/components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from '@app/main/members/mntMemberFiat/components/withdrawal/withdrawal.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-project-template',
  templateUrl: './project-template.component.html'
})
export class ProjectTemplateComponent extends AppComponentBase implements OnInit {
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('projectsInvestModal', { static: true }) projectsInvestModal: MntMemberFiatDepositComponent;

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  createMemberFiatDeposit() {
    this.createMntMemberFiatDepositModal.show();
  }

  createMemberFiatWhitdrawal() {
    this.createMntMemberFiatWithdrawalModal.show();
  }

  showInvestModal() {
    this.projectsInvestModal.show();
  }
}
