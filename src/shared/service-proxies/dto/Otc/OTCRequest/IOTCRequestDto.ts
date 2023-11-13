import { RequestType } from '@shared/service-proxies/enum/OTC/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/OTC/RequestStatus.enum';
import { OTCCoinForRequestDto } from '../OTCCoins/OTCCoinForRequestDto';
import { MntMemberForRequestDto } from '../../mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '../../Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '../../members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { DateTime } from 'luxon';

export interface IOTCRequestDto {
    type: RequestType;
    price: number;
    amount: number;
    cost: number;
    status: RequestStatus;
    folio: string;
    otcCoinId: number;
    otcCoinFk: OTCCoinForRequestDto;
    mntMemberId: number;
    mntMemberFk: MntMemberForRequestDto;
    userFk: UserInfoDto;
    mntMemberBankAccountId: number | undefined;
    mntMemberBankAccountFk: MntMemberBankAccountForRequestDto | undefined;
    creationTime: DateTime;
    creatorUserId: number;
    id: number;
}
