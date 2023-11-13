import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatBanksServiceProxy, CreateOrEditCatBankDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { CatBankCatCountryLookupTableModalComponent } from './catBank-catCountry-lookup-table-modal.component';

@Component({
    selector: 'createOrEditCatBankModal',
    templateUrl: './create-or-edit-catBank-modal.component.html'
})
export class CreateOrEditCatBankModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('catBankCatCountryLookupTableModal', { static: true }) catBankCatCountryLookupTableModal: CatBankCatCountryLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    catBank: CreateOrEditCatBankDto = new CreateOrEditCatBankDto();
    catCountryTitle = '';

    constructor(
        injector: Injector,
        private _catBanksServiceProxy: CatBanksServiceProxy
    ) {
        super(injector);
    }

    show(catBankId?: number): void {
        if (!catBankId) {
            this.catBank = new CreateOrEditCatBankDto();
            this.catBank.id = catBankId;
            this.catCountryTitle = '';
            this.active = true;
            this.modal.show();
        } else {
            this._catBanksServiceProxy.getCatBankForEdit(catBankId).subscribe(result => {
                this.catBank = result.catBank;

                this.catCountryTitle = result.catCountryTitle;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catBanksServiceProxy.createOrEdit(this.catBank)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectCatCountryModal() {
        this.catBankCatCountryLookupTableModal.id = this.catBank.catCountryId;
        this.catBankCatCountryLookupTableModal.displayName = this.catCountryTitle;
        this.catBankCatCountryLookupTableModal.show();
    }


    setCatCountryIdNull() {
        this.catBank.catCountryId = null;
        this.catCountryTitle = '';
    }


    getNewCatCountryId() {
        this.catBank.catCountryId = this.catBankCatCountryLookupTableModal.id;
        this.catCountryTitle = this.catBankCatCountryLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {
    }
}
