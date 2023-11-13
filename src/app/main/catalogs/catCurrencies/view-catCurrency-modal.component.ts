import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatCurrencyForViewDto, CatCurrencyDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatCurrencyModal',
    templateUrl: './view-catCurrency-modal.component.html'
})
export class ViewCatCurrencyModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    item: GetCatCurrencyForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatCurrencyForViewDto();
        this.item.catCurrency = new CatCurrencyDto();
    }

    show(item: GetCatCurrencyForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
