import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CatNationalityDto } from '@shared/service-proxies/dto/Catalogs/CatNationalities/CatNationalityDto';
import { GetCatNationalityForViewDto } from '@shared/service-proxies/dto/Catalogs/CatNationalities/GetCatNationalityForViewDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatNationalityModal',
    templateUrl: './view-catNationality-modal.component.html'
})
export class ViewCatNationalityModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatNationalityForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatNationalityForViewDto();
        this.item.catNationality = new CatNationalityDto();
    }

    show(item: GetCatNationalityForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
