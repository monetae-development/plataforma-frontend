import { ICreateMntMemberFiatDto } from './ICreateMntMemberFiatDto';
import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';

export class CreateMntMemberFiatDto implements ICreateMntMemberFiatDto {
    mntMemberBankAccountId!: number;
    platformBankAccountId!: number;
    type!: FiatType;
    amount!: number;
    reference!: string;

    constructor(data?: ICreateMntMemberFiatDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateMntMemberFiatDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateMntMemberFiatDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            this.platformBankAccountId = _data['platformBankAccountId'];
            this.type = _data['type'];
            this.amount = _data['amount'];
            this.reference = _data['reference'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['platformBankAccountId'] = this.platformBankAccountId;
        data['type'] = this.type;
        data['amount'] = this.amount;
        data['reference'] = this.reference;
        return data;
    }
}
