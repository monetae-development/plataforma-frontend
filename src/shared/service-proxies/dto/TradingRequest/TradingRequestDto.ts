import { ITradingRequestDto } from './ITradingRequestDto';
import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { TradingCryptoCurrencyForRequestDto } from '../Trading/TradingCryptoCurrency/TradingCryptoCurrencyForRequestDto';
import { MntMemberForRequestDto } from '../mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '../Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '../members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { DateTime } from 'luxon';

export class TradingRequestDto implements ITradingRequestDto {
    type!: RequestType;
    price!: number;
    amount!: number;
    total!: number;
    status!: RequestStatus;
    folio!: string;
    tradingCryptoCurrencyId!: number;
    tradingCryptoCurrencyFk!: TradingCryptoCurrencyForRequestDto;
    mntMemberId!: number;
    mntMemberFk!: MntMemberForRequestDto;
    userFk!: UserInfoDto;
    creationTime!: DateTime;
    creatorUserId!: number;
    id!: number;

    constructor(data?: ITradingRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): TradingRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new TradingRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.type = _data['type'];
            this.price = _data['price'];
            this.amount = _data['amount'];
            this.total = _data['total'];
            this.status = _data['status'];
            this.folio = _data['folio'];
            this.tradingCryptoCurrencyId = _data['tradingCryptoCurrencyId'];
            let tradingCryptoCurrencyFk = _data['tradingCryptoCurrencyFk'];
            this.tradingCryptoCurrencyFk = tradingCryptoCurrencyFk ? TradingCryptoCurrencyForRequestDto.fromJS(tradingCryptoCurrencyFk) : <any>undefined;
            this.mntMemberId = _data['mntMemberId'];
            let mntMemberFk = _data['mntMemberFk'];
            this.mntMemberFk = mntMemberFk ? MntMemberForRequestDto.fromJS(mntMemberFk) : <any>undefined;
            let userFk = _data['userFk'];
            this.userFk = userFk ? UserInfoDto.fromJS(userFk) : <any>undefined;
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
        data['total'] = this.total;
        data['status'] = this.status;
        data['folio'] = this.folio;
        data['tradingCryptoCurrencyId'] = this.tradingCryptoCurrencyId;
        data['tradingCryptoCurrencyFk'] = this.tradingCryptoCurrencyFk;
        data['mntMemberId'] = this.mntMemberId;
        data['mntMemberFk'] = this.mntMemberFk;
        data['userFk'] = this.userFk;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['creatorUserId'] = this.creatorUserId;
        data['id'] = this.id;
        return data;
    }

}

