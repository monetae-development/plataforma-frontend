import { BankAccountStatus } from '@shared/service-proxies/enum/Members/BankAccountStatus.enum';

export interface IMntMemberBankAccountDto {
    holder: string | undefined;
    account: string | undefined;
    swift: string | undefined;
    status: BankAccountStatus;
    mntMemberId: number;
    catBankId: number;
    catAccountTypeId: number;
    catCurrencyId: number | undefined;
    id: number;
}
