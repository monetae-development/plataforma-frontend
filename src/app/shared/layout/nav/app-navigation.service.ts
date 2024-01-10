import { PermissionCheckerService } from 'abp-ng2-module';
import { AppSessionService } from '@shared/common/session/app-session.service';

import { Injectable } from '@angular/core';
import { AppMenu } from './app-menu';
import { AppMenuItem } from './app-menu-item';

@Injectable()
export class AppNavigationService {
    constructor(
        private _permissionCheckerService: PermissionCheckerService,
        private _appSessionService: AppSessionService
    ) { }

    getMenu(): AppMenu {
        return new AppMenu('MainMenu', 'MainMenu', [
            new AppMenuItem('Home', 'Pages.Tenant.Dashboard', 'flaticon-line-graph', '/app/main/dashboard'),
            new AppMenuItem('MyWallet', 'Pages.MntMemberBankAccounts', 'fas fa-wallet', '/app/main/members/mntMemberBankAccounts'),
            new AppMenuItem('OTCTradingTitle', 'Pages.OTCTrading', 'fa fa-exchange', '/app/main/otc/trading'),
            new AppMenuItem('MntMemberDataComplements', 'Pages.MntMemberDataComplements', 'far fa-address-card', '/app/main/members/mntMemberDataComplements'),
            new AppMenuItem('MntMemberFiat', 'Pages.MntMemberFiat', 'fa fa-coins', '/app/main/members/mntMemberFiat'),
            new AppMenuItem(
                'Dashboard',
                'Pages.Administration.Host.Dashboard',
                'flaticon-line-graph',
                '/app/admin/hostDashboard'
            ),
            new AppMenuItem('Tenants', 'Pages.Tenants', 'flaticon-list-3', '/app/admin/tenants'),
            new AppMenuItem(
                'Catalogs',
                '',
                'flaticon-interface-8',
                '',
                [],
                [
                    new AppMenuItem('CatCountries', 'Pages.CatCountries', 'flaticon-more', '/app/main/catalogs/catCountries'),
                    new AppMenuItem('CatCountryPhoneCodes', 'Pages.CatCountryPhoneCodes', 'flaticon-more', '/app/main/catalogs/catCountryPhoneCodes'),
                    new AppMenuItem('CatStates', 'Pages.CatStates', 'flaticon-more', '/app/main/catalogs/catStates'),
                    new AppMenuItem('CatNationalities', 'Pages.CatNationalities', 'flaticon-more', '/app/main/catalogs/catNationalities'),
                    new AppMenuItem('CatProfessions', 'Pages.CatProfessions', 'flaticon-more', '/app/main/catalogs/catProfessions'),
                    new AppMenuItem('CatActivityEconomics', 'Pages.CatActivityEconomics', 'flaticon-more', '/app/main/catalogs/catActivityEconomics'),
                    new AppMenuItem('CatActivityEconomicCategories', 'Pages.CatActivityEconomicCategories', 'flaticon-more', '/app/main/catalogs/catActivityEconomicCategories'),
                    new AppMenuItem('CatIdentityTypes', 'Pages.CatIdentityTypes', 'flaticon-more', '/app/main/catalogs/catIdentityTypes'),
                    new AppMenuItem('CatSourceFoundses', 'Pages.CatSourceFoundses', 'flaticon-more', '/app/main/catalogs/catSourceFoundses'),
                    new AppMenuItem('CatControlFiles', 'Pages.CatControlFiles', 'flaticon-more', '/app/main/catalogs/catControlFiles'),
                    new AppMenuItem('OTCCoins', 'Pages.OTCCoins', 'flaticon-more', '/app/main/otc/otcCoins'),
                    new AppMenuItem('CatBanks', 'Pages.CatBanks', 'flaticon-more', '/app/main/catalogs/catBanks'),

                    new AppMenuItem('CatCurrencies', 'Pages.CatCurrencies', 'flaticon-more', '/app/main/catalogs/catCurrencies'),

                    new AppMenuItem('CatAccountTypes', 'Pages.CatAccountTypes', 'flaticon-more', '/app/main/catalogs/catAccountTypes'),

                    new AppMenuItem('CatAccountStatuses', 'Pages.CatAccountStatuses', 'flaticon-more', '/app/main/catalogs/catAccountStatuses'),

                    new AppMenuItem('CatStatuses', 'Pages.CatStatuses', 'flaticon-more', '/app/main/catalogs/catStatuses'),

                    new AppMenuItem('CatTransactionTypes', 'Pages.CatTransactionTypes', 'flaticon-more', '/app/main/catalogs/catTransactionTypes'),
                ]
            ),
            new AppMenuItem(
                'Clientes',
                '',
                'flaticon-interface-8',
                '',
                [],
                [
                    new AppMenuItem('MntMembers', 'Pages.MntMembers', 'flaticon-more', '/app/main/members/mntMembers'),
                    new AppMenuItem('OTCRequests', 'Pages.OTCRequests', 'flaticon-more', '/app/main/otc/otcRequests'),
                    new AppMenuItem('MntMemberFiatRequests', 'Pages.Administration.MntMemberFiatRequests', 'flaticon-more', '/app/main/members/mntMemberFiatRequests'),
                    new AppMenuItem('MntMemberTransactionRequests', 'Pages.MntMembersTransactions', 'fas fa-people-arrows', '/app/main/members/transactions'),
                    //TODO:Remover vistas y urls(routes) de estos catálogos, hay que analizarlo
                    /*new AppMenuItem('MntMemberAddresses', 'Pages.MntMemberAddresses', 'flaticon-more', '/app/main/members/mntMemberAddresses'),
                    new AppMenuItem('MntEconomicInfos', 'Pages.MntEconomicInfos', 'flaticon-more', '/app/main/members/mntEconomicInfos'),
                    new AppMenuItem('MntMemberIdentities', 'Pages.MntMemberIdentities', 'flaticon-more', '/app/main/members/mntMemberIdentities'),
                    new AppMenuItem('MntMemberPeps', 'Pages.MntMemberPeps', 'flaticon-more', '/app/main/members/mntMemberPeps'),*/
                ]
            ),






            new AppMenuItem('Editions', 'Pages.Editions', 'flaticon-app', '/app/admin/editions'),
            /*new AppMenuItem(
                'Notifications',
                '',
                'flaticon-alarm',
                '',
                [],
                [
                    new AppMenuItem(
                        'Inbox',
                        '',
                        'flaticon-mail-1',
                        '/app/notifications'
                    ),
                    new AppMenuItem(
                        'MassNotifications',
                        'Pages.Administration.MassNotification',
                        'flaticon-paper-plane',
                        '/app/admin/mass-notifications'
                    )
                ]
            ),*/
            new AppMenuItem(
                'Administration',
                '',
                'flaticon-interface-8',
                '',
                [],
                [
                    new AppMenuItem(
                        'OrganizationUnits',
                        'Pages.Administration.OrganizationUnits',
                        'flaticon-map',
                        '/app/admin/organization-units'
                    ),
                    new AppMenuItem('Roles', 'Pages.Administration.Roles', 'flaticon-suitcase', '/app/admin/roles'),
                    new AppMenuItem('Users', 'Pages.Administration.Users', 'flaticon-users', '/app/admin/users'),
                    new AppMenuItem('DcSendGridWebHooks', 'Pages.Administration.DcSendGridWebHooks', 'flaticon-more', '/app/admin/dataCollected/dcSendGridWebHooks'),

                    new AppMenuItem(
                        'Languages',
                        'Pages.Administration.Languages',
                        'flaticon-tabs',
                        '/app/admin/languages',
                        ['/app/admin/languages/{name}/texts']
                    ),
                    new AppMenuItem(
                        'AuditLogs',
                        'Pages.Administration.AuditLogs',
                        'flaticon-folder-1',
                        '/app/admin/auditLogs'
                    ),
                    new AppMenuItem(
                        'Maintenance',
                        'Pages.Administration.Host.Maintenance',
                        'flaticon-lock',
                        '/app/admin/maintenance'
                    ),
                    new AppMenuItem(
                        'Subscription',
                        'Pages.Administration.Tenant.SubscriptionManagement',
                        'flaticon-refresh',
                        '/app/admin/subscription-management'
                    ),
                    new AppMenuItem(
                        'VisualSettings',
                        'Pages.Administration.UiCustomization',
                        'flaticon-medical',
                        '/app/admin/ui-customization'
                    ),
                    new AppMenuItem(
                        'WebhookSubscriptions',
                        'Pages.Administration.WebhookSubscription',
                        'flaticon2-world',
                        '/app/admin/webhook-subscriptions'
                    ),
                    new AppMenuItem(
                        'DynamicProperties',
                        'Pages.Administration.DynamicProperties',
                        'flaticon-interface-8',
                        '/app/admin/dynamic-property'
                    ),
                    new AppMenuItem(
                        'PlatformSettings',
                        'Pages.Administration.Tenant.Settings.Platform',
                        'flaticon-settings',
                        '/app/admin/platformSettings'
                    ),
                    new AppMenuItem(
                        'SystemSettings',
                        'Pages.Administration.Host.Settings',
                        'flaticon-settings',
                        '/app/admin/hostSettings'
                    ),
                    new AppMenuItem(
                        'SystemSettings',
                        'Pages.Administration.Tenant.Settings',
                        'flaticon-settings',
                        '/app/admin/tenantSettings'
                    ),
                ]
            ),
            new AppMenuItem('Logout', 'Pages.Logout', 'flaticon-logout', '/app/main/logout'),
            //TODO:Remover todo el componente y servicios de DemoUiComponents
            /*new AppMenuItem(
                'DemoUiComponents',
                'Pages.DemoUiComponents',
                'flaticon-shapes',
                '/app/admin/demo-ui-components'
            ),*/
        ]);
    }

