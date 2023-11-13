import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatCountriesServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatCountryDto } from '@shared/service-proxies/dto/Catalogs/CatCountries/CreateOrEditCatCountryDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatCountryModal',
    templateUrl: './create-or-edit-catCountry-modal.component.html'
})
export class CreateOrEditCatCountryModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    catCountry: CreateOrEditCatCountryDto = new CreateOrEditCatCountryDto();

    constructor(
        injector: Injector,
        private _catCountriesServiceProxy: CatCountriesServiceProxy
    ) {
        super(injector);
    }

    show(catCountryId?: number): void {
        if (!catCountryId) {
            this.catCountry = new CreateOrEditCatCountryDto();
            this.catCountry.id = catCountryId;


            this.active = true;
            this.modal.show();
        } else {
            this._catCountriesServiceProxy.getCatCountryForEdit(catCountryId).subscribe(result => {
                this.catCountry = result.catCountry;



                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catCountriesServiceProxy.createOrEdit(this.catCountry)
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
