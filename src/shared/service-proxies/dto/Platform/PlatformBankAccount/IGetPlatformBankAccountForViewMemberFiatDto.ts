import { PlatformBankAccountForViewMemberDto } from './PlatformBankAccountForViewMemberDto';

export interface IGetPlatformBankAccountForViewMemberFiatDto {
    label: string;
    value: string;
    countryId: number;
    bankAccount: PlatformBankAccountForViewMemberDto;
}
