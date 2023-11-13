import { IGetMntMemberBankAccountForEditOutput } from './IGetMntMemberBankAccountForEditOutput';
import { CreateOrEditMntMemberBankAccountDto } from './CreateOrEditMntMemberBankAccountDto';

export class GetMntMemberBankAccountForEditOutput implements IGetMntMemberBankAccountForEditOutput {
    mntMemberBankAccount!: CreateOrEditMntMemberBankAccountDto;
    catCountryId!: number;

    constructor(data?: IGetMntMemberBankAccountForEditOutput) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberBankAccountForEditOutput {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberBankAccountForEditOutput();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberBankAccount = _data['mntMemberBankAccount'] ? CreateOrEditMntMemberBankAccountDto.fromJS(_data['mntMemberBankAccount']) : <any>undefined;
            this.catCountryId = _data['catCountryId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberBankAccount'] = this.mntMemberBankAccount ? this.mntMemberBankAccount.toJSON() : <any>undefined;
        data['catCountryId'] = this.catCountryId;
        return data;
    }
}
