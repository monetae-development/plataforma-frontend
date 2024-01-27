import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {
    GetMntMemberForViewDto, MntMemberDto,
    MntMemberAddressesServiceProxy, GetMntMemberAddressCompletedDto,
    MntMemberIdentitiesServiceProxy, GetMntMemberIdentityCompletedDto,
    MntEconomicInfosServiceProxy, GetMntEconomicInfoCompletedDto,
} from '@shared/service-proxies/service-proxies';
import { ServiceMembersProxy } from '@shared/service-proxies/service-members-proxies';
import { FileType } from '@shared/service-proxies/enum/Members/FileType.enum';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewMntMemberModal',
    templateUrl: './view-mntMember-modal.component.html'
})
export class ViewMntMemberModalComponent extends AppComponentBase {

    @ViewChild('createOrEditModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    item: GetMntMemberForViewDto;
    address: GetMntMemberAddressCompletedDto;
    identity: GetMntMemberIdentityCompletedDto;
    economic: GetMntEconomicInfoCompletedDto;
    fileType = FileType;

    constructor(
        injector: Injector,
        private _mntMemberAddressesServiceProxy: MntMemberAddressesServiceProxy,
        private _mntMemberIdentitiesServiceProxy: MntMemberIdentitiesServiceProxy,
        private _mntEconomicInfosServiceProxy: MntEconomicInfosServiceProxy,
        private _mntMembersProxy: ServiceMembersProxy,
    ) {
        super(injector);
        this.item = new GetMntMemberForViewDto();
        this.item.mntMember = new MntMemberDto();
        this.address = new GetMntMemberAddressCompletedDto();
        this.identity = new GetMntMemberIdentityCompletedDto();
        this.economic = new GetMntEconomicInfoCompletedDto();
    }

    show(item: GetMntMemberForViewDto): void {
        this.item = item;
        this.active = true;
        this.modal.show();
        this._mntMemberAddressesServiceProxy.getMntMemberAddressByMemberId(this.item.mntMember.id).subscribe(result => {
            this.address = result;
        });

        this._mntMemberIdentitiesServiceProxy.getMntMemberIdentityByMemberId(this.item.mntMember.id).subscribe(result => {
            this.identity = result;
        });

        this._mntEconomicInfosServiceProxy.getMntEconomicInfoByMemberId(this.item.mntMember.id).subscribe(result => {
            this.economic = result;
        });
    }

    downloadFile(fileType: number): void {
        this._mntMembersProxy.downloadMemberFile(this.item.mntMember.userId, fileType);
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
