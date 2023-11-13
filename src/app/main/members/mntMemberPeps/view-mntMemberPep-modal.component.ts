﻿import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetMntMemberPepForViewDto, MntMemberPepDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewMntMemberPepModal',
    templateUrl: './view-mntMemberPep-modal.component.html'
})
export class ViewMntMemberPepModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetMntMemberPepForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetMntMemberPepForViewDto();
        this.item.mntMemberPep = new MntMemberPepDto();
    }

    show(item: GetMntMemberPepForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
