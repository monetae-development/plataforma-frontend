import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '@app/shared/common/app-common.module';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './home/home.component';

import { ProjectsComponent } from './projects/projects.component';
import { ProjectTemplateComponent } from './projects/project-template/project-template.component';
import { ProjectsInvestComponent } from './projects/components/invest/invest.component';

import { MntMemberTransactionsRequestsComponent } from './members/mntMemberTransactionsRequests/mntMemberTransactionsRequests.component';

import { MntMemberFiatComponent } from './members/mntMemberFiat/mntMemberFiat.component';
import { MntMemberFiatDepositComponent } from './members/mntMemberFiat/components/deposit/deposit.component';
import { MntMemberFiatWithdrawalComponent } from './members/mntMemberFiat/components/withdrawal/withdrawal.component';
import { MntMemberFiatRequestsComponent } from './members/mntMemberFiatRequests/mntMemberFiatRequests.component';
import { MntMemberFiatRequestsChangeStatusComponent } from './members/mntMemberFiatRequests/components/changeStatus/changeStatus.component';
import { ViewMemberFiatRequestModalComponent } from './members/mntMemberFiatRequests/view-memberFiatRequest-modal.component';

import { ViewOTCRequestModalComponent } from './otc/otcRequests/view-otcRequest-modal.component';

import { MntMemberBankAccountsComponent } from './members/mntMemberBankAccounts/mntMemberBankAccounts.component';
import { CreateOrEditMntMemberBankAccountModalComponent } from './members/mntMemberBankAccounts/create-or-edit-mntMemberBankAccount-modal.component';

import { CatTransactionTypesComponent } from './catalogs/catTransactionTypes/catTransactionTypes.component';
import { ViewCatTransactionTypeModalComponent } from './catalogs/catTransactionTypes/view-catTransactionType-modal.component';
import { CreateOrEditCatTransactionTypeModalComponent } from './catalogs/catTransactionTypes/create-or-edit-catTransactionType-modal.component';

import { CatStatusesComponent } from './catalogs/catStatuses/catStatuses.component';
import { ViewCatStatusModalComponent } from './catalogs/catStatuses/view-catStatus-modal.component';
import { CreateOrEditCatStatusModalComponent } from './catalogs/catStatuses/create-or-edit-catStatus-modal.component';

import { CatAccountStatusesComponent } from './catalogs/catAccountStatuses/catAccountStatuses.component';
import { ViewCatAccountStatusModalComponent } from './catalogs/catAccountStatuses/view-catAccountStatus-modal.component';
import { CreateOrEditCatAccountStatusModalComponent } from './catalogs/catAccountStatuses/create-or-edit-catAccountStatus-modal.component';

import { CatAccountTypesComponent } from './catalogs/catAccountTypes/catAccountTypes.component';
import { ViewCatAccountTypeModalComponent } from './catalogs/catAccountTypes/view-catAccountType-modal.component';
import { CreateOrEditCatAccountTypeModalComponent } from './catalogs/catAccountTypes/create-or-edit-catAccountType-modal.component';

import { CatCurrenciesComponent } from './catalogs/catCurrencies/catCurrencies.component';
import { ViewCatCurrencyModalComponent } from './catalogs/catCurrencies/view-catCurrency-modal.component';
import { CreateOrEditCatCurrencyModalComponent } from './catalogs/catCurrencies/create-or-edit-catCurrency-modal.component';

import { CatBanksComponent } from './catalogs/catBanks/catBanks.component';
import { ViewCatBankModalComponent } from './catalogs/catBanks/view-catBank-modal.component';
import { CreateOrEditCatBankModalComponent } from './catalogs/catBanks/create-or-edit-catBank-modal.component';
import { CatBankCatCountryLookupTableModalComponent } from './catalogs/catBanks/catBank-catCountry-lookup-table-modal.component';

import { TradingRequestsComponent } from './tradingRequests/tradingRequests.component';
import { ViewTradingRequestModalComponent } from './tradingRequests/view-tradingRequest-modal.component';
import { TradingRequestsChangeStatusComponent } from './tradingRequests/components/changeStatus/changeStatus.component';

