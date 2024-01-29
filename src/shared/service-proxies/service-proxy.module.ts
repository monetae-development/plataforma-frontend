﻿import { AbpHttpInterceptor, RefreshTokenService, AbpHttpConfigurationService } from 'abp-ng2-module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import * as ApiServiceProxies from './service-proxies';
import * as CatalogsServiceProxies from './service-catalogs-proxies';
import * as CommonServiceProxies from './service-common-proxies';
import * as MembersServiceProxies from './service-members-proxies';
import * as OTCServiceProxies from './service-otc-proxies';
import * as SettingsPlatformServiceProxies from './service-settings-platform-proxies';
import { ZeroRefreshTokenService } from '@account/auth/zero-refresh-token.service';
import { ZeroTemplateHttpConfigurationService } from './zero-template-http-configuration.service';

@NgModule({
    providers: [
        ApiServiceProxies.CatTransactionTypesServiceProxy,
        ApiServiceProxies.CatStatusesServiceProxy,
        ApiServiceProxies.CatAccountStatusesServiceProxy,
        ApiServiceProxies.CatAccountTypesServiceProxy,
        ApiServiceProxies.CatCurrenciesServiceProxy,
        ApiServiceProxies.CatBanksServiceProxy,
        ApiServiceProxies.OTCRequestsServiceProxy,
        OTCServiceProxies.OTCServiceProxy,
        SettingsPlatformServiceProxies.SettingsPlatformServiceProxy,
        ApiServiceProxies.DcSendGridWebHooksServiceProxy,
        ApiServiceProxies.OTCCoinsServiceProxy,
        ApiServiceProxies.CatControlFilesServiceProxy,
        ApiServiceProxies.MntMemberPepsServiceProxy,
        ApiServiceProxies.CatCountryPhoneCodesServiceProxy,
        CommonServiceProxies.ServiceCommonProxy,
        CatalogsServiceProxies.CatNationalitiesServiceProxy,
        CatalogsServiceProxies.CatCountriesServiceProxy,
        CatalogsServiceProxies.CatStatesServiceProxy,
        CatalogsServiceProxies.CatIdentityTypesServiceProxy,
        CatalogsServiceProxies.CatProfessionsServiceProxy,
        CatalogsServiceProxies.CatActivityEconomicCategoriesServiceProxy,
        CatalogsServiceProxies.CatActivityEconomicsServiceProxy,
        CatalogsServiceProxies.CatSourceFoundsesServiceProxy,
        MembersServiceProxies.ServiceMembersProxy,
        ApiServiceProxies.MntMemberDataComplementsServiceProxy,
        ApiServiceProxies.MntMemberIdentitiesServiceProxy,
        ApiServiceProxies.MntEconomicInfosServiceProxy,
        ApiServiceProxies.MntMemberAddressesServiceProxy,
        ApiServiceProxies.MntMembersServiceProxy,
        ApiServiceProxies.AuditLogServiceProxy,
        ApiServiceProxies.CachingServiceProxy,
        ApiServiceProxies.ChatServiceProxy,
        ApiServiceProxies.CommonLookupServiceProxy,
        ApiServiceProxies.EditionServiceProxy,
        ApiServiceProxies.FriendshipServiceProxy,
        ApiServiceProxies.HostSettingsServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.LanguageServiceProxy,
        ApiServiceProxies.NotificationServiceProxy,
        ApiServiceProxies.OrganizationUnitServiceProxy,
        ApiServiceProxies.PermissionServiceProxy,
        ApiServiceProxies.ProfileServiceProxy,
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.TenantDashboardServiceProxy,
        ApiServiceProxies.TenantSettingsServiceProxy,
        ApiServiceProxies.TimingServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.UserLinkServiceProxy,
        ApiServiceProxies.UserLoginServiceProxy,
        ApiServiceProxies.WebLogServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.TenantRegistrationServiceProxy,
        ApiServiceProxies.HostDashboardServiceProxy,
        ApiServiceProxies.PaymentServiceProxy,
        ApiServiceProxies.DemoUiComponentsServiceProxy,
        ApiServiceProxies.InvoiceServiceProxy,
        ApiServiceProxies.SubscriptionServiceProxy,
        ApiServiceProxies.InstallServiceProxy,
        ApiServiceProxies.UiCustomizationSettingsServiceProxy,
        ApiServiceProxies.PayPalPaymentServiceProxy,
        ApiServiceProxies.StripePaymentServiceProxy,
        ApiServiceProxies.DashboardCustomizationServiceProxy,
        ApiServiceProxies.WebhookEventServiceProxy,
        ApiServiceProxies.WebhookSubscriptionServiceProxy,
        ApiServiceProxies.WebhookSendAttemptServiceProxy,
        ApiServiceProxies.UserDelegationServiceProxy,
        ApiServiceProxies.DynamicPropertyServiceProxy,
        ApiServiceProxies.DynamicEntityPropertyDefinitionServiceProxy,
        ApiServiceProxies.DynamicEntityPropertyServiceProxy,
        ApiServiceProxies.DynamicPropertyValueServiceProxy,
        ApiServiceProxies.DynamicEntityPropertyValueServiceProxy,
        ApiServiceProxies.TwitterServiceProxy,
        ApiServiceProxies.MntMemberWalletServiceProxy,
        ApiServiceProxies.MntSettingsServiceProxy,
        ApiServiceProxies.MntMemberFilesServiceProxy,
        { provide: RefreshTokenService, useClass: ZeroRefreshTokenService },
        { provide: AbpHttpConfigurationService, useClass: ZeroTemplateHttpConfigurationService },
        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    ],
})
export class ServiceProxyModule { }
