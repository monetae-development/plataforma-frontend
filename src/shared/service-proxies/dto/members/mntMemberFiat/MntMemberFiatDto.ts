import { IMntMemberFiatDto } from './IMntMemberFiatDto';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { DateTime } from 'luxon';

export class MntMemberFiatDto implements IMntMemberFiatDto {
    folio!: string;
    mntMemberBankAccountId!: number;
    platformBankAccountId!: number;
    type!: FiatType;
    amount!: number;
    status!: FiatStatus;
    reference!: string;
    creationTime!: DateTime;
    creatorUserId!: number;
    id!: number;

    constructor(data?: IMntMemberFiatDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberFiatDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberFiatDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.folio = _data['folio'];
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            this.platformBankAccountId = _data['platformBankAccountId'];
            this.type = _data['type'];
            this.amount = _data['amount'];
            this.reference = _data['reference'];
            this.status = _data['status'];
            this.creationTime = _data['creationTime'] ? DateTime.fromISO(_data['creationTime'].toString()) : <any>undefined;
            this.creatorUserId = _data['creatorUserId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['folio'] = this.folio;
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['platformBankAccountId'] = this.platformBankAccountId;
        data['type'] = this.type;
        data['amount'] = this.amount;
        data['reference'] = this.reference;
        data['status'] = this.status;
        data['creationTime'] = this.creationTime ? this.creationTime.toString() : <any>undefined;
        data['creatorUserId'] = this.creatorUserId;
        data['id'] = this.id;
        return data;
    }
}

