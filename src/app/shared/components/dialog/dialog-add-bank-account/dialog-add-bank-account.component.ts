import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { AppComponentBase } from '@shared/common/app-component-base';
import { CreateOrEditMntMemberBankAccountDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/CreateOrEditMntMemberBankAccountDto';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-dialog-add-bank-account',
  templateUrl: './dialog-add-bank-account.component.html',
  styleUrls: ['./dialog-add-bank-account.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    AppSharedModule
  ]
})
export class DialogAddBankAccountComponent extends AppComponentBase implements OnInit {


  outAccept = new EventEmitter();
  active = true;
  saving = false;
  countries: SelectItem[];
  banks: SelectItem[];
  accountTypes: SelectItem[];
  currencies: SelectItem[];
  selectedCountry: number;

  mntMemberBankAccount: CreateOrEditMntMemberBankAccountDto = new CreateOrEditMntMemberBankAccountDto();

  constructor(
    injector: Injector,
    public ref: DynamicDialogRef,
    private _serviceMemberProxy: ServiceMembersProxy,
    private _serviceCommonProxy: ServiceCommonProxy,
  ) {
    super(injector);
   }

  ngOnInit() {
    this.loadCountries();
    this.loadAccountTypes();
    this.loadCurrencies();
  }

  onCancel(){
    this.ref.close();
  }

  onChangeCountry(event: any) {
    this.loadBankAccounts(event.value);
  }

  loadCountries(): void {
    this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllCountriesForSelect', null)
    .subscribe((result) => {
      this.countries = result.items;
      this.active = false;
    });
  }

  loadAccountTypes(): void {
    this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllAccountTypesForSelect', null)
    .subscribe((result) => {
      this.accountTypes = result.items;
    });
  }

  loadCurrencies(): void {
    this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllCurrenciesForSelect', null)
    .subscribe((result) => {
      this.currencies = result.items;
    });
  }

  loadBankAccounts(countryId: number) {
    this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllBanksForSelect', countryId)
    .subscribe((result) => {
        this.banks = result.items;
    });
  }

  save(): void {
    this.saving = true;
    if (this.mntMemberBankAccount.swift === '') {
        this.mntMemberBankAccount.swift = null;
    }
    this._serviceMemberProxy.createOrEditBankAccountByMember(this.mntMemberBankAccount)
      .pipe(finalize(() => {
        this.saving = false;
      }))
      .subscribe(() => {
        this.outAccept.emit(true);
        this.notify.info(this.l('SavedSuccessfully'));
        this.ref.close();
      });
  }
}
