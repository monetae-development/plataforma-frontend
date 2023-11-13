import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatTransactionTypeForViewDto, CatTransactionTypeDto , TransactionType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatTransactionTypeModal',
    templateUrl: './view-catTransactionType-modal.component.html'
})
export class ViewCatTransactionTypeModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    item: GetCatTransactionTypeForViewDto;
    transactionType = TransactionType;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatTransactionTypeForViewDto();
        this.item.catTransactionType = new CatTransactionTypeDto();
    }

    show(item: GetCatTransactionTypeForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
