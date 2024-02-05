import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { DateTime } from 'luxon';

export interface ITradingRequestForMemberDto {
    type: RequestType;
    price: number;
    amount: number;
    cost: number;
    status: RequestStatus;
    folio: string | undefined;
    otcCoinId: number;
    mntMemberId: number;
    mntMemberBankAccountId: number | undefined;
    creationTime: DateTime;
    lastModificationTime: DateTime | undefined;
    id: number;
}
