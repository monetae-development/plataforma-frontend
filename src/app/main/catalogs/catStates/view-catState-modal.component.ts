import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatStateForViewDto } from '@shared/service-proxies/dto/Catalogs/CatStates/GetCatStateForViewDto';
import { CatStateDto } from '@shared/service-proxies/dto/Catalogs/CatStates/CatStateDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatStateModal',
    templateUrl: './view-catState-modal.component.html'
})

export class ViewCatStateModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetCatStateForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatStateForViewDto();
        this.item.catState = new CatStateDto();
    }

    show(item: GetCatStateForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
