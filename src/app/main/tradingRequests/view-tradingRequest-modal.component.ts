import { AppConsts } from '@shared/AppConsts';
import { Component, ViewChild, Injector, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TradingRequestDto } from '@shared/service-proxies/dto/tradingRequest/TradingRequestDto';
import { GetTradingRequestForViewDto } from '@shared/service-proxies/dto/TradingRequest/GetTradingForViewDto';
import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { TradingCryptoCurrencyForRequestDto } from '@shared/service-proxies/dto/Trading/TradingCryptoCurrency/TradingCryptoCurrencyForRequestDto';
import { MntMemberForRequestDto } from '@shared/service-proxies/dto/mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '@shared/service-proxies/dto/Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '@shared/service-proxies/dto/members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
    selector: 'viewTradingRequestModal',
    templateUrl: './view-tradingRequest-modal.component.html'
})

export class ViewTradingRequestModalComponent extends AppComponentBase {

    @ViewChild('viewRequestModal', { static: true }) modal: ModalDirective;
    @Output() modalSave: EventEmitter<any> = new EventEmitter<any>();

    active = false;
    saving = false;

    record: GetTradingRequestForViewDto;
    requestType = RequestType;
    requestStatus = RequestStatus;


    constructor(
        injector: Injector
    ) {
        super(injector);
        this.record = new GetTradingRequestForViewDto();
        this.record.request = new TradingRequestDto();
        this.record.request.tradingCryptoCurrencyFk = new TradingCryptoCurrencyForRequestDto();
        this.record.request.mntMemberFk = new MntMemberForRequestDto();
        this.record.request.userFk = new UserInfoDto();
        this.record.request.mntMemberBankAccountFk = new MntMemberBankAccountForRequestDto();
    }

    show(record: GetTradingRequestForViewDto): void {
        this.record = record;
        this.active = true;
        this.modal.show();
    }

    close(): void {
        this.active = false;
        this.modal.hide();
    }
}
