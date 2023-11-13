import { IOTCRequestDto } from './IOTCRequestDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { OTCCoinForRequestDto } from '../OTCCoins/OTCCoinForRequestDto';
import { MntMemberForRequestDto } from '../../mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '../../Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '../../members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { DateTime } from 'luxon';

export class OTCRequestDto implements IOTCRequestDto {
    type!: RequestType;
    price!: number;
    amount!: number;
    cost!: number;
    status!: RequestStatus;
    folio!: string;
    otcCoinId!: number;
    otcCoinFk!: OTCCoinForRequestDto;
    mntMemberId!: number;
    mntMemberFk!: MntMemberForRequestDto;
    userFk!: UserInfoDto;
    mntMemberBankAccountId!: number | undefined;
    mntMemberBankAccountFk!: MntMemberBankAccountForRequestDto | undefined;
    creationTime!: DateTime;
    creatorUserId!: number;
    id!: number;

    constructor(data?: IOTCRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): OTCRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new OTCRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data['type'];
            this.price = _data['price'];
            this.amount = _data['amount'];
            this.cost = _data['cost'];
            this.status = _data['status'];
            this.folio = _data['folio'];
            this.otcCoinId = _data['otcCoinId'];
            let  otcCoinFk = _data['otcCoinFk'];
            this.otcCoinFk = otcCoinFk ? OTCCoinForRequestDto.fromJS(otcCoinFk) : <any>undefined;
            this.mntMemberId = _data['mntMemberId'];
            let mntMemberFk = _data['mntMemberFk'];
            this.mntMemberFk = mntMemberFk ? MntMemberForRequestDto.fromJS(mntMemberFk) : <any>undefined;
            let userFk = _data['userFk'];
            this.userFk = userFk ? UserInfoDto.fromJS(userFk) : <any>undefined;
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            let  mntMemberBankAccountFk = _data['mntMemberBankAccountFk'];
            this.mntMemberBankAccountFk = mntMemberBankAccountFk ? MntMemberBankAccountForRequestDto.fromJS(mntMemberBankAccountFk) : new MntMemberBankAccountForRequestDto();
            this.creationTime = _data['creationTime'] ? DateTime.fromISO(_data['creationTime'].toString()) : <any>undefined;
            this.creatorUserId = _data['creatorUserId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['type'] = this.type;
        data['price'] = this.price;
        data['amount'] = this.amount;
        data['cost'] = this.cost;
        data['status'] = this.status;
        data['folio'] = this.folio;
        data['otcCoinId'] = this.otcCoinId;
        data['mntMemberId'] = this.mntMemberId;
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['mntMemberFk'] = this.mntMemberFk;
        data['userFk'] = this.userFk;
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['mntMemberBankAccountForRequestDto'] = this.mntMemberBankAccountFk;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['creatorUserId'] = this.creatorUserId;
        data['id'] = this.id;
        return data;
    }

}

