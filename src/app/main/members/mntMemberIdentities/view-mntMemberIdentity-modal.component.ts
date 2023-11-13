import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetMntMemberIdentityForViewDto, MntMemberIdentityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewMntMemberIdentityModal',
    templateUrl: './view-mntMemberIdentity-modal.component.html'
})
export class ViewMntMemberIdentityModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetMntMemberIdentityForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetMntMemberIdentityForViewDto();
        this.item.mntMemberIdentity = new MntMemberIdentityDto();
    }

    show(item: GetMntMemberIdentityForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
