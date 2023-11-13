import { OTCRequestForMemberDto } from './OTCRequestForMemberDto';
import { OTCCoinForMemberDto } from '../OTCCoins/OTCCoinForMemberDto';

export interface IGetOTCRequestByMemberDto {
    otcRequest: OTCRequestForMemberDto;
    otcCoinFk: OTCCoinForMemberDto;
}
