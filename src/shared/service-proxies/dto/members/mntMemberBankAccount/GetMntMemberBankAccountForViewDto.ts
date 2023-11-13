import { IGetMntMemberBankAccountForViewDto } from './IGetMntMemberBankAccountForViewDto';
import { MntMemberBankAccountDto } from './MntMemberBankAccountDto';

export class GetMntMemberBankAccountForViewDto implements IGetMntMemberBankAccountForViewDto {
    mntMemberBankAccount!: MntMemberBankAccountDto;
    catCountryId!: number;
    catBankTitle!: string | undefined;
    catAccountTypeTitle!: string | undefined;
    catCurrencyTitle!: string | undefined;
    catCurrencySymbol!: string | undefined;

    constructor(data?: IGetMntMemberBankAccountForViewDto) {
        if (data) {
            for (let property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    static fromJS(data: any): GetMntMemberBankAccountForViewDto {
        data = typeof data === 'object' ? data : {};
        let result = new GetMntMemberBankAccountForViewDto();
        result.init(data);
        return result;
    }

    init(_data?: any) {
        if (_data) {
            this.mntMemberBankAccount = _data['mntMemberBankAccount'] ? MntMemberBankAccountDto.fromJS(_data['mntMemberBankAccount']) : <any>undefined;
            this.catCountryId = _data['catCountryId'];
            this.catBankTitle = _data['catBankTitle'];
            this.catAccountTypeTitle = _data['catAccountTypeTitle'];
            this.catCurrencyTitle = _data['catCurrencyTitle'];
            this.catCurrencySymbol = _data['catCurrencySymbol'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['mntMemberBankAccount'] = this.mntMemberBankAccount ? this.mntMemberBankAccount.toJSON() : <any>undefined;
        data['catCountryId'] = this.catCountryId;
        data['catBankTitle'] = this.catBankTitle;
        data['catAccountTypeTitle'] = this.catAccountTypeTitle;
        data['catCurrencyTitle'] = this.catCurrencyTitle;
        data['catCurrencySymbol'] = this.catCurrencySymbol;
        return data;
    }
}
