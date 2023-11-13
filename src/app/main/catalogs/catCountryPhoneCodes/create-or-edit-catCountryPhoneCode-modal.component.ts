import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatCountryPhoneCodesServiceProxy, CreateOrEditCatCountryPhoneCodeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { CatCountryPhoneCodeCatCountryLookupTableModalComponent } from './catCountryPhoneCode-catCountry-lookup-table-modal.component';


@Component({
    selector: 'createOrEditCatCountryPhoneCodeModal',
    templateUrl: './create-or-edit-catCountryPhoneCode-modal.component.html'
})
export class CreateOrEditCatCountryPhoneCodeModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('catCountryPhoneCodeCatCountryLookupTableModal', { static: true }) catCountryPhoneCodeCatCountryLookupTableModal: CatCountryPhoneCodeCatCountryLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    catCountryPhoneCode: CreateOrEditCatCountryPhoneCodeDto = new CreateOrEditCatCountryPhoneCodeDto();
    catCountryTitle = '';

    constructor(
        injector: Injector,
        private _catCountryPhoneCodesServiceProxy: CatCountryPhoneCodesServiceProxy
    ) {
        super(injector);
    }

    show(catCountryPhoneCodeId?: number): void {
        if (!catCountryPhoneCodeId) {
            this.catCountryPhoneCode = new CreateOrEditCatCountryPhoneCodeDto();
            this.catCountryPhoneCode.id = catCountryPhoneCodeId;
            this.catCountryTitle = '';


            this.active = true;
            this.modal.show();
        } else {
            this._catCountryPhoneCodesServiceProxy.getCatCountryPhoneCodeForEdit(catCountryPhoneCodeId).subscribe(result => {
                this.catCountryPhoneCode = result.catCountryPhoneCode;
                this.catCountryTitle = result.catCountryTitle;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catCountryPhoneCodesServiceProxy.createOrEdit(this.catCountryPhoneCode)
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
        this.catCountryPhoneCodeCatCountryLookupTableModal.id = this.catCountryPhoneCode.catCountryId;
        this.catCountryPhoneCodeCatCountryLookupTableModal.displayName = this.catCountryTitle;
        this.catCountryPhoneCodeCatCountryLookupTableModal.show();
    }


    setCatCountryIdNull() {
        this.catCountryPhoneCode.catCountryId = null;
        this.catCountryTitle = '';
    }


    getNewCatCountryId() {
        this.catCountryPhoneCode.catCountryId = this.catCountryPhoneCodeCatCountryLookupTableModal.id;
        this.catCountryTitle = this.catCountryPhoneCodeCatCountryLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {
    }
}
