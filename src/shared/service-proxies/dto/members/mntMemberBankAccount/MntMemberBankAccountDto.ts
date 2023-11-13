import { IMntMemberBankAccountDto } from './IMntMemberBankAccountDto';
import { BankAccountStatus } from '@shared/service-proxies/enum/Members/BankAccountStatus.enum';

export class MntMemberBankAccountDto implements IMntMemberBankAccountDto {
    holder!: string | undefined;
    account!: string | undefined;
    swift!: string | undefined;
    status!: BankAccountStatus;
    mntMemberId!: number;
    catBankId!: number;
    catAccountTypeId!: number;
    catCurrencyId!: number | undefined;
    id!: number;

    constructor(data?: IMntMemberBankAccountDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberBankAccountDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberBankAccountDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.holder = _data['holder'];
            this.account = _data['account'];
            this.swift = _data['swift'];
            this.status = _data['status'];
            this.mntMemberId = _data['mntMemberId'];
            this.catBankId = _data['catBankId'];
            this.catAccountTypeId = _data['catAccountTypeId'];
            this.catCurrencyId = _data['catCurrencyId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['holder'] = this.holder;
        data['account'] = this.account;
        data['swift'] = this.swift;
        data['status'] = this.status;
        data['mntMemberId'] = this.mntMemberId;
        data['catBankId'] = this.catBankId;
        data['catAccountTypeId'] = this.catAccountTypeId;
        data['catCurrencyId'] = this.catCurrencyId;
        data['id'] = this.id;
        return data;
    }
}
