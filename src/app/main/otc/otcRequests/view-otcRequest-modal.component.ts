import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { OTCRequestDto } from '@shared/service-proxies/dto/Otc/OTCRequest/OTCRequestDto';
import { GetOTCRequestForViewDto } from '@shared/service-proxies/dto/Otc/OTCRequest/GetOTCRequestForViewDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { OTCCoinForRequestDto } from '@shared/service-proxies/dto/Otc/OTCCoins/OTCCoinForRequestDto';
import { MntMemberForRequestDto } from '@shared/service-proxies/dto/mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '@shared/service-proxies/dto/Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewOTCRequestModal',
    templateUrl: './view-otcRequest-modal.component.html'
})

export class ViewOTCRequestModalComponent extends AppComponentBase {

    @ViewChild('viewRequestModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    record: GetOTCRequestForViewDto;
    requestType = RequestType;
    requestStatus = RequestStatus;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.record = new GetOTCRequestForViewDto();
        this.record.otcRequest = new OTCRequestDto();
        this.record.otcRequest.otcCoinFk = new OTCCoinForRequestDto();
        this.record.otcRequest.mntMemberFk = new MntMemberForRequestDto();
        this.record.otcRequest.userFk = new UserInfoDto();
        this.record.otcRequest.mntMemberBankAccountFk = new MntMemberBankAccountForRequestDto();
    }

    show(record: GetOTCRequestForViewDto): void {
        this.record = record;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
