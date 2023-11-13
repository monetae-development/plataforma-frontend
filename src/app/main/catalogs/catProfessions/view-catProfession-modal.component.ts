import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatProfessionForViewDto } from '@shared/service-proxies/dto/Catalogs/CatProfessions/GetCatProfessionForViewDto';
import { CatProfessionDto } from '@shared/service-proxies/dto/Catalogs/CatProfessions/CatProfessionDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatProfessionModal',
    templateUrl: './view-catProfession-modal.component.html'
})
export class ViewCatProfessionModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatProfessionForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatProfessionForViewDto();
        this.item.catProfession = new CatProfessionDto();
    }

    show(item: GetCatProfessionForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
