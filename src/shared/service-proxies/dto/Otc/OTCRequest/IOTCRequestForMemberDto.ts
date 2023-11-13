import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { DateTime } from 'luxon';

export interface IOTCRequestForMemberDto {
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
