import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    AccountServiceProxy,
    PasswordComplexitySetting,
    ProfileServiceProxy,
    RegisterOutput,
} from '@shared/service-proxies/service-proxies';
import { LoginService } from '../login/login.service';
import { RegisterModel } from './register.model';
import { finalize, catchError } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogDefaultComponent } from '@app/shared/components/dialog/dialog-default/dialog-default.component';

@Component({
    templateUrl: './register.component.html',
    animations: [accountModuleAnimation()],
    providers: [ DialogService ],
})
export class RegisterComponent extends AppComponentBase implements OnInit {
    
    showPassword = false;
    passwordFieldType: string = "password";
    model: RegisterModel = new RegisterModel();
    passwordComplexitySetting: PasswordComplexitySetting = new PasswordComplexitySetting();
    saving = false;
    customPatterns = {
        TrimSpaces: {
            pattern: new RegExp('^(?!\s)(.*\S)?(?<!\s)$')
        },
    };

    constructor(
        injector: Injector,
        private _accountService: AccountServiceProxy,
        private _router: Router,
        private readonly _loginService: LoginService,
        private _profileService: ProfileServiceProxy,
        private _reCaptchaV3Service: ReCaptchaV3Service,
        public dialogService: DialogService,
    ) {
        super(injector);
    }

    get useCaptcha(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnRegistration');
    }

    ngOnInit() {
        //Prevent to register new users in the host context
        if (this.appSession.tenant == null) {
            this._router.navigate(['account/login']);
            return;
        }

        this._profileService.getPasswordComplexitySetting().subscribe((result) => {
            this.passwordComplexitySetting = result.setting;
        });
    }

    save(): void {
        let recaptchaCallback = (token: string) => {
            this.saving = true;
            this.model.captchaResponse = token;
            this._accountService
                .registerSimple(this.model)
                .pipe(
                    finalize(() => {
                        this.saving = false;
                    })
                )
                .subscribe((result: RegisterOutput) => {
                    if (!result.canLogin) {
                        this.openMessageDialog();
                        return;
                    }

                    //Autheticate
                    this.saving = true;
                    this._loginService.authenticateModel.userNameOrEmailAddress = this.model.emailAddress;
                    this._loginService.authenticateModel.password = this.model.password;
                    this._loginService.authenticate(() => {
                        this.saving = false;
                    });
                });
        };

        if (this.useCaptcha) {
            this._reCaptchaV3Service.execute('register').subscribe((token) => recaptchaCallback(token));
        } else {
            recaptchaCallback(null);
        }
    }

    togglePasswordVisibility(): void{
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        this.showPassword = !this.showPassword;
    }

    private openMessageDialog(): void {
        const ref = this.dialogService.open(DialogDefaultComponent, {
            showHeader: false,
            styleClass: 'ae-dialog ae-dialog--default',
            data: {
              icon: 'pi pi-envelope',
              title: 'Verifique su correo electrónico',
              subtitle: this.l('WeHaveSentVerifyEmail', this.model.emailAddress),
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
