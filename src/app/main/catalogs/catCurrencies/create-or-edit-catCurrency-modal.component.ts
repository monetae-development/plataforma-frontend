import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatCurrenciesServiceProxy, CreateOrEditCatCurrencyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatCurrencyModal',
    templateUrl: './create-or-edit-catCurrency-modal.component.html'
})
export class CreateOrEditCatCurrencyModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    catCurrency: CreateOrEditCatCurrencyDto = new CreateOrEditCatCurrencyDto();

    constructor(
        injector: Injector,
        private _catCurrenciesServiceProxy: CatCurrenciesServiceProxy
    ) {
        super(injector);
    }

    show(catCurrencyId?: number): void {
        if (!catCurrencyId) {
            this.catCurrency = new CreateOrEditCatCurrencyDto();
            this.catCurrency.id = catCurrencyId;
            this.active = true;
            this.modal.show();
        } else {
            this._catCurrenciesServiceProxy.getCatCurrencyForEdit(catCurrencyId).subscribe(result => {
                this.catCurrency = result.catCurrency;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catCurrenciesServiceProxy.createOrEdit(this.catCurrency)
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

    ngOnInit(): void {
    }
}
