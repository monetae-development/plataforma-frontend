import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
export interface ICreateMntMemberFiatDto {
    mntMemberBankAccountId: number;
    platformBankAccountId: number;
    type: FiatType;
    amount: number;
    reference: string;
}
