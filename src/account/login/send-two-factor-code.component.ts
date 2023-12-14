﻿import { Component, Injector, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SendTwoFactorAuthCodeModel, TokenAuthServiceProxy } from '@shared/service-proxies/service-proxies';
import { LoginService } from './login.service';
import { finalize } from 'rxjs/operators';
import { ValidateTwoFactorCodeComponent } from '@account/login/validate-two-factor-code.component';
import { forEach } from 'lodash-es';

@Component({
    templateUrl: './send-two-factor-code.component.html',
    animations: [accountModuleAnimation()],
})
export class SendTwoFactorCodeComponent extends AppComponentBase implements CanActivate, OnInit {
    selectedTwoFactorProvider: string;
    submitting = false;
    optionsTwoFactorProvider = [];

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private location: Location
    ) {
        super(injector);
        this.loginService.authenticateResult.twoFactorAuthProviders.forEach((value) => {
            let option = { label: this.l('TwoFactorOption:' + value), value: value };
            this.optionsTwoFactorProvider.push(option);
            if (this.optionsTwoFactorProvider.length == 1) {
                this.selectedTwoFactorProvider = this.optionsTwoFactorProvider[0].value;
            }
        });
    }

    canActivate(): boolean {
        if (
            this.loginService.authenticateModel &&
            this.loginService.authenticateResult &&
            this.loginService.authenticateResult.twoFactorAuthProviders &&
            this.loginService.authenticateResult.twoFactorAuthProviders.length
        ) {
            return true;
        }

        return false;
    }

    ngOnInit(): void {
        if (!this.canActivate()) {
            this._router.navigate(['account/login']);
            return;
        }
    }

    submit(): void {
        const model = new SendTwoFactorAuthCodeModel();
        model.userId = this.loginService.authenticateResult.userId;
        model.provider = this.selectedTwoFactorProvider;

        this.submitting = true;
        this._tokenAuthService
            .sendTwoFactorAuthCode(model)
            .pipe(finalize(() => (this.submitting = false)))
            .subscribe(() => {
                this._router.navigate(['account/verify-code']);
            });
    }

    goBack(){
        this.location.back();
    }
}
