import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetOTCCoinForViewDto, OTCCoinDto , CryptoApis} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewOTCCoinModal',
    templateUrl: './view-otcCoin-modal.component.html'
})
export class ViewOTCCoinModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetOTCCoinForViewDto;
    cryptoApis = CryptoApis;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetOTCCoinForViewDto();
        this.item.otcCoin = new OTCCoinDto();
    }

    show(item: GetOTCCoinForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
