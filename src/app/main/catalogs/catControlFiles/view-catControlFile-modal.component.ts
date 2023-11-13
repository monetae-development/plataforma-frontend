import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetCatControlFileForViewDto, CatControlFileDto , ClientType, FileType} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewCatControlFileModal',
    templateUrl: './view-catControlFile-modal.component.html'
})
export class ViewCatControlFileModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    item: GetCatControlFileForViewDto;
    clientType = ClientType;
    fileType = FileType;

    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetCatControlFileForViewDto();
        this.item.catControlFile = new CatControlFileDto();
    }

    show(item: GetCatControlFileForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
