﻿import { Component, Injector, OnInit, Input } from '@angular/core';
import { ThemesLayoutBaseComponent } from '../themes/themes-layout-base.component';
import { LinkedUserDto, ProfileServiceProxy, UserLinkServiceProxy, SessionServiceProxy, GetCurrentLoignIsClientRoleOutput } from '@shared/service-proxies/service-proxies';
import { LinkedAccountService } from '@app/shared/layout/linked-account.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { AbpMultiTenancyService, AbpSessionService } from 'abp-ng2-module';
import { AppAuthService } from '@app/shared/common/auth/app-auth.service';
import { ImpersonationService } from '@app/admin/users/impersonation.service';
import { AppConsts } from '@shared/AppConsts';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { Router } from '@angular/router';
import { GetAllVaultAssetsForQRMenuDto } from '@shared/service-proxies/dto/Transactions/GetAllVaultAssetsForQRMenuDto';

@Component({
    selector: 'user-menu',
    templateUrl: './user-menu.component.html',
})
export class UserMenuComponent extends ThemesLayoutBaseComponent implements OnInit {
    @Input() iconOnly = false;

    @Input() togglerCssClass = 'cursor-pointer symbol symbol-35px symbol-md-40px';
    @Input() profileImageCssClass = '';
    //TODO@Metronic8 -> we may delete this.
    @Input() textCssClass = 'text-dark-50 fw-bolder fs-base d-none d-md-inline me-3';
    @Input() symbolCssClass = 'symbol symbol-lg-30px symbol-20px';
    @Input() symbolTextCssClass = 'symbol-label fs-2 fw-bold bg-success text-inverse-success';

    usernameFirstLetter = '';

    profilePicture = AppConsts.appBaseUrl + '/assets/common/images/default-profile-picture.png';
    shownLoginName = '';
    tenancyName = '';
    userName = '';
    emailAddress = '';

    cryptoAddresses: GetAllVaultAssetsForQRMenuDto[];
    menuItemsCryptoAddresses: MenuItem[] | undefined;
    cryptoAddressSelected: GetAllVaultAssetsForQRMenuDto;
    isShowMenu = false;

    recentlyLinkedUsers: LinkedUserDto[];
    clientRole: GetCurrentLoignIsClientRoleOutput;
    isImpersonatedLogin = false;
    isMultiTenancyEnabled = false;

    mQuickUserOffcanvas: any;

    public constructor(
        injector: Injector,
        private _router: Router,
        private _linkedAccountService: LinkedAccountService,
        private _abpMultiTenancyService: AbpMultiTenancyService,
        private _profileServiceProxy: ProfileServiceProxy,
        private _userLinkServiceProxy: UserLinkServiceProxy,
        private _authService: AppAuthService,
        private _impersonationService: ImpersonationService,
        private _abpSessionService: AbpSessionService,
        private _sessionServiceProxy: SessionServiceProxy,
        _dateTimeService: DateTimeService
    ) {
        super(injector, _dateTimeService);
    }

    ngOnInit(): void {
        this.cryptoAddressSelected = new GetAllVaultAssetsForQRMenuDto();
        this.isImpersonatedLogin = this._abpSessionService.impersonatorUserId > 0;
        this.isMultiTenancyEnabled = this._abpMultiTenancyService.isEnabled;
        this.clientRole = new GetCurrentLoignIsClientRoleOutput();
        this.getUserRole();
        this.setCurrentLoginInformations();
        this.getProfilePicture();
        this.getRecentlyLinkedUsers();
        this.registerToEvents();
        this.usernameFirstLetter = this.appSession.user.userName.substring(0, 1).toUpperCase();
    }

    getUserRole() {
        this._sessionServiceProxy.getCurrentLoignIsClientRole().subscribe((result) => {
            this.clientRole = result;
        });
    }

    setCurrentLoginInformations(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
        this.tenancyName = this.appSession.tenancyName;
        this.userName = this.appSession.user.name + ' ' + this.appSession.user.surname;
        this.emailAddress = this.appSession.user.emailAddress;
        if (this.appSession.cryptoCurrencies.length > 0) {
            this.setMenuCryptoAddresses(this.appSession.cryptoCurrencies);
        }
    }

