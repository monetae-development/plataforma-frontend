import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatBankForViewDto, CatBankDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatBankModal',
    templateUrl: './view-catBank-modal.component.html'
})
export class ViewCatBankModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    item: GetCatBankForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatBankForViewDto();
        this.item.catBank = new CatBankDto();
    }

    show(item: GetCatBankForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
