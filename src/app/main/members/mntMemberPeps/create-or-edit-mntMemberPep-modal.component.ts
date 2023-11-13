import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntMemberPepsServiceProxy, CreateOrEditMntMemberPepDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { MntMemberPepMntMemberLookupTableModalComponent } from './mntMemberPep-mntMember-lookup-table-modal.component';
@Component({
    selector: 'createOrEditMntMemberPepModal',
    templateUrl: './create-or-edit-mntMemberPep-modal.component.html'
})
export class CreateOrEditMntMemberPepModalComponent extends AppComponentBase implements OnInit{

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('mntMemberPepMntMemberLookupTableModal', { static: true }) mntMemberPepMntMemberLookupTableModal: MntMemberPepMntMemberLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    mntMemberPep: CreateOrEditMntMemberPepDto = new CreateOrEditMntMemberPepDto();
    mntMemberComments = '';

    constructor(
        injector: Injector,
        private _mntMemberPepsServiceProxy: MntMemberPepsServiceProxy
    ) {
        super(injector);
    }

    show(mntMemberPepId?: number): void {
        if (!mntMemberPepId) {
            this.mntMemberPep = new CreateOrEditMntMemberPepDto();
            this.mntMemberPep.id = mntMemberPepId;
            this.mntMemberComments = '';
            this.active = true;
            this.modal.show();
        } else {
            this._mntMemberPepsServiceProxy.getMntMemberPepForEdit(mntMemberPepId).subscribe(result => {
                this.mntMemberPep = result.mntMemberPep;
                this.mntMemberComments = result.mntMemberComments;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._mntMemberPepsServiceProxy.createOrEdit(this.mntMemberPep)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectMntMemberModal() {
        this.mntMemberPepMntMemberLookupTableModal.id = this.mntMemberPep.mntMemberId;
        this.mntMemberPepMntMemberLookupTableModal.displayName = this.mntMemberComments;
        this.mntMemberPepMntMemberLookupTableModal.show();
    }

    setMntMemberIdNull() {
        this.mntMemberPep.mntMemberId = null;
        this.mntMemberComments = '';
    }

    getNewMntMemberId() {
        this.mntMemberPep.mntMemberId = this.mntMemberPepMntMemberLookupTableModal.id;
        this.mntMemberComments = this.mntMemberPepMntMemberLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {

    }
}
