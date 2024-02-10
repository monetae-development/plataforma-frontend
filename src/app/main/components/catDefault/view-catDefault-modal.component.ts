import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CatDefaultServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CatDefaultDto } from '@shared/service-proxies/dto/Catalogs/CatDefault/CatDefaultDto';
import { GetCatDefaultForViewDto } from '@shared/service-proxies/dto/Catalogs/CatDefault/GetCatDefaultForViewDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatDefaultModal',
    templateUrl: './view-catDefault-modal.component.html'
})

export class ViewCatDefaultModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();
    active = false;
    saving = false;
    item: GetCatDefaultForViewDto;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatDefaultForViewDto();
        this.item.record = new CatDefaultDto();
    }

    show(item: GetCatDefaultForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
