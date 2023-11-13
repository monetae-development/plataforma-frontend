import { BankAccountStatus } from '@shared/service-proxies/enum/Members/BankAccountStatus.enum';

export interface ICreateOrEditMntMemberBankAccountDto {
    holder: string;
    account: string;
    swift: string | undefined;
    status: BankAccountStatus;
    mntMemberId: number;
    catBankId: number;
    catAccountTypeId: number;
    catCurrencyId: number;
    id: number | undefined;
}
