import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import {
    ComboboxItemDto,
    CommonLookupServiceProxy,
    SettingScopes,
    HostSettingsEditDto,
    HostSettingsServiceProxy,
    SendTestEmailInput,
    JsonClaimMapDto,
} from '@shared/service-proxies/service-proxies';
import { KeyValueListManagerComponent } from '@app/shared/common/key-value-list-manager/key-value-list-manager.component';
import { UntypedFormControl } from '@angular/forms';

@Component({
    templateUrl: './platform-settings.component.html',
    styleUrls: ['./platform-settings.component.css'],
    animations: [appModuleAnimation()],
})
export class PlatformSettingsComponent extends AppComponentBase implements OnInit {
    @ViewChild('wsFederationClaimsMappingManager') wsFederationClaimsMappingManager: KeyValueListManagerComponent;
    @ViewChild('openIdConnectClaimsMappingManager') openIdConnectClaimsMappingManager: KeyValueListManagerComponent;
    @ViewChild('emailSmtpSettingsForm') emailSmtpSettingsForm: UntypedFormControl;
    @ViewChild('userManagementSettingsForm') userManagementSettingsForm: UntypedFormControl;
    @ViewChild('securitySettingsForm') securitySettingsForm: UntypedFormControl;

    loading = false;
    hostSettings: HostSettingsEditDto;
    editions: ComboboxItemDto[] = undefined;
    testEmailAddress: string = undefined;
    showTimezoneSelection = abp.clock.provider.supportsMultipleTimezone;
    defaultTimezoneScope: SettingScopes = SettingScopes.Application;

    usingDefaultTimeZone = false;
    initialTimeZone: string = undefined;

    enabledSocialLoginSettings: string[];

    wsFederationClaimMappings: { key: string; value: string }[];
    openIdConnectClaimMappings: { key: string; value: string }[];
    initialEmailSettings: string;

    openIdConnectResponseTypeCode: boolean;
    openIdConnectResponseTypeToken: boolean;
    openIdConnectResponseTypeIdToken: boolean;

    constructor(
        injector: Injector,
        private _hostSettingService: HostSettingsServiceProxy,
        private _commonLookupService: CommonLookupServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const self = this;
    }

}
