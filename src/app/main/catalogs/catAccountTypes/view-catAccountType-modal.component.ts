import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatAccountTypeForViewDto, CatAccountTypeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatAccountTypeModal',
    templateUrl: './view-catAccountType-modal.component.html'
})
export class ViewCatAccountTypeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    item: GetCatAccountTypeForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatAccountTypeForViewDto();
        this.item.catAccountType = new CatAccountTypeDto();
    }

    show(item: GetCatAccountTypeForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
