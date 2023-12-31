import { IOTCRequestForMemberDto } from './IOTCRequestForMemberDto';
import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { DateTime } from 'luxon';

export class OTCRequestForMemberDto implements IOTCRequestForMemberDto{
    type!: RequestType;
    price!: number;
    amount!: number;
    cost!: number;
    status!: RequestStatus;
    folio!: string | undefined;
    otcCoinId!: number;
    mntMemberId!: number;
    mntMemberBankAccountId!: number;
    creationTime!: DateTime;
    lastModificationTime!: DateTime | undefined;
    id!: number;

    constructor(data?: IOTCRequestForMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): OTCRequestForMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new OTCRequestForMemberDto();
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
            this.mntMemberId = _data['mntMemberId'];
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            this.creationTime = _data['creationTime'] ? DateTime.fromISO(_data['creationTime'].toString()) : <any>undefined;
            this.lastModificationTime = _data['lastModificationTime'] ? DateTime.fromISO(_data['lastModificationTime'].toString()) : <any>undefined;
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
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['lastModificationTime'] = this.lastModificationTime ? this.lastModificationTime.toString() : <any>undefined;
        data['id'] = this.id;
        return data;
    }
}
