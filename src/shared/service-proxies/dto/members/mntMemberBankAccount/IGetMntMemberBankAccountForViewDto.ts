import { MntMemberBankAccountDto } from './MntMemberBankAccountDto';

export interface IGetMntMemberBankAccountForViewDto {
    mntMemberBankAccount: MntMemberBankAccountDto;
    catCountryId: number;
    catBankTitle: string | undefined;
    catAccountTypeTitle: string | undefined;
    catCurrencyTitle: string | undefined;
    catCurrencySymbol: string | undefined;
}
