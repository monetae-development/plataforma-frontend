import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MntMemberTransactionsRequestsComponent } from './members/mntMemberTransactionsRequests/mntMemberTransactionsRequests.component';
import { MntMemberFiatComponent } from './members/mntMemberFiat/mntMemberFiat.component';
import { MntMemberFiatRequestsComponent } from './members/mntMemberFiatRequests/mntMemberFiatRequests.component';
import { MntMemberBankAccountsComponent } from './members/mntMemberBankAccounts/mntMemberBankAccounts.component';
import { CatTransactionTypesComponent } from './catalogs/catTransactionTypes/catTransactionTypes.component';
import { CatCompanySectorsComponent } from './catalogs/catCompanySectors/catCompanySectors.component';
import { CatCompanyTypesComponent } from './catalogs/catCompanyTypes/catCompanyTypes.component';
import { CatDocumentTypesComponent } from './catalogs/catDocumentTypes/catDocumentTypes.component';
import { CatStatusesComponent } from './catalogs/catStatuses/catStatuses.component';
import { CatAccountStatusesComponent } from './catalogs/catAccountStatuses/catAccountStatuses.component';
import { CatAccountTypesComponent } from './catalogs/catAccountTypes/catAccountTypes.component';
import { CatCurrenciesComponent } from './catalogs/catCurrencies/catCurrencies.component';
import { CatBanksComponent } from './catalogs/catBanks/catBanks.component';
import { TradingRequestsComponent } from './tradingRequests/tradingRequests.component';
import { OTCCoinsComponent } from './otc/otcCoins/otcCoins.component';
import { OTCTradingComponent } from './otc/otcTrading/otcTrading.component';
import { CatControlFilesComponent } from './catalogs/catControlFiles/catControlFiles.component';
import { MntMemberPepsComponent } from './members/mntMemberPeps/mntMemberPeps.component';
import { CatCountryPhoneCodesComponent } from './catalogs/catCountryPhoneCodes/catCountryPhoneCodes.component';
import { CatNationalitiesComponent } from './catalogs/catNationalities/catNationalities.component';
import { MntMemberDataComplementsComponent } from './members/mntMemberDataComplements/mntMemberDataComplements.component';
import { MntMemberIdentitiesComponent } from './members/mntMemberIdentities/mntMemberIdentities.component';
import { MntEconomicInfosComponent } from './members/mntEconomicInfos/mntEconomicInfos.component';
import { CatSourceFoundsesComponent } from './catalogs/catSourceFoundses/catSourceFoundses.component';
import { MntMemberAddressesComponent } from './members/mntMemberAddresses/mntMemberAddresses.component';
import { MntMembersComponent } from './members/mntMembers/mntMembers.component';
import { CatIdentityTypesComponent } from './catalogs/catIdentityTypes/catIdentityTypes.component';
import { CatActivityEconomicsComponent } from './catalogs/catActivityEconomics/catActivityEconomics.component';
import { CatActivityEconomicCategoriesComponent } from './catalogs/catActivityEconomicCategories/catActivityEconomicCategories.component';
import { CatProfessionsComponent } from './catalogs/catProfessions/catProfessions.component';
import { CatStatesComponent } from './catalogs/catStates/catStates.component';
import { CatCountriesComponent } from './catalogs/catCountries/catCountries.component';
import { ProjectTemplateComponent } from './projects/project-template/project-template.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'projects/project-ESA1', component: ProjectTemplateComponent, data: { permission: 'Pages.Projects' } },
                    { path: 'members/transactions', component: MntMemberTransactionsRequestsComponent, data: { permission: 'Pages.MntMembersTransactions' } },
                    { path: 'members/mntMemberFiat', component: MntMemberFiatComponent, data: { permission: 'Pages.MntMemberFiat' } },
                    { path: 'members/mntMemberFiatRequests', component: MntMemberFiatRequestsComponent, data: { permission: 'Pages.Administration.MntMemberFiatRequests' } },
                    { path: 'members/mntMemberBankAccounts', component: MntMemberBankAccountsComponent, data: { permission: 'Pages.MntMemberBankAccounts' } },
                    { path: 'catalogs/company-sectors', component: CatCompanySectorsComponent, data: { permission: 'Pages.Administration.Catalogs.CompanySectors' } },
                    { path: 'catalogs/company-types', component: CatCompanyTypesComponent, data: { permission: 'Pages.Administration.Catalogs.CompanyTypes' } },
                    { path: 'catalogs/document-types', component: CatDocumentTypesComponent, data: { permission: 'Pages.Administration.Catalogs.DocumentTypes' } },
                    { path: 'catalogs/catTransactionTypes', component: CatTransactionTypesComponent, data: { permission: 'Pages.CatTransactionTypes' } },
                    { path: 'catalogs/catStatuses', component: CatStatusesComponent, data: { permission: 'Pages.CatStatuses' } },
                    { path: 'catalogs/catAccountStatuses', component: CatAccountStatusesComponent, data: { permission: 'Pages.CatAccountStatuses' } },
                    { path: 'catalogs/catAccountTypes', component: CatAccountTypesComponent, data: { permission: 'Pages.CatAccountTypes' } },
                    { path: 'catalogs/catCurrencies', component: CatCurrenciesComponent, data: { permission: 'Pages.CatCurrencies' } },
                    { path: 'catalogs/catBanks', component: CatBanksComponent, data: { permission: 'Pages.CatBanks' } },
                    { path: 'trading/requests', component: TradingRequestsComponent, data: { permission: 'Pages.Administration.TradingRequests' } },
                    { path: 'otc/trading', component: OTCTradingComponent, data: { permission: 'Pages.OTCTrading' } },
                    { path: 'otc/otcCoins', component: OTCCoinsComponent, data: { permission: 'Pages.OTCCoins' } },
                    { path: 'catalogs/catControlFiles', component: CatControlFilesComponent, data: { permission: 'Pages.CatControlFiles' } },
                    { path: 'members/mntMemberPeps', component: MntMemberPepsComponent, data: { permission: 'Pages.MntMemberPeps' } },
                    { path: 'catalogs/catCountryPhoneCodes', component: CatCountryPhoneCodesComponent, data: { permission: 'Pages.CatCountryPhoneCodes' } },
                    { path: 'catalogs/catNationalities', component: CatNationalitiesComponent, data: { permission: 'Pages.CatNationalities' } },
                    { path: 'members/mntMemberDataComplements', component: MntMemberDataComplementsComponent, data: { permission: 'Pages.MntMemberDataComplements' } },
                    { path: 'members/mntMemberIdentities', component: MntMemberIdentitiesComponent, data: { permission: 'Pages.MntMemberIdentities' } },
                    { path: 'members/mntEconomicInfos', component: MntEconomicInfosComponent, data: { permission: 'Pages.MntEconomicInfos' } },
                    { path: 'catalogs/catSourceFoundses', component: CatSourceFoundsesComponent, data: { permission: 'Pages.CatSourceFoundses' } },
                    { path: 'members/mntMemberAddresses', component: MntMemberAddressesComponent, data: { permission: 'Pages.MntMemberAddresses' } },
                    { path: 'members/mntMembers', component: MntMembersComponent, data: { permission: 'Pages.MntMembers' } },
                    { path: 'catalogs/catIdentityTypes', component: CatIdentityTypesComponent, data: { permission: 'Pages.CatIdentityTypes' } },
                    { path: 'catalogs/catActivityEconomics', component: CatActivityEconomicsComponent, data: { permission: 'Pages.CatActivityEconomics' } },
                    { path: 'catalogs/catActivityEconomicCategories', component: CatActivityEconomicCategoriesComponent, data: { permission: 'Pages.CatActivityEconomicCategories' } },
                    { path: 'catalogs/catProfessions', component: CatProfessionsComponent, data: { permission: 'Pages.CatProfessions' } },
                    { path: 'catalogs/catStates', component: CatStatesComponent, data: { permission: 'Pages.CatStates' } },
                    { path: 'catalogs/catCountries', component: CatCountriesComponent, data: { permission: 'Pages.CatCountries' } },
                    { path: 'logout', component: LogoutComponent, data: { permission: 'Pages.Logout' } },
                    { path: 'dashboard', component: HomeComponent, data: { permission: 'Pages.Home' } },
                    { path: 'dashboard/:action', component: HomeComponent, data: { permission: 'Pages.Home' } },
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule { }
