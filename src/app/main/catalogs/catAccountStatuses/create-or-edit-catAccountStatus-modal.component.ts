﻿import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatAccountStatusesServiceProxy, CreateOrEditCatAccountStatusDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatAccountStatusModal',
    templateUrl: './create-or-edit-catAccountStatus-modal.component.html'
})
export class CreateOrEditCatAccountStatusModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    catAccountStatus: CreateOrEditCatAccountStatusDto = new CreateOrEditCatAccountStatusDto();

    constructor(
        injector: Injector,
        private _catAccountStatusesServiceProxy: CatAccountStatusesServiceProxy
    ) {
        super(injector);
    }

    show(catAccountStatusId?: number): void {
        if (!catAccountStatusId) {
            this.catAccountStatus = new CreateOrEditCatAccountStatusDto();
            this.catAccountStatus.id = catAccountStatusId;
            this.active = true;
            this.modal.show();
        } else {
            this._catAccountStatusesServiceProxy.getCatAccountStatusForEdit(catAccountStatusId).subscribe(result => {
                this.catAccountStatus = result.catAccountStatus;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._catAccountStatusesServiceProxy.createOrEdit(this.catAccountStatus)
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
