﻿import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { Subscription, Observable } from 'rxjs';
import { timer } from 'rxjs';
import { LoginService } from './login.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './validate-two-factor-code.component.html',
    styleUrls: ['./validate-two-factor-code.component.less'],
    animations: [accountModuleAnimation()],
})
export class ValidateTwoFactorCodeComponent extends AppComponentBase implements CanActivate, OnInit, OnDestroy {
    code: string;
    email: string = '';
    submitting = false;
    remainingSeconds = 90;
    timerSubscription: Subscription;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _reCaptchaV3Service: ReCaptchaV3Service,
        private _router: Router,
        private location: Location
    ) {
        super(injector);
        const email = this.loginService.authenticateModel.userNameOrEmailAddress;
        const parts = email.split('@');
        const first_part = parts[0].substring(0, 2) + '****';
        this.email = first_part + '@' + parts[1];
    }

    get useCaptcha(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnLogin');
    }

    canActivate(): boolean {
        if (this.loginService.authenticateModel && this.loginService.authenticateResult) {
            return true;
        }

        return false;
    }

    ngOnInit(): void {
        if (!this.canActivate()) {
            this._router.navigate(['account/login']);
            return;
        }

        this.remainingSeconds = this.appSession.application.twoFactorCodeExpireSeconds;

        const timerSource = timer(1000, 1000);
        this.timerSubscription = timerSource.subscribe(() => {
            this.remainingSeconds = this.remainingSeconds - 1;
            if (this.remainingSeconds === 0) {
                this.message.warn(this.l('TimeoutPleaseTryAgain')).then(() => {
                    this.loginService.authenticateModel.twoFactorVerificationCode = null;
                    this._router.navigate(['account/login']);
                });
            }
        });
    }

    ngOnDestroy(): void {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
            this.timerSubscription = null;
        }
    }

    submit(): void {
        let recaptchaCallback = (token: string) => {
            this.loginService.authenticateModel.twoFactorVerificationCode = this.code;
            this.loginService.authenticate(() => { }, null, token);
        };

        if (this.useCaptcha) {
            this._reCaptchaV3Service.execute('login').subscribe((token) => recaptchaCallback(token));
        } else {
            recaptchaCallback(null);
        }
    }

    goBack(){
        this.location.back();
    }
}
