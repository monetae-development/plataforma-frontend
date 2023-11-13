import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntEconomicInfosServiceProxy, CreateOrEditMntEconomicInfoDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { MntEconomicInfoCatProfessionLookupTableModalComponent } from './mntEconomicInfo-catProfession-lookup-table-modal.component';
import { MntEconomicInfoCatSourceFoundsLookupTableModalComponent } from './mntEconomicInfo-catSourceFounds-lookup-table-modal.component';
import { MntEconomicInfoMntMemberLookupTableModalComponent } from './mntEconomicInfo-mntMember-lookup-table-modal.component';

@Component({
    selector: 'createOrEditMntEconomicInfoModal',
    templateUrl: './create-or-edit-mntEconomicInfo-modal.component.html'
})
export class CreateOrEditMntEconomicInfoModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('mntEconomicInfoCatProfessionLookupTableModal', { static: true }) mntEconomicInfoCatProfessionLookupTableModal: MntEconomicInfoCatProfessionLookupTableModalComponent;
    @ViewChild('mntEconomicInfoCatSourceFoundsLookupTableModal', { static: true }) mntEconomicInfoCatSourceFoundsLookupTableModal: MntEconomicInfoCatSourceFoundsLookupTableModalComponent;
    @ViewChild('mntEconomicInfoMntMemberLookupTableModal', { static: true }) mntEconomicInfoMntMemberLookupTableModal: MntEconomicInfoMntMemberLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    mntEconomicInfo: CreateOrEditMntEconomicInfoDto = new CreateOrEditMntEconomicInfoDto();
    catProfessionTitle = '';
    catSourceFoundsTitle = '';
    mntMemberComments = '';

    constructor(
        injector: Injector,
        private _mntEconomicInfosServiceProxy: MntEconomicInfosServiceProxy
    ) {
        super(injector);
    }

    show(mntEconomicInfoId?: number): void {
        if (!mntEconomicInfoId) {
            this.mntEconomicInfo = new CreateOrEditMntEconomicInfoDto();
            this.mntEconomicInfo.id = mntEconomicInfoId;
            this.catProfessionTitle = '';
            this.catSourceFoundsTitle = '';
            this.mntMemberComments = '';
            this.active = true;
            this.modal.show();
        } else {
            this._mntEconomicInfosServiceProxy.getMntEconomicInfoForEdit(mntEconomicInfoId).subscribe(result => {
                this.mntEconomicInfo = result.mntEconomicInfo;
                this.catProfessionTitle = result.catProfessionTitle;
                this.catSourceFoundsTitle = result.catSourceFoundsTitle;
                this.mntMemberComments = result.mntMemberComments;
                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;
        this._mntEconomicInfosServiceProxy.createOrEdit(this.mntEconomicInfo)
        .pipe(finalize(() => {
            this.saving = false;
        }))
        .subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.close();
            this.modalSave.emit(null);
        });
    }

    openSelectCatProfessionModal() {
        this.mntEconomicInfoCatProfessionLookupTableModal.id = this.mntEconomicInfo.catProfessionId;
        this.mntEconomicInfoCatProfessionLookupTableModal.displayName = this.catProfessionTitle;
        this.mntEconomicInfoCatProfessionLookupTableModal.show();
    }
    openSelectCatSourceFoundsModal() {
        this.mntEconomicInfoCatSourceFoundsLookupTableModal.id = this.mntEconomicInfo.catSourceFoundsId;
        this.mntEconomicInfoCatSourceFoundsLookupTableModal.displayName = this.catSourceFoundsTitle;
        this.mntEconomicInfoCatSourceFoundsLookupTableModal.show();
    }
    openSelectMntMemberModal() {
        this.mntEconomicInfoMntMemberLookupTableModal.id = this.mntEconomicInfo.mntMemberId;
        this.mntEconomicInfoMntMemberLookupTableModal.displayName = this.mntMemberComments;
        this.mntEconomicInfoMntMemberLookupTableModal.show();
    }


    setCatProfessionIdNull() {
        this.mntEconomicInfo.catProfessionId = null;
        this.catProfessionTitle = '';
    }
    setCatSourceFoundsIdNull() {
        this.mntEconomicInfo.catSourceFoundsId = null;
        this.catSourceFoundsTitle = '';
    }
    setMntMemberIdNull() {
        this.mntEconomicInfo.mntMemberId = null;
        this.mntMemberComments = '';
    }

    getNewCatProfessionId() {
        this.mntEconomicInfo.catProfessionId = this.mntEconomicInfoCatProfessionLookupTableModal.id;
        this.catProfessionTitle = this.mntEconomicInfoCatProfessionLookupTableModal.displayName;
    }
    getNewCatSourceFoundsId() {
        this.mntEconomicInfo.catSourceFoundsId = this.mntEconomicInfoCatSourceFoundsLookupTableModal.id;
        this.catSourceFoundsTitle = this.mntEconomicInfoCatSourceFoundsLookupTableModal.displayName;
    }
    getNewMntMemberId() {
        this.mntEconomicInfo.mntMemberId = this.mntEconomicInfoMntMemberLookupTableModal.id;
        this.mntMemberComments = this.mntEconomicInfoMntMemberLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {

    }
}
