import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatAccountStatusForViewDto, CatAccountStatusDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatAccountStatusModal',
    templateUrl: './view-catAccountStatus-modal.component.html'
})
export class ViewCatAccountStatusModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatAccountStatusForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatAccountStatusForViewDto();
        this.item.catAccountStatus = new CatAccountStatusDto();
    }

    show(item: GetCatAccountStatusForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