    getShownUserName(linkedUser: LinkedUserDto): string {
        if (!this._abpMultiTenancyService.isEnabled) {
            return linkedUser.username;
        }

        return (linkedUser.tenantId ? linkedUser.tenancyName : '.') + '\\' + linkedUser.username;
    }

    getProfilePicture(): void {
        this._profileServiceProxy.getProfilePicture().subscribe((result) => {
            if (result && result.profilePicture) {
                this.profilePicture = 'data:image/jpeg;base64,' + result.profilePicture;
            }
        });
    }

    getRecentlyLinkedUsers(): void {
        this._userLinkServiceProxy.getRecentlyUsedLinkedUsers().subscribe((result) => {
            this.recentlyLinkedUsers = result.items;
        });
    }

    showLoginAttempts(): void {
        this._router.navigate(['/app/admin/login-attempts']);
    }

    showLinkedAccounts(): void {
        abp.event.trigger('app.show.linkedAccountsModal');
    }

    showUserDelegations(): void {
        abp.event.trigger('app.show.userDelegationsModal');
    }

    showUserBankAccounts(): void {
        this._router.navigate(['/app/main/members/mntMemberBankAccounts']);
    }

    showUserKyc(): void {
        this._router.navigate(['/app/main/members/mntMemberDataComplements']);
    }

    changePassword(): void {
        abp.event.trigger('app.show.changePasswordModal');
    }

    changeProfilePicture(): void {
        abp.event.trigger('app.show.changeProfilePictureModal');
    }

    changeMySettings(): void {
        abp.event.trigger('app.show.mySettingsModal');
    }

    registerToEvents() {
        this.subscribeToEvent('profilePictureChanged', () => {
            this.getProfilePicture();
        });

        this.subscribeToEvent('app.getRecentlyLinkedUsers', () => {
            this.getRecentlyLinkedUsers();
        });

        this.subscribeToEvent('app.onMySettingsModalSaved', () => {
            this.onMySettingsModalSaved();
        });
    }

    logout(): void {
        this._authService.logout();
    }

    onMySettingsModalSaved(): void {
        this.shownLoginName = this.appSession.getShownLoginName();
    }

    backToMyAccount(): void {
        this._impersonationService.backToImpersonator();
    }

    switchToLinkedUser(linkedUser: LinkedUserDto): void {
        this._linkedAccountService.switchToAccount(linkedUser.id, linkedUser.tenantId);
    }

    downloadCollectedData(): void {
        this._profileServiceProxy.prepareCollectedData().subscribe(() => {
            this.message.success(this.l('GdprDataPrepareStartedNotification'));
        });
    }

    onShowMenu(event: any) {
        this.isShowMenu = true;
    }

    onHiddenMenu(event: any) {
        this.isShowMenu = false;
    }

    onSelectMenuItem(menuItem: number) {
        this.cryptoAddressSelected = this.cryptoAddresses[menuItem];
    }

    copyAddress(text: string): void {
        const elementInput = document.createElement('input');
        elementInput.value = text;
        document.body.appendChild(elementInput);
        elementInput.select();
        document.execCommand('copy');
        document.body.removeChild(elementInput);
        this.notify.success(this.l('CopyToClipboard'));
    }

    private setMenuCryptoAddresses(records: GetAllVaultAssetsForQRMenuDto[]) {
        this.cryptoAddresses = records;
        this.menuItemsCryptoAddresses = [];
        for (let i = 0; i < this.cryptoAddresses.length; i++) {
            let temp = {
                label: '<span class="">' + this.cryptoAddresses[i].name + '</span><span class="ae-text-default ae-text-gris fw-normal ms-2">' + this.cryptoAddresses[i].label + '</span>',
                escape: false,
                command: () => {
                    this.onSelectMenuItem(i);
                }
            };
            this.menuItemsCryptoAddresses.push(temp);
        }
        this.cryptoAddressSelected = this.cryptoAddresses[0];
    }
}
