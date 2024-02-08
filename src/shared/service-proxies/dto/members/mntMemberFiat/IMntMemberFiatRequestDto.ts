import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { DateTime } from 'luxon';

export interface IMntMemberFiatRequestDto {
    folio: string,
    mntMemberBankHolder: string,
    mntMemberBankAccount: string,
    platformBankAlias: string,
    platformBankAccount: string,
    amount: number,
    reference: string,
    fileName: string,
    fileId: number,
    creationTime: string,
    type: FiatType,
    status: FiatStatus
}
