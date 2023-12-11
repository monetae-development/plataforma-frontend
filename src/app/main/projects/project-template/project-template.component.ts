import { Component, Injector, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { MntMemberFiatDepositComponent } from '@app/main/members/mntMemberFiat/components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from '@app/main/members/mntMemberFiat/components/withdrawal/withdrawal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogInvestComponent } from '@app/shared/components/dialog/dialog-invest/dialog-invest.component';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  providers: [ DialogService ]
})
export class ProjectTemplateComponent extends AppComponentBase implements OnInit {
  @ViewChild('createMntMemberFiatDepositModal', { static: true }) createMntMemberFiatDepositModal: MntMemberFiatDepositComponent;
  @ViewChild('createMntMemberFiatWithdrawalModal', { static: true }) createMntMemberFiatWithdrawalModal: MntMemberFiatWithdrawalComponent;
  @ViewChild('projectsInvestModal', { static: true }) projectsInvestModal: MntMemberFiatDepositComponent;

  constructor(
    injector: Injector,
    public dialogService: DialogService,
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

  showDialogInvest(){
    const ref = this.dialogService.open(DialogInvestComponent, {
      showHeader: false,
      styleClass: 'ae-dialog ae-dialog--sm',
      data: {
        transfer: {

        },
      },
    });

    const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
    dialogRef?.changeDetectorRef.detectChanges();

    const instance = dialogRef?.instance?.componentRef?.instance as DialogInvestComponent;
    instance?.outAccept.subscribe((values) => {
      console.log(values);
      ref.close();
    });
  }
}
