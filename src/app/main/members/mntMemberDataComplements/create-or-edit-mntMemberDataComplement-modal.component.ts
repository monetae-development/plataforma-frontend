import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntMemberDataComplementsServiceProxy, CreateOrEditMntMemberDataComplementDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';

@Component({
    selector: 'createOrEditMntMemberDataComplementModal',
    templateUrl: './create-or-edit-mntMemberDataComplement-modal.component.html'
})
export class CreateOrEditMntMemberDataComplementModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    mntMemberDataComplement: CreateOrEditMntMemberDataComplementDto = new CreateOrEditMntMemberDataComplementDto();

    constructor(
        injector: Injector,
        private _mntMemberDataComplementsServiceProxy: MntMemberDataComplementsServiceProxy
    ) {
        super(injector);
    }

    show(mntMemberDataComplementId?: number): void {
        if (!mntMemberDataComplementId) {
            this.mntMemberDataComplement = new CreateOrEditMntMemberDataComplementDto();
            this.mntMemberDataComplement.id = mntMemberDataComplementId;
            this.active = true;
            this.modal.show();
        } else {
            this._mntMemberDataComplementsServiceProxy.getMntMemberDataComplementForEdit(mntMemberDataComplementId).subscribe(result => {
                this.mntMemberDataComplement = result.mntMemberDataComplement;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._mntMemberDataComplementsServiceProxy.createOrEdit(this.mntMemberDataComplement)
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
