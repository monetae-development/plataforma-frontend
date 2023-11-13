import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatStatusForViewDto, CatStatusDto , StatusType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
@Component({
    selector: 'viewCatStatusModal',
    templateUrl: './view-catStatus-modal.component.html'
})
export class ViewCatStatusModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatStatusForViewDto;
    statusType = StatusType;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatStatusForViewDto();
        this.item.catStatus = new CatStatusDto();
    }

    show(item: GetCatStatusForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
