import { Component, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AccountServiceProxy, SendPasswordResetCodeInput } from '@shared/service-proxies/service-proxies';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs/operators';

@Component({
    templateUrl: './forgot-password.component.html',
    animations: [accountModuleAnimation()],
    providers: [ DialogService ],
})
export class ForgotPasswordComponent extends AppComponentBase {
    model: SendPasswordResetCodeInput = new SendPasswordResetCodeInput();

    saving = false;

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        public dialogService: DialogService,
    ) {
        super(injector);
    }

    save(): void {
        this.saving = true;
        this._accountService
            .sendPasswordResetCode(this.model)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.openMessageDialog();
            });
    }

    private openMessageDialog(): void {
        const ref = this.dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default',
            data: {
              icon: 'pi pi-envelope',
              title: this.l('MailSent'),
              subtitle: this.l('PasswordResetMailSentMessage'),
              info: this.l('HasntReceivedTryToContact'),
              titleAction: this.l('Continue'),
            }
        });
        const dialogRef = this.dialogService.dialogComponentRefMap.get(ref);
        dialogRef?.changeDetectorRef.detectChanges();

        const instance = dialogRef?.instance?.componentRef?.instance as DialogDefaultComponent;
        instance?.outAccept.subscribe(() => {
            this._router.navigate(['account/login']);
            ref.close();
        });
    }
}
