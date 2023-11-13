import { IMntMemberBankAccountForRequestDto } from './IMntMemberBankAccountForRequestDto';

export class MntMemberBankAccountForRequestDto {
    account!: string;
    id!: number;

    constructor(data?: IMntMemberBankAccountForRequestDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): MntMemberBankAccountForRequestDto {
        data = typeof data === 'object' ? data : {};
        let result = new MntMemberBankAccountForRequestDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.account = _data['account'];
            this.id = _data['id'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['account'] = this.account;
        data['id'] = this.id;
        return data;
    }
}
