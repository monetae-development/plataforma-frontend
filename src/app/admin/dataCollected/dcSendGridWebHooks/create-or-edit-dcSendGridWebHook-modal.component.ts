import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { DcSendGridWebHooksServiceProxy, CreateOrEditDcSendGridWebHookDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';

@Component({
    selector: 'createOrEditDcSendGridWebHookModal',
    templateUrl: './create-or-edit-dcSendGridWebHook-modal.component.html'
})
export class CreateOrEditDcSendGridWebHookModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    dcSendGridWebHook: CreateOrEditDcSendGridWebHookDto = new CreateOrEditDcSendGridWebHookDto();

    constructor(
        injector: Injector,
        private _dcSendGridWebHooksServiceProxy: DcSendGridWebHooksServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(dcSendGridWebHookId?: number): void {
        if (!dcSendGridWebHookId) {
            this.dcSendGridWebHook = new CreateOrEditDcSendGridWebHookDto();
            this.dcSendGridWebHook.id = dcSendGridWebHookId;
            this.dcSendGridWebHook.timeEvent = this._dateTimeService.getStartOfDay();
            this.active = true;
            this.modal.show();
        } else {
            this._dcSendGridWebHooksServiceProxy.getDcSendGridWebHookForEdit(dcSendGridWebHookId).subscribe(result => {
                this.dcSendGridWebHook = result.dcSendGridWebHook;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._dcSendGridWebHooksServiceProxy.createOrEdit(this.dcSendGridWebHook)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {

    }
}
