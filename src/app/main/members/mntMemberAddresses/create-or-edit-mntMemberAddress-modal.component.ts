import { Component, ViewChild, Injector, Output, EventEmitter, OnInit, ElementRef} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { MntMemberAddressesServiceProxy, CreateOrEditMntMemberAddressDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/common/app-component-base';
import { DateTime } from 'luxon';
import { MntMemberAddressMntMemberLookupTableModalComponent } from './mntMemberAddress-mntMember-lookup-table-modal.component';
import { MntMemberAddressCatStateLookupTableModalComponent } from './mntMemberAddress-catState-lookup-table-modal.component';

@Component({
    selector: 'createOrEditMntMemberAddressModal',
    templateUrl: './create-or-edit-mntMemberAddress-modal.component.html'
})
export class CreateOrEditMntMemberAddressModalComponent extends AppComponentBase implements OnInit{
    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @ViewChild('mntMemberAddressMntMemberLookupTableModal', { static: true }) mntMemberAddressMntMemberLookupTableModal: MntMemberAddressMntMemberLookupTableModalComponent;
    @ViewChild('mntMemberAddressCatStateLookupTableModal', { static: true }) mntMemberAddressCatStateLookupTableModal: MntMemberAddressCatStateLookupTableModalComponent;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;
    mntMemberAddress: CreateOrEditMntMemberAddressDto = new CreateOrEditMntMemberAddressDto();
    mntMemberComments = '';
    catStateTitle = '';

    constructor(
        injector: Injector,
        private _mntMemberAddressesServiceProxy: MntMemberAddressesServiceProxy
    ) {
        super(injector);
    }

    show(mntMemberAddressId?: number): void {
        if (!mntMemberAddressId) {
            this.mntMemberAddress = new CreateOrEditMntMemberAddressDto();
            this.mntMemberAddress.id = mntMemberAddressId;
            this.mntMemberComments = '';
            this.catStateTitle = '';


            this.active = true;
            this.modal.show();
        } else {
            this._mntMemberAddressesServiceProxy.getMntMemberAddressForEdit(mntMemberAddressId).subscribe(result => {
                this.mntMemberAddress = result.mntMemberAddress;

                this.mntMemberComments = result.mntMemberComments;
                this.catStateTitle = result.catStateTitle;


                this.active = true;
                this.modal.show();
            });
        }
    }

    save(): void {
        this.saving = true;
        this._mntMemberAddressesServiceProxy.createOrEdit(this.mntMemberAddress)
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
        this.mntMemberAddressMntMemberLookupTableModal.id = this.mntMemberAddress.mntMemberId;
        this.mntMemberAddressMntMemberLookupTableModal.displayName = this.mntMemberComments;
        this.mntMemberAddressMntMemberLookupTableModal.show();
    }
    openSelectCatStateModal() {
        this.mntMemberAddressCatStateLookupTableModal.id = this.mntMemberAddress.catStateId;
        this.mntMemberAddressCatStateLookupTableModal.displayName = this.catStateTitle;
        this.mntMemberAddressCatStateLookupTableModal.show();
    }

    setMntMemberIdNull() {
        this.mntMemberAddress.mntMemberId = null;
        this.mntMemberComments = '';
    }
    setCatStateIdNull() {
        this.mntMemberAddress.catStateId = null;
        this.catStateTitle = '';
    }

    getNewMntMemberId() {
        this.mntMemberAddress.mntMemberId = this.mntMemberAddressMntMemberLookupTableModal.id;
        this.mntMemberComments = this.mntMemberAddressMntMemberLookupTableModal.displayName;
    }
    getNewCatStateId() {
        this.mntMemberAddress.catStateId = this.mntMemberAddressCatStateLookupTableModal.id;
        this.catStateTitle = this.mntMemberAddressCatStateLookupTableModal.displayName;
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }

    ngOnInit(): void {

    }
}
