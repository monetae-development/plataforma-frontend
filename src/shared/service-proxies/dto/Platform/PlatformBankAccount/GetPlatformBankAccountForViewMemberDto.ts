import { IGetPlatformBankAccountForViewMemberDto } from './IGetPlatformBankAccountForViewMemberDto';
import { PlatformBankAccountForViewMemberDto } from './PlatformBankAccountForViewMemberDto';

export class GetPlatformBankAccountForViewMemberDto implements IGetPlatformBankAccountForViewMemberDto {
    platformBankAccount!: PlatformBankAccountForViewMemberDto;
    catAccountTypeTitle!: string;
    catCurrencySymbol!: string;

    constructor(data?: IGetPlatformBankAccountForViewMemberDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetPlatformBankAccountForViewMemberDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetPlatformBankAccountForViewMemberDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.platformBankAccount = _data['platformBankAccount'] ? PlatformBankAccountForViewMemberDto.fromJS(_data['platformBankAccount']) : <any>undefined;
            this.catAccountTypeTitle = _data['catAccountTypeTitle'];
            this.catCurrencySymbol = _data['catCurrencySymbol'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['platformBankAccount'] = this.platformBankAccount ? this.platformBankAccount.toJSON() : <any>undefined;
        data['catAccountTypeTitle'] = this.catAccountTypeTitle;
        data['catCurrencySymbol'] = this.catCurrencySymbol;
        return data;
    }
}
