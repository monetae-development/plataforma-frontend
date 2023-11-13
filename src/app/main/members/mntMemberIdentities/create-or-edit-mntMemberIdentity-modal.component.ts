import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntMemberIdentitiesServiceProxy, CreateOrEditMntMemberIdentityDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { MntMemberIdentityCatIdentityTypeLookupTableModalComponent } from './mntMemberIdentity-catIdentityType-lookup-table-modal.component';
import { MntMemberIdentityMntMemberLookupTableModalComponent } from './mntMemberIdentity-mntMember-lookup-table-modal.component';

@Component({
    selector: 'createOrEditMntMemberIdentityModal',
    templateUrl: './create-or-edit-mntMemberIdentity-modal.component.html'
})

export class CreateOrEditMntMemberIdentityModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('mntMemberIdentityCatIdentityTypeLookupTableModal', { static: true }) mntMemberIdentityCatIdentityTypeLookupTableModal: MntMemberIdentityCatIdentityTypeLookupTableModalComponent;
    @ViewChild('mntMemberIdentityMntMemberLookupTableModal', { static: true }) mntMemberIdentityMntMemberLookupTableModal: MntMemberIdentityMntMemberLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    mntMemberIdentity: CreateOrEditMntMemberIdentityDto = new CreateOrEditMntMemberIdentityDto();

    catIdentityTypeTitle = '';
    mntMemberComments = '';

    constructor(
        injector: Injector,
        private _mntMemberIdentitiesServiceProxy: MntMemberIdentitiesServiceProxy,
        private _dateTimeService: DateTimeService,
    ) {
        super(injector);
    }

    show(mntMemberIdentityId?: number): void {
        if (!mntMemberIdentityId) {
            this.mntMemberIdentity = new CreateOrEditMntMemberIdentityDto();
            this.mntMemberIdentity.id = mntMemberIdentityId;
            this.mntMemberIdentity.expiration = this._dateTimeService.getStartOfDay();
            this.catIdentityTypeTitle = '';
            this.mntMemberComments = '';
            this.active = true;
            this.modal.show();
        } else {
            this._mntMemberIdentitiesServiceProxy.getMntMemberIdentityForEdit(mntMemberIdentityId).subscribe(result => {
                this.mntMemberIdentity = result.mntMemberIdentity;
                this.catIdentityTypeTitle = result.catIdentityTypeTitle;
                this.mntMemberComments = result.mntMemberComments;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
            this.saving = true;
            this._mntMemberIdentitiesServiceProxy.createOrEdit(this.mntMemberIdentity)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
            });
    }

    openSelectCatIdentityTypeModal() {
        this.mntMemberIdentityCatIdentityTypeLookupTableModal.id = this.mntMemberIdentity.catIdentityTypeId;
        this.mntMemberIdentityCatIdentityTypeLookupTableModal.displayName = this.catIdentityTypeTitle;
        this.mntMemberIdentityCatIdentityTypeLookupTableModal.show();
    }
    openSelectMntMemberModal() {
        this.mntMemberIdentityMntMemberLookupTableModal.id = this.mntMemberIdentity.mntMemberId;
        this.mntMemberIdentityMntMemberLookupTableModal.displayName = this.mntMemberComments;
        this.mntMemberIdentityMntMemberLookupTableModal.show();
    }


    setCatIdentityTypeIdNull() {
        this.mntMemberIdentity.catIdentityTypeId = null;
        this.catIdentityTypeTitle = '';
    }
    setMntMemberIdNull() {
        this.mntMemberIdentity.mntMemberId = null;
        this.mntMemberComments = '';
    }

    getNewCatIdentityTypeId() {
        this.mntMemberIdentity.catIdentityTypeId = this.mntMemberIdentityCatIdentityTypeLookupTableModal.id;
        this.catIdentityTypeTitle = this.mntMemberIdentityCatIdentityTypeLookupTableModal.displayName;
    }
    getNewMntMemberId() {
        this.mntMemberIdentity.mntMemberId = this.mntMemberIdentityMntMemberLookupTableModal.id;
        this.mntMemberComments = this.mntMemberIdentityMntMemberLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {
    }
}
