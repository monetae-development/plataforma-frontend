import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GetMntMemberForViewDto, MntMemberDto,
    MntMemberAddressesServiceProxy, GetMntMemberAddressCompletedDto,
    MntMemberIdentitiesServiceProxy, GetMntMemberIdentityCompletedDto,
    MntEconomicInfosServiceProxy, GetMntEconomicInfoCompletedDto,
    MntMemberPepsServiceProxy, MntMemberPepDto} from '@shared/service-proxies/service-proxies';
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
    pep: MntMemberPepDto;

    constructor(
        injector: Injector,
        private _mntMemberAddressesServiceProxy: MntMemberAddressesServiceProxy,
        private _mntMemberIdentitiesServiceProxy: MntMemberIdentitiesServiceProxy,
        private _mntEconomicInfosServiceProxy: MntEconomicInfosServiceProxy,
        private _mntMemberPepsServiceProxy: MntMemberPepsServiceProxy,
    ) {
        super(injector);
        this.item = new GetMntMemberForViewDto();
        this.item.mntMember = new MntMemberDto();
        this.address = new GetMntMemberAddressCompletedDto();
        this.identity = new GetMntMemberIdentityCompletedDto();
        this.economic = new GetMntEconomicInfoCompletedDto();
        this.pep = new MntMemberPepDto();
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

        this._mntMemberPepsServiceProxy.getMntMemberPepByMemberId(this.item.mntMember.id).subscribe(result => {
            this.pep = result;
        });
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
