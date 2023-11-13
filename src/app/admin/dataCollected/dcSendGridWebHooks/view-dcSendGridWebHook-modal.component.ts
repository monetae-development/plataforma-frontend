import {AppConsts} from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetDcSendGridWebHookForViewDto, DcSendGridWebHookDto , SendGridEvents} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'viewDcSendGridWebHookModal',
    templateUrl: './view-dcSendGridWebHook-modal.component.html'
})
export class ViewDcSendGridWebHookModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetDcSendGridWebHookForViewDto;
    sendGridEvents = SendGridEvents;


    constructor(
        injector: Injector,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
        this.item = new GetDcSendGridWebHookForViewDto();
        this.item.dcSendGridWebHook = new DcSendGridWebHookDto();
    }

    show(item: GetDcSendGridWebHookForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
