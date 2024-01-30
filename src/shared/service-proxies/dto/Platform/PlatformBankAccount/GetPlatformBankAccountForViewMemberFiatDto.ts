import { IGetPlatformBankAccountForViewMemberDto } from './IGetPlatformBankAccountForViewMemberDto';
import { PlatformBankAccountForViewMemberDto } from './PlatformBankAccountForViewMemberDto';
import { IGetPlatformBankAccountForViewMemberFiatDto } from './IGetPlatformBankAccountForViewMemberFiatDto';

export class GetPlatformBankAccountForViewMemberFiatDto implements IGetPlatformBankAccountForViewMemberFiatDto {

    label!: string;
    value!: string;
    countryId!: number;
    bankAccount!: PlatformBankAccountForViewMemberDto;

    constructor(data?: IGetPlatformBankAccountForViewMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetPlatformBankAccountForViewMemberFiatDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetPlatformBankAccountForViewMemberFiatDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.label = _data['label'];
            this.value = _data['value'];
            this.countryId = _data['countryId'];
            this.bankAccount = _data['bankAccount'] ? PlatformBankAccountForViewMemberDto.fromJS(_data['bankAccount']) : <any>undefined;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['label'] = this.label;
        data['value'] = this.value;
        data['countryId'] = this.countryId;
        data['bankAccount'] = this.bankAccount ? this.bankAccount.toJSON() : <any>undefined;
        return data;
    }
}