/*TODO Se removeran componentes de OTC*/
import { OTCRequestsComponent } from './otc/otcRequests/otcRequests.component';
import { OTCRequestsByMemberComponent } from './otc/components/requestsByMember/requestsByMember.component';
import { OTCCryptoPurchaseComponent } from './otc/components/purchase/purchase.component';
import { OTCCryptoSaleComponent } from './otc/components/sale/sale.component';
import { OTCRequestCryptoPayComponent } from './otc/components/requestCryptoPay/requestCryptoPay.component';
import { OTCCoinsComponent } from './otc/otcCoins/otcCoins.component';
import { ViewOTCCoinModalComponent } from './otc/otcCoins/view-otcCoin-modal.component';
import { CreateOrEditOTCCoinModalComponent } from './otc/otcCoins/create-or-edit-otcCoin-modal.component';
import { OtcWrapperComponent } from './otc/otcWrapper/otcWrapper.component';
import { OTCTradingComponent } from './otc/otcTrading/otcTrading.component';

import { CatControlFilesComponent } from './catalogs/catControlFiles/catControlFiles.component';
import { ViewCatControlFileModalComponent } from './catalogs/catControlFiles/view-catControlFile-modal.component';
import { CreateOrEditCatControlFileModalComponent } from './catalogs/catControlFiles/create-or-edit-catControlFile-modal.component';
import { MntMemberPepMntMemberLookupTableModalComponent } from './members/mntMemberPeps/mntMemberPep-mntMember-lookup-table-modal.component';
import { MntMemberPepsComponent } from './members/mntMemberPeps/mntMemberPeps.component';
import { ViewMntMemberPepModalComponent } from './members/mntMemberPeps/view-mntMemberPep-modal.component';
import { CreateOrEditMntMemberPepModalComponent } from './members/mntMemberPeps/create-or-edit-mntMemberPep-modal.component';
import { CatCountryPhoneCodesComponent } from './catalogs/catCountryPhoneCodes/catCountryPhoneCodes.component';
import { ViewCatCountryPhoneCodeModalComponent } from './catalogs/catCountryPhoneCodes/view-catCountryPhoneCode-modal.component';
import { CreateOrEditCatCountryPhoneCodeModalComponent } from './catalogs/catCountryPhoneCodes/create-or-edit-catCountryPhoneCode-modal.component';
import { CatCountryPhoneCodeCatCountryLookupTableModalComponent } from './catalogs/catCountryPhoneCodes/catCountryPhoneCode-catCountry-lookup-table-modal.component';
import { MntMemberCatNationalityLookupTableModalComponent } from './members/mntMembers/mntMember-catNationality-lookup-table-modal.component';
import { MntMemberIdentityMntMemberLookupTableModalComponent } from './members/mntMemberIdentities/mntMemberIdentity-mntMember-lookup-table-modal.component';
import { MntEconomicInfoMntMemberLookupTableModalComponent } from './members/mntEconomicInfos/mntEconomicInfo-mntMember-lookup-table-modal.component';
import { CatNationalitiesComponent } from './catalogs/catNationalities/catNationalities.component';
import { ViewCatNationalityModalComponent } from './catalogs/catNationalities/view-catNationality-modal.component';
import { CreateOrEditCatNationalityModalComponent } from './catalogs/catNationalities/create-or-edit-catNationality-modal.component';
import { MntMemberDataComplementsComponent } from './members/mntMemberDataComplements/mntMemberDataComplements.component';
import { ViewMntMemberDataComplementModalComponent } from './members/mntMemberDataComplements/view-mntMemberDataComplement-modal.component';
import { CreateOrEditMntMemberDataComplementModalComponent } from './members/mntMemberDataComplements/create-or-edit-mntMemberDataComplement-modal.component';
import { MntMemberIdentitiesComponent } from './members/mntMemberIdentities/mntMemberIdentities.component';
import { ViewMntMemberIdentityModalComponent } from './members/mntMemberIdentities/view-mntMemberIdentity-modal.component';
import { CreateOrEditMntMemberIdentityModalComponent } from './members/mntMemberIdentities/create-or-edit-mntMemberIdentity-modal.component';
import { MntMemberIdentityCatIdentityTypeLookupTableModalComponent } from './members/mntMemberIdentities/mntMemberIdentity-catIdentityType-lookup-table-modal.component';
import { MntEconomicInfosComponent } from './members/mntEconomicInfos/mntEconomicInfos.component';
import { ViewMntEconomicInfoModalComponent } from './members/mntEconomicInfos/view-mntEconomicInfo-modal.component';
import { CreateOrEditMntEconomicInfoModalComponent } from './members/mntEconomicInfos/create-or-edit-mntEconomicInfo-modal.component';
import { MntEconomicInfoCatProfessionLookupTableModalComponent } from './members/mntEconomicInfos/mntEconomicInfo-catProfession-lookup-table-modal.component';
import { MntEconomicInfoCatSourceFoundsLookupTableModalComponent } from './members/mntEconomicInfos/mntEconomicInfo-catSourceFounds-lookup-table-modal.component';
import { CatSourceFoundsesComponent } from './catalogs/catSourceFoundses/catSourceFoundses.component';
import { ViewCatSourceFoundsModalComponent } from './catalogs/catSourceFoundses/view-catSourceFounds-modal.component';
import { CreateOrEditCatSourceFoundsModalComponent } from './catalogs/catSourceFoundses/create-or-edit-catSourceFounds-modal.component';
import { MntMemberAddressesComponent } from './members/mntMemberAddresses/mntMemberAddresses.component';
import { ViewMntMemberAddressModalComponent } from './members/mntMemberAddresses/view-mntMemberAddress-modal.component';
import { CreateOrEditMntMemberAddressModalComponent } from './members/mntMemberAddresses/create-or-edit-mntMemberAddress-modal.component';
import { MntMemberAddressMntMemberLookupTableModalComponent } from './members/mntMemberAddresses/mntMemberAddress-mntMember-lookup-table-modal.component';
import { MntMemberAddressCatStateLookupTableModalComponent } from './members/mntMemberAddresses/mntMemberAddress-catState-lookup-table-modal.component';
import { MntMembersComponent } from './members/mntMembers/mntMembers.component';
import { ViewMntMemberModalComponent } from './members/mntMembers/view-mntMember-modal.component';
import { CreateOrEditMntMemberModalComponent } from './members/mntMembers/create-or-edit-mntMember-modal.component';
import { MntMemberUserLookupTableModalComponent } from './members/mntMembers/mntMember-user-lookup-table-modal.component';
import { CatIdentityTypesComponent } from './catalogs/catIdentityTypes/catIdentityTypes.component';
import { ViewCatIdentityTypeModalComponent } from './catalogs/catIdentityTypes/view-catIdentityType-modal.component';
import { CreateOrEditCatIdentityTypeModalComponent } from './catalogs/catIdentityTypes/create-or-edit-catIdentityType-modal.component';
import { CatActivityEconomicsComponent } from './catalogs/catActivityEconomics/catActivityEconomics.component';
import { ViewCatActivityEconomicModalComponent } from './catalogs/catActivityEconomics/view-catActivityEconomic-modal.component';
import { CreateOrEditCatActivityEconomicModalComponent } from './catalogs/catActivityEconomics/create-or-edit-catActivityEconomic-modal.component';
import { CatActivityEconomicCatActivityEconomicCategoryLookupTableModalComponent } from './catalogs/catActivityEconomics/catActivityEconomic-catActivityEconomicCategory-lookup-table-modal.component';
import { CatActivityEconomicCategoriesComponent } from './catalogs/catActivityEconomicCategories/catActivityEconomicCategories.component';
import { ViewCatActivityEconomicCategoryModalComponent } from './catalogs/catActivityEconomicCategories/view-catActivityEconomicCategory-modal.component';
import { CreateOrEditCatActivityEconomicCategoryModalComponent } from './catalogs/catActivityEconomicCategories/create-or-edit-catActivityEconomicCategory-modal.component';
import { CatProfessionsComponent } from './catalogs/catProfessions/catProfessions.component';
import { ViewCatProfessionModalComponent } from './catalogs/catProfessions/view-catProfession-modal.component';
import { CreateOrEditCatProfessionModalComponent } from './catalogs/catProfessions/create-or-edit-catProfession-modal.component';
import { CatStatesComponent } from './catalogs/catStates/catStates.component';
import { ViewCatStateModalComponent } from './catalogs/catStates/view-catState-modal.component';
import { CreateOrEditCatStateModalComponent } from './catalogs/catStates/create-or-edit-catState-modal.component';
import { CatStateCatCountryLookupTableModalComponent } from './catalogs/catStates/catState-catCountry-lookup-table-modal.component';
import { CatCountriesComponent } from './catalogs/catCountries/catCountries.component';
import { ViewCatCountryModalComponent } from './catalogs/catCountries/view-catCountry-modal.component';
import { CreateOrEditCatCountryModalComponent } from './catalogs/catCountries/create-or-edit-catCountry-modal.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PaginatorModule } from 'primeng/paginator';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { NgxMaskModule } from 'ngx-mask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { UploadSingleBasicComponent } from './components/uploadSingleBasic/uploadSingleBasic.component';
import { UtilsModule } from '@shared/utils/utils.module';
import { CountoModule } from 'angular2-counto';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TabMenuModule } from 'primeng/tabmenu';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TooltipModule as pTooltipModule } from 'primeng/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';
import { MainRoutingModule } from './main-routing.module';
import { BsDatepickerConfig, BsDaterangepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapDatePickerConfigService } from 'assets/ngx-bootstrap/ngx-bootstrap-datepicker-config.service';
import { SubheaderModule } from '@app/shared/common/sub-header/subheader.module';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { OtcBriefcaseComponent } from './otc/otcBriefcase/otcBriefcase.component';
import { HistoryPurchaseSaleComponent } from './history/history-purchase-sale/history-purchase-sale.component';
import { HistoryDepositWithdrawalComponent } from './history/history-deposit-withdrawal/history-deposit-withdrawal.component';
import { HistorySendReceiveComponent } from './history/history-send-receive/history-send-receive.component';

