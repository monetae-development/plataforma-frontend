import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { CatDefaultServiceProxy } from '@shared/service-proxies/service-catalogs-proxies';
import { CreateOrEditCatDefaultDto } from '@shared/service-proxies/dto/Catalogs/CatDefault/CreateOrEditCatDefaultDto';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditCatDefaultModal',
    templateUrl: './create-or-edit-catDefault-modal.component.html'
})
export class CreateOrEditCatDefaultModalComponent extends AppComponentBase {
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    service: string;
    record: CreateOrEditCatDefaultDto = new CreateOrEditCatDefaultDto();

    constructor(
        injector: Injector,
        private _catDefaulteServiceProxy: CatDefaultServiceProxy
    ) {
        super(injector);
        this.record = new CreateOrEditCatDefaultDto();
    }

    show(service: string, id?: number): void {
        this.service = service;
        if (!id) {
            this.record = new CreateOrEditCatDefaultDto();
            this.record.id = id;
            this.active = true;
            this.modal.show();
        } else {
            this._catDefaulteServiceProxy.getForEdit(this.service, id).subscribe(result => {
                this.record = result.record;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;
        this._catDefaulteServiceProxy.createOrEdit(this.service, this.record)
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
}
