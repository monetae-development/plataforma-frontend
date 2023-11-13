import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { CreateOrEditMntMemberBankAccountDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/CreateOrEditMntMemberBankAccountDto';
import { ServiceCommonProxy } from '@shared/service-proxies/service-common-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SelectItem } from 'primeng/api';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditMntMemberBankAccountModal',
    templateUrl: './create-or-edit-mntMemberBankAccount-modal.component.html'
})
export class CreateOrEditMntMemberBankAccountModalComponent extends AppComponentBase implements OnInit {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    mntMemberBankAccount: CreateOrEditMntMemberBankAccountDto = new CreateOrEditMntMemberBankAccountDto();

    countries: SelectItem[];
    banks: SelectItem[];
    accountTypes: SelectItem[];
    currencies: SelectItem[];
    selectedCountry: number;

    constructor(
        injector: Injector,
        private _serviceMemberProxy: ServiceMembersProxy,
        private _serviceCommonProxy: ServiceCommonProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllCountriesForSelect', null).subscribe((result) => {
            this.countries = result.items;
        });

        this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllAccountTypesForSelect', null).subscribe((result) => {
            this.accountTypes = result.items;
        });

        this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllCurrenciesForSelect', null).subscribe((result) => {
            this.currencies = result.items;
        });
    }

    show(mntMemberBankAccountId?: number): void {
        if (!mntMemberBankAccountId) {
            this.mntMemberBankAccount = new CreateOrEditMntMemberBankAccountDto();
            this.selectedCountry = undefined;
            this.active = true;
            this.modal.show();
        } else {
            this._serviceMemberProxy.getBankAccountByMemberForEdit(mntMemberBankAccountId).subscribe(result => {
                this.mntMemberBankAccount = result.mntMemberBankAccount;
                this.selectedCountry = result.catCountryId;
                this.banksLoad(this.selectedCountry);
                this.active = true;
                this.modal.show();
            });
        }
    }

    onChangeCountry(event: any) {
        this.banksLoad(event.value);
    }

    banksLoad(countryId: number) {
        this._serviceCommonProxy.getSelectOptions('MntMemberBankAccounts/GetAllBanksForSelect', countryId).subscribe((result) => {
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
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
