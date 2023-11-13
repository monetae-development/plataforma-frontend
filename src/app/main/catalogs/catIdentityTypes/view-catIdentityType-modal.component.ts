import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatIdentityTypeForViewDto } from '@shared/service-proxies/dto/Catalogs/CatIdentityType/GetCatIdentityTypeForViewDto';
import { CatIdentityTypeDto } from '@shared/service-proxies/dto/Catalogs/CatIdentityType/CatIdentityTypeDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatIdentityTypeModal',
    templateUrl: './view-catIdentityType-modal.component.html'
})
export class ViewCatIdentityTypeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatIdentityTypeForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatIdentityTypeForViewDto();
        this.item.catIdentityType = new CatIdentityTypeDto();
    }

    show(item: GetCatIdentityTypeForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
