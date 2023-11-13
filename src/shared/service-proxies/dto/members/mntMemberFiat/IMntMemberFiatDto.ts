import { FiatType } from '@shared/service-proxies/enum/Members/FiatType.enum';
import { FiatStatus } from '@shared/service-proxies/enum/Members/FiatStatus.enum';
import { DateTime } from 'luxon';

export interface IMntMemberFiatDto {
    folio: string;
    mntMemberBankAccountId: number;
    platformBankAccountId: number;
    type: FiatType;
    amount: number;
    reference: string;
    status: FiatStatus;
    creationTime: DateTime;
    creatorUserId: number;
    id: number;
}
