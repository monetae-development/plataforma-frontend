import { IPlatformBankAccountForViewMemberDto } from './IPlatformBankAccountForViewMemberDto';

export class PlatformBankAccountForViewMemberDto implements IPlatformBankAccountForViewMemberDto {
    holder!: string;
    account!: string;
    catAccountTypeId!: number;
    swift!: string;
    catCurrencyId!: number;
    id!: number;

    constructor(data?: IPlatformBankAccountForViewMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): PlatformBankAccountForViewMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new PlatformBankAccountForViewMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.holder = _data['holder'];
            this.account = _data['account'];
            this.catAccountTypeId = _data['catAccountTypeId'];
            this.swift = _data['swift'];
            this.catCurrencyId = _data['catCurrencyId'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['holder'] = this.holder;
        data['account'] = this.account;
        data['catAccountTypeId'] = this.catAccountTypeId;
        data['swift'] = this.swift;
        data['catCurrencyId'] = this.catCurrencyId;
        data['id'] = this.id;
        return data;
    }
}