NgxBootstrapDatePickerConfigService.registerNgxBootstrapDatePickerLocales();

@NgModule({
	exports: [HomeComponent],
	imports: [
		FileUploadModule,
		AutoCompleteModule,
		PaginatorModule,
		EditorModule,
		InputMaskModule,
		InputNumberModule,
		TableModule,
		InputTextModule,
		CheckboxModule,
		CalendarModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModule,
		TabsModule,
		TooltipModule,
		pTooltipModule,
		AppCommonModule,
		UtilsModule,
		MainRoutingModule,
		CountoModule,
		BsDatepickerModule.forRoot(),
		BsDropdownModule.forRoot(),
		PopoverModule.forRoot(),
		SubheaderModule,
		NgxMaskModule.forRoot(),
		InputSwitchModule,
		RadioButtonModule,
		TabViewModule,
		TabMenuModule,
		ProgressBarModule,
		CarouselModule,
		MenuModule,
		ButtonModule
	],

	declarations: [
		LogoutComponent,
		HomeComponent,

		ProjectsComponent,
		ProjectTemplateComponent,
		ProjectsInvestComponent,

		MntMemberTransactionsRequestsComponent,

		MntMemberFiatComponent,
		MntMemberFiatDepositComponent,
		MntMemberFiatWithdrawalComponent,
		MntMemberFiatRequestsComponent,
		MntMemberFiatRequestsChangeStatusComponent,
		ViewMemberFiatRequestModalComponent,

		ViewOTCRequestModalComponent,
		MntMemberBankAccountsComponent,
		CreateOrEditMntMemberBankAccountModalComponent,
		CatTransactionTypesComponent,

		ViewCatTransactionTypeModalComponent,
		CreateOrEditCatTransactionTypeModalComponent,
		CatStatusesComponent,

		ViewCatStatusModalComponent,
		CreateOrEditCatStatusModalComponent,
		CatAccountStatusesComponent,

		ViewCatAccountStatusModalComponent,
		CreateOrEditCatAccountStatusModalComponent,
		CatAccountTypesComponent,

		ViewCatAccountTypeModalComponent,
		CreateOrEditCatAccountTypeModalComponent,
		CatCurrenciesComponent,

		ViewCatCurrencyModalComponent,
		CreateOrEditCatCurrencyModalComponent,
		CatBanksComponent,

		TradingRequestsComponent,
		ViewTradingRequestModalComponent,
		TradingRequestsChangeStatusComponent,

		ViewCatBankModalComponent,
		CreateOrEditCatBankModalComponent,
		CatBankCatCountryLookupTableModalComponent,
		OTCCryptoPurchaseComponent,
		OTCCryptoSaleComponent,
		OTCRequestsComponent,
		OTCRequestsByMemberComponent,
		OTCRequestCryptoPayComponent,
		OTCCoinsComponent,
		OtcWrapperComponent,
		OTCTradingComponent,
		OtcBriefcaseComponent,
		HistoryPurchaseSaleComponent,
		HistoryDepositWithdrawalComponent,
		HistorySendReceiveComponent,
		ViewOTCCoinModalComponent,
		CreateOrEditOTCCoinModalComponent,
		CatControlFilesComponent,
		ViewCatControlFileModalComponent,
		CreateOrEditCatControlFileModalComponent,
		MntMemberPepMntMemberLookupTableModalComponent,
		MntMemberPepsComponent,
		ViewMntMemberPepModalComponent,
		CreateOrEditMntMemberPepModalComponent,
		CatCountryPhoneCodesComponent,
		ViewCatCountryPhoneCodeModalComponent,
		CreateOrEditCatCountryPhoneCodeModalComponent,
		CatCountryPhoneCodeCatCountryLookupTableModalComponent,
		MntMemberCatNationalityLookupTableModalComponent,
		MntMemberIdentityMntMemberLookupTableModalComponent,
		MntEconomicInfoMntMemberLookupTableModalComponent,
		CatNationalitiesComponent,
		ViewCatNationalityModalComponent,
		CreateOrEditCatNationalityModalComponent,
		MntMemberDataComplementsComponent,
		ViewMntMemberDataComplementModalComponent,
		CreateOrEditMntMemberDataComplementModalComponent,
		MntMemberIdentitiesComponent,
		ViewMntMemberIdentityModalComponent,
		CreateOrEditMntMemberIdentityModalComponent,
		MntMemberIdentityCatIdentityTypeLookupTableModalComponent,
		MntEconomicInfosComponent,
		ViewMntEconomicInfoModalComponent,
		CreateOrEditMntEconomicInfoModalComponent,
		MntEconomicInfoCatProfessionLookupTableModalComponent,
		MntEconomicInfoCatSourceFoundsLookupTableModalComponent,
		CatSourceFoundsesComponent,
		ViewCatSourceFoundsModalComponent,
		CreateOrEditCatSourceFoundsModalComponent,
		MntMemberAddressesComponent,
		ViewMntMemberAddressModalComponent,
		CreateOrEditMntMemberAddressModalComponent,
		MntMemberAddressMntMemberLookupTableModalComponent,
		MntMemberAddressCatStateLookupTableModalComponent,
		MntMembersComponent,
		ViewMntMemberModalComponent,
		CreateOrEditMntMemberModalComponent,
		MntMemberUserLookupTableModalComponent,
		CatIdentityTypesComponent,
		ViewCatIdentityTypeModalComponent,
		CreateOrEditCatIdentityTypeModalComponent,
		CatActivityEconomicsComponent,
		ViewCatActivityEconomicModalComponent,
		CreateOrEditCatActivityEconomicModalComponent,
		CatActivityEconomicCatActivityEconomicCategoryLookupTableModalComponent,
		CatActivityEconomicCategoriesComponent,
		ViewCatActivityEconomicCategoryModalComponent,
		CreateOrEditCatActivityEconomicCategoryModalComponent,
		CatProfessionsComponent,
		ViewCatProfessionModalComponent,
		CreateOrEditCatProfessionModalComponent,
		CatStatesComponent,
		ViewCatStateModalComponent,
		CreateOrEditCatStateModalComponent,
		CatStateCatCountryLookupTableModalComponent,
		CatCountriesComponent,
		ViewCatCountryModalComponent,
		CreateOrEditCatCountryModalComponent,
		UploadSingleBasicComponent],
	providers: [
		{ provide: BsDatepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerConfig },
		{ provide: BsDaterangepickerConfig, useFactory: NgxBootstrapDatePickerConfigService.getDaterangepickerConfig },
		{ provide: BsLocaleService, useFactory: NgxBootstrapDatePickerConfigService.getDatepickerLocale },
	]
})
export class MainModule { }
