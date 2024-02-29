﻿import { Component, EventEmitter, Injector, Output, ViewChild, OnInit } from '@angular/core';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    CurrentUserProfileEditDto,
    SettingScopes,
    ProfileServiceProxy,
    UpdateGoogleAuthenticatorKeyOutput,
    SendVerificationSmsInputDto,
    GenerateGoogleAuthenticatorKeyOutput,
    VerifyAuthenticatorCodeInput,
} from '@shared/service-proxies/service-proxies';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SmsVerificationModalComponent } from './sms-verification-modal.component';
import { finalize } from 'rxjs/operators';
import { EnableTwoFactorAuthenticationModalComponent } from './enable-two-factor-authentication-modal.component';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { SelectItem } from 'primeng/api';
import { GetSelectIntDto } from '@shared/service-proxies/dto/Common/SelectInput/GetSelectIntDto';
import { Dropdown } from 'primeng/dropdown';

@Component({
    selector: 'mySettingsModal',
    templateUrl: './my-settings-modal.component.html',
})
export class MySettingsModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('mySettingsModal', { static: true }) modal: ModalDirective;
    @ViewChild('enableTwoFactor', { static: true })
    enableTwoFactorAuthenticationModal: EnableTwoFactorAuthenticationModalComponent;
    @ViewChild('smsVerificationModal') smsVerificationModal: SmsVerificationModalComponent;
    @ViewChild('verifyCodeModal') verifyCodeModal: SmsVerificationModalComponent;
    @ViewChild('phoneCodeId') memberPhoneCode: Dropdown;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    public active = false;
    public saving = false;
    public isGoogleAuthenticatorEnabled = false;
    public activeMessagePhone = false;
    public isPhoneNumberConfirmed: boolean;
    public smsEnabled: boolean;
    public user: CurrentUserProfileEditDto;
    public showTimezoneSelection: boolean = abp.clock.provider.supportsMultipleTimezone;
    public canChangeUserName: boolean;
    public defaultTimezoneScope: SettingScopes = SettingScopes.User;
    public savedPhoneNumber: string;
    public newPhoneNumber: string;
    public memberPhoneCodeId: number;
    public personalDataPhones: SelectItem[];
    public flags: GetSelectIntDto[] = [];

    isMultiTenancyEnabled: boolean = this.multiTenancy.isEnabled;
    isTwoFactorLoginEnabledForApplication = false;

    private _initialTimezone: string = undefined;

    constructor(
        injector: Injector,
        private _profileService: ProfileServiceProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.isTwoFactorLoginEnabledForApplication = abp.setting.getBoolean(
            'Abp.Zero.UserManagement.TwoFactorLogin.IsEnabled'
        );
    }

    show(): void {
        this.active = true;
        this._profileService.getCurrentUserProfileForEdit().subscribe((result) => {
            this.smsEnabled = this.setting.getBoolean('App.UserManagement.SmsVerificationEnabled');
            this.user = result;
            this._initialTimezone = result.timezone;
            this.canChangeUserName = this.user.userName !== AppConsts.userManagement.defaultAdminUserName;
            this.modal.show();
            this.isGoogleAuthenticatorEnabled = result.isGoogleAuthenticatorEnabled;
            this.isPhoneNumberConfirmed = result.isPhoneNumberConfirmed;
            this.savedPhoneNumber = result.phoneNumber;
        });
        console.log('TEST');
        this._serviceCommonProxy.getSelectOptions('MntMemberDataComplements/GetAllCountryPhoneCodesForSelect', null).subscribe((result) => {
            this.personalDataPhones = result.items;
            this.flags = [];
            for (const record of result.items) {
                let temp = new GetSelectIntDto();
                temp.value = record.value;
                temp.label = record.label;
                temp.subtitle = record.subtitle;
                this.flags[record.value] = temp;
            }
            this.memberPhoneCode.disabled = false;
            this.memberPhoneCode.placeholder = '+1';
        });
    }

    enableTwoFactorAuthentication(): void {
        this._profileService
            .generateGoogleAuthenticatorKey()
            .subscribe((result: GenerateGoogleAuthenticatorKeyOutput) => {
                this.enableTwoFactorAuthenticationModal.model = result;
            });
        this.enableTwoFactorAuthenticationModal.show();
    }

    disableTwoFactorAuthentication(verifyCodeInput: VerifyAuthenticatorCodeInput): void {
        this._profileService
            .disableGoogleAuthenticator(verifyCodeInput)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.close();
                this.message.success(this.l('TwoFactorAuthenticationDisabled'));
            });
    }

    onChangePhoneNumber(): void {
        if (this.user.phoneCodeId && this.user.phoneNumber) {
            this.activeMessagePhone = false;
        } else {
            this.activeMessagePhone = true;
        }
    }

    smsVerify(): void {
        if (!this.user.phoneCodeId || !this.user.phoneNumber) {
            this.activeMessagePhone = true;
        } else {
            let input = new SendVerificationSmsInputDto();
            input.phoneCodeId = this.user.phoneCodeId;
            input.phoneNumber = this.user.phoneNumber;
            this._profileService.sendVerificationSms(input).subscribe(() => {
                this.smsVerificationModal.show();
            });
        }
    }

    changePhoneNumberToVerified(): void {
        this.isPhoneNumberConfirmed = true;
        this.savedPhoneNumber = this.user.phoneNumber;
    }

    onShown(): void {
        document.getElementById('Name').focus();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    save(): void {
        this.saving = true;
        this._profileService
            .updateCurrentUserProfile(this.user)
            .pipe(
                finalize(() => {
                    this.saving = false;
                })
            )
            .subscribe(() => {
                this.appSession.user.name = this.user.name;
                this.appSession.user.surname = this.user.surname;
                this.appSession.user.userName = this.user.userName;
                this.appSession.user.emailAddress = this.user.emailAddress;
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);

                if (abp.clock.provider.supportsMultipleTimezone && this._initialTimezone !== this.user.timezone) {
                    this.message.info(this.l('TimeZoneSettingChangedRefreshPageNotification')).then(() => {
                        window.location.reload();
                    });
                }
            });
    }
}
