import { RequestType } from '@shared/service-proxies/enum/Trading/RequestType.enum';
import { RequestStatus } from '@shared/service-proxies/enum/Trading/RequestStatus.enum';
import { TradingCryptoCurrencyForRequestDto } from '../Trading/TradingCryptoCurrency/TradingCryptoCurrencyForRequestDto';
import { MntMemberForRequestDto } from '../mntMembers/MntMemberForRequestDto';
import { UserInfoDto } from '../Authorization/Users/UserInfoDto';
import { MntMemberBankAccountForRequestDto } from '../members/mntMemberBankAccount/MntMemberBankAccountForRequestDto';
import { DateTime } from 'luxon';

export interface ITradingRequestDto {
    type: RequestType;
    price: number;
    amount: number;
    cost: number;
    status: RequestStatus;
    folio: string;
    tradingCryptoCurrencyId: number;
    tradingCryptoCurrencyFk: TradingCryptoCurrencyForRequestDto;
    mntMemberId: number;
    mntMemberFk: MntMemberForRequestDto;
    userFk: UserInfoDto;
    creationTime: DateTime;
    creatorUserId: number;
    id: number;
}
