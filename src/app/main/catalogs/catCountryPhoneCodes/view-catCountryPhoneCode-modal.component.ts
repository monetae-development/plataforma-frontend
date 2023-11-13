import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatCountryPhoneCodeForViewDto, CatCountryPhoneCodeDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatCountryPhoneCodeModal',
    templateUrl: './view-catCountryPhoneCode-modal.component.html'
})
export class ViewCatCountryPhoneCodeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatCountryPhoneCodeForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatCountryPhoneCodeForViewDto();
        this.item.catCountryPhoneCode = new CatCountryPhoneCodeDto();
    }

    show(item: GetCatCountryPhoneCodeForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