    checkChildMenuItemPermission(menuItem): boolean {
        for (let i = 0; i < menuItem.items.length; i++) {
            let subMenuItem = menuItem.items[i];

            if (subMenuItem.permissionName === '' || subMenuItem.permissionName === null) {
                if (subMenuItem.route) {
                    return true;
                }
            } else if (this._permissionCheckerService.isGranted(subMenuItem.permissionName)) {
                return true;
            }

            if (subMenuItem.items && subMenuItem.items.length) {
                let isAnyChildItemActive = this.checkChildMenuItemPermission(subMenuItem);
                if (isAnyChildItemActive) {
                    return true;
                }
            }
        }
        return false;
    }

    showMenuItem(menuItem: AppMenuItem): boolean {
        if (
            menuItem.permissionName === 'Pages.Administration.Tenant.SubscriptionManagement' &&
            this._appSessionService.tenant &&
            !this._appSessionService.tenant.edition
        ) {
            return false;
        }

        let hideMenuItem = false;

        if (menuItem.requiresAuthentication && !this._appSessionService.user) {
            hideMenuItem = true;
        }

        if (menuItem.permissionName && !this._permissionCheckerService.isGranted(menuItem.permissionName)) {
            hideMenuItem = true;
        }

        if (this._appSessionService.tenant || !abp.multiTenancy.ignoreFeatureCheckForHostUsers) {
            if (menuItem.hasFeatureDependency() && !menuItem.featureDependencySatisfied()) {
                hideMenuItem = true;
            }
        }

        if (!hideMenuItem && menuItem.items && menuItem.items.length) {
            return this.checkChildMenuItemPermission(menuItem);
        }

        return !hideMenuItem;
    }

    /**
     * Returns all menu items recursively
     */
    getAllMenuItems(): AppMenuItem[] {
        let menu = this.getMenu();
        let allMenuItems: AppMenuItem[] = [];
        menu.items.forEach((menuItem) => {
            allMenuItems = allMenuItems.concat(this.getAllMenuItemsRecursive(menuItem));
        });

        return allMenuItems;
    }

    private getAllMenuItemsRecursive(menuItem: AppMenuItem): AppMenuItem[] {
        if (!menuItem.items) {
            return [menuItem];
        }

        let menuItems = [menuItem];
        menuItem.items.forEach((subMenu) => {
            menuItems = menuItems.concat(this.getAllMenuItemsRecursive(subMenu));
        });

        return menuItems;
    }
}
