import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntMembersServiceProxy, CreateOrEditMntMemberDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { MntMemberUserLookupTableModalComponent } from './mntMember-user-lookup-table-modal.component';
import { MntMemberCatNationalityLookupTableModalComponent } from './mntMember-catNationality-lookup-table-modal.component';

@Component({
    selector: 'createOrEditMntMemberModal',
    templateUrl: './create-or-edit-mntMember-modal.component.html'
})

export class CreateOrEditMntMemberModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('mntMemberUserLookupTableModal', { static: true }) mntMemberUserLookupTableModal: MntMemberUserLookupTableModalComponent;
    @ViewChild('mntMemberCatNationalityLookupTableModal', { static: true }) mntMemberCatNationalityLookupTableModal: MntMemberCatNationalityLookupTableModalComponent;

    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    mntMember: CreateOrEditMntMemberDto = new CreateOrEditMntMemberDto();

    userName = '';
    catStateTitle = '';
    catNationalityTitle = '';



    constructor(
        injector: Injector,
        private _mntMembersServiceProxy: MntMembersServiceProxy,
        private _dateTimeService: DateTimeService
    ) {
        super(injector);
    }

    show(mntMemberId?: number): void {
        if (!mntMemberId) {
            this.mntMember = new CreateOrEditMntMemberDto();
            this.mntMember.id = mntMemberId;
            this.mntMember.dayOfBirth = this._dateTimeService.getStartOfDay();
            this.userName = '';
            this.catStateTitle = '';
            this.catNationalityTitle = '';
            this.active = true;
            this.modal.show();
        } else {
            this._mntMembersServiceProxy.getMntMemberForEdit(mntMemberId).subscribe(result => {
                this.mntMember = result.mntMember;
                this.userName = result.userName;
                this.catNationalityTitle = result.catNationalityTitle;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;
        this._mntMembersServiceProxy.createOrEdit(this.mntMember)
            .pipe(finalize(() => {
                this.saving = false;
            }))
            .subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.close();
                this.modalSave.emit(null);
        });
    }

    openSelectUserModal() {
        this.mntMemberUserLookupTableModal.id = this.mntMember.userId;
        this.mntMemberUserLookupTableModal.displayName = this.userName;
        this.mntMemberUserLookupTableModal.show();
    }

    openSelectCatNationalityModal() {
        this.mntMemberCatNationalityLookupTableModal.id = this.mntMember.catNationalityId;
        this.mntMemberCatNationalityLookupTableModal.displayName = this.catNationalityTitle;
        this.mntMemberCatNationalityLookupTableModal.show();
    }

    setUserIdNull() {
        this.mntMember.userId = null;
        this.userName = '';
    }

    setCatNationalityIdNull() {
        this.mntMember.catNationalityId = null;
        this.catNationalityTitle = '';
    }

    getNewUserId() {
        this.mntMember.userId = this.mntMemberUserLookupTableModal.id;
        this.userName = this.mntMemberUserLookupTableModal.displayName;
    }

    getNewCatNationalityId() {
        this.mntMember.catNationalityId = this.mntMemberCatNationalityLookupTableModal.id;
        this.catNationalityTitle = this.mntMemberCatNationalityLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {

    }
}
