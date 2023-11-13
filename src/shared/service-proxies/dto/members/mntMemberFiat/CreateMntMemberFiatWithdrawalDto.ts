import { ICreateMntMemberFiatWithdrawalDto } from './ICreateMntMemberFiatWithdrawalDto';

export class CreateMntMemberFiatWithdrawalDto implements ICreateMntMemberFiatWithdrawalDto {
    mntMemberBankAccountId!: number;
    amount!: number;

    constructor(data?: ICreateMntMemberFiatWithdrawalDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): CreateMntMemberFiatWithdrawalDto {
        data = typeof data === 'object' ? data : {};
        let result = new CreateMntMemberFiatWithdrawalDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberBankAccountId = _data['mntMemberBankAccountId'];
            this.amount = _data['amount'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberBankAccountId'] = this.mntMemberBankAccountId;
        data['amount'] = this.amount;
        return data;
    }
}
