import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatCountryForViewDto } from '@shared/service-proxies/dto/Catalogs/CatCountries/GetCatCountryForViewDto';
import { CatCountryDto } from '@shared/service-proxies/dto/Catalogs/CatCountries/CatCountryDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatCountryModal',
    templateUrl: './view-catCountry-modal.component.html'
})
export class ViewCatCountryModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatCountryForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatCountryForViewDto();
        this.item.catCountry = new CatCountryDto();
    }

    show(item: GetCatCountryForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
