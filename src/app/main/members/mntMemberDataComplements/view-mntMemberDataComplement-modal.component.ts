import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetMntMemberDataComplementForViewDto, MntMemberDataComplementDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewMntMemberDataComplementModal',
    templateUrl: './view-mntMemberDataComplement-modal.component.html'
})
export class ViewMntMemberDataComplementModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetMntMemberDataComplementForViewDto;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.item = new GetMntMemberDataComplementForViewDto();
        this.item.mntMemberDataComplement = new MntMemberDataComplementDto();
    }

    show(item: GetMntMemberDataComplementForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
